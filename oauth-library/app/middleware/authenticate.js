module.exports = function(req, res, next)
{
  if (!req.cookies.graph_user_name) { // req.session.passport._id
    next();
  } else {
    res.redirect('/calendar');
  }
}