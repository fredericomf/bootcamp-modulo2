// NOTA_ESTUDO: Depois de implementada, criamos a migration: npx sequelize migration:create --name=create-appointment

module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define('Appointment', {
    date: DataTypes.DATE // Data para agendamento
  })

  // NOTA_ESTUDO: Abaixo serve para fazermos relacionamentos entre entidades.
  Appointment.associate = models => {
    Appointment.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' }) // Usuário que agendou o serviço
    Appointment.belongsTo(models.User, {
      as: 'provider',
      foreignKey: 'provider_id'
    }) // Usuário que executará o serviço (barbeiro, cabeleireiro, manicure, etc...)
  }

  return Appointment
}
