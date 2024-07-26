import axios from 'axios'
import { useState } from 'react'
interface Deleteprops{
    invoice_number?:number,
    setInvoicedata:React.Dispatch<React.SetStateAction<invoice[]>>
}
const Delete = ({invoice_number,setInvoicedata}:Deleteprops) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const [isLoading, setIsLoading] = useState(false);
    const fetchinvoices=async()=>{
        try{
        const response=await axios.get(`${apiUrl}/api/invoices`)
        setInvoicedata(response.data);
      }
      catch (err) {
        console.error('Error fetching invoices:', err);
      }
    }
    const Deleteinvoice=async ()=>{
        setIsLoading(true);
        try{
            await axios.delete(`${apiUrl}/api/invoices/${invoice_number}`)
            fetchinvoices();
        }
        catch (err: any) {
            if (axios.isAxiosError(err)) {
              if (err.response?.status === 404) {
                console.log(err.response.data.message);
              } else {
                console.log(err.response?.data.message || "An error occurred");
              }
            } else {
              console.log("An unexpected error occurred");
            }
          }
        finally {
            setIsLoading(false);
          }
    }
  return (
    isLoading ? 
    <span>Deleting...</span> : 
    <img onClick={Deleteinvoice} className='cursor-pointer' src="Delete.svg" alt="Deleteinvoice" />
  )
}

export default Delete