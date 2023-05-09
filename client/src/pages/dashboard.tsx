import { useRouter } from 'next/router';
import playIcon from '../../public/assets/play.svg'
import pauseIcon from '../../public/assets/pause.svg'
import React, { useContext, useEffect, useState } from 'react'
import { useAccount, useContractRead, useTransaction } from 'wagmi';
import { AudioPlayer, FavouriteCard, UploadDialog } from '../components';
import Image from 'next/image';
import TableRow from '../components/TableRow';
import { SpotifyContext } from '../context/AudoPlayerContext';
const { abi } = require('../contract/Spotify.json')

const styles = {
  menu: `text-white flex flex-row gap-3 cursor-pointer`,
  suggestLi: `hover:text-white cursor-pointer`,
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
  const { play, pause, isPlaying, setAllSongs, allSongs } = useContext(SpotifyContext);


  const handleUploadDialog = () => {
    setUploadDialogState(true)
  }
  const handleDialogDismiss = () => {
    setUploadDialogState(false);
    setDataChangeState(true);
  }

  const handleOnPlayBtnClick = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }


  useEffect(() => {
    if (paymentStatus != 'successful' || !isConnected) {
      localStorage.clear();
      router.push('/');
    }

  }, [paymentStatus, isConnected])




  const { data, isError, isLoading } = useContractRead({
    address: `0x${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`,
    abi: abi,
    functionName: 'getMusic',
  });


  useEffect(() => {
    setAllSongs(data);
  }, [dataChangeState, data])

  // useEffect(() => {

  // }, [allSongs])



  return (<div className='flex flex-row text-gray-300 h-screen'>
    <div className='bg-black w-1/5 h-screen p-5 flex flex-col gap-6'>
      <div className='flex flex-col gap-8 '>
        <ul className='flex flex-col gap-6'>
          <li className={styles.menu}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
            Home</li>
          <li className={styles.menu}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
            Search</li>
          <li className={styles.menu}> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
            Your Library</li>
        </ul>
        <ul className='flex flex-col gap-6'>
          <li className={styles.menu}> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
            Create Playlist</li>
          <li className={styles.menu}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path className='text-red-700' strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
            Like Song</li>
        </ul>
      </div>
      <div className='border-t'>
        <ul className=' flex flex-col gap-2 mt-6 font-medium '>
          <li className='text-white font-bold'>GHOST SONG</li>
          <li className={styles.suggestLi}>Country Dumb</li>
          <li className={styles.suggestLi}>Holy Ghost Fire</li>
          <li className={styles.suggestLi}>I Believe in Ghosts</li>
          <li className={styles.suggestLi}>Fire🔥</li>
        </ul>
      </div>


    </div>










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
            return <TableRow key={index} index={index} title={song.title} url={song.url} played={'100000'} duration={'10m'} />
          })
          }



        </table>


      </div>


      <AudioPlayer />
    </div>


    <div className='bg-black w-1/5 p-5'>
      <div className='flex flex-col gap-6'>
        <div className='flex flex-row justify-between text-white text-normal'>
          <h2 className='font-medium'>Friend Activity</h2>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        </div>
        <FavouriteCard title={'Coke Studio'} desc={'Bangla Music'} img={'/coke.jpg'} />
        <FavouriteCard title={'Artcell'} desc={'Bangla Music'} img={'/artcell.jpg'} />
        <FavouriteCard title={'Warfaze'} desc={'Bangla Music'} img={'/warfaze.jpg'} />

      </div>
    </div>



    <div className={uploadDialogState ? 'visible' : 'hidden'}>
      <UploadDialog onDismiss={handleDialogDismiss} />
    </div>




  </div >





  )
}

export default Dashboard