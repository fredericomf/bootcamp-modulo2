const { User, Appointment } = require('../models')
const { Op } = require('sequelize')
const moment = require('moment')

class DashboardController {
  async index (req, res) {
    const { provider, id } = req.session.user

    if (provider === true) {
      const today = moment().add(1, 'days')

      const appointmentsOfDay = await Appointment.findAll({
        include: [{ model: User, as: 'user' }],
        where: {
          date: {
            [Op.between]: [
              today.startOf('day').format(),
              today.endOf('day').format()
            ]
          },
          provider_id: id
        }
      })

      const appointments = appointmentsOfDay.map(appointment => {
        return {
          appointment,
          formated_time: moment(appointment.date).format('HH:mm')
        }
      })

      return res.render('dashboard_provider', { appointments })
    } else {
      const providers = await User.findAll({ where: { provider: true } })
      return res.render('dashboard', { providers })
    }
  }
}

module.exports = new DashboardController()
