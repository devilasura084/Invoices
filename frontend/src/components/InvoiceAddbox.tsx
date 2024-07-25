import axios from 'axios';
import React, { useState } from 'react'
interface AddInvoiceprops{
    setInvoicedata:React.Dispatch<React.SetStateAction<invoice[]>>;
}
const InvoiceAddbox = ({setInvoicedata}:AddInvoiceprops) => {
    const [invoicedata,setinvoicedata]    =useState<invoice>({});
    const [errormessage,setErrormessage]=useState('');
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const fetchinvoices=async()=>{
        try{
        const response=await axios.get(`${apiUrl}/api/invoices`)
        setInvoicedata(response.data);
      }
      catch (err) {
        console.error('Error fetching invoices:', err);
      }
    }
        const handleSubmit=async (e:React.FormEvent<HTMLFormElement>)=>{
            e.preventDefault();
            const {invoice_number,customer_name,amount,due_date}=invoicedata;
            if(!invoice_number)
            {
                setErrormessage('invoicenummber cannot be empty');
                return;
            }
            if(invoice_number<10000)
            {
                setErrormessage('invoicenumber can only have 5 digits');
                return;
            }
            if(invoice_number>=100000)
            {
                setErrormessage('invoicenumber can only have 5 digits');
                return;
            }
            if(!customer_name)
            {
                setErrormessage('customername cannot be empty')
                return;
            }
            if(!amount)
            {
                setErrormessage('amount cannot be empty')
                return;
            }
            if(!due_date)
            {
                setErrormessage('due date cannot be empty');
                return;
            }
            try{
                await axios.post(`${apiUrl}/api/invoices`,invoicedata);
                fetchinvoices();
                setErrormessage('');
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
      return (
        <form className='h-96 grid justify-center     font-semibold rounded' onSubmit={handleSubmit}>
        <p className='text-red-600'>{errormessage}</p>
        Invoice Number
        <input
            onChange={(e)=>{
                setinvoicedata({...invoicedata,    invoice_number:e.target.valueAsNumber})
            }}
            className='indent-1 border-2 mb-2 rounded bg-transparent transition ease-in delay-150 hover:bg-blue-100 duration-300
            focus:outline-none'
            type='number'
            name='invoice_number'
        />
    
        Customer Name
        <input
            onChange={(e)=>{
                setinvoicedata({...invoicedata,    customer_name:e.target.value})
            }}
            className='indent-1 border-2 bg-transparent mb-2 rounded
            transition ease-in delay-150 hover:bg-blue-100 duration-300
            focus:outline-none'
            type='text'
            name='customer_name'
        />
        Amount
        <input
            onChange={(e)=>{
                setinvoicedata({...invoicedata,amount:e.    target.valueAsNumber})
            }}
            className='indent-1 border-2 bg-transparent rounded mb-2 no-arrows
            transition ease-in delay-150 hover:bg-blue-100 duration-300
            focus:outline-none'
            type='number'
            name='amount'
        />
        Due Date
        <input
            onChange={(e)=>{
                if(e.target.valueAsDate)
                setinvoicedata({...invoicedata,    due_date:e.target.valueAsDate})
                else
                setinvoicedata({...invoicedata,due_date:undefined})
            }}
            className='indent-1 border-2 bg-transparent rounded mb-2
            transition ease-in delay-150 hover:bg-blue-100 duration-300
             focus:outline-none'
            type='date'
            name='due_date'
        />
        Paid?
        <input
            onChange={(e)=>{
                setinvoicedata({...invoicedata,status:e.    target.checked})
            }}
            className='border-2 rounded mb-2'
            type='checkbox'
            name='status'
        />
    <button
        className='text-sm text-center h-10 rounded    border-2 transition ease-in delay-150 hover:bg-blue-100 duration-300'
        type='submit'
    >
        Add
    </button>
    
    </form>
  )
}

export default InvoiceAddbox