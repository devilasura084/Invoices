import axios from "axios";
import { useState } from "react";

interface Editprops{
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
    invoice_number?:number
    setInvoicedata:React.Dispatch<React.SetStateAction<invoice[]>>
  }
interface edit{
    customer_name?:string,
    amount?:number,
    due_date?:Date|null,
    status?:boolean
}
const Edit = ({setEdit,invoice_number,setInvoicedata}:Editprops) => {
    const [editData, setEditData] = useState<edit>({
    });
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
    const handleEditSubmit=async()=>{
        try{
            await axios.put(`${apiUrl}/api/invoices/${invoice_number}`,editData);
            fetchinvoices()
        }
        catch (error) {
            console.error('Error updating invoice:', error);
            throw error;
        }
        setEdit(false);
      }
  return (
    <tr className='text-sm text-center h-16 rounded border transition ease-in delay-150  hover:bg-blue-100 duration-300'>
    <td >{`${invoice_number}`}</td>
    <td><input placeholder="Enter customer name" onChange={(e)=>{setEditData({...editData,customer_name:e.target.value})}} className=' bg-transparent border-black border h-10 text-lg indent-2' type="text" name='customer_name' />
    </td>
    <td><input placeholder="Amount" onChange={(e)=>{setEditData({...editData,amount:e.target.valueAsNumber})}} className=' bg-transparent border-black border h-10 text-lg indent-2 no-arrows'  type="number" name='amount'/></td>
    <td><input onChange={(e)=>{setEditData({...editData,due_date:e.target.valueAsDate})}} className='h-10 bg-transparent border' type="date" name="due_date" /></td>
    <td><input onChange={(e)=>{
        if(!e.target.checked)
            setEditData({...editData,status:false});
        else
        setEditData({...editData,status:true});
    }} className='h-5 w-5' type="checkbox" name="status"/></td>
    <td ><img className='cursor-pointer' onClick={handleEditSubmit} src="SubmitEdit.svg" alt="Editinvoice" />
    </td>
    <td><img src="/Delete.svg" alt="" /></td>
    <td><img src="/Download.svg" alt="" /></td>
    </tr>
  )
}

export default Edit