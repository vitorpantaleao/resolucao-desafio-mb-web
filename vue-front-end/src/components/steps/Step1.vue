<template>
    <div>
        <p class="steps">Etapa <span class="number">{{ step[0].id }}</span> de {{ step.length }}</p>
        <h2>Seja bem vindo(a)</h2>

        <div>
            <div class="input-form">
                <label for="mail"> Endereço de e-mail
                    <input type="email" id="mail" name="Email" v-model="form.email" :required="required" />
                </label>
            </div>
            <div class="radio-form">
                <label for="fisica">
                    <input type="radio" id="fisica" name="pessoa" value="fisica" v-model="form.person" />
                    Pessoa Física
                </label>
                <label for="juridica">
                    <input type="radio" id="juridica" name="pessoa" value="juridica" v-model="form.person" />
                    Pessoa Jurídica
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
        name: 'Step1',
        props: ['step'],

        data() {
            return {
                form: {
                    email: '',
                    person: '',
                },
                required: true,
                disabled: true,
                completed: false,
                registerStore: useRegisterStore()
            }
        },

        watch: {
            form: {
                handler() {
                    if (this.form.email && this.form.person && this.isValidEmail(this.form.email)) {
                        this.completed = true
                        this.disabled = false
                    } else {
                        this.completed = false
                        this.disabled = true
                    }
                },
                deep: true
            },
        },

        methods: {
            isValidEmail(email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                return emailRegex.test(email)
            },

            submit() {
                if (this.completed) {
                    this.registerStore.setType(this.form.person)
                    this.registerStore.setEmail(this.form.email)
                    this.registerStore.setPerson(this.form.person)
                }
            },

            nextStep() {
                this.submit()
                this.registerStore.setStep(2)
            },
        }
    }
</script>