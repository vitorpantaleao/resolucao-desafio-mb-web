<template>
    <div>
        <p class="steps">Etapa <span class="number">{{ step[3].id }}</span> de {{ step.length }}</p>
        <h2>Revise suas informações</h2>

        <form @submit.prevent="submit">
            <div class="input-form">
                <label for="mailF"> Endereço de e-mail
                    <input type="email" id="mailF" name="Email" v-model="registerStore.getForm.email" />
                </label>
            </div>
            <div class="radio-form">
                <label for="fisicaF">
                    <input type="radio" id="fisicaF" name="pessoa" value="fisica" v-model="registerStore.getForm.person" />
                    Pessoa Física
                </label>
                <label for="juridicaF">
                    <input type="radio" id="juridicaF" name="pessoa" value="juridica" v-model="registerStore.getForm.person" />
                    Pessoa Jurídica
                </label>
            </div>
            <div class="input-form">
                <label for="nameF"> {{ registerStore.type == 'fisica' ? 'Nome' : 'Razão Social' }}
                    <input type="text" id="nameF" name="Name" v-model="registerStore.getForm.name" />
                </label>
            </div>
            <div class="input-form">
                <label for="docF"> {{ registerStore.type == 'fisica' ? 'CPF' : 'CNPJ' }}
                    <input type="text" id="docF" name="Doc" v-model="registerStore.getForm.doc" @input="onInputDoc" :maxlength="registerStore.type == 'fisica' ? 11 : 14" />
                </label>
            </div>
            <div class="input-form">
                <label for="dateF"> {{ registerStore.type == 'fisica' ? 'Data de Nascimento' : 'Data de abertura' }}
                    <input type="date" id="dateF" name="Date" v-model="registerStore.getForm.date" />
                </label>
            </div>
            <div class="input-form">
                <label for="phoneF"> Telefone
                    <input type="text" id="phoneF" name="Phone" v-model="registerStore.getForm.phone" @input="onInputPhone" maxlength="15" />
                </label>
            </div>
            <div class="input-form">
                <label for="passwordF"> Sua senha
                    <input type="text" id="passwordF" name="Name" v-model="registerStore.getForm.password" @input="isPasswordValid" />
                    <p class="error" v-if="!passwordValid">A senha não pode conter espaços em branco</p>
                </label>
            </div>

            <div class="group-button">
                <button type="button" class="prev-step" @click="prevStep" v-if="registerStore.step != 1">Voltar</button>
                <button type="button" class="next-step" value="Continuar" :disabled="disabled" @click="nextStep"> Continuar </button>
            </div>
        </form>
        <AfterSubmit :success="success" @close="startForm" />
    </div>
</template>

<script>
    import axios from 'axios'
    import { useRegisterStore } from '../../store/RegisterStore'
    import AfterSubmit from '../AfterSubmit.vue'
    import { onInputPhone, onInputDoc } from '../../utils/utils'

    export default {
        components: { AfterSubmit },
        name: 'Step4',
        props: ['step'],

        data() {
            return {
                form: null,
                disabled: false,
                passwordValid: true,
                formValid: true,
                registerStore: useRegisterStore(),
                success: true,
            }
        },

        watch: {
            'registerStore.getForm': {
                handler() {
                    this.isFormValid()
                },
                deep: true
            },
            'registerStore.getForm.password': {
                handler() {
                    this.isPasswordValid()
                },
                deep: true
            },
            'registerStore.getForm.person': {
                handler() {
                    this.registerStore.type = this.registerStore.getForm.person
                    this.registerStore.getForm.doc = ''
                },
                deep: true
            },
        },

        methods: {
            isValidEmail(email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                return emailRegex.test(email)
            },

            isPasswordValid() {
                if (/\s/.test(this.registerStore.getForm.password)) {
                    this.passwordValid = false;
                } else {
                    this.passwordValid = true;
                }
            },

            onInputDoc() {
                this.registerStore.getForm.doc = onInputDoc(this.registerStore.getForm.doc, this.registerStore.type)
            },

            onInputPhone() {
                this.registerStore.getForm.phone = onInputPhone(this.registerStore.getForm.phone)
            },

            isFormValid() {
                if (this.isValidEmail(this.registerStore.getForm.email) && 
                    this.registerStore.getForm.person && 
                    this.registerStore.getForm.name.length >= 3 && 
                    this.registerStore.getForm.doc.length >= 11 && 
                    this.registerStore.getForm.date.length >= 8 && 
                    this.registerStore.getForm.phone.length >= 11 && 
                    this.passwordValid
                ) {
                    this.disabled = false
                    this.formValid = true
                } else {
                    this.disabled = true
                    this.formValid = false
                }
            },

            submit() {
                if(this.formValid) {
                    var formUser = new URLSearchParams()
                    formUser.append("email", this.registerStore.getForm.email)
                    formUser.append("person", this.registerStore.getForm.person)
                    formUser.append("name", this.registerStore.getForm.name)
                    formUser.append("doc", this.registerStore.getForm.doc)
                    formUser.append("date_init", this.registerStore.getForm.date)
                    formUser.append("phone", this.registerStore.getForm.phone)
                    formUser.append("pass", this.registerStore.getForm.password)

                    axios.post("http://localhost:3000/api/registration", formUser, {
                        headers: {
                            'Accept': '*/*',
                            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                        }
                    })
                    .then(response => {
                        console.log(response.data)
                        if(response.status == 200) {
                            this.success = true
                        } else {
                            alert('Erro ao cadastrar usuário!')
                        }
                    })
                    .catch(error => {
                        console.log('error', error)
                    })

                } else {
                    alert('Verifique se todos os campos do formulário estão preenchidos corretamente!')
                }
            },
            
            nextStep() {
                this.submit()
            },

            prevStep() {
                this.registerStore.setStep(3)
            },

            startForm() {
                window.location.reload()
            },
        }
    }
</script>