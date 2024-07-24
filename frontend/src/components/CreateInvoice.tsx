import React from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import InvoiceAddbox from './InvoiceAddbox';
interface createInvoiceprops{
    setInvoicedata:React.Dispatch<React.SetStateAction<invoice[]>>;
}
const CreateInvoice = ({setInvoicedata}:createInvoiceprops) => {
    
    const ModalContent = ({ close }: { close: () => void }) => (
        <>
            <InvoiceAddbox setInvoicedata={setInvoicedata} />
            <button
                className='w-24 text-sm text-center h-10 rounded border transition ease-in delay-150 hover:bg-blue-100 duration-300'
                type='button'
                onClick={close}
            >
                Exit
            </button>
        </>
    );
  return (
    <div className='flex'>
                    <Popup
                     trigger={
                         <button className='border rounded ml-auto h-14 p-4 mr-14 transition ease-in delay-150 bg-blue-800 hover:bg-blue-700 text-white                  duration-300'>
                             Create invoice
                         </button>
                     }
                     modal
                     nested
                 >
                     {(close: () => void) => <ModalContent close={close} /> as React.ReactNode}
                 </Popup>
        </div>
  )
}

export default CreateInvoice