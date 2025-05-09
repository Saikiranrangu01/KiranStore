import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"


//login user
const loginUser = async (req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await userModel.findOne({email})//if any accout available 
        if(!user) {
            return res.json({success:false,message:"user Doesn't exist"})
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if (!isMatch) {
            return res.json({success:false,mesage:"Invalid password"})
        }
        const token = createToken(user._id)
        res.json({success:true, token});
    }
    catch(error) {
        console.log(error);
        res.json({success:false,message:"Error"});

    }

}

// create token
const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register user

const registerUser = async (req,res)=>{
    const {name,password,email} = req.body;
    try{
        //checking if user already exists
        const exists = await userModel.findOne({email});
        if (exists) {

            return res.json({success:false, message:"User already exists"})

        }
        //validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({success:false, message:"please enter valid email"})
        }

        if (password.length < 8){
            res.json({success:false, message:" password atlest 8 digits"})
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10)//5-15
        const hashedpassword = await bcrypt.hash(password,salt);

        //create new user

        const newUser = new userModel({
            name:name,
            email:email,
            password: hashedpassword
        })
        
        const user = await newUser.save()

        const token = createToken(user._id)//generate  token
        res.json({success:true,token});
    }catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})

    }
}


export {loginUser,registerUser}