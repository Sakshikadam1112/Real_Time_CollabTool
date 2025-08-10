import React from 'react'
import Navbar from './Navbar'
const Landingpg = () => {
    return (

        <>

            <div className='mainpage'>
                <Navbar />
                <div className='container'>
                    <div className="box">
                        <h1>Real Time Collab App</h1>
                        <p>Click here to login or Register</p>
                        <div className="button-container">
                            <a href="/login"><button className="ln-btn">Login</button></a>
                            <a href="/register"><button className="ln-btn">Register</button></a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Landingpg
