const router = require('express').Router();
const { Entry } = require('../db/models');


router.get('/search', async (req, res) => {
  try {
    const { query: { type, rooms, geo } } = req

    // TODO search entries by type & rooms & geo

    const entries = await Entry.findAll({ where: {type: type, rooms: rooms, geo: geo}, raw: true });

    res.json(entries)
  } catch (error) {
    res.status(400).json({ error: 'Не удалось отфильтровать запись из базы данных' })
  }
})

router.delete('/delete', async (req, res) => {
  res.sendStatus(200);
})

// GET /entries/:id/edit
router.get('/:id/edit', async(req, res) => {
  const { id } = req.params;
  console.log(id, '-->', req.params);
  const entry = await Entry.findOne({ where: { id }, raw: true });
  console.log(entry);
  res.render('entry/entries', { entry });
});

module.exports = router;
