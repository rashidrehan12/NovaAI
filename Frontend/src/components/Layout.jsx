import React from 'react'
import GridBG from '../components/GridBG'

const Layout = ({children}) => {
  return (
    <div className='relative'>
      <GridBG/>
      <div className='absolute inset-0'>{children}</div>
    </div>
  )
}

export default Layout
