exports.isAuth = (req,res,next) => {
  const sessUser = req.session.user;
  if(sessUser) {
      next();
  }
  else {
      err = res.status(403).json("You Need to Be Logged in to do this. Access Denied ")
      return err;
  }
};
