import React from 'react'
import { Link } from 'react-router-dom'
import icons8 from "../assets/icons8-user-50.png"
import styles from '../styles/username.css'

const Recovery = () => {
  return (
    <div className='container  h-[100vh] mx-auto flex items-center  justify-center my-[-7vmin]'>
      <div className='flex h-[60%] border-2 border-green-5 0 rounded-[15px] bg-white flex-col w-[40vmax] text-center py-4 '>
        
         <div className='title '>
          <h2 className='font-bold text-3xl py-2'>RECOVERY! </h2>
          <h2 className='my-2 text-gray-400 text-base font-bold underline'>Enter the 6 digit OTP </h2>
         </div>

         <form className='pt-16 '>

           <div className='textbox flex flex-col items-center gap-8'>
             <input type='text' placeholder='OTP' className='border-2 border-green-100 w-[30vmin] py-[.5vmin] px-1 rounded-[5px] my-2' />
             <button className='w-[30vmin] py-[1vmin] bg-green-400 rounded-[5px] text-white font-bold'>Let's Go</button>
           </div>
           
           <div className='text-center text-[.8rem] font-bold text-gray-500 pt-6 '>
              <span >
               Can't get the OTP? <button  className='text-red-500 ' > Resend</button>
              </span>
           </div>

         </form>

      </div>
    </div>
  )
}

export default Recovery
