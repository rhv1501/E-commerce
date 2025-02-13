const genotp=(req,res,next)=>{
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    req.otp = otp;
    next();
}

export default genotp;