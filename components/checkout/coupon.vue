<template>
    <b-form @submit.prevent="submit">
        <b-input  />
        <b-button type="submit"> Apply coupon </b-button>
    </b-form>
</template>

<script>
import Service from '../../services/Service'
export default {
    name : 'Coupon',
    methods: {
        async submit () {
            Service.get('http://104.248.89.169:6100/api/discount?restaurant_id=2&code=xyz').then(res => {
                console.log(res)
            })
        }
    }
}
</script>