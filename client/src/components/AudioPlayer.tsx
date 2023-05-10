import React, { useContext, useEffect } from 'react'
import playIcon from '../../public/assets/play.svg'
import previous from '../../public/assets/previous.svg'
import pauseIcon from '../../public/assets/pause.svg'
import next from '../../public/assets/next.svg'
import Image from 'next/image'
import { SpotifyContext } from '../context/AudoPlayerContext'

const styles = {
    mainContainer: 'flex w-full justify-center',
    subContainer: 'flex w-full flex-col justify-center gap-6',
    btnContainer: 'flex flex-row gap-3 justify-center',
    btnStyle: 'active:bg-green-400 active:rounded-full p-3 flex justify-center',
    timeStamp: `absolute text-sm`
}


function AudioPlayer() {
    const { onProgressChange, pause, play, duration, progress, isPlaying, onAudioTimeChange, isPaused, playNext,
        playPrevious, timestamp } = useContext(SpotifyContext)

    const handleOnPlayClick = (e) => {
        if (isPlaying) {
            pause();
        } else {
            play();
        }
    }

    const handleOnPreviousClick = (e) => {
        playPrevious();
    }

    const handleOnNextClick = (e) => {
        playNext();
    }



    const handleOnTimeUpdate = (e) => {
        onAudioTimeChange(e)
    }

    return (
        <div className={`${isPaused || isPlaying ? 'visible' : 'hidden'} ${styles.mainContainer}`}>
            <div className={styles.subContainer}>
                <small className={styles.timeStamp}>{timestamp}</small>
                <div className={styles.btnContainer}>
                    <button onClick={handleOnPreviousClick} className={styles.btnStyle}>
                        <Image alt='previous' width={30} height={30} src={previous} />
                    </button>
                    <button onClick={handleOnPlayClick} className={styles.btnStyle}>
                        <Image alt='play' width={30} height={30} src={isPlaying ? pauseIcon : playIcon} />
                    </button>
                    <button onClick={handleOnNextClick} className={styles.btnStyle}>
                        <Image alt='next' width={30} height={30} src={next} />
                    </button>
                </div>
                <audio onTimeUpdate={handleOnTimeUpdate} src='' id='audio-element' />
                <input min={0} max={duration} value={`${progress}`} onChange={onProgressChange} type='range' />
            </div>
        </div>
    )
}

export default AudioPlayer
