import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-purple-950 w-full h-1/15 flex items-center px-5 justify-between'>
        <div className='text-3xl lg:text-5xl font-mono'>Moody Player</div>
        <div className='flex'>
            <div className='hidden lg:block'>NavMenu</div>
            <div className='block lg:hidden'>Ham</div>
        </div>
    </div>
  )
}

export default Navbar