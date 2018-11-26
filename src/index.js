const server = require('./server')

// Se for definida alguma variável de ambiente PORT usar, se não o padrão é na 3000
server.listen(process.env.PORT || 3000)
