// eslint-disable-next-line
<template>
  <div>
    <button v-on:click="toggleStatus">
    <p v-if="purchased">Undo</p>
    <p v-else>Purchase</p>
  </button>
  <p>{{ message }}</p>
  </div>
</template>

<script>

export default {
  name: 'HomeView',
  data: () => ({
    purchased: false,
    message: 'Nothing happened yet'
  }),
  methods: {
    toggleStatus () {
      if (!this.purchased) {
        const purchaseData = this.purchase()
        this.message = 'Purchase: ' + purchaseData.message
      } else {
        this.message = ''
      }

      this.purchased = !this.purchased
    },
    purchase () {
      const businessHours = [9, 18]
      const currentHour = new Date().getHours()
      const [open, close] = businessHours

      if (currentHour > open && currentHour < close) return { message: 'Success' }
      return { message: 'Error' }
    }
  }
}
</script>