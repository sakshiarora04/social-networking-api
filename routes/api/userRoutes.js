const router= require('express').Router();
const{
    createUser
}= require ('../../controllers/userController.js');
router.route('/').post(createUser);
module.exports=router;