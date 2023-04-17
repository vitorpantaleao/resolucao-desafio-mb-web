const mysql = require('mysql')

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

connection.connect((err) => {
    if (err) {
        console.log('erro ao conectar com o banco de dados: ', err)
    } else {
        console.log(`Conectado ao banco de dados: ${process.env.DB_NAME}`)
    }
})

module.exports = connection