import React from 'react'

const styles = {
    tableHeader: `cursor-pointer`
}



function TableRow(param: { index: String, title: String, played: String, duration: String }) {
    const { index, title, played, duration } = param;

    return (
        <tbody className={styles.tableHeader}>
            <tr>
                <th className='pb-3'>{index}</th>
                <th className='pb-3'>{title}</th>
                <th className='pb-3'>{played}</th>
                <th className='pb-3'>{duration}</th>
            </tr>
        </tbody >
    )
}

export default TableRow