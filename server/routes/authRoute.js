const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const yup = require("yup");

const {blacklistedTokens} = require('../middleware/auth')
const db = require("../services/authService");
const { failure, success} = require('../helpers');
const genericDomain = require("../services/genericDomainService");

const saltRounds = 1, //required by bcrypt
      privateKey= 'gersGarage';

const registerSchema = yup.object().shape({
    username: yup.string().required().min(3).max(30),
    password: yup.string().required().min(6).max(30),
    email: yup.string().required().email(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    phone: yup.string().required(),
});

router.post("/register/client", async (req, res) => {
    return registerUser(3, req, res); // Client
});

router.post("/register/staff", async (req, res) => {
    return registerUser(2, req, res); // Client
});

const registerUser = async (profileType, req,res) => {
    try {
        const validatedData = await registerSchema.validate(req.body);
        console.log(validatedData);
        const {username, password, email, firstName, lastName, phone} = validatedData;

        const user = await db.getByUserName(username);

        if(user != null) throw new Error('Username (e-mail) already exists!');

        // make password
        let hash = await bcrypt.hash(password, saltRounds);

        // create user data
        const dbRes = await db.createUser(profileType, username, firstName, lastName, phone, email, hash);

        console.log(dbRes)

        return res.status(200).json(
            {
                success: true,
                data:'user created',
                message: dbRes.message
            }
        );
    } catch (error) {
        console.error('Validation error:', error.message);
        res.status(400).json(failure(error, 'Validation error... ' + error.message));
    }
}

router.post("/login", async (req, res) => {
    try{
        const { username, password } = req.body
        let token = null, user = null

        if(username && password) {
            user = await db.getByUserName(username);
            console.log(user)
            if(user) {
                // compare passwords
                let match = await bcrypt.compare(password, user.password);

                user.password = null;
                delete user['password'];

                if (match) token = await jwt.sign({user}, privateKey, {expiresIn: '1h'})
            }
        }

        // Auth
        if (token) return res.json({token:token, user: user})

        // Not found
        return res.sendStatus(401);
    }
    catch(err) {
        console.log(err)
        return res.sendStatus(500)
    }
});

router.get('/logout', (req,res) => {
    const bearerHeader = req.headers['authorization']

    if(typeof bearerHeader!=='undefined'){
        let bearerToken = bearerHeader.split(' ')[1]
        //add bearerToken to blacklist
        blacklistedTokens.push(bearerToken);
    }
    return res.sendStatus(200)
})

module.exports = router;


