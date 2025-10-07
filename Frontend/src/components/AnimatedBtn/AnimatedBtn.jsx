import React from 'react'
import '../AnimatedBtn/AnimatedBtn.css'

const AnimatedBtn = ({ children, ...props }) => {
  return (
    <button {...props} className={`animated-btn ${props.className || ''}`}>
      {children}
    </button>
  )
}

export default AnimatedBtn
