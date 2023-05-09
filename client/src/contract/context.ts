import { FC, ReactNode, createContext, useContext, useEffect, useState } from "react";


interface ChildrenType {
    children: ReactNode;
}


export const SpotifyContext = createContext(null);



export const SpotifyProvider = ({ children }: ChildrenType) => {
    const [currrentSong, setCurrentSong] = useState({});
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [progress, setProgress] = useState(0);
    const [timeStamp, setTimeStamp] = useState();

    const spotifyContext = useContext(SpotifyContext);


    useEffect(() => {
        if (isPlaying) {
            let audio = document.querySelector('#audio-element') as HTMLAudioElement;
            audio?.addEventListener('timeupdate', () => {
                setTimeStamp(secondsToMinSec(audio.currentTime))
            }, false)
        }
    }, [isPlaying])

    const play = () => {
        const audio = document.querySelector('#audio-element') as HTMLAudioElement
        audio.play();
        setIsPlaying(true);
    }

    const pause = () => {
        const audio = document.querySelector('#audio-element') as HTMLAudioElement
        audio.pause();
        setIsPaused(true);

    }

    const playOnSongSelect = (song: any) => {
        try {
            const audio = document.querySelector('#audo-element') as HTMLAudioElement
            audio.src = song.url
            setCurrentSong(song);
            setIsPaused(false);
        } catch (error) {
            console.log(error)
        }
    }


    const secondsToMinSec = (value: any) => {
        const minute = Math.round(value / 60);
        let second = Math.round(value % 60);
        const time = second >= 10 ? second : '0' + second;
        return minute + ':' + second;
    }

    const updateProgressbar = e => {
        const _progressbar: any = e.target.currentTime / e.target.duration;
        setProgress(_progressbar.toFixed(2) * 100);
    }

    const onProgressChange = (e) => {
        const _progress = e.target.value / 100
        const audio = document.querySelector('#audio-element') as HTMLAudioElement
        audio.currentTime = _progress * (document.querySelector('#audio-element') as HTMLAudioElement).duration
    }


    // const playNext = (songs) => {
    //     const id = songs.findIndex(value => value.account === currentSong);
    //     if (songs.length === id + 1) {
    //         playOnSelect(songs[0].account)
    //         setCurrentSong(songs[0].account)
    //         return
    //     }
    //     const nextSong = songs[id + 1];
    //     playOnSelect(nextSong.account);
    // }

    // const playPrevious = (songs) => {
    //     const id = songs.findIndex(value => value.account === currentSong);
    //     if (id === 0) {
    //         playOnSelect(songs[songs.length - 1].account)
    //         setCurrentSong(songs[songs.length - 1].account)
    //         return
    //     }
    //     const previousSong = songs[id - 1];
    //     playOnSelect(previousSong.account);
    // }


    return < SpotifyContext.Provider>
        <// >
    
}



