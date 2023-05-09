import React, { useContext, useEffect } from 'react'
import play from '../../public/assets/play.svg'
import previous from '../../public/assets/previous.svg'
import next from '../../public/assets/next.svg'
import Image from 'next/image'

const styles = {
    mainContainer: 'flex w-full justify-center',
    subContainer: 'flex w-full flex-col justify-center gap-6',
    btnContainer: 'flex flex-row gap-3 justify-center',
    btnStyle: 'active:bg-green-400 active:rounded-full p-3 flex justify-center'
}


function AudioPlayer() {
    const audio = new Audio('https://ipfs.io/ipfs/bafybeidqrnwiqxndwtnn6cados27hxqeqrfffzd27csswwyht6zgyen7cu')
    const mutiplayer = 100 / audio.duration;
    const currentTime = audio.currentTime;
    const seekbar = currentTime * mutiplayer;


    const handleOnPlayClick = (e) => {
        audio.play();
    }

    const handleOnPreviousClick = (e) => {

    }

    const handleOnNextClick = (e) => {


    }

    const handleSeekbarChange = () => {

    }









    return (
        <div className={styles.mainContainer}>
            <div className={styles.subContainer}>
                <div className={styles.btnContainer}>
                    <button onClick={handleOnPreviousClick} className={styles.btnStyle}>
                        <Image alt='previous' width={30} height={30} src={previous} />
                    </button>
                    <button onClick={handleOnPlayClick} className={styles.btnStyle}>
                        <Image alt='play' width={30} height={30} src={play} />
                    </button>
                    <button onClick={handleOnNextClick} className={styles.btnStyle}>
                        <Image alt='next' width={30} height={30} src={next} />
                    </button>
                </div>
                <input onChange={handleSeekbarChange} value={seekbar} type='range' />
            </div>
        </div>
    )
}

export default AudioPlayer
