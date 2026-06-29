const authService=require('../services/auth.service');

const signup=async(req,res)=>{
  try{
    const result= await authService.signup(req.body);
    return res.status(201).json(result);
  }
  catch(error){
    return res.status(500).json({error:error.message});
  }
};

const login=async(req,res)=>{
  try{
    const result=await authService.login(req.body);
    return res.status(200).json(result);
  }
  catch(error){
    return res.status(500).json({error:error.message});
  }
};


const getProfile = async (req, res) => {
    try {

        const result = await authService.getProfile(req.user.id);

        return res.status(200).json(result);

    } catch (error) {

        return res.status(500).json({
            error: error.message
        });

    }
};




module.exports={signup ,login, getProfile};