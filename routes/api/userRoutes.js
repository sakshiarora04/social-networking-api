const router= require('express').Router();
const{
    getUsers,
    createUser
}= require ('../../controllers/userController.js');
router.route('/').get(getUsers).post(createUser);
module.exports=router;