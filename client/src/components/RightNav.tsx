import React from 'react'
import FavouriteCard from './FavouriteCard'


const styles = {
    container: `bg-black w-1/5 p-5`,
    subContainer: `flex flex-col gap-6`,
    friendContainer: `flex flex-row justify-between text-white text-normal`,
}


const RightNav = () => {
    return (
        <div className={styles.container}>
            <div className={styles.subContainer}>
                <div className={styles.friendContainer}>
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

    )
}

export default RightNav