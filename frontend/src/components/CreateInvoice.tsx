import React, { useState } from 'react'
import 'reactjs-popup/dist/index.css'
import InvoiceAddbox from './InvoiceAddbox';

interface PopupProps {
    onClose: () => void;
    children: React.ReactNode;
  }
interface createInvoiceprops{
    setInvoicedata:React.Dispatch<React.SetStateAction<invoice[]>>;
}
const CreateInvoice = ({setInvoicedata}:createInvoiceprops) => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
      };
      const Popup: React.FC<PopupProps> = ({ onClose, children }) => {
        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-blue-50 p-6 rounded-lg shadow-lg w-1/3 max-h-[80%] overflow-auto">
              {children}
              <button className='w-24 text-sm text-center h-10 rounded border-2 transition ease-in delay-150 hover:bg-blue-100 duration-300' onClick={onClose}>Close</button>
            </div>
          </div>
        );
      };
  return (
    <div className='flex'>
            <button onClick={togglePopup} className='border rounded ml-auto h-14 p-4 mr-14 transition ease-in delay-150 bg-blue-800 hover:bg-blue-600 text-white duration-300'>
                Create invoice
            </button>
            {isPopupVisible && (
            <Popup onClose={togglePopup}>
              <InvoiceAddbox
               setInvoicedata={setInvoicedata} 
               />
            </Popup>
      )}
        </div>
  )
}

export default CreateInvoice