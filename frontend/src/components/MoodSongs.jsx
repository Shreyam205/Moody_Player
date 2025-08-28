import React, { useState } from 'react'

const MoodSongs = () => {
    const [Songs, setSongs] = useState([
        {
            title: "test_title",
            artist: "test_artist",
            url: "test_url"
        },
        {
            title: "test_title",
            artist: "test_artist",
            url: "test_url"
        },
        {
            title: "test_title",
            artist: "test_artist",
            url: "test_url"
        },
        {
            title: "test_title",
            artist: "test_artist",
            url: "test_url"
        },
    ])
    return (
        <div className='w-full mt-10 px-5 flex flex-col lg:items-center gap-2'>
            <h1 className='text-2xl text-center lg:text-4xl mb-10'>Recommended Songs</h1>
            {Songs.map((song, index) =>(
                <div key={index} className='flex items-center justify-between rounded-xl lg:w-1/3 p-2 bg-gradient-to-b from-purple-900 to-blue-950 shadow-lg shadow-purple-gray-500/40'>
                    <div>
                        <h3 className='text-xl lg:text-2xl'>{song.title}</h3>
                        <p className='font-thin'>{song.artist}</p>
                    </div>
                    <div className='text-2xl'>
                        <i className="ri-play-large-fill"></i>
                        <i className="ri-pause-large-fill"></i>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MoodSongs
