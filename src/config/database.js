/**
 * NOTA_ESTUDO: Para utilizar o Postgres instalar a dependência pg
 */
module.exports = {
  dialect: 'postgres',
  host: '127.0.0.1',
  username: 'docker',
  password: 'docker',
  database: 'gonodemodulo2',
  operatorAliases: false,
  define: {
    timestamps: true, // NOTA_ESTUDO: Isso criará duas colunas em nossas tabelas: CreatedAt e UpdatedAt
    underscored: true, // NOTA_ESTUDO: Para não fazer o uso de Camel Case na criação de campos
    underscoredAll: true // NOTA_ESTUDO: Para não fazer o uso de Camel Case na criação de tabelas
  }
}
