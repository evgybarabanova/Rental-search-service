const express = require("express");
const {
  checkUserAndCreateSession,
  createUserAndSession,
  destroySession,
  isValid,
  renderSignInForm,
  renderSignUpForm,
} = require("../controllers/authControllers");
const {Basket, Entry, Image} = require("../db/models")
const router = express.Router();

router
  .route("/signup")
  // Страница регистрации пользователя
  .get(renderSignUpForm)
  // Регистрация пользователя
  .post(isValid, createUserAndSession);

router
  .route("/signin")
  // Страница аутентификации пользователя
  .get(renderSignInForm)
  // Аутентификация пользователя
  .post(checkUserAndCreateSession);

router
.route('/add')
.post( async (req, res) => {
 const id = Number(req.body.id)
 try {
   const cart = await Basket.create({ entry_id: id, user_id: req.session.user.id})
   res.sendStatus(200)
 } catch (error) {
   res.sendStatus(305)
 }
})

router
.route('/cart/:id')
.get( async (req, res)=> {
let entries;
try {
 
  cart = await Basket.findAll({where: {user_id: req.session.user.id}})
const entriesIds = cart.map(e=>e.entry_id)
 const entries = await Entry.findAll({include:Image, where:{id:entriesIds}})
 
 const arr = entries.map((e)=> { 
   e.Images = e.Images[0].image
   return e
  });

res.render('entry/cart', {entries})
  // res.render('index', { entries }); // ХБС!!!
} catch (error) {
  console.log(error);
}
})



router.get("/signout", destroySession);
module.exports = router;
