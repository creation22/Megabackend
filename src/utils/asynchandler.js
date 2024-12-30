const asyncHandler = (requestHandler) => {
    (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next)).catch((err) => next(err))
    }
}


export {asyncHandler}

// const asyncHandler =() => {}
// const asynchandler = (function) =>{ () => {}}
// const asyncHandler = (function) => async() => { }


/////////try catch handler ////////////

// const asynchandler  = (fn) => async(req,res,next) => {
//     try {
//         await fn(req,res,next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success : false ,
//             message : err.message
//         })
//     }
// }