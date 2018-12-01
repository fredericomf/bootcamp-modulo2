module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    // NOTA_ESTUDO: O res.locals disponibiliza os dados do usuário em qualquer view Nunjucks
    res.locals.user = req.session.user

    return next()
  }

  return res.redirect('/')
}
