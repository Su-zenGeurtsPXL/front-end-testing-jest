<template>
  <button v-on:click="purchase">
    <p v-if="purchased">Undo</p>
    <p v-else>Purchase</p>
  </button>
  <p>{{ message }}</p>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';

export const purchase = () => {
  const businessHours = [9, 18];
  const currentHour = new Date().getHours();
  const [open, close] = businessHours;

  if (currentHour > open && currentHour < close) return { message: 'Success' };

  return { message: 'Error' };
};

export default defineComponent({
  name: 'HomeView',
  setup() {
    const purchased = ref<boolean>(false);
    const message = ref<string>('Nothing happened yet');
    const toggleStatus = () => {
      if (!purchased.value) {
        const purchaseData = purchase();
        message.value = 'Purchase: ' + purchaseData.message;
      } else {
        message.value = '';
      }
      purchased.value = !purchased.value;
    };

    return {
      purchased,
      message,
      purchase: toggleStatus,
    };
  },
});
</script>
