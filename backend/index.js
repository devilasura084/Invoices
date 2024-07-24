const express=require('express');
const cors=require('cors');
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const usermodel=require('./models/User');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const autthenticaejwt = require('./middleware/authMiddleware');
const invoicemodel = require('./models/Invoices');
const path = require('path');
const PDFDocument = require('pdfkit');
require('dotenv').config();
const app=express();
app.use(bodyparser.json());
app.use(cors());
const PORT=process.env.PORT||4000;
if(mongoose.connect(process.env.MONGO_URL))
console.log('Connected to MongoDB');
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate request body
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Check if user already exists
        const existingUser = await usermodel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already taken" });
        }

        // Hash the password and save new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new usermodel({ ...req.body, password: hashedPassword });
        await user.save();

        res.status(200).send({ message: 'Data saved successfully' });
    } catch (error) {
        res.status(500).send('Error saving data');
    }
});
app.post('/api/auth/login',async (req,res)=>{
    try{
        const {email,password}=req.body;
        const Existinguser=await usermodel.findOne({email});
        if(!Existinguser)
        {
            return res.status(400).json({message:"Email does not exist please sign up"});
        }
        if(await bcrypt.compare(Existinguser.password,password))
        {
            return res.status(400).json({message:"Email or password is wrong"});
        }
        const token=jwt.sign({email:req.body.email},process.env.SECRET_KEY);
        res.json({token});
    }
    catch{
        return res.status(400).json({message:"unforeseen error has occured"});
    }
})
app.post('/api/invoices',async (req,res)=>{
    try{
        console.log(req.body)
        const {invoice_number}=req.body;
        const Existinginvoice=await invoicemodel.findOne({invoice_number});
        if(Existinginvoice)
        {
            return res.status(400).json({message:"Invoice number already exists"});
        }
        const user=new invoicemodel(req.body);
        user.save();
        res.status(200).send({message:'Data saved successfully'});
        console.log('Data send succefully');
    }
    catch{
        console.error('Error in signup:', error);
        res.status(500).send('Error saving data');
    }
})
app.get('/api/invoices',async (req,res)=>{
    try{
        const invoices=await invoicemodel.find().sort({invoice_number:1});
        res.json(invoices);
    }
    catch(err){
        console.log("Error fetching data",err);
        res.status(500).json({error:'Internal server error'})
    }
})
app.get('/dashboard',autthenticaejwt,(req,res)=>{
    console.log(req.body)
    res.send('This is a protected routte');
})
app.get('/',autthenticaejwt,(req,res)=>{
    console.log(req.body)
    res.send('This is a protected routte');
})
app.delete('/api/invoices/:invoice_number',async (req,res)=>{
    try {
        const { invoice_number } = req.params;
        const deletedinvoice=await invoicemodel.findOneAndDelete({ invoice_number: invoice_number });
        if (!deletedinvoice) {
            return res.status(404).json({ message: 'Invoice not found' });
          }
      
          res.status(200).json({ message: 'Invoice deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting invoice:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
})
app.put('/api/invoices/:invoice_number',async (req,res)=>{
    try{
        const { invoice_number } = req.params;
        const updatedata=req.body;
        const updatedinvoice=await invoicemodel.findOneAndUpdate(
            {invoice_number:invoice_number},
            updatedata,
            {
                new:true,runValidators:true
            }
        );
        if(!updatedinvoice)
            return res.status(404).json({ message: 'Invoice not found' });
        res.status(200).json({ message: 'Invoice deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting invoice:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
})
app.get('/api/invoices/:invoice_number',async (req,res)=>{
    try{
        const { invoice_number } = req.params;
        if (!invoice_number) {
            return res.status(400).json({ error: 'Invoice number is required' });
          }
        const searchedinvoices=await invoicemodel.find({invoice_number:{$gte:invoice_number}}).sort({invoice_number:1});
        if (searchedinvoices.length > 0) {
            res.json(searchedinvoices);
          } else {
            res.status(404).json({ error: 'No invoices found' });
          }
    }
    catch (error) {
        console.error('Error in signup:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
})
app.get('/api/invoices/:invoice_number/pdf',async(req,res)=>{
    try{
        const { invoice_number } = req.params;
        const cleaninvoice=parseInt(invoice_number.slice(1));
        const invoicetodownload=await invoicemodel.findOne({invoice_number:cleaninvoice})
        const doc = new PDFDocument();
        const dateobj=new Date(invoicetodownload.due_date)
        const date=`${dateobj.getDate()}-${dateobj.getMonth()}-${dateobj.getFullYear()}`
        const paid=invoicetodownload.status?"Paid":"Pending"
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition',     `attachment; filename=invoice_${cleaninvoice}.pdf`);
        doc.pipe(res);
        doc.fontSize(25).text('Invoice', 100, 80);
        doc.fontSize(15).text(`Invoice Number: ${cleaninvoice}`, 100, 120)
        doc.fontSize(15).text(`Contact Name: ${invoicetodownload.customer_name}`,100, 140)
        doc.fontSize(15).text(`Amount: ${invoicetodownload.amount}`,100, 160)
        doc.fontSize(15).text(`Contact Name: ${date}`,100, 180)
        doc.fontSize(15).text(`Contact Name: ${paid}`,100, 200)
        doc.end();
    }
    catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).json({ error: 'An error occurred while generating the PDF' });
      }
})
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});