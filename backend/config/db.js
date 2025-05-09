import mongoose from "mongoose"

export const connecDB = async ()=>{
    await mongoose.connect('mongodb+srv://saikiranrangu:f2sGtCY4zqClzpir@kiranstore.5yyxozi.mongodb.net/kiran-store').then(()=>console.log("DB connected"));

}