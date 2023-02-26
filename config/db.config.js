const {Sequelize} = require('sequelize')

const db = new Sequelize('test_pt_dans_multi_pro','postgres','postgres', {
  host: 'localhost',
  dialect: 'postgres',
})

module.exports = db
