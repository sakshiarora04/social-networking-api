const router= require('express').Router();
const{
    createThought,
    getThoughts
}= require ('../../controllers/thoughtController.js');
router.route('/').get(getThoughts).post(createThought);
module.exports=router;