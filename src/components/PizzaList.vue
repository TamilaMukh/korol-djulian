<template>
  <div class="flex flex-wrap justify-between">
    <div @click="$router.push({ name: 'single', params: { id: obj.id } })" class="w-full lg:w-1/4 p-4 my-3" v-for="obj of pizzas" :key="obj.id">
      <img :src="obj.images[1]" alt="">
      <div>
        <p class="text-2xl font-medium">{{ obj.title }}</p>
        <p class="text-sm h-24 my-3">{{ obj.desc }}</p>
        <div class="flex items-center justify-between">
          <p class="text-2xl font-medium">от {{ obj.price }} тг.</p>
          <button class="text-main bg-orange-100 py-2 px-4 rounded-full">Выбрать</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "PizzaList",
  data() {
    return {
      pizzas: []
    }
  },
  async mounted() {
    let res = await axios.get('https://627a34aa73bad506858480a8.mockapi.io/api/goods')
    this.pizzas = res.data;
  }
}
</script>
