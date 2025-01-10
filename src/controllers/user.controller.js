import { asyncHandler } from "../utils/asynchandler.js";
import {ApiError} from "../utils/apierror.js"
import {User} from "../models/user.model.js"
import {uploadonCloudinary} from "../utils/cloudinary.js"
import { application } from "express";
import {apiResponse} from "../utils/apiResponse.js"
const registerUser = asyncHandler(async(req ,res) => {
     // get user detail from frontend 
    // validation -not empty 
    //check if user already exists 
    // check for images ,check for avatar 
    // upload them to cloudinary ,avatar 
    // create user object -create entry in db 
    // remove password and refresh token field from response 
    // check for user creation 
    // return res 

    const {fullname , email,username , password } = req.body
    console.log("email:" ,email)
    if(
        [fullname ,email,username ,password].some((field) => field?.trim() ==="")
    ){
        throw new ApiError(400 , "all fields are required")
    }

    const existedUser = User.findOne({
        $or :[{username},{email}]
    })
    if(existedUser){
        throw new ApiError(409,"user with this email or username already exists ")
    }
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400 , "AVATAR FILE IS REQUIRED ")
    }
    const avatar = await uploadonCloudinary(avatarLocalPath)
    const coverImage = await uploadonCloudinary(coverImageLocalPath)
    if(!avatar){
        throw new ApiError(400 , "avatar file is required ")
    }
    const user = await User.create({
        fullname,
        avatar:avatar.url,
        coverImage : coverImage?.url || "",
        email,
        password, 
        username :username.toLowerCase()
    })
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
        throw new ApiError(500 ,"something went wrong while registering a user  ")
    }
    return res.status(201).json(
        new ApiResponse(200 ,createdUser,"user registered successfully ")
    )
})


export {registerUser}
