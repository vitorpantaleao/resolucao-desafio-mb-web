import { defineStore } from "pinia"

export const useRegisterStore = defineStore('register', {
    state: () => ({
        step: 1,
        type: '',
        form: {
            email: '',
            person: '',
            name: '',
            doc: '',
            date: '',
            phone: '',
            password: '', 
        }
    }),
    
    // -> methods
    actions: {
        setStep(step) {
            this.step = step
        },
        setType(type) {
            this.type = type
        },
        setEmail(email) {
            this.form.email = email
        },
        setPerson(person) {
            this.form.person = person
        },
        setName(name) {
            this.form.name = name
        },
        setDoc(doc) {
            this.form.doc = doc
        },
        setDate(date) {
            this.form.date = date
        },
        setPhone(phone) {
            this.form.phone = phone
        },
        setPassword(password) {
            this.form.password = password
        }
    },

    // -> computed properties
    getters: {
        getForm() {
            return this.form
        },
    },
})
