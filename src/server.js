const express = require('express')
const nunjucks = require('nunjucks')

// NOTA_ESTUDO: Essa biblioteca vem junto com o node e serve para lidarmos com caminhos do servidor.
const path = require('path')

class App {
  constructor () {
    this.express = express()

    // NOTA_ESTUDO: A variável de ambiente NODE_ENV, geralmente armazena: development, production ou testing
    this.idDev = process.env.NODE_ENV !== 'production'

    this.middlewares()
    this.views()
    this.routes()
  }

  middlewares () {
    // Utilizado para aceitar requisições de formulários
    this.express.use(express.urlencoded({ extended: false }))
  }

  views () {
    // NOTA_ESTUDO: O path.resolve resultará nisso: 'src/app/views'
    nunjucks.configure(path.resolve(__dirname, 'app', 'views'), {
      watch: this.isDev,
      express: this.express,
      autoescape: true
    })

    // NOTA_ESTUDO: Serve para dizer ao express que ele deve 'servir' arquivos públicos além das rotas:
    this.express.use(express.static(path.resolve(__dirname, 'public')))

    this.express.set('view engine', 'njk')
  }

  routes () {
    this.express.use(require('./routes'))
  }
}

module.exports = new App().express
