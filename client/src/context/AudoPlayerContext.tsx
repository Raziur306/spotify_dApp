import React, { FC, ReactNode, createContext, use, useEffect, useState } from "react";



export const SpotifyContext = createContext({});


interface ChildrenType {
    children: ReactNode;
}


export const SpotifyContextProvider = ({ children }: ChildrenType) => {
    const [allSongs, setAllSongs] = useState(Array)
    const [currentSong, setCurrentSong] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [timestamp, setTimestamp] = useState('')

    useEffect(() => {
        if (isPlaying) {
            let audio = document.querySelector('#audio-element') as HTMLAudioElement;
            audio?.addEventListener('timeupdate', () => {
                setTimestamp(secondsToMinSec(audio.currentTime))
            }, false)
        }
    }, [isPlaying])




    const play = () => {
        const audio = document.querySelector('#audio-element') as HTMLAudioElement
        if (isPaused) {
            audio.play();
            setIsPlaying(true);
        } else {
            audio.src = allSongs[0].url
            audio.play();
            setIsPlaying(true);
        }
    }


    const pause = () => {
        const audio = document.querySelector('#audio-element') as HTMLAudioElement
        audio.pause();
        setIsPaused(true);
        setIsPlaying(false);
    }


    const playOnSongSelect = (index: number) => {

        try {
            const audio = document.querySelector('#audio-element') as HTMLAudioElement
            const url = allSongs[index].url
            audio.src = url
            audio.play();
            setCurrentSong(index);
            setIsPlaying(true)
            setIsPaused(false)
        } catch (error) {
            console.log(error)
        }
    }


    const secondsToMinSec = (value: any) => {
        const minute = Math.round(value / 60);
        let second = Math.round(value % 60);
        return minute + ':' + second;
    }




    const onProgressChange = (e: any) => {
        const _progress = e.target.value / 100
        setProgress(e.target.value)
        const audio = document.querySelector('#audio-element') as HTMLAudioElement
        const time = _progress * (document.querySelector('#audio-element') as HTMLAudioElement).duration
        audio.currentTime = time ? time : 0
    }

    const onAudioTimeChange = (e) => {
        const time = e.target.currentTime / e.target.duration;
        setProgress(time * 100)
    }




    const playNext = () => {


    }

    const playPrevious = () => {


    }


    return <SpotifyContext.Provider value={{
        isPlaying, setIsPlaying,
        currentSong, setCurrentSong,
        play,
        progress,
        onProgressChange,
        playOnSongSelect,
        setAllSongs,
        allSongs,
        isPaused,
        setIsPaused,
        pause,
        onAudioTimeChange,
        timestamp,
        playNext,
        playPrevious

    }}>
        {children}
    </SpotifyContext.Provider >
}