<template>
    <div>
        <h2>Usuários cadastrados</h2>
        <div class="users">
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Pessoa</th>
                        <th>Doc</th>
                        <th>Data</th>
                        <th>Senha</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="users.length >= 0">
                        <tr v-for="user in users" :key="user.id">
                            <td>{{ user.name }}</td>
                            <td>{{ user.email }}</td>
                            <td>{{ user.phone }}</td>
                            <td>{{ user.person }}</td>
                            <td>{{ user.doc }}</td>
                            <td>{{ user.date }}</td>
                            <td>{{ user.pass }}</td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr>
                            <td colspan="7">Nenhum usuário cadastrado</td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    
    export default {
        name: 'GetAllUsers',
        props: ['getAll'],

        data() {
            return {
                users: [],
            }
        },

        watch: {
            getAll: {
                handler() {
                    this.getUsers()
                },
                immediate: true,
            },
        },

        methods: {
            getUsers() {
                if(this.getAll) {
                    axios.get('http://localhost:3000/api/registration')
                    .then(response => {
                        console.log('users: ', response.data.result)
                        if(response.status == 200) {
                            this.users = response.data.result
                            console.log(this.users)
                        } else {
                            alert('nenhum usuário encontrado')
                        }
                    })
                    .catch(error => {
                        console.log('error', error)
                    })
                }
            },
        },
    }
</script>

<style scoped>
    h2 {
        font-size: 30px;
        font-weight: 500;
        color: #333;
        font-family: Arial, Helvetica, sans-serif;
        text-align: center;
    }

    .users {
        height: 350px;
        overflow: auto;
        padding: 10px 20px;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    table, th, td {
        border: 1px solid #ddd;
        padding: 8px 15px;
        white-space: nowrap;
    }

    @media(max-width: 768px) {
        h2 {
            font-size: 22px;
        }
        table, th, td {
            padding: 6px;
        }

        table {
            font-size: 12px;
            overflow: auto;
        }
    }
</style>