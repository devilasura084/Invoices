import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const Navigate=useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [userdata,setUserdata]=useState<signupformelements>({});
  const [errormessage,setErrormessage]=useState<String>('');
  const verifydata=({name,email,password}:signupformelements)=>{
    if(name===undefined || name?.trim()===""){
      setErrormessage('name cannot be empty');
      return false;
    }
    if(name!=undefined && name.length<3)
    {
      setErrormessage('name needs to have atleast 3 characters');
      return false;
    }
    if(email===undefined || email?.trim()==""){
      setErrormessage('email cannot be empty');
      return false;
    }
    if(email!=undefined)
    {
      if(!email.includes('@'))
      {setErrormessage('email needs to have a @');
      return false;}
      if(!email.includes('.'))
      {
        setErrormessage('email needs to have a .');
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
    const {name,email,password}=userdata;
    if(verifydata({name,email,password}))
    {
      try{
      await axios.post(`${apiUrl}/api/auth/signup`,userdata);
      setErrormessage('');
      Navigate('/sign-in');
    }
    catch(err:any){
      if(err.response && err.response.status===400 )
        setErrormessage(err.response.data.message);
      else{
        setErrormessage('unforeseen error has occured');
      }
      return;
    }
    }
  }
  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setUserdata({...userdata,[e.target.name]:e.target.value})
  }
  return (
    <div className='flex-1 ml-64 h-screen'>
    <form className='flex flex-col bg-blue-900 w-72
     m-auto mt-64 pt-10 pb-10 pl-5 pr-5 font text-white rounded-lg' onSubmit={handleSubmit}>
      <p className='text-yellow-300'>{errormessage}</p>
      Name
      <input placeholder='your name' className='text-black outline-none h-10 rounded-lg indent-2' onChange={handleChange} name='name' type='text'/>
      Email
      <input placeholder='your email' className='text-black outline-none h-10 rounded-lg indent-2'  onChange={handleChange} name='email' type="email"/>
      Password
      <input placeholder='your password' className='text-black outline-none h-10 rounded-lg indent-2'  onChange={handleChange} name='password' type="password"/>
      <button className='mt-5 h-10 rounded-lg  bg-white w-28 ml-16 text-black' type="submit">Sign up</button>
      <span className='mt-5 ml-2'>Already have an account?<a className='ml-2 text-red-500' href="/sign-in">Login</a></span>
    </form>
    </div>
  )
}

export default Signup