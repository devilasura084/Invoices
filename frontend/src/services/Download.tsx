import axios from 'axios'
import React from 'react'
interface Downloadprops{
    invoice_number?:number
}
const Download:React.FC<Downloadprops> = ({invoice_number}) => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const handleClick=async ()=>{
        try{
            const response=await axios.get(`${apiUrl}/api/invoices/:${invoice_number}/pdf`,{
                params:{invoice_number},
                responseType:'blob',
            })
            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'document.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove();
        }
        catch(err){
            console.error(err);
        }
    }
  return (
    <img className='cursor-pointer' onClick={handleClick} src="Download.svg" alt="DownloadIcon" />
  )
}

export default Download