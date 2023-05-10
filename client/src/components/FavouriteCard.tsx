import Image from 'next/image'
import React from 'react'



const styles = {
    container: `flex flex-row gap-5`,
    subContainer: `cursor-pointer hover:text-white flex md:flex-col md:items-center lg:flex-row gap-4`,
    ulStyle: `md:items-center md:flex md:flex-col lg:items-start`,
    liStyle: `font-bold`,
    imageStyle: `rounded-full overflow-hidden`
}


function FavouriteCard(param: { title: string, desc: string, img: string }) {
    const { title, desc, img } = param;
    return (
        <div className={styles.container}>
            <div className={styles.subContainer}>
                <Image className={styles.imageStyle} width={60} height={60} alt='Favourite Card' src={img} />
                <ul className={styles.ulStyle}>
                    <li className={styles.liStyle}>{title}</li>
                    <li>{desc}</li>
                </ul>
            </div>

        </div >
    )
}

export default FavouriteCard