const router = require('express').Router()

const {User_Router}=require('./API/user/user.routes')
const {Loan_Router} = require('./API/loan/loan.routes')

router.get('/test',(req, res) => {
    console.log(req)
    return res.status(200).json({
        "message": "success"
    })
})
router.use('/user',User_Router)
router.use('/loan',Loan_Router)

module.exports.AppRoutes = router