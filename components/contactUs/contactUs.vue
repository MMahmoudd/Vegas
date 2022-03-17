<template>
  <div class="contact-us-component">
    <h2 class="header-section">Contact Us</h2>
    <div class="container text-left">
      <p class="header-section font-weight-bold">Get In Touch & Let's Make Something Awesome Aogether.</p>
      <!-- <p class="content">
        1-677-124-44227
        <br>
        184 Main Collins Street West Victoria 8007
        <br>
        Mon – Sat 8.00 – 18.00 Sunday CLOSED
      </p> -->
      <div class="contact-form">
            <b-form @submit.prevent="onSubmit()" v-if="show">
            <div class="row">
              <div class="col-md-6">
                <b-form-group
                  id="input-group-1"
                  label-for="input-1"
                >
                  <b-form-input
                    id="input-1"
                    v-model="form.name"
                    type="text"
                    placeholder="Name"
                    required
                  ></b-form-input>
                </b-form-group>
              </div>
              <div class="col-md-6">
                <b-form-group id="input-group-2" label-for="input-2">
                  <b-form-input
                    id="input-2"
                    v-model="form.email"
                    type="email"
                    placeholder="Email"
                    required
                  ></b-form-input>
                </b-form-group>
              </div>
              <div class="col-12">
                <b-form-group id="input-group-3" label-for="textarea">
                  <b-form-textarea
                    id="textarea"
                    v-model="form.message"
                    placeholder="message"
                    rows="3"
                    max-rows="6"
                  ></b-form-textarea>
                </b-form-group>
              </div>
            </div>
            <div class="submit-button text-right mt-3">
              <b-button type="submit">Send</b-button>
            </div>
              <div class="mt-5">
              <b-alert
                v-if="registerErrorMessage"
                show
                class="text-center alert"
                dismissible
                variant="danger"
              >
                {{ registerErrorMessage }}
            </b-alert>
            <b-alert
                v-if="registerSuccessMessage"
                show
                class="text-center alert"
                dismissible
                variant="success"
              >
                {{ registerSuccessMessage }}
            </b-alert>
            </div>
            </b-form>
        </div>
    </div>
  </div>
</template>
<script>
import { ServiceFactory } from '../../services/ServiceFactory'
const Service = ServiceFactory.get('pages')
  export default {
    data() {
      return {
        form: {
          email: '',
          name: '',
          message: ''
        },
        show: true,
        dismissSecs: 5,
        dismissCountDown: 0,
        registerSuccessMessage: '',
        registerErrorMessage: ''

      }
    },
    methods: {
     async onSubmit() {
        const sendMassage = await Service.sendMassage(this.form)
        if (sendMassage.status === 200) {
          this.registerSuccessMessage = 'Message Sent Successfully'
          setTimeout(() => {
              this.form = {
                email: '',
                name: '',
                message: ''
              }
              this.registerSuccessMessage = ''
            }, 1500)
        } else {
          this.registerErrorMessage = sendMassage.message[0]
          setTimeout(() => {
              this.registerErrorMessage = ''
            }, 1500)
        }
      },
    }
  }
</script>
