const prisma=require('../config/prisma');
const bcrypt =require('bcrypt');
const jwt=require('jsonwebtoken');



const signup = async (userData) => {

  const { name, email, password } = userData;

  const existingUser= await prisma.user.findUnique({
    where: {
      email
    }
  });

  if (existingUser){
  throw new Error("User with this email already exists");
  }

  const hashedPassword=await bcrypt.hash(password,10);

  const user=await prisma.user.create({
    data:{
      name,
      email,
      password:hashedPassword
    },
  });

  return {
    id:user.id,
    name:user.name,
    email:user.email,
    createdAt:user.createdAt
  };

};




const login=async(userData)=>{
  const  {email,password}=userData;
  const user=await prisma.user.findUnique({
    where:{email}
  });

  if(!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch=await bcrypt.compare(password,user.password);
  if(!isMatch){
    throw new Error("Invalid email or password");
  }

  const token=jwt.sign(
    {
      id:user.id,
      email:user.email
    },
    process.env.JWT_SECRET,
    {
      expiresIn:'1h'
    }
  );

  return {
    message:"Login Successful",
    token,
    user:{
      id:user.id,
      name:user.name,
      email:user.email
    }
  };
}



const getProfile=async(userId)=>{
  const user=await prisma.user.findUnique({
    where:{id:userId},
    select:{
      id:true,
      name:true,
      email:true, 
      createdAt:true
    }
  });
  return user;
};



module.exports = {
    signup,
    login,
    getProfile
};