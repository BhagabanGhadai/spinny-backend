const router = require('express').Router()
const { CREATE_FAQ, GET_FAQ,GET_FAQ_LIST,UPDATE_FAQ, DELETE_FAQ } = require('./controllers/FAQ.controller')
const { IS_ADMIN, IS_AUTHENTICATED } = require('../../services/auth.mw')

router.post('/admin/',
    IS_ADMIN,
    IS_AUTHENTICATED,
    CREATE_FAQ)
router.get('/public/',
    GET_FAQ)
router.get('/public/list',
    GET_FAQ_LIST)
router.patch('/admin/',
    IS_ADMIN,
    IS_AUTHENTICATED,
    UPDATE_FAQ)
router.delete('/admin/',
    IS_ADMIN,
    IS_AUTHENTICATED,
    DELETE_FAQ)

module.exports.FAQ_Router = router