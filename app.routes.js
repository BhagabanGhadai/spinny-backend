const router = require('express').Router()


router.get('/test',(req, res) => {
    console.log(req)
    return res.status(200).json({
        "message": "success"
    })
})

module.exports.AppRoutes = router