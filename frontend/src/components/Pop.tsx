import React from 'react';

interface PopUpProps {
  isOpen: boolean;
  onClose: () => void;
  invoice_number:number
  customer_name:string
  amount:number
  due_date:Date
  status:boolean
}

const PopUp: React.FC<PopUpProps> = ({ isOpen, onClose,invoice_number,customer_name,amount,due_date,status }) => {
  if (!isOpen) return null;
  const dateobj=new Date(due_date);
  const date=`${dateobj.getDate()}-${dateobj.getMonth()}-${dateobj.getFullYear()}`
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg">
        Invoice Number
        {invoice_number}
        Customer Name
        {customer_name}
        Amount
        {amount}
        Due Date
        {date}
        Paid
        {
            status?<p>Yes</p>:<p>No</p>
        }
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PopUp;