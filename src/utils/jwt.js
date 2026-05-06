import jwt from 'jsonwebtoken'
import config from "../config/config.js"

const createToken=(data)=>{

    return jwt.sign(data,config.jwtsecret,{
        expiresIn:'30d'
    })

}

const verifyToken=(token)=>{
    return jwt.verify(token,config.jwtsecret)

}

export default{createToken,verifyToken}