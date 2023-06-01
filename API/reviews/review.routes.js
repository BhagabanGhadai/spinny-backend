const router = require('express').Router()

const { ADD_REVIEW_ADMIN,GET_SINGLE_REVIEW_ADMIN,GET_ALL_REVIEW_ADMIN,UPDATE_REVIEW_ADMIN,DELETE_REVIEW_ADMIN } = require('./controllers/review.controller')
const { IS_AUTHENTICATED, IS_ADMIN } = require('./../../services/auth.mw')
const {UploadFile} = require('./../../services/multer.mw')

router.post('/',[
    IS_AUTHENTICATED,
    IS_ADMIN,
    UploadFile.fields([{name:'media_file', maxCount: 1}]),
    ADD_REVIEW_ADMIN
])
router.get('/',[
    IS_AUTHENTICATED,
    IS_ADMIN,
    GET_SINGLE_REVIEW_ADMIN
])
router.get('/list',[
    GET_ALL_REVIEW_ADMIN
])
router.patch('/',[
    IS_AUTHENTICATED,
    IS_ADMIN,
    UploadFile.fields([{name:'media_file', maxCount: 1}]),
    UPDATE_REVIEW_ADMIN
])
router.delete('/',[
    IS_AUTHENTICATED,
    IS_ADMIN,
    DELETE_REVIEW_ADMIN
])
module.exports.Review_Router=router