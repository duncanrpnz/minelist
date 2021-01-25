import { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken';
const KEY = '12341413431';

export default (req, res) => {

    if(!req.body) {
        res.statusCode = 404;
        res.end('Error');
        return;
    }


    const { email, password } = req.body;
    
    const token = jwt.sign({
        email
    }, KEY);

    res.json({token: token});
};