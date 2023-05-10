import { useRouter } from 'next/router';
import playIcon from '../../public/assets/play.svg'
import pauseIcon from '../../public/assets/pause.svg'
import React, { useContext, useEffect, useState } from 'react'
import { useAccount } from 'wagmi';
import { AudioPlayer, FavouriteCard, Nav, RightNav, UploadDialog } from '../components';
import Image from 'next/image';
import TableRow from '../components/TableRow';
import { SpotifyContext } from '../context/AudoPlayerContext';
import { ContractContext } from '../context/ContractContext';

const styles = {
  container: `flex flex-row text-gray-300 h-screen`,
  tableWrapper: `max-w-7xl m-auto p-3 mt-5 mb-40`,
  table: `w-full text-left`,
  tableHeader: `border-b border-gray-100/20 pb5 opacity-50`
}


interface contractDataType {
  data: any,
  isError: boolean,
  isLoading: boolean,
}




const Dashboard = () => {
  const paymentStatus = localStorage.getItem('paymentStatus');
  const router = useRouter();
  const { isConnected } = useAccount();
  const [uploadDialogState, setUploadDialogState] = useState(false);
  const [dataChangeState, setDataChangeState] = useState(false);
  const [songList, setSongList] = useState(null);
  const { play, pause, isPlaying, allSongs } = useContext(SpotifyContext);
  const { GetAllSongs, isFileUploaded } = useContext(ContractContext);


  const handleUploadDialog = () => {
    setUploadDialogState(true)
  }
  const handleDialogDismiss = () => {
    setUploadDialogState(false);
  }

  const handleOnPlayBtnClick = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }

  useEffect(() => {
    if (isFileUploaded) {
      setUploadDialogState(false);
    }
  }, [isFileUploaded])



  useEffect(() => {
    if (paymentStatus != 'successful' || !isConnected) {
      localStorage.clear();
      router.push('/');
    }

  }, [paymentStatus, isConnected])



  return (
    <div className={styles.container}>
      <Nav />



      <div className='w-full bg-gradient-to-t p-6  text-white  from-red-400 to-green-200'>
        <div className='flex flex-row justify-between'>
          <div className='flex flex-row gap-6'>
            <button className='bg-slate-400 w-10 h-10 flex justify-center items-center rounded-full '><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            </button>
            <button className='bg-slate-400  w-10 h-10 flex justify-center items-center rounded-full'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
            </button>
          </div>

          <div className='flex flex-row gap-10'>
            <button onClick={handleUploadDialog} className='text-white bg-green-600 p-2 rounded-full'>Upload Music</button>
            <button className='flex flex-row gap-3 p-3 bg-slate-400 justify-center items-center rounded-full text-white'>
              <Image className='rounded-full' alt='profile' width={20} height={20} src={'/profile.avif'} />
              Raziur Rahaman
            </button>
          </div>
        </div>




        <div className='flex flex-row gap-10 mt-14'>
          <Image priority className='w-auto rounded-xl overflow-hidden' alt='song' width={200} height={200} src={'/song_img.webp'} />
          <div className='flex flex-col gap-2'>
            <h5>Album</h5>
            <h1 className='text-5xl font-bold '>Song & Beats</h1>
            <ul className='flex gap-2'>
              <li className='inline'>StreamBeats</li>
              <li className='inline'>2023</li>
              <li className='inline'>15 songs, 1 hour 20 min</li>
            </ul>
          </div>
        </div>


        <div className='flex mt-10 flex-row gap-10  mb-auto'>
          <button onClick={handleOnPlayBtnClick} className='bg-green-600 w-20 h-20 flex justify-center items-center rounded-full'>
            <Image alt='main_play' width={50} height={50} src={isPlaying ? pauseIcon : playIcon} />
          </button>
          <button>
            <svg className='text-red-600 w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </button>
          <button><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          </button>
          <button><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
          </button>
        </div>





        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <tbody className={styles.tableHeader}>
              <tr>
                <th className='pb-3'>#</th>
                <th className='pb-3'>Title</th>
                <th className='pb-3'>Palayed</th>
                <th className='pb-3'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                </th>
              </tr>
            </tbody>



            {allSongs && allSongs?.map((song, index) => {
              return <TableRow key={index} index={index} title={song.title} url={song.url} played={'100000'} />
            })
            }

          </table>
        </div>
        <AudioPlayer />
      </div>
      <RightNav />

      <div className={uploadDialogState ? 'visible' : 'hidden'}>
        <UploadDialog onDismiss={handleDialogDismiss} />
      </div>
    </div >
  )
}

export default Dashboard