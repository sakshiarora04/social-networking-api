const router= require('express').Router();
const{
    createUser
}= require ('../../');
router.route('/').post(createUser);
module.exports=router;