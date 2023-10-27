<template>
    <section id="contact" class="adaptative-viewport-height flex column">
        <SectionTitle v-motion-fade-visible-once :delay="250" title="Contact"/>

        <div class="main_ct flex row a-center">
            <form id="contact_form" class="flex column" @submit.prevent="sendEmail()">
                <div v-motion-slide-visible-once-left :delay="250" class="flex column">
                    <input v-model="name" :disabled="submitText === '' || submitText === 'OK'" class="jura f-medium" name="name"
                           placeholder="Nom et prénom" type="text">
                    <span v-if="v$.name && v$.name.$error" class="jura f-medium">{{ v$.name.$errors[0].$message }}</span>
                </div>
                <div v-motion-slide-visible-once-left class="flex column">
                    <input v-model="email_adress" :disabled="submitText === '' || submitText === 'OK'" class="jura f-medium" name="email"
                           placeholder="Email" type="email">
                    <span v-if="v$.email_adress && v$.email_adress.$error" class="jura f-medium">{{ v$.email_adress.$errors[0].$message }}</span>
                </div>
                <div v-motion-slide-visible-once-left class="flex column">
                    <input v-model="phone_number" :disabled="submitText === '' || submitText === 'OK'" class="jura f-medium" name="phone_number"
                           placeholder="Téléphone" type="tel">
                    <span v-if="v$.phone_number && v$.phone_number.$error" class="jura f-medium">{{ v$.phone_number.$errors[0].$message }}</span>
                </div>
                <div v-motion-slide-visible-once-left class="flex column">
                    <textarea v-model="message" :disabled="submitText === '' || submitText === 'OK'" class="jura f-medium" name="message"
                              placeholder="Message"></textarea>
                    <span v-if="v$.message && v$.message.$error" class="jura f-medium">{{ v$.message.$errors[0].$message }}</span>
                </div>

                <div v-motion-slide-visible-once-left class="flex column a-center">
                    <div id="captcha_contact" :data-sitekey="captchaKey" class="g-recaptcha"></div>
                    <span v-if="captchaError" class="jura f-medium">Validez le captcha</span>
                </div>

                <button id="btn_submit" v-motion-slide-visible-once-left :disabled="submitText === '' || submitText === 'OK'"
                        class="chakra-petch f-medium bold"
                        type="submit">
                    {{ submitText }}
                    <div v-if="loading" class="loader flex a-center j-center">
                        <LoaderComponent class="white"/>
                    </div>
                </button>
                <span v-if="otherError">Erreur réessayez plus tard...</span>
            </form>

            <hr>

            <div class="flex column a-center">
                <ButtonComponent v-motion-slide-visible-once-right :delay="250" :icon="Phone" background-color="40, 40, 40"
                                 class="flex a-center j-center" color="255, 255, 255" link="tel:+33749386838" text="07 49 38 68 38"/>
                <ButtonComponent v-motion-slide-visible-once-right :icon="AtSign" background-color="40, 40, 40" class="flex a-center j-center"
                                 color="255, 255, 255" link="mailto:nantsamontillet@xylobyte.com" text="nantsamontillet@xylobyte.com"/>
            </div>
        </div>
    </section>
</template>

<script setup>
import SectionTitle from "@/components/sections/home/SectionTitle.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import LoaderComponent from "@/components/sections/LoaderComponent.vue";
import {Phone, AtSign} from "lucide-vue-next";
</script>

<script>
import {defineComponent} from "vue";
import emailjs from '@emailjs/browser';
import {useVuelidate} from '@vuelidate/core'
import {required, minLength, maxLength, not, sameAs, email, numeric} from '@vuelidate/validators'

export default defineComponent({
    name: "ContactSection",
    created() {
        emailjs.init("16LYaYkb_PRy_p7xO");

        this.$nextTick(function () {
            grecaptcha.ready(function () {
                try {
                    grecaptcha.render('captcha_contact')
                } catch (err) {
                    console.log(err);
                }
            });
        });
    },
    data() {
        return {
            v$: useVuelidate(),
            name: '',
            email_adress: '',
            phone_number: '',
            message: '',
            captchaError: false,
            otherError: false,
            captchaKey: import.meta.env.VITE_RECAPTCHA_KEY,
            loading: false,
            submitText: 'Envoyer'
        }
    },
    validations() {
        return {
            name: {required, minLengthValue: minLength(8), maxLengthValue: maxLength(20), otherProperty: not(sameAs(this.email_adress))},
            email_adress: {required, email},
            phone_number: {required, numeric, minLengthValue: minLength(10), maxLengthValue: maxLength(10)},
            message: {required, minLengthValue: minLength(50), maxLengthValue: maxLength(2000)}
        }
    },
    methods: {
        sendEmail() {
            this.v$.$touch();
            grecaptcha.getResponse().length === 0 ? this.captchaError = true : this.captchaError = false;

            if (!this.v$.$error && !this.captchaError) {
                this.loading = true;
                this.submitText = '';

                emailjs.sendForm('gmail_contact', 'gmail_message', '#contact_form')
                    .then(() => {
                        console.log('SUCCESS!');

                        this.loading = false;
                        this.submitText = 'C\'est OK !';
                    }, (error) => {
                        console.log('FAILED...', error);

                        this.otherError = true;
                        this.loading = false;
                        this.submitText = 'Envoyer';
                    });
            }
        }
    }
})
</script>

<style lang="scss" scoped>
@import "@/assets/css/global_var.scss";

.main_ct {
    margin-top: 50px;
    gap: 10px;

    hr {
        width: auto;
        height: 50%;
        border: none;
        border-left: var(--dark-background-color) 1px solid;
        margin-left: 5vw;
    }

    > div {
        width: 50%;
        gap: 30px;
    }
}

#contact_form {
    width: 50%;
    gap: 20px;

    > div {
        gap: 5px;
    }

    span {
        color: red;
        margin-left: 10px;
    }

    input, textarea {
        background-color: var(--light-background-color);
        border: none;
        border-radius: var(--main-border-radius);
        box-shadow: var(--small-shadow);
        padding: 15px;
        max-width: 100%;
        min-width: 100%;
    }

    textarea {
        height: 200px;
    }

    button {
        width: 60%;
        padding: 15px;
        border-radius: var(--main-border-radius);
        background-color: var(--dark-primary-color);
        color: white;
        align-self: center;
        transition: all 0.2s;
        min-height: 50px;

        &:hover {
            background-color: var(--light-primary-color);
            box-shadow: var(--medium-shadow);
        }
    }
}

@media (max-width: $tablet-width - 150px) {
    .main_ct {
        flex-direction: column;
        gap: 30px;
        margin-top: 30px;

        hr {
            margin-left: 0;
            height: auto;
            width: 80%;
            border: none;
            border-top: var(--dark-background-color) 1px solid;
        }

        > div {
            width: 100%;
            margin-bottom: 30px;
        }
    }

    #contact_form {
        width: 100%;
    }
}
</style>