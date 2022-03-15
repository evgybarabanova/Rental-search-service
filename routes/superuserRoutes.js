const express = require('express');
    const router = express.Router();
    const router = express.Router();
const {Superuser} = require('../db/models');
    
    router.get('/registation', (req, res) => {
  res.render('user/registation');
});

router.post('/registration', async (req, res) => {
  
  const { inputName, inputMail, inputPass } = req.body;
  const superUser = await Superuser.create({
  name: inputName, mail: inputMail, password: inputPass })
  console.log('all is ok==>', superUser);
  res.redirect('/'); // не знаю какая здесь главная ручка - / или /main
 
})
    
     module.exports = router;
