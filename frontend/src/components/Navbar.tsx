import  { useEffect, useState } from 'react'

const Navbar = () => {
   
    const [token,settoken]=useState<String|null>();
    useEffect(()=>{
        settoken(localStorage.getItem('token'));
    },[])
    const deletetoken=()=>{
        localStorage.removeItem('token');
        window.location.reload();
    }
  return (
    <div className='fixed inset-y-0 left-0 w-64 bg-blue-900 text-white flex flex-col'>
        <a className='flex border-y-2 border-x-0 w-full justify-center pt-5 pb-5' href="/">
        <img src="/Home.svg" alt="Homeicon" />
        Home</a>
        <a className='flex border-y-2 border-x-0 w-full justify-center pt-5 pb-5' href="/dashboard">
        <img src="Invoices.svg" alt="Invoicesicon" />
        Invoices
        </a>
        {token?<div className='cursor-pointer mt-auto flex border-2 w-full justify-center pt-5 pb-5' onClick={deletetoken}>
            <img src="Logout.svg" alt="Logoouticon" />Logout
        </div>:<a className='cursor-pointer mt-auto flex border-y-2 border-x-0 w-full justify-center pt-5 pb-5' href="/sign-in">
        <img src="Login.svg" alt="Loginicon" />
        Login
        </a>}
    </div>
  )
}

export default Navbar