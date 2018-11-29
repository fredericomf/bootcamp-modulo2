const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      avatar: DataTypes.STRING,

      // NOTA_ESTUDO: O campo VIRTUAL é transiente ou seja, só existe na aplicação e não no banco de dados.
      password: DataTypes.VIRTUAL,
      password_hash: DataTypes.STRING,
      provider: DataTypes.BOOLEAN
    },
    {
      // NOTA_ESTUDO: Para saber mais sobre HOOKS: http://docs.sequelizejs.com/manual/tutorial/hooks.html
      hooks: {
        beforeSave: async user => {
          if (user.password) {
            user.password_hash = await bcrypt.hash(user.password, 8)
          }
        }
      }
    }
  )

  return User
}
