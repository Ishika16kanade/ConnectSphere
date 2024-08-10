import React from 'react'

import '../pages/Navbar.css'
const Navbar = () => {
    return (

        <header className='header'>
            {/* <a href='/dashboard' className='logo'> Dashboard</a> */}
            <h1 className='logo'>Logo</h1>

            <nav className='navbar'>
                <a href='/login'>Login</a>
                <a href='/signup'>signup</a>
            </nav>

        </header>

    )
}

export default Navbar