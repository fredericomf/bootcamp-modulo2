const moment = require('moment')
const { Op } = require('sequelize')
const { Appointment } = require('../models')

class AvailableController {
  async index (req, res) {
    const date = moment(parseInt(req.query.date))

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.params.provider,
        date: {
          // NOTA_ESTUDO: O "Op.between" é passado em colchetes para dizer que quero que ele seja uma string. Resultado: "BETWEEN" :{...
          [Op.between]: [
            date.startOf('day').format(),
            date.endOf('day').format()
          ]
        }
      }
    })

    const schedule = [
      '8:00',
      '9:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00'
    ]

    const available = schedule.map(time => {
      const [hour, minute] = time.split(':')

      // NOTA_ESTUDO: Abaixo estou definindo uma hora para a data atual. Exemplo: Iteração das 8:00: 2018-01-01 08:00:00
      const value = date
        .hour(hour)
        .minute(minute)
        .second(0)

      return {
        time,
        value: value.format(),
        available:
          value.isAfter(moment()) &&
          !appointments.find(a => moment(a.date).format('HH:mm') === time)
      }
    })

    return res.render('available/index', { available })
  }
}

module.exports = new AvailableController()
