import { NextFunction, Request, Response } from "express"
import env from "../../config/env.js"
import { ErrorResponse } from "../types/index.js" 

const globalError=(err:any, _req:Request, res:Response, next:NextFunction)=>{
   const statusCode=err.statusCode || 500
   const message=err.message || 'somthing went wrong'

   const errResponse:ErrorResponse={
    success:false,
    message:message,

   }

   if(env.nodeEnv === 'development'){
    errResponse.error=err,
    errResponse.stack=err.stack
   }



   res.status(statusCode).json(errResponse)
}

export default globalError