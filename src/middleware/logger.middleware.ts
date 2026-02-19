import { Request,Response,NextFunction } from "express";
import logger from "../utils/logger";

const requestLogger=(req:Request,res:Response,next:NextFunction)=>{
    logger.info({
        method:req.method,
        url:req.url,
        status:res.statusCode
    })
    next();
}
export default requestLogger;