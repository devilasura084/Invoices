import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Invoices from '../components/Invoices'
import CreateInvoice from '../components/CreateInvoice'
import axios from 'axios'
import Search from '../services/Search'
const Dashboard = () => {
  const [invoicedata,setInvoicedata]=useState<invoice[]>([])
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const Navigate=useNavigate();
  useEffect(()=>{
    const token=localStorage.getItem('token');
    if(!token)
    {
      Navigate('/sign-in');;
    }
  },[Navigate]);
  useEffect(()=>{
    const fetchinvoices=async()=>{
      try{
      const response=await axios.get(`${apiUrl}/api/invoices`)
      setInvoicedata(response.data);
    }
    catch (err) {
      console.error('Error fetching invoices:', err);
    }
    }
    fetchinvoices();
  },[])
  return (
    <div className='flex-1 ml-64 p-4'>
      <p className='font-bold text-3xl'>Invoices</p>
      <CreateInvoice
      setInvoicedata={setInvoicedata}
      />
      <Search
      setInvoicedata={setInvoicedata}
      />
      <Invoices
      invoicedata={invoicedata}
      setInvoicedata={setInvoicedata}
      />
    </div>
  )
}

export default Dashboard