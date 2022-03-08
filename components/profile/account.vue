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
    }),
    created() {
        this.getUserData()
    },
    computed: {

    },
    methods: {
      async getUserData() {
        const UserData = await Service.getUserData()
            console.log('UserData', UserData)
            if (UserData.data.status === true) {
                this.UserData = UserData.data.data
            } else {
                this.ErrorMessage = 'Something Error'
                // this.ErrorMessage = getGovernrate.message[0]
                setTimeout(() => {
                    this.ErrorMessage = ''
                  }, 1500)
            }
      }
    }
}
</script>
