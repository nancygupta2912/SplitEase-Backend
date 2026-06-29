require('dotenv').config();
const express=require('express');
const authRoutes=require('./src/routes/auth.routes');
const groupRoutes=require('./src/routes/group.routes');
const expenseRoutes=require('./src/routes/expense.routes');
const cors=require('cors');

const app=express();

app.use(cors());
app.use(express.json());

const PORT=process.env.PORT || 5000;


app.get('/',(req,res)=>{
  res.send("SplitEase Backend is running");
})

app.use('/api/auth',authRoutes);
app.use('/api/groups',expenseRoutes);
app.use("/api/groups", groupRoutes);



app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`);
})