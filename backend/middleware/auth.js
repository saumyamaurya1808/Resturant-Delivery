import jwt from "jsonwebtoken";


const auth = (req,res,next)=>{
    const authHeader = req.headers.authorization || req.headers.token;
    if (!authHeader) {
        return res.json({success:false, message:"Not authorized. Please login again."})
    }

    const token = authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Invalid or expired token. Please login again."});
    }
}

export default auth;

