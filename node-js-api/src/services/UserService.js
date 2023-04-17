// Regras e comandos do Banco de Dados
const db = require('../db')

module.exports = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users', (error, results) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(results)
                }
            })
        })
    },
    getByEmail: (email) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(results[0])
                }
            })
        })
    },
    addUser: (email, person, name, doc, date_init, phone, pass) => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO users (email, person, name, doc, date_init, phone, pass) VALUES (?, ?, ?, ?, ?, ?, ?)', [email, person, name, doc, date_init, phone, pass], (error, results) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(results)
                }
            })
        })
    }
}