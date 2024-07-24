import Delete from '../services/Delete';
import Download from '../services/Download';
import Edit from '../services/Edit';
import { useState } from 'react'
interface invoicecardprops{
  invoice_number?:number
  customer_name?:string
  amount?:number
  due_date?:Date
  status?:boolean
  setInvoicedata:React.Dispatch<React.SetStateAction<invoice[]>>
}
const InvoiceCard = ({invoice_number,customer_name,amount,due_date,status,setInvoicedata}:invoicecardprops) => {
    const [edit,setEdit]=useState(false);
    const dateobj = new Date(due_date ?? new Date());
    const date = `${dateobj.getDate()}-${dateobj.getMonth() + 1}-${dateobj.getFullYear()}`
    
    const handleEdit=()=>{
      setEdit(true);
    }
    if(edit)
    {
      return(
        <Edit
        setEdit={setEdit}
        invoice_number={invoice_number}
        setInvoicedata={setInvoicedata}
        />
      )
    }
    
  return (
    <tr  className='text-sm text-center h-16 rounded border transition ease-in delay-150  hover:bg-blue-100 duration-300'>
        <td >{`${invoice_number}`}</td>
        <td>{customer_name}</td>
        <td>{`${amount}`}</td>
        <td>{`${date}`}</td>
        {status?<td className='flex justify-center items-center mt-5'><img className='' src="Paid.svg" alt="Invoicestatus" /></td>:<td>Pending...</td>}
        <td ><img className='cursor-pointer' onClick={handleEdit} src="Edit.svg" alt="Editinvoice" /></td>
        <td><Delete
        invoice_number={invoice_number}
        setInvoicedata={setInvoicedata}
        /></td>
        <td><Download
        invoice_number={invoice_number}
        /></td>
    </tr>
  )
}

export default InvoiceCard