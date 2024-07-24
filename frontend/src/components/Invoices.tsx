import { useState } from "react";
import InvoiceCard from "./InvoiceCard"



const Invoices = ({invoicedata,setInvoicedata}:invoicesProps) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(6);
    const totalPages = Math.ceil(invoicedata.length / itemsPerPage);
    const currentItems = invoicedata.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
          setCurrentPage(page);
        }
      };
      const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
          pageNumbers.push(
            <button
              
              key={i}
              onClick={() => handlePageChange(i)}
              className={i === currentPage ? 'border rounded w-16 transition ease-in delay-150  hover:bg-blue-100 duration-300' : 'border rounded  w-16 transition ease-in delay-150  hover:bg-blue-100 duration-300'}
            >
              {i}
            </button>
          );
        }
        return pageNumbers;
      };
  return (
    <div className="rounded-md relative h-[500px] w-full">
    <table className="ml-auto mr-auto w-11/12 ">
    <thead className="text-sm text-center h-16 rounded border transition ease-in delay-150  hover:bg-blue-100 duration-300">
        <tr>
            <th>Invoice Number</th>
            <th>Customer Name</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Paid?</th>
            <th></th>
            <th></th>
            <th></th>
        </tr>
    </thead>
    <tbody >
        {invoicedata.length?currentItems.map((data:invoice,index)=>(
            <InvoiceCard
            key={index}
            invoice_number={data.invoice_number}
            customer_name={data.customer_name}
            amount={data.amount}
            due_date={data.due_date}
            status={data.status}
            setInvoicedata={setInvoicedata}
            />
        )):
        <tr><td>No Entries available</td></tr>
      }
    </tbody>
    </table>
    <div className=" text-sm flex h-10  justify-center font-semibold absolute bottom-0 left-0 w-full">
        <button
          className="border rounded w-16 transition ease-in delay-150  hover:bg-blue-100 duration-300"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {renderPageNumbers()}
        <button
          className="border rounded w-16 transition ease-in delay-150  hover:bg-blue-100 duration-300"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Invoices