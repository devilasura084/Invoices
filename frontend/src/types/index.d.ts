declare type invoice={
    invoice_number?:number,
    customer_name?:string,
    amount?:number,
    due_date?:Date,
    status?:boolean
}
declare interface signupformelements{
    name ?:string,
    email ?:string,
    password?:string,
  }
declare interface invoicesProps{
    invoicedata:invoice[];
    setInvoicedata:React.Dispatch<React.SetStateAction<invoice[]>>;
}
declare interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
  }