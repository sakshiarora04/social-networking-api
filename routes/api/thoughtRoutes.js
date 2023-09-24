const router= require('express').Router();
const{
    createThought,
    getThoughts,
    getSingleThought,
    updateThought
}= require ('../../controllers/thoughtController.js');
router.route('/').get(getThoughts).post(createThought);
router.route('/:thoughtId').get(getSingleThought).put(updateThought);

module.exports=router;