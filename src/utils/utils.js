import { dirname } from 'path'
import { fileURLToPath } from 'url'

export const __dirname = dirname(fileURLToPath(import.meta.url))

import bcrypt from "bcrypt"

export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password)

export const createResponse = (res, statusCode, data) => {
    return res.status(statusCode).json({ data })
}

export const hashBeenMoreThanXtime = (lastConectionDate)=>{
    const dateNow = new Date();
    const diffTime = dateNow - lastConectionDate;
    const minTime = 60 * 1000;
    return diffTime > minTime;
}