const router= require('express').Router();
const{
    createThought
}= require ('../../');
router.route('/').post(createThought);
module.exports=router;