import axios from 'axios';
import React, { useEffect, useState } from 'react'
interface searchProps{
    setInvoicedata:React.Dispatch<React.SetStateAction<invoice[]>>;
}
const Search = ({setInvoicedata}:searchProps) => {
    const [search,setSearch]=useState<number>();
    const [error, setError] = useState('');
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const fetchInvoices = async (search: number| undefined) => {
      try {
        const url = search ? `${apiUrl}/api/invoices/${search}` : `${apiUrl}/api/invoices`;
        const response = await axios.get(url);
        setInvoicedata(response.data);
        setError('');
      } catch (err) {
        console.error('Error fetching invoices:', err);
        setError('Error fetching invoices');
        setInvoicedata([]);
      }
    };
    useEffect(() => {
      fetchInvoices(search);
    }, [search]);
    const handleSearch = async () => {
      if(search===undefined)
      {
        setError('Search cannot be empty');
        return;
      }
      try {
        const response = await axios.get(`${apiUrl}/api/invoices/${search}`);
        setInvoicedata(response.data);
        setError('');
      } catch (err) {
        setError('No such invoice found');
      }
    };
  return (
    <div className='flex ml-14 mt-3 mb-3'>
      <input onChange={(e)=>{setSearch(e.target.valueAsNumber)}} placeholder='Search by invoice number'  className=' indent-2 border h-10 w-96 rounded-none no-arrows' type="number" name="search" id="" />
      <img onClick={handleSearch} className='border w-10 cursor-pointer rounded' src="Search.svg" alt="" />
      {error && <div>{error}</div>}
    </div>
  )
}

export default Search