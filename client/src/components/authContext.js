import React from 'react'
import {createContext, useState } from 'react'
export const AppContext=createContext(null)


export const AuthContext=(props)=>{
    

  const [file, setFile]=useState(null)
  const [email,setEmail]=useState('')
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')

  const isEmailValid = (email) => {
    const emailPattern = /^[^\s@]+@gmail\.com$/
    return emailPattern.test(email)
  };

 const onUpload=async(event)=>{
  const file= event.target.files[0]

  if(file){
    const base64=await convertToBase64(file)
   setFile(base64)
  }
}

 
 const convertToBase64=(file)=>{
   return new Promise((resolve, reject)=>{
    const reader=new FileReader()
    reader.readAsDataURL(file)

    reader.onload = ()=>{
      resolve(reader.result)
    }
    reader.onerror=(error)=>reject(error)
   })
 }

 const UserInfo=(event)=>{
  event.preventDefault()
  const specialCharPattern = /[!@#$%^&*()_+=[\]{};':"\\|,.<>/?]+/
  const isPasswordValid = password.length >=5 && specialCharPattern.test(password)

  if(username==='' || password===''|| email=== '')
  {alert('Fill all the details!')}
  else if(!isPasswordValid)
  {alert('password must be atleast 5 characters long and should contain atleast one special character')}
  else if(!isEmailValid(email)){
    alert("Invalid email please provide a valid Gmail address!!")
  }
  else{
    alert("Registration Done")
  }
 }

 return(
  <AppContext.Provider
  value={{file,setFile,email,setEmail,username, setUsername,password,setPassword,onUpload,UserInfo}}
  >
    {props.children}
  </AppContext.Provider>
 )

}

export default AuthContext