const express=require('express');
const cors=require('cors');
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const usermodel=require('./models/User');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const autthenticaejwt = require('./middleware/authMiddleware');
const invoicemodel = require('./models/Invoices');
require('dotenv').config();
const app=express();
app.use(bodyparser.json());
app.use(cors());
mongoose.connect(process.env.MONGO_URL);
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
  });
  
mongoose.connection.on('error', (err) => {
    console.error(`Failed to connect to MongoDB: ${err}`);
});
app.post('/api/auth/signup',async (req,res)=>{
    try{
        const {email}=req.body;
        const Existinguser=await usermodel.findOne({email});
        if(Existinguser)
        {
            return res.status(400).json({message:"Email already taken"});
        }
        req.body.password=await bcrypt.hash(req.body.password,10);
        const user=new usermodel(req.body);
        user.save();
        res.status(200).send({message:'Data saved successfully'});
        console.log('Data send succefully');
    }catch{
        res.status(500).send('Error saving data');
    }
})
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
        console.log("successfully logged in");
    }
    catch{
        return res.status(400).json({message:"unforeseen error has occured"});
    }
})
app.post('/api/invoices',async (req,res)=>{
    try{
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
        res.status(500).send('Error saving data');
    }
})
app.get('/api/invoices',async (req,res)=>{
    try{
        const invoices=await invoicemodel.find();
        res.json(invoices);
    }
    catch(err){
        console.log("Error fetching data",err);
        res.status(500).json({error:'Internal server error'})
    }
})
app.get('/dashboard',autthenticaejwt,(req,res)=>{
    res.send('This is a protected routte');
})
app.get('/',autthenticaejwt,(req,res)=>{
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
        res.status(500).json({ error: 'Internal Server Error' });
      }
})
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });