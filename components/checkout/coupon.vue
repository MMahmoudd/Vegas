<template>
    <b-form @submit.prevent="submit">
        <b-input v-model="coupon" :placeholder="$t('checkout.couponPlaceholder')"  />
        <b-button type="submit">{{$t('checkout.submitCoupon')}}</b-button>
    </b-form>
</template>

<script>
import Service from '../../services/Service'
export default {
    name : 'Coupon',
    data : () => ({
        coupon: ''
    }),
    methods: {
        async submit () {
            Service.get(`http://104.248.89.169:6100/api/discount?restaurant_id=2&code=${this.coupon}`).then(res => {
                console.log(res)
            })
        }
    }
}
</script>