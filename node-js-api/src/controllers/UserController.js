const UserService = require('../services/UserService')

module.exports = {
    getAll: async (req, res) => {
        let json = { error: '', result: [] }
        let users = await UserService.getAll()

        for (let i in users) {
            json.result.push({
                id: users[i].id,
                email: users[i].email,
                person: users[i].person,
                name: users[i].name,
                doc: users[i].doc,
                date: users[i].date_init,
                phone: users[i].phone,
                pass: users[i].pass,
            })
        }
        res.json(json)
    },

    getByEmail: async (req, res) => {
        let json = { error: '', result: {} }

        let email = req.params.email
        let user = await UserService.getByEmail(email)

        if (user) {
            json.result = user
        }
        res.json(json)
    },

    addUser: async (req, res) => {
        let json = { error: '', result: {} }

        let email = req.body.email
        let person = req.body.person
        let name = req.body.name
        let doc = req.body.doc
        let date_init = req.body.date_init
        let phone = req.body.phone
        let pass = req.body.pass

        if (email && person && name && doc && date_init && phone && pass) {
            await UserService.addUser(email, person, name, doc, date_init, phone, pass)
            json.result = 'Usuário cadastrado com sucesso'
            res.status(200).json(json)
        } else {
            json.error = 'Campos não enviados' 
            res.status(400).json(json)
        }
    }
}