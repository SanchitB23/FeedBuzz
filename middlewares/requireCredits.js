module.exports = (req, res, next) => { //some kind of alert
  if (req.user.credits < 1) return res.status(402).send({error: 'Not enough credits!'});
  next();
};
