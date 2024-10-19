const express =require('express')

const router = new express.Router();

const athenticate = require("../middleware/authenticate")

const usersControllers = require("../controllers/usersControllers")

router.post("/user/register",usersControllers.userRegister)

router.post("/user/login",usersControllers.userLogin)

router.post("/user/courses/addcart/:id",athenticate,usersControllers.addToCart)

router.post("/user/courses/fav/:id",athenticate,usersControllers.addToFav)

router.get('/user/courses/cart',athenticate ,usersControllers.getCart);

router.get("/courses/viewcourse/cart/cartdetails",athenticate,usersControllers.getCartDetails)

router.get("/courses/viewcourse/fav/favdetails",athenticate,usersControllers.getFavDetails)

router.get("/validuser",athenticate,usersControllers.validUser)


router.delete("/removefromcart/:id",athenticate,usersControllers.removeFromCart);

router.delete("/removefromfav/:id",athenticate,usersControllers.removeFromFav);

router.get("/logout",athenticate,usersControllers.logoutUser)

router.get("/forgotpassword/:id/:token",athenticate,usersControllers.forgotPassword)

router.post("/sendpasswordlink",athenticate,usersControllers.sendPasswordLink)

router.post("/:id/:token",athenticate,usersControllers.changePassword)

module.exports = router