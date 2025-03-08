import React from 'react'
import {useNavigate} from 'react-router-dom'
import {motion} from 'motion/react'

function Header() {

  const navigate = useNavigate();
  const returnHome = () => {
    navigate('/')
  }

  return (
    <header className="bg-black text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.h1 
        className="text-4xl font-bold cursor-pointer"
        onClick={returnHome}
        whileHover={{scale:0.9}}
        >
            Snacks Delivery
        </motion.h1>
      </div>
    </header>
  )
}

export default Header