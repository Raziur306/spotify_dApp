import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";
import ContractAbi from '../contract/Spotify.json'
import { useContractRead, useContractWrite, usePrepareContractWrite, } from "wagmi";
import { SpotifyContext } from "./AudoPlayerContext";
import { NFTStorage, File } from 'nft.storage'
import { parseEther } from "ethers/lib/utils.js";
import { BigNumber, ethers } from "ethers";



interface ChildrenType {
    children: ReactNode
}

export const ContractContext = createContext({});

export const ContractContextProvider = ({ children }: ChildrenType) => {
    const abi = ContractAbi.abi;
    const { setAllSongs } = useContext(SpotifyContext);
    const [isFileUploading, setIsFileUploading] = useState(false);
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    const NFT_STORAGE_KEY = process.env.NEXT_PUBLIC_NFT_API_KEY
    const nftstorage = new NFTStorage({ token: `${NFT_STORAGE_KEY}` });
    const address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
    const [fileUrl, setFileUrl] = useState('');
    const [songTitle, setSongTitle] = useState('');





    //reading music
    const { data, isLoading, error } = useContractRead({
        address: `0x${address}`,
        abi: abi,
        functionName: 'getMusic',
        watch: true,
    })


    //updating song every time
    useEffect(() => {
        if (data && !error) {
            setAllSongs(data);
        }
    }, [isLoading])





    //prepare config for writing into blockchain
    const { config } = usePrepareContractWrite({
        address: `0x${address}`,
        abi: abi,
        functionName: 'updateList',
        args: [songTitle, fileUrl],
        overrides: {
            gasLimit: BigNumber.from(40000),
            maxFeePerGas: parseEther('0.000001')
        }
    })

    const { data: uploadData, isLoading: isUploading, isSuccess: isUploaded, write } = useContractWrite(config)


    //upload and add new song
    const addNewSong = async (title: String, file: File) => {
        setIsFileUploading(true);
        try {

            const cid = await nftstorage.storeBlob(file);  //upload into NFT storage
            setFileUrl(`https://ipfs.io/ipfs/${cid}`);
            setSongTitle(`${title}`);

            write?.()       //write into blockchain

        } catch (error) {
            console.log("Write Error", error);
        }

    }


    //uploading state for file uploading into nft and blockchain
    useEffect(() => {
        setIsFileUploaded(isUploaded);
        setIsFileUploading(isUploading);
    }, [isUploading, isUploaded])



    return <ContractContext.Provider value={{
        addNewSong,
        isFileUploading,
        isFileUploaded,
    }}>
        {children}
    </ContractContext.Provider>
}



