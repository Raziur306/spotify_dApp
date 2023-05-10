import React from 'react'


const styles = {
    container: `bg-black w-1/5 h-screen p-5 flex flex-col gap-6`,
    listContainer: `border-t`,
    ulStyle: `flex flex-col gap-2 mt-6 font-medium`,
    suggestLi: `hover:text-white cursor-pointer`,
    menu: `text-white flex flex-row gap-3 cursor-pointer`,
    flexCol: `flex flex-col`


}


const Nav = () => {
    return (
        <div className={styles.container}>
            <div className={`gap-8 ${styles.flexCol}`}>
                <ul className={`gap-6 ${styles.flexCol}`}>
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
                <ul className={`gap-6 ${styles.flexCol}`}>
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
            <div className={styles.listContainer}>
                <ul className={styles.ulStyle}>
                    <li className='text-white font-bold'>GHOST SONG</li>
                    <li className={styles.suggestLi}>Country Dumb</li>
                    <li className={styles.suggestLi}>Holy Ghost Fire</li>
                    <li className={styles.suggestLi}>I Believe in Ghosts</li>
                    <li className={styles.suggestLi}>Fire🔥</li>
                </ul>
            </div>

        </div>
    )
}

export default Nav