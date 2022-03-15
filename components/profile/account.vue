<template>
  <div class="account">
    <h2 class="header-section text-center">Hello ! {{UserData.name}}</h2>
    <hr>
    <div class="row">
      <div class="col-md-2 title">
        Name
      </div>
      <div class="col-md-10">
         {{UserData.name}}
      </div>
      <div class="col-md-2 title">
        E-mail
      </div>
      <div class="col-md-10">
         {{UserData.email}}
      </div>
      <div class="col-md-2 title">
        Mobile
      </div>
      <div class="col-md-10">
         {{UserData.phone}}
      </div>
      <b-button class="text-center m-auto" @click="openEdit()">Edit Profile</b-button>
    </div>
    <b-modal
        v-model="showDetails"
        size="xl"
        centered
        title="BootstrapVue"
        >
        <template #modal-header="{ close }">
          <!-- Emulate built in modal header close button action -->
          <b-button class="close" size="sm" variant="outline-danger" @click="close()">
            <i class="fas fa-times"></i>
          </b-button>
        </template>
          <div class="data-form">
            <h3 class="text-center header-section">Edit Profile</h3>
            <b-form @submit.prevent="editUserData()">
              <b-form-group
                id="input-group-1"
                label-for="input-1"
                class="mt-5 text-left"
                description="We'll never share your email with anyone else."
              >
                <b-form-input
                  id="input-1"
                  v-model="UserData.email"
                  type="email"
                  placeholder="Enter email"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-2" label-for="input-2">
                <b-form-input
                  id="input-2"
                  v-model="UserData.name"
                  type="text"
                  placeholder="Enter Your Name"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group id="input-group-2" label-for="input-2">
                <b-form-input
                  id="input-2"
                  v-model="UserData.phone"
                  type="text"
                  placeholder="Enter Your Phone"
                  required
                ></b-form-input>
              </b-form-group>
              <div class="row actions">
                <b-button class="btn" type="submit">Edit</b-button>
              </div>
            </b-form>
        </div>
      </b-modal>
      <div class="mt-5">
        <b-alert
          v-if="ErrorMessage"
          show
          class="text-center alert"
          dismissible
          variant="danger"
        >
          {{ ErrorMessage }}
        </b-alert>
        <b-alert
          v-if="SuccessMessage"
          show
          class="text-center alert"
          dismissible
          variant="success"
        >
            {{ SuccessMessage }}
        </b-alert>
      </div>
  </div>
</template>
<script>
import { ServiceFactory } from '../../services/ServiceFactory'
const Service = ServiceFactory.get('profile')

export default {
  name: 'products',
    data: () => ({
      UserData: {},
      showDetails: false,
      ErrorMessage: '',
      SuccessMessage: ''
    }),
    created() {
        this.getUserData()
    },
    computed: {

    },
    methods: {
      openEdit() {
        this.showDetails = true
      },
      async getUserData() {
        const UserData = await Service.getUserData()
            if (UserData.data.status === true) {
                this.UserData = UserData.data.data
            } else {
                this.ErrorMessage = 'Something Error'
                setTimeout(() => {
                    this.ErrorMessage = ''
                  }, 1500)
            }
      },
      async editUserData() {
        const userData = {
          phone: this.UserData.phone,
          email: this.UserData.email,
          name: this.UserData.name,
          _method: 'PUT'
        }
        const Data = await Service.editUserData(userData)
        if(Data.status === 200){
          this.showDetails = false
          this.SuccessMessage = 'profile data updated Successfly'
          setTimeout(() => {
            this.SuccessMessage = ''
          }, 1500)
        } else {
          this.showDetails = false
          this.ErrorMessage = 'something wrong'
          setTimeout(() => {
            this.ErrorMessage = ''
            this.$router.go('/profile')
          }, 500)
        }
      }
    }
}
</script>
