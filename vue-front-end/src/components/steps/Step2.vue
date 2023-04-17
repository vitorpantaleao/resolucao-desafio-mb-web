<template>
    <div>
        <p class="steps">Etapa <span class="number">{{ step[1].id }}</span> de {{ step.length }}</p>
        <h2 v-if="registerStore.type == 'fisica'">Pessoa Física</h2>
        <h2 v-else>Pessoa Jurídica</h2>

        <div>
            <div class="input-form">
                <label for="name"> {{ registerStore.type == 'fisica' ? 'Nome' : 'Razão Social' }}
                    <input type="text" id="name" name="Name" v-model="form.name" />
                </label>
            </div>
            <div class="input-form">
                <label for="doc"> {{ registerStore.type == 'fisica' ? 'CPF' : 'CNPJ' }}
                    <input type="text" id="doc" name="Doc" v-model="form.doc" @input="onInputDoc" :maxlength="registerStore.type == 'fisica' ? 11 : 14" />
                </label>
            </div>
            <div class="input-form">
                <label for="date"> {{ registerStore.type == 'fisica' ? 'Data de Nascimento' : 'Data de abertura' }}
                    <input type="date" id="date" name="Date" v-model="form.date" />
                </label>
            </div>
            <div class="input-form">
                <label for="phone"> Telefone
                    <input type="text" id="phone" name="Phone" v-model="form.phone" @input="onInputPhone" maxlength="11" />
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
        name: 'Step2',
        props: ['step'],

        data() {
            return {
                registerStore: useRegisterStore(),
                form: {
                    name: '',
                    doc: '',
                    date: '',
                    phone: '',
                },
                disabled: true,
                completed: false,
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
            onInputDoc() {
                this.form.doc = this.form.doc.replace(/[^0-9.]/g, '')
                if (this.registerStore.type === 'fisica') {
                    this.form.doc = this.form.doc.replace(/\./g, '').substr(0, 11)
                    this.form.doc = this.form.doc.replace(/(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4')
                } else {
                    this.form.doc = this.form.doc.replace(/\./g, '').substr(0, 14)
                    this.form.doc = this.form.doc.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5')
                }
            },

            onInputPhone() {
                this.form.phone = this.form.phone.replace(/[^0-9.]/g, '')
                this.form.phone = this.form.phone.replace(/(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
            },

            isFormCompleted() {
                if (this.form.name.length >= 3 && this.form.doc.length >= 11 && this.form.phone.length >= 11 && this.form.date.length >= 8) {
                    this.completed = true
                    this.disabled = false
                } else {
                    this.completed = false
                    this.disabled = true
                }
            },

            submit() {
                if (this.completed) {
                    this.registerStore.setName(this.form.name)
                    this.registerStore.setDoc(this.form.doc)
                    this.registerStore.setDate(this.form.date)
                    this.registerStore.setPhone(this.form.phone)
                }
            },

            nextStep() {
                this.submit()
                this.registerStore.setStep(3)
            },

            prevStep() {
                this.form.doc = ''
                this.registerStore.setStep(1)
            }
        }
    }
</script>