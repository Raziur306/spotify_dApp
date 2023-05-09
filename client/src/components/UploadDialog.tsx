import React, { useEffect, useRef, useState } from 'react'
import { NFTStorage, File } from 'nft.storage'
import { useContractWrite, usePrepareContractWrite, useTransaction, useWaitForTransaction, useWatchPendingTransactions } from 'wagmi';
const { abi } = require('../contract/Spotify.json');
import mime from 'mime'
import fs from 'fs'
import { ethers } from 'ethers';


function UploadDialog(param: { onDismiss: Function }) {

  const { onDismiss } = param;
  const [songTitle, setTitle] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [isUploading, setUploadState] = useState(false)
  const [url, setUrl] = useState('');


  const NFT_STORAGE_KEY = process.env.NEXT_PUBLIC_NFT_API_KEY
  const nftstorage = new NFTStorage({ token: `${NFT_STORAGE_KEY}` });





  //store into blockchain
  const { config } = usePrepareContractWrite({
    address: `0x${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`,
    abi: abi,
    functionName: 'updateList',
    args: [setTitle, url],
  });


  const { data, write } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });



  const saveToContract = async () => {
    console.log("Write to contreact", url);
    write?.();
  }





  const handleSongTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleFileChange = (event: any) => {
    setAudioFile(event.target.files[0]);
  };

  const handleFileUploadClick = async () => {
    if (audioFile) {
      setUploadState(true);
      const cid = await nftstorage.storeBlob(audioFile);
      setUrl(`https://ipfs.io/ipfs/${cid}`);
    }
  }


  useEffect(() => {
    write?.();
  }, [url])


  useEffect(() => {
    onDismiss();
    setUploadState(false);
    setAudioFile(null);
    setTitle('');
  }, [isSuccess])







  return (
    <div className='h-full w-full fixed left-0 top-0 flex justify-center items-center bg-opacity-50'>
      <div className='rounded-lg md:w-1/3 xl:w-1/5 h-1/3 justify-center absolute flex flex-col gap-10 p-10 bg-green-300 '>
        <button onClick={() => { onDismiss() }} className='absolute text-white top-0 right-0 p-2'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
        </button>
        <input className='text-black p-1' onChange={handleSongTitleChange} value={songTitle} type='text' placeholder='Enter song title' />
        <input onChange={handleFileChange} className='text-white' type='file' name="audioFile" accept="audio/*" />
        <button disabled={isUploading} onClick={handleFileUploadClick} className='bg-green-500 justify-center flex items-center text-white p-2 rounded-full'>
          {isUploading ? (
            <div className="flex flex-row">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>  uploading... </span>
            </div>
          )
            : ('Upload')}
        </button>
      </div>
    </div >
  )
}

export default UploadDialog