import React from 'react'
import { Link } from 'react-router-dom'
import icons8 from "../assets/icons8-user-50.png"
import styles from '../styles/username.css'

const Reset = () => {
  return (
    <div className='container  h-[100vh] mx-auto flex items-center  justify-center my-[-7vmin]'>
      <div className='flex h-[60%] border-2 border-green-5 0 rounded-[15px] bg-white flex-col w-[40vmax] text-center py-4 '>
        
         <div className='title '>
          <h2 className='font-bold text-3xl py-2'>RESET </h2>
          <h2 className='my-2 text-gray-400 text-xs '>Enter new password </h2>
         </div>

         <form className='pt-6 '>

           
           <div className='textbox flex flex-col items-center gap-8'>
             <input type='text' placeholder='New Password' className='border-2 border-green-100 w-[30vmin] py-[.5vmin] px-1 rounded-[5px] my-2' />
             <input type='text' placeholder='Repeat Password' className='border-2 border-green-100 w-[30vmin] py-[.5vmin] px-1 rounded-[5px] my-2' />
             <button className='w-[30vmin] py-[1vmin] bg-green-400 rounded-[5px] text-white font-bold'>Reset</button>
           </div>
           
          

         </form>

      </div>
    </div>
  )
}

export default Reset
