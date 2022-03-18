const router = require('express').Router();
const { Basket } = require('../db/models');

router.delete('/:id', async (req, res) => {
	try {
		await Basket.destroy({ where: { entry_id: req.params.id } });
		res.sendStatus(200);
	} catch (error) {
		res.sendStatus(500);
	}
})
module.exports = router;
