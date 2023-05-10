import React, { useContext } from 'react'
import { SpotifyContext } from '../context/AudoPlayerContext';

const styles = {
    tableHeader: `cursor-pointer hover:bg-gray-50 hover:bg-opacity-5`,
    thStyle: `pb-3`
}



function TableRow(param: { index: number, title: String, played: String, duration: String, url: String }) {
    const { index, title, played, duration, url } = param;
    const { playOnSongSelect } = useContext(SpotifyContext);


    return (
        <tbody onClick={() => { playOnSongSelect(index) }} className={styles.tableHeader}>
            <tr>
                <th className={styles.thStyle}>{index + 1}</th>
                <th className={styles.thStyle}>{title}</th>
                <th className={styles.thStyle}>{played}</th>
                <th className={styles.thStyle}>{duration}</th>
            </tr>
        </tbody >
    )
}

export default TableRow