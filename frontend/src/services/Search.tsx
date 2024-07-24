import React, { useState } from 'react'
interface searchProps{
    setInvoicedata:React.Dispatch<React.SetStateAction<invoice[]>>;
}
const Search = ({setInvoicedata}:searchProps) => {
    const [search,setSearch]=useState<number>()
  return (
    <div className='flex ml-14 mt-3 mb-3'>
      <input placeholder='Search a single invoice'  className=' indent-2 border h-10 w-96 rounded-none no-arrows' type="number" name="search" id="" />
      <img className='border w-10 cursor-pointer rounded' src="Search.svg" alt="" />
      </div>
  )
}

export default Search