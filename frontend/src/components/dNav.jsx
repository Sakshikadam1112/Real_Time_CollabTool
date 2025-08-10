import React from 'react'

const dNav = () => {
  return (
    <div className='nav'> 
    <div style={{fontSize: '25px',paddingLeft:'70px'}}>DOCZZ</div>
    <div className='conatiner'>
      <a href='/dashboard' >Dashboard</a>
      <a  href='https://portfolio-website-six-steel.vercel.app/' target="_blank" rel="noopener noreferrer">Aboutme</a>
      <a href='/'>Logout</a>
      </div>  
  </div>
  )
}

export default dNav