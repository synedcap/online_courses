const User = require("../models/user");


module.exports = function hasRole(roles) {

    return async function(req, res, next) {

      const user = await User.findOne({ where: { id: req.user.id } });
      if (!user || !roles.includes(user.role)) {
        return res.status(403).send({error: { status:403, message:'Access denied.'}});
      }
      next();
      
    }

}