import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";
import ContractAbi from '../contract/Spotify.json'
import { useContract, useSigner, } from "wagmi";
import { SpotifyContext } from "./AudoPlayerContext";
import { NFTStorage, File } from 'nft.storage'

interface ChildrenType {
    children: ReactNode
}




export const ContractContext = createContext({});

export const ContractContextProvider = ({ children }: ChildrenType) => {
    const [isFileUploading, setIsFileUploading] = useState(false);
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    const abi = ContractAbi.abi;
    const { setAllSongs } = useContext(SpotifyContext);
    const NFT_STORAGE_KEY = process.env.NEXT_PUBLIC_NFT_API_KEY
    const nftstorage = new NFTStorage({ token: `${NFT_STORAGE_KEY}` });
    const { data: signer } = useSigner();

    const contract = useContract(({
        address: `0x${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`,
        abi: abi,
        signerOrProvider: signer,
    }));




    useEffect(() => {
        GetAllSongs();
    }, [])

    // useEffect(() => {
    //     GetAllSongs();
    // }, [isFileUploaded, isFileUploading])




    const AddNewSong = async (title: String, file: File) => {
        setIsFileUploading(true);

        try {
            const url = await SaveToNFT(file);
            await contract?.updateList(title, url);

            setIsFileUploaded(true);
            setIsFileUploading(false);
        } catch (error) {
            console.log("Writing error:", error);
        }
    }



    //save file into NFT storage
    const SaveToNFT = async (file: File) => {
        setIsFileUploading(true);
        const cid = await nftstorage.storeBlob(file);
        return `https://ipfs.io/ipfs/${cid}`
    }



    //get all songs
    const GetAllSongs = async () => {
        console.log("Called the function");
        try {
            const songs = await contract?.getMusic();
            console.log('callled from where?');
            setAllSongs(songs)

        } catch (error) {
            console.log('Reading Error:', error);
        }
    }


    return <ContractContext.Provider value={{
        AddNewSong,
        isFileUploading,
        isFileUploaded,
        // GetAllSongs
    }}>
        {children}
    </ContractContext.Provider>
}



