const express = require('express');

const router = express.Router();
const isAdminMiddle = require('../middleware/common');


router.get('/', (req, res) => {
	const message = '';
	res.render('index', { message });
});

router.get('/secret',isAdminMiddle, (req, res) => {
  //const { isAdmin } = req;
  res.send('top secret'); 
}); 

module.exports = router;
