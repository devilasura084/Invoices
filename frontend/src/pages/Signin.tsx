import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
interface signinformelements{
    email ?:string,
    password?:string,
  }
const Signin = () => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const Navigate=useNavigate();
    const [userdata,setUserdata]=useState<signinformelements>({});
    const [errormessage,setErrormessage]=useState<String>('');
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setUserdata({...userdata,[e.target.name]:e.target.value})
      }
      const verifydata=({email,password}:signinformelements)=>{
        if(email===undefined || email?.trim()==""){
          setErrormessage('Email cannot be empty');
          return false;
        }
        if(email!=undefined)
        {
          if(!email.includes('@'))
          {setErrormessage('Email needs to have a @');
          return false;}
          if(!email.includes('.'))
          {
            setErrormessage('Email needs to have a .');
            return false;
          }
        }
        if(password===undefined || password?.trim()==="")
        {
          setErrormessage('password cannot be empty');
          return false;
        }
        if(password!= undefined && password.length<8)
        {
          setErrormessage('password needs o have atleast 8 characters');
          return false;
        }
        return true;
      }
      const handleSubmit=async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const {email,password}=userdata;
        if(verifydata({email,password}))
        {
          try{
            const response=await axios.post(`${apiUrl}/api/auth/login`,userdata);
            setErrormessage('');
            const token=response.data;
            if(token){
              console.log(token);
              localStorage.setItem('token',token);
              Navigate('/dashboard')
            }
            else{
              setErrormessage('login failed')
            }
          }
          catch(err:any){
            if(err.response && err.response.status===400){
              setErrormessage(err.response.data.message);
            }
            else
            {
              setErrormessage('unforeseen error has occured');
            }
          }
        }
      }
      
  return (
    <div className='flex-1 ml-64 h-screen'>
    <form className='flex flex-col bg-blue-900 w-72
     m-auto mt-64 pt-10 pb-10 pl-5 pr-5 font text-white rounded-lg' onSubmit={handleSubmit}>
      <p className='text-yellow-300 p-0 m-0'>{errormessage}</p>
      Email
      <input className='text-black outline-none h-10 rounded-lg indent-2' placeholder='your email' onChange={handleChange} name='email' type="email"/>
      Password
      <input className='text-black outline-none h-10 rounded-lg indent-2' placeholder='your password' onChange={handleChange} name='password' type="password"/>
      <button className='mt-5 h-10 rounded-lg  bg-white w-28 ml-16 text-black' type="submit">Sign in</button>
      <span className='mt-5 ml-2'>Don't have an account?<a className='text-red-500 ml-2' href="/sign-up">Register</a></span>
    </form>
    </div>
  )
}

export default Signin