const router=require('express').Router()
const {ADD_LOAN_REQUEST,GET_LOAN_BY_USER,GET_LOAN_REQUEST_DEATILS,GET_LOAN_REQUEST_LIST,UPDATE_LOAN_REQUEST,DELETE_LOAN_REQUEST}= require('./controllers/loan.controller')

router.post('/',ADD_LOAN_REQUEST)
router.get('/list',GET_LOAN_REQUEST_LIST)
router.get('/user',GET_LOAN_BY_USER)
router.get('/',GET_LOAN_REQUEST_DEATILS)
router.patch('/',UPDATE_LOAN_REQUEST)
router.delete('/',DELETE_LOAN_REQUEST)

module.exports.Loan_Router=router