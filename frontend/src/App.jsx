import React, { useState } from 'react'
import FacialExpression from './components/FacialExpression'
import Navbar from './components/Navbar'
import MoodSongs from './components/MoodSongs'

const App = () => {
  const [Songs, setSongs] = useState([])
  return (
    <div className="absolute top-0 z-[-2] h-screen w-full text-white flex flex-col items-center gap-5 bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
      <Navbar />
      <FacialExpression setSongs={setSongs}/>
      <MoodSongs Songs={Songs}/>
    </div>
  )
}

export default App
