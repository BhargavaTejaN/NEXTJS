import User from "@/models/User";
import connect from "@/utils/db"
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'

export const POST = async(request) => {
    const {formData} = await request.json();
    const {name,email,password} = formData;

    await connect();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    const newUser = new User({
        name,email,password:hashedPassword
    })

    try{

        await newUser.save();
        return new NextResponse("user has been created",{status :201})

    }catch(error){
        return new NextResponse(error.message,{
            status : 500
        })
    }

}