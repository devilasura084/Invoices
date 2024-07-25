import Bargraph from "../components/Bargraph";
import Piechart from "../components/Piechart";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



const Home = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const Navigate=useNavigate();
  const [invoicedata,setInvoicedata]=useState<invoice[]>([])
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
    <div className="flex-1 ml-64 p-4 text-4xl relative">
      {`Total number of invoices: ${invoicedata.length}`}
      <div className="absolute top-4 right-4">
      <Piechart 
      invoicedata={invoicedata}
      />
      </div>
      <div className="absolute  w-11/12 mt-72"> {/* Adjust height as needed */}
      <Bargraph
      invoicedata={invoicedata}
      />
    </div>
    </div>
  )
}

export default Home