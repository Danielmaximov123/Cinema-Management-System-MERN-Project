const express = require('express');
const userBL = require('./userBL');

const jwt = require('jsonwebtoken')


const router = express.Router();

router.route('/')
    .get(async (req,resp) =>
    {
        let data = await userBL.getAllUsers();
        return resp.json(data); 
    })

router.route('/:id')
    .get(async (req,resp) =>
    {
        let data = await userBL.getUser(req.params.id);
        return resp.json(data);
    })

router.route('/add-Password-to-user')
    .put(async (req,resp) => {    

    await userBL.updateUserPassword(req.body)

    return resp.status(200).send({ auth: false, message: "Password has been successfully configured!" })

})

router.route('/')
    .post(async (req,resp) =>
    {
        let status = await userBL.addUser(req.body);
        return resp.json(status);
    })

router.route('/login')
    .post(async function(req,resp){    

    const { username , password } = req.body
    let data = await userBL.getAllUsers();

    let userData = data.find(user => user.username === username);

    if(!userData){
       return resp.status(401).send({auth : false, message : "User Name Does not exists"});
    }

    if(userData.password === password){

        const userId = userData._id;
        const username = userData.username;
        const fname = userData.fname;
        const lname = userData.lname;
        const sysAdmin = userData.sysAdmin;
        const permissions = userData.permissions;
        const createDate = userData.createdDate;
        const sessionTimeOut = userData.SessionTimeOut * 60000;


        const RSA_PRIVATE_KEY = "somekey"
        var tokenData = jwt.sign({id : userId , fname : fname , lname : lname , username : username , createDate : createDate , sysAdmin : sysAdmin , permissions : permissions , sessionTimeOut : sessionTimeOut }, RSA_PRIVATE_KEY, {expiresIn : sessionTimeOut} )
        return resp.status(200).send({token : tokenData , message : "Login Successfully"})

    }
    else{
        return resp.status(401).send({auth : false, message : "Password Is Wrong"})
    }

})

router.route('/:id')
    .put(async (req,resp) =>
    {
        let status = await userBL.updateUser(req.params.id,req.body);
        return resp.json(status);
    })

router.route('/:id')
    .delete(async (req,resp) =>
    {
        let status = await userBL.deleteUser(req.params.id);
        return resp.json(status);
    })

module.exports = router;


