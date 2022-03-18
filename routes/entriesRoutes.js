const router = require('express').Router();
const { Entry, User, Image } = require('../db/models');
const {isEditor} = require('../middlewares/userMiddlewares')
const upload = require('../controllers/multerController')


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

router.post('/delete/:id', isEditor, async (req, res) => {
 try {
   const images = await Image.destroy({where: { entry_id: req.params.id}})
  const entry=  await Entry.destroy({ where:{id: req.params.id}})
   res.redirect('/entry')
 } catch (error) {
   console.log(error);
 }
})

// GET /entries/:id/edit
router.get('/:id/edit', isEditor, async(req, res) => {
  const { id } = req.params;
  console.log(id, '-->', req.params);
  const entry = await Entry.findOne({ where: { id }, raw: true });
  console.log(entry);
  res.render('entry/forrent', { entry });
});


router.post('/:id/edit', isEditor,upload ,async(req, res) => {
  try {
    const entry = await Entry.findOne({ where: { id }, raw: true });
  	 await entry.update({
			title: req.body.title,
			body: req.body.body,
			type: req.body.type,
			rooms: req.body.rooms,
      price: req.body.price,
			geo: req.body.geo,
			user_id: req.session.user.id
		})
    for (let i = 0; i < req.files.length; i++) {
			const image = await Image.create({ entry_id: entry.id, image: req.files[i].filename })
		}
    res.redirect(`entry/${entry.id}`);
  } catch (error) {
    console.log(error);
  }
})

module.exports = router;
