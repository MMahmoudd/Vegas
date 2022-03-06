<template>
  <div class="account">
    {{UserData}}
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
