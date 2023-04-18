<template>
    <div class="success" v-if="success">
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="green" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        </svg>
        <h2>Usuário cadastrado com sucesso!</h2>
        <div class="group-button end">
            <button type="button" class="next-step" value="Continuar" @click="nextStep"> Novo Cadastro </button>
            <button type="button" class="get-users" value="Continuar" @click="getAllUsers = true" > Ver usuários cadastrados </button>
        </div>
        <GetAllUsers v-if="getAllUsers" :getAll="getAllUsers" class="table" />
    </div>
</template>

<script>
import GetAllUsers from './GetAllUsers.vue';

    export default {
    name: "AfterSubmit",
    props: ["success"],
    data() {
        return {
            getAllUsers: false
        };
    },
    methods: {
        nextStep() {
            this.$emit("close", false);
            window.location.reload();
        },
    },
    components: { GetAllUsers }
}
</script>

<style scoped>
    .success {
        position: fixed;
        width: 100%;
        min-height: 100vh;
        left: 0;
        top: 0;
        background-color: rgba(255, 255, 255);
        z-index: 9;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        overflow: auto;
    }

    h2 {
        font-size: 30px;
        font-weight: 500;
        color: #333;
        font-family: Arial, Helvetica, sans-serif;
    }

    .success svg {
        margin-bottom: 20px;
    }

    .next-step {
        width: 250px;
        height: 50px;
        padding: 10px 20px;
        border-radius: 5px;
        font-size: 18px;
        font-weight: 500;
        cursor: pointer;
        text-transform: uppercase;
        margin-top: 10px;
        transition: all 0.3s ease;
    }

    .next-step:hover {
        border: 1px solid #FF9900;
        color: #FF9900;
        background: #FFF;
    }

    .get-users {
        width: 250px;
        min-height: 50px;
        padding: 10px 20px;
        border-radius: 5px;
        font-size: 18px;
        font-weight: 500;
        cursor: pointer;
        text-transform: uppercase;
        transition: all 0.3s ease;
    }

    .end {
        flex-direction: column;
    }

    .table {
        margin-top: 20px;
    }

    @media(max-width: 768px) {
        .success svg {
            width: 50px;
            height: 50px;
            margin-bottom: 10px;
        }

        h2 {
            font-size: 18px;
        }

        .next-step, 
        .get-users {
            width: 100%;
            height: 40px !important;
            font-size: 14px;
            margin-top: 0;
        }

        .table {
            width: 100%;
        }
    }
</style>