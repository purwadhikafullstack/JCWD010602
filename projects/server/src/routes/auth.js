const express = require("express")
const router  = express.Router()

const {authControllers} = require("../controllers")

router.post("/v1",authControllers.authLogin)
router.post("/v2",authControllers.authRegistration)
router.post("/resendVerif",authControllers.resendVerification)
router.post("/verifyCode",authControllers.verifyCode)

module.exports = router
