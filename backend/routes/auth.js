const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/User')
var jwt = require('jsonwebtoken');
const fetchUser = require('../middlewares/fetchUser');
const jwt_secret = 'secretsignavi';



//ROUTE 1 create a user using: POST:/api/auth/createUser
router.post('/createUser', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 6 }),
    body('name', 'Enter a valid name').isLength({ min: 3 })
],



    async (req, res) => {
        const errors = validationResult(req);
        //check for validation errors
        let success = false;
        if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array(),success }) }

        //const user = req.body
        //user.save()

        //check for duplicate email
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                let success = false;
                 return res.status(400).json({ error: "email already registered",success }) }
            //creating user

            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass
            })
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, jwt_secret);
            let success = true;
            console.log(authToken);
            res.json({ authToken,success })
            // .then(user=>{res.json(user)}).catch(err =>{console.log(err)
            //     res.json({error:'Record already exists',message: err.message})})
            //     }

        } catch (error) {
            console.error(error.message);
            res.status(500).json({"error":"some error occured",success})
        }
    })

//ROUTE 2 login a user using: POST:/api/auth/loginUser
router.post('/loginUser', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 6 })
],
    async (req, res) => {
        try {
        const errors = validationResult(req);
        //check for validation errors
        if (!errors.isEmpty()) {
            let success=false
             return res.status(400).json({ errors: errors.array(),success }) }

        const { email, password } = req.body;//destructuring request body

        
            let user = await User.findOne({ email });
            if (!user) { 
                let success=false;
                res.status(400).json({ error: "Please enter correct credentials",success}) }

            const passwordCompare = await bcrypt.compare(password, user.password)//returns boolean

            if (!passwordCompare) { 
               let success= false;
               console.log(passwordCompare);
                res.status(400).json({ error: "Please enter correct credentials",success }) }
            else{    
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, jwt_secret);

            console.log(authToken);
            let success = true;
            res.json({ authToken,success })
        }


        } catch (error) {
            success = false;
            console.error(error.message);
            res.status(500).json({"message":"some error occured",success})
        }
    })

//ROUTE 3 display a user details using: POST:/api/auth/userDetails   fetchUser--is middleware
router.post('/userDetails', fetchUser,
    async (req, res) => {
        try {

            const userID = req.user.id;
            console.log(userID)
            const user = await User.findById(userID).select("-password");
            res.send(user)
        } catch (error) {
            console.error(error.message);
            res.status(500).send("some error occured")
        }
    }
)
module.exports = router