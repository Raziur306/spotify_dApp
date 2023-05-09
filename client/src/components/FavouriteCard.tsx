import Image from 'next/image'
import React from 'react'

function FavouriteCard(param: { title: string, desc: string, img: string }) {
    const { title, desc, img } = param;


    return (
        <div className='flex flex-row gap-5'>
            <div className=' cursor-pointer hover:text-white flex md:flex-col md:items-center lg:flex-row gap-4'>
                <Image className='rounded-full overflow-hidden' width={60} height={60} alt='Favourite Card' src={img} />
                <ul className='md:items-center md:flex md:flex-col lg:items-start'>
                    <li className='font-bold'>{title}</li>
                    <li>{desc}</li>
                </ul>
            </div>

        </div >
    )
}

export default FavouriteCard