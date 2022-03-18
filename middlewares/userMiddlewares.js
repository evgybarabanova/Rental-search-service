const {Entry,User} = require('../db/models')

const isAuth = (req, res, next) => {
  if (req.session.user) {
    next();
  }else res.redirect('/signup');
}
const isAdmin = (req, res, next) => {
  if (req.session.user.role === 'admin') {
    next();
  }
}
const isEditor = async (req, res, next) => {
 try {
   const entry = await Entry.findOne({where:{id:req.params.id}});
   const user = await User.findOne({where:{id:entry.user_id}});
   if (user.id === req.session.user.id||req.session.user.role === 'admin') {
     next();
   }else res.send('Не трошь, не твоё!')
 } catch (error) {
   console.log(error);
   res.send('Не трошь, не твоё!')
 }
}
module.exports = {isAuth, isEditor};
