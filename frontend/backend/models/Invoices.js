const mongoose=require('mongoose');
const invoiceschema=new mongoose.Schema({
    invoice_number:Number,
    customer_name:String,
    amount:Number,
    due_date:Date,
    status:{
        type:Boolean,
        default:false
    }
})
const invoicemodel=mongoose.model("invoices",invoiceschema);
module.exports=invoicemodel;