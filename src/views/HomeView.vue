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

<style>
* {
  font-family: 'Roboto', sans-serif;
}

button {
  background-color: #c1ffc3;
  color: black;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 20px 0;
  width: 200px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 5px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
}

button:hover {
  background-color: #a9e7ab;
}

</style>