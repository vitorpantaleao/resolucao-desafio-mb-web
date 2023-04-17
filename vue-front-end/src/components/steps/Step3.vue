<template>
    <div>
        <p class="steps">Etapa <span class="number">{{ step[2].id }}</span> de {{ step.length }}</p>
        <h2>Senha de acesso</h2>

        <div>
            <div class="input-form">
                <label for="password"> Sua senha
                    <input type="text" id="password" name="Name" v-model="form.password" @input="isPasswordValid" />
                    <p class="error" v-if="!passwordValid">A senha não pode conter espaços em branco</p>
                </label>
            </div>

            <div class="group-button">
                <button class="prev-step" @click="prevStep" v-if="registerStore.step != 1">Voltar</button>
                <button class="next-step" value="Continuar" :disabled="disabled" @click="nextStep"> Continuar </button>
            </div>
        </div>
    </div>
</template>

<script>
    import { useRegisterStore } from '../../store/RegisterStore'
    
    export default {
        name: 'Step3',
        props: ['step'],

        data() {
            return {
                form: {
                    password: '',
                },
                disabled: true,
                completed: false,
                passwordValid: true,
                registerStore: useRegisterStore()
            }
        },

        watch: {
            form: {
                handler() {
                    this.isFormCompleted()
                },
                deep: true
            }
        },

        methods: {
            isPasswordValid() {
                if (/\s/.test(this.form.password)) {
                    this.passwordValid = false;
                } else {
                    this.passwordValid = true;
                }
            },

            isFormCompleted() {
                if (this.form.password.length >= 6 && this.passwordValid) {
                    this.completed = true
                    this.disabled = false
                } else {
                    this.completed = false
                    this.disabled = true
                }
            },

            submit() {
                if (this.completed) {
                    this.registerStore.setPassword(this.form.password)
                } else {
                    alert('A senha deve ter no mínimo 6 caracteres')
                }
            },
            
            nextStep() {
                this.submit()
                this.registerStore.setStep(4)
            },

            prevStep() {
                this.registerStore.setStep(2)
            }
        }
    }
</script>