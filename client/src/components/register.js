import React from 'react'
import { Link } from 'react-router-dom'
import icons8 from "../assets/icons8-user-50.png"
import styles from '../styles/username.css'
import { useState,useContext } from 'react'
import { AppContext } from './authContext'

const Register = () => {
  const {file,setFile,email,setEmail,username, setUsername,password,setPassword,onUpload,UserInfo}=useContext(AppContext)

//   const [file, setFile]=useState(null)
//   const [email,setEmail]=useState('')
//   const [username,setUsername]=useState('')
//   const [password,setPassword]=useState('')

//   const isEmailValid = (email) => {
//     const emailPattern = /^[^\s@]+@gmail\.com$/
//     return emailPattern.test(email)
//   };

//  const onUpload=async(event)=>{
//   const file= event.target.files[0]

//   if(file){
//     const base64=await convertToBase64(file)
//    setFile(base64)
//   }
// }

 
//  const convertToBase64=(file)=>{
//    return new Promise((resolve, reject)=>{
//     const reader=new FileReader()
//     reader.readAsDataURL(file)

//     reader.onload = ()=>{
//       resolve(reader.result)
//     }
//     reader.onerror=(error)=>reject(error)
//    })
//  }

//  const UserInfo=(event)=>{
//   event.preventDefault()
//   const specialCharPattern = /[!@#$%^&*()_+=[\]{};':"\\|,.<>/?]+/
//   const isPasswordValid = password.length >=5 && specialCharPattern.test(password)

//   if(username==='' || password===''|| email=== '')
//   {alert('Fill all the details!')}
//   else if(!isPasswordValid)
//   {alert('password must be atleast 5 characters long and should contain atleast one special character')}
//   else if(!isEmailValid(email)){
//     alert("Invalid email please provide a valid Gmail address!!")
//   }
//   else{
//     alert("Registration Done")
//   }
//  }

  return (
    <div className='container  h-[100vh] mx-auto flex items-center  justify-center my-[-7vmin]'>
      <div className='flex h-[60%] border-2 border-green-5 0 rounded-[15px] bg-white flex-col w-[40vmax] text-center py-4 '>
        
         <div className='title '>
          <h2 className='font-bold text-3xl py-2'>REGISTER! </h2>
          <h2 className='my-2 text-gray-400 text-xs '>CLick to upload your avatar!</h2>
         </div>

         <form className='py-2 ' onSubmit={(event)=>UserInfo(event)}>

           <div className='profile flex justify-center py-4'
            >
            <label
             htmlFor='profile'>
              <img className='w-[100px] rounded-[50%]' src={file || icons8} alt='avatar'/>
             </label>

             <input    style={{display:'none'}} type='file' id='profile' name='profile' onChange={onUpload}/>
           </div>

           <div className='textbox flex flex-col items-center gap-4'>
             <input type='text' placeholder='email' className='border-2 border-green-100 w-[30vmin] py-[.5vmin] px-1 rounded-[5px] my-2' 
              onChange={(event)=>{
                setEmail(event.target.value)
              }}
             />
             <input type='text' placeholder='username' className='border-2 border-green-100 w-[30vmin] py-[.5vmin] px-1 rounded-[5px] my-2' 
              onChange={(event)=>{
                setUsername(event.target.value)
              }}/>
             <input type='text' placeholder='password' className='border-2 border-green-100 w-[30vmin] py-[.5vmin] px-1 rounded-[5px] my-2' 
              onChange={(event)=>{
                setPassword(event.target.value)
              }}/>
             <button className='w-[30vmin] py-[1vmin] bg-green-400 rounded-[5px] text-white font-bold' type='submit'
             >Register</button>
           </div>
           
           <div className='text-center text-[.8rem] font-bold text-gray-500 mt-2 '>
              <span > Already Registered <Link  className='text-red-500 ' to='/' >Login Now!</Link>
              </span>
           </div>

         </form>

      </div>
    </div>
  )
}

export default Register
