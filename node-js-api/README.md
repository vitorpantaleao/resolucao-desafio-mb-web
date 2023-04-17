# API Node JS with Express

Após clonar o projeto, execute o comando abaixo para instalar as dependências.

```bash
npm install
```
Para iniciar o projeto, execute o comando abaixo, ele irá iniciar o servidor na porta 3000.

```bash
npm start

# http://localhost:3000
```

**Altere o arquivo .env.exemplo para .env e altere as variáveis de acordo com o seu ambiente, abaixo segue o código SQL para criar o banco de dados**

<br>

## Create database

Aqui você pode criar o banco de dados e a tabela para o projeto, bastando executar o comando abaixo no seu terminal SQL (o mysql deve estar instalado na máquina).

```sql
create database api_users;

create table users (
	id int primary key auto_increment,
	email varchar(50),
	person varchar(30),
	name varchar(100),
	doc varchar(30),
	date_init varchar(30),
	phone varchar(30),
	pass varchar(30)
);
```

<br>

## Segue abaixo os endpoints da API

### ***POST*** /api/registration

Cadastra um novo usuário.

##### **Exemplo de POST com Axios**

```javascript
// Importe a biblioteca do Axios
import axios from 'axios'

// Defina os dados de requisição
var formUser = new URLSearchParams();
formUser.append("email", "email@teste.com");
formUser.append("person", "fisica");
formUser.append("name", "Teste Front-end");
formUser.append("doc", "999999999");
formUser.append("date_init", "1990-01-01");
formUser.append("phone", "19999999999");
formUser.append("pass", "123456");

// Faça a requisição usando o Axios
axios.post("http://localhost:3000/api/registration", formUser, {
  headers: {
    'Accept': '*/*',
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
})
.then(response => {
  console.log(response.data)
})
.catch(error => {
  console.log('error', error)
})

```

### ***GET*** /api/registration

Lista todos os usuários cadastrados.

<br>

***Para testar a API, você pode utilizar o Insomnia, Postman ou qualquer outro software que faça requisições HTTP.***

<br>

## Validações

Todos os campos são obrigatórios para o cadastro, menos o ID que é gerado automaticamente pelo banco de dados.