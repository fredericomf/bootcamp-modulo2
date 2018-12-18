# bootcamp-modulo2

Lessons of Bootcamp Module 2

```bash
echo "# bootcamp-modulo2" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/fredericomf/bootcamp-modulo2.git
git push -u origin master
```

# Iniciando o projeto

## Comandos

Para iniciar um projeto nodejs devemos rodar, na pasta do projeto, o comando:

```bash
yarn init -y
```

_Note que a opção -y serve para aceitar os valores padrões de inicialização do projeto_

Após instalar o 'nodemon', devemos adicionar os scripts no package.json:

```javascript
"scripts" : {
    "start": "nodemon index.js"
}
```

_Lembrando que o nodemon deve ser instalado como DEVELOPMENT MODE (yarn add nodemon -D)_

# Dependências utilizadas

## NODEMON

Monitora alterações no código fonte e atualiza o servidor.

Para saber mais: https://nodemon.io

_Lembrando que o nodemon deve ser instalado como DEVELOPMENT MODE (yarn add nodemon -D)_

## EXPRESS

Framework web rápido, flexível e minimalista para Node.js.

Para saber mais: https://expressjs.com/pt-br/

## NUNJUCKS

É uma TEMPLATE ENGINE, para renderizar conteúdos HTML com JS.

Para saber mais: https://mozilla.github.io/nunjucks/

## ESLINT

Serve para garantir que todos os programadores envolvidos no projeto utilizem uma mesma guia de estilos.

Para saber mais: https://eslint.org

_Lembrando que o eslint deve ser instalado como DEVELOPMENT MODE (yarn add nodemon -D)_

_NOTA: Depois de instalador não esquecer de rodar o comando:_

```bash
npx eslint --init
```

How would you like to configure ESLint?
\> Use a popular style guide

Witch style guide do you want to follow?
\> Standard (https://github.com/standard/standard)

What format do you want your config file to be in?
\> JSON

Would you like to install them now with npm?
\> Y

**_DEPOIS, APAGAR O ARQUIVO 'package-lock.json' E RODAR O COMANDO YARN NA RAIZ DO PROJETO. ISSO GARANTE USAR SÓ O YARN_**

_NOTA: Ao retornarmos para um arquivo .js notaremos que os erros na nossa styleguide são marcados com linhas vermelhas (Isso depois de instalada a extenção do ESLint_

## SEQUELIZE

Ferramenta ORM que suporte PostgreSQL, MySQL, SQLite e M\$SQL.

Para saber mais: http://docs.sequelizejs.com

```bash
yarn add sequelize

yarn add -D sequelize-cli
```

_NOTA: O sequelize_cli serve para termos acesso à uma linha de comando no terminal para facilitar a criação de tabelas, models, etc..._

#### Iniciando o sequelize:

```bash
npx sequelize init
```

- Após rodar o comando 'npx' mover a pasta **'/config'**, que ele gerou na raiz para **'/src'**
- Renomear o arquivo **'/config/config.json'** para **'/config/database.js'**
- Criar a pasta: **'/src/database'** e mover a as pastas **'/migrations'** e **'/seeders'** para dentro dela.
- Mover a pasta **'/models'** para **'/src/app'**
- Criar o seguinte arquivo na raiz do projeto: **.sequelizerc**
  - _Serve para indicar ao sequelizer que alteramos de lugar algumas pastas que ele criou(vide passos acima)_

**CONTEÚDO DO ARQUIVO .sequelizerc:**

```javascript
const path = require("path");

module.exports = {
  config: path.resolve("src", "config", "database.js"),
  "models-path": path.resolve("src", "app", "models"),
  "seeders-path": path.resolve("src", "database", "seeders"),
  "migrations-path": path.resolve("src", "database", "migrations")
};
```

_NOTA IMPORTANTE: Consultar a documentação para ver qual dependência deve ser instalada de acordo com o banco de dados que será trabalhado. No caso desses estudos, o banco escolhido pelo professor foi o Postgres. Para este banco devemos instalar a extenção pg: **yarn add pg**_

#### Configuração do sequelize (/src/config/database.js)

```javascript
module.exports = {
  dialect: "postgres",
  host: "127.0.0.1",
  username: "docker",
  password: "docker",
  database: "gonodemodulo2",
  operatorAliases: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
};
```

#### Adequação do '/src/app/models/index.js':

- Remover a linha: **const env = process.env.NODE_ENV || 'development';** não temos mais essa configuração no nosso **database.js**
- Alterar o caminho do nosso config de **const config = require(\_\_dirname + '/../config/config.json')[env]** para **const config = require('../../config/database.js')**
- Passar **let sequelize** para constante: **const sequelize**
- Trocar:

```javascript
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}
```

- Por:

```javascript
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
```

## BCRYPTJS

Serve para fazer criptografia.

Para saber mais: https://www.npmjs.com/package/bcryptjs

```bash
yarn add bcryptjs
```

_NOTA: Um exemplo de uso pode ser encontrado no MODEL USER_

## MULTER

Para lidar com a parte de uploads da nossa aplicação.

Para saber mais: https://www.npmjs.com/package/multer

```bash
yarn add multer
```

- Criar arquivo: **'src/config/multer.js'**

```javascript
module.exports = {};
```

- Importar o arquivo de configurações do multer no nosso routes.js

## EXPRESS SESSION

Cria middleware de seções.

Para saber mais: https://www.npmjs.com/package/express-session

```bash
yarn add express-session
```

_NOTA_ESTUDO: A middleware está configurada no arquivo server.js_

_NOTA_ESTUDO2: Quando o servidor é reiniciado as seções são perdidas porque estão na memória. O professor recomendou utilizarmos o 'redis' para persistir as seções. Veja mais em: https://github.com/tj/connect-redis_

_NOTA_ESTUDO3: Como estamos em uma aplicação de testes, usaremos o filestorage (guardar as seções em arquivos físicos_

## SESSION FILE STORE

Para salvar as seções em arquivos.

Para saber mais: https://www.npmjs.com/package/session-file-store

```bash
yarn add session-file-store
```

_NOTA_ESTUDO: O Session File Store está configurado da middleware de seção no arquivo server.js_

## CONNECT FLASH

Middleware para mensagens flash para Connect e Express

Para saber mais: https://github.com/jaredhanson/connect-flash

```bash
yarn add connect-flash
```

_NOTA_ESTUDO: O Connect Flash está configurado no arquivo server.js_

- Após configurar no server.js aplicar as mensagens nos Controllers que precisarmos (no nosso caso, até agora, foi no SessionController)

- Temos que disponibilizar as variáveis flash para que o Nunjucks encontre, seguindo a mesma forma de disponibilizar o User 'res.local' :

```javascript
routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash("success");
  res.locals.flashError = req.flash("error");

  return next();
});
```

## MOMENT

Dependência para manipulação de datas

Para saber mais: https://momentjs.com/docs/

```bash
yarn add moment
```

# PLUGINS

## FLATPICKR

Componente Datepicker

Para saber mais: https://flatpickr.js.org

Inserir o bloco abaixo no nosso HEAD (\_partials/head.njk):

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css"
/>
<script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
```

# Extenções VSCODE utilizadas

## Nunjucks

A Nunjucks syntax definition. (ronnidc)

## EDITOR CONFIG

Uma extenção que serve para padronizar a formatação de códigos fontes.

EditorConfig for VSCode. (EditorConfig)

Depois de instalada a extenção, criar um arquivo '.editorconfig' na raiz do projeto com o seguinte conteúdo:

```javascript
root = true

[*]
indent_style = space
indent_size = 2
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```

## ESLINT

Integrates ESLint Javascript into VS Code. (Dirk Baeumer)

Serve para garantir que todos os programadores envolvidos no projeto utilizem uma mesma guia de estilos.

_NOTA: Abrir o user settings (JSON) 'Ctrl + Shift + P' > setting > Preferences: Open Settings (JSON):_

Adicionar:

**"prettier.eslintIntegration": true,**
**"editor.formatOnSave": true,**

_Com isso, toda vez que salvarmos um arquivo ele formatará seguindo o styleguide definido na inicialização do ESLint _

[Vide dependências](#Dependências-utilizadas)

## PRETTIER

A VS Code plugin for prettier/prettier. (Esben Petersen)

Automatiza algumas formatações do ESLINT

# Banco de dados

## POSTGRES

_Resolvi ir pelo mesmo caminho do professor, depois que tiver caminhando sozinho experimento outros_ :wink:

### Instalar o Docker

_O Docker é uma aplicação que torna simples e fácil executar processos de aplicação em um contêiner, que é como uma máquina virtual, apenas mais portátil, mais amigável, e mais dependente do sistema operacional do host._ [TUTORIAL INSTALAÇÃO DOCKER](https://www.digitalocean.com/community/tutorials/como-instalar-e-usar-o-docker-no-ubuntu-16-04-pt)

Depois, rodar o comando:

```bash
sudo docker run --name database -p 5432:5432 -d -t kartoza/postgis
```

_NOTA: o '-p 5432:5432' serve para redirecionar a porta 5432 do docker container para a posta 5432 da nossa máquina. Assim podemos acessar o banco por essa porta_

- Depois de instalado podemos roadar o seguinte comando para ver os servidores que estão rodando:

```bash
sudo docker ps
```

# MIGRATIONS

A Migration serve, basicamente, para fazermos o controle de versão da nossa base de dados.

## Para criar uma migration:

- Gerar o arquivo de configuração:

**EXEMPLO:**

```bash
npx sequelize migration:create --name=create-users
```

**É necessário implementar no arquivo da migration criada a SCHEMA da tabela. Vide exemplo na pasta migrations do projeto atual.**

- Rodar a migration criada:

```bash
npx sequelize db:migrate
```
