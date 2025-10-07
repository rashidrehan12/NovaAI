import React from 'react'

const GridBG = () => {
  return (
    <div className='fixed -z-10 inset-0 w-full  bg-[radial-gradient(ellipse_at_top_right,#3c6e71_0%,transparent_40%),radial-gradient(ellipse_at_bottom_left,#3c6e71_0%,transparent_40%),radial-gradient(circle_at_center,black_0%,black_100%)]'>
      {/* Grid Layer */}
      <div className='absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:30px_30px]'/>
    </div>
  )
}

export default GridBG
