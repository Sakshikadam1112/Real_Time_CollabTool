import React from 'react'

function Navbar() {
  return (
    <div className='nav'> 
      <div style={{fontSize: '25px',paddingLeft:'70px'}}>DOCZZ</div>
      <div className='conatiner'>
        <a href='/' >Home</a>
        <a href='/register' >Register</a>
        <a href='/login'>Login</a>
        <a  href='https://portfolio-website-six-steel.vercel.app/' target="_blank" rel="noopener noreferrer">Aboutme</a>
        </div>  
    </div>
  )
}

export default Navbar
