const router = require('express').Router()
const { ADD_LOAN_REQUEST, GET_LOAN_BY_USER, GET_LOAN_REQUEST_DEATILS, GET_LOAN_REQUEST_LIST, UPDATE_LOAN_REQUEST, DELETE_LOAN_REQUEST } = require('./controllers/loan.controller')
const { IS_AUTHENTICATED, IS_ADMIN } = require('./../../services/auth.mw')

router.post('/',
    [IS_AUTHENTICATED,
    ADD_LOAN_REQUEST])
router.get('/admin/list',
    [IS_AUTHENTICATED,
    IS_ADMIN,
    GET_LOAN_REQUEST_LIST])
router.get('/user',
    [IS_AUTHENTICATED,
    GET_LOAN_BY_USER])
router.get('/',
    [IS_AUTHENTICATED,
    GET_LOAN_REQUEST_DEATILS])
router.patch('/admin/',
    [IS_AUTHENTICATED,
    IS_ADMIN,
    UPDATE_LOAN_REQUEST])
router.delete('/admin/',
    [IS_AUTHENTICATED,
    IS_ADMIN,
    DELETE_LOAN_REQUEST])

module.exports.Loan_Router = router