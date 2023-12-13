import React from 'react'
import PropTypes from 'prop-types'

function Navbar({title}) {
  return (
    <nav className='navbar mb-12 shadow-lg bg-light text-neutral-content'>
        <div className='container mx-auto'>
            <div className="flex-none px-2 mx-2">
                <a href="/" className="flex items-left space-x-2">
                    <img src={require('./assets/tescologo.png')} className='h-10' alt="Tesco"></img>   
                </a>
            </div>
        </div>
        
    </nav>
  )
}

Navbar.defaultProps = {
    title: 'Tesco Recipe Creator'
}

Navbar.propTypes = {
    title: PropTypes.string
}

export default Navbar
