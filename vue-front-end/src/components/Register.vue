<template>
    <div class="form-register">
        <Step1 :step="steps" v-show="registerStore.step == 1" />
        <Step2 :step="steps" v-show="registerStore.step == 2" />
        <Step3 :step="steps" v-show="registerStore.step == 3" />
        <Step4 :step="steps" v-show="registerStore.step == 4" />
    </div>
</template>

<script>
    import { useRegisterStore } from '../store/RegisterStore'
    import Step1 from './steps/Step1.vue'
    import Step2 from './steps/Step2.vue'
    import Step3 from './steps/Step3.vue'
    import Step4 from './steps/Step4.vue'

    export default {
        name: 'AppRegister',

        components: {
            Step1,
            Step2,
            Step3,
            Step4
        },

        data() {
            return {
                registerStore: useRegisterStore(),
                steps: [
                    {
                        id: 1,
                        nome: 'Step1',
                    },
                    {
                        id: 2,
                        nome: 'Step2',
                    },
                    {
                        id: 3,
                        nome: 'Step3',
                    },
                    {
                        id: 4,
                        nome: 'Step4',
                    },
                ]
            }
        },

    }
</script>
