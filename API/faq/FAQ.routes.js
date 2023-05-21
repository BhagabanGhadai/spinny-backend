const router = require('express').Router()
const { CREATE_FAQ, GET_FAQ, GET_GENERAL_FAQ, GET_FAQ_PAGEWISE,GET_FAQ_SERVICE_TYPE,UPDATE_FAQ, DELETE_FAQ } = require('./controllers/FAQ.controller')
const { IS_ADMIN, IS_AUTHENTICATED } = require('../../services/auth.mw')

router.post('/admin/add',
    IS_ADMIN,
    IS_AUTHENTICATED,
    CREATE_FAQ)
router.get('/public/get',
    GET_FAQ)
router.get('/public/faq-general',
    GET_GENERAL_FAQ)
router.get('/public/service',
    GET_FAQ_SERVICE_TYPE)
router.get('/public/faq-list-pagewise',
    GET_FAQ_PAGEWISE)
router.patch('/admin/update',
    IS_ADMIN,
    IS_AUTHENTICATED,
    UPDATE_FAQ)
router.delete('/admin/delete',
    IS_ADMIN,
    IS_AUTHENTICATED,
    DELETE_FAQ)

module.exports.Admin_FAQ_Router = router