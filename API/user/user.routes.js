const router = require('express').Router()

const { USER_SIGNUP, VERIFY_OTP_ON_SIGNUP, RESEND_OTP, USER_LOGIN, VERIFY_OTP_ON_LOGIN, GET_SPECIFIC_USER_DETAILS, GET_USER_LIST_ADMIN, UPDATE_USER, USER_LOGOUT, GENERATE_ACCESS_TOKEN } = require('./controllers/user.controller')
const { IS_AUTHENTICATED, IS_ADMIN } = require('./../../services/auth.mw')

router.post('/signup',
    [USER_SIGNUP])
router.post('/verify',
    [VERIFY_OTP_ON_SIGNUP])
router.post('/resend',
    [RESEND_OTP])
router.post('/login',
    [USER_LOGIN])
router.post('/verify/login',
    [VERIFY_OTP_ON_LOGIN])
router.get('/',
    [IS_AUTHENTICATED,
    GET_SPECIFIC_USER_DETAILS])
router.get('/admin/list',
    [IS_AUTHENTICATED,
    IS_ADMIN,
    GET_USER_LIST_ADMIN])
router.patch('/',
    [IS_AUTHENTICATED,
    UPDATE_USER])
router.post('/logout',
    [IS_AUTHENTICATED,
    USER_LOGOUT])
router.post('/token',
    [GENERATE_ACCESS_TOKEN])

module.exports.User_Router = router