<template>
  <div class="block lg:flex items-start justify-start px-4 lg:px-0">
    <div class="w-full lg:w-2/3 h-96 flex items-center justify-center">
      <img
        v-if="pizzaSize === 0"
        class="w-2/3"
        :src="pizzas[curID].images[0]"
        alt=""
      />
      <img
        v-if="pizzaSize === 1"
        class="w-3/4"
        :src="pizzas[curID].images[1]"
        alt=""
      />
      <img
        v-if="pizzaSize === 2"
        class="w-full"
        :src="pizzas[curID].images[2]"
        alt=""
      />
    </div>
    <div>
      <h1 class="text-2xl font-medium mb-5">{{ pizzas[curID].title }}</h1>
      <p>{{ pizzas[curID].desc }}</p>
      <div
        class="
          flex
          mt-5
          justify-between
          w-full
          lg:w-1/2
          bg-slate-200
          p-2
          rounded-xl
          mx-auto
        "
      >
        <p
          @click="pizzaSize = 0, pizzaSizePrice = Number(pizzas[curID].price), totalProductPrice = pizzaSizePrice + totalIngPrice"
          :class="{ 'bg-white rounded-2xl': pizzaSize === 0 }"
          class="hover:cursor-pointer p-2"
        >
          Маленькая
        </p>
        <p
          @click="pizzaSize = 1, pizzaSizePrice = Number(pizzas[curID].price) + 1000, totalProductPrice = pizzaSizePrice + totalIngPrice"
          :class="{ 'bg-white rounded-2xl': pizzaSize === 1 }"
          class="hover:cursor-pointer p-2"
        >
          Средняя
        </p>
        <p
          @click="pizzaSize = 2, pizzaSizePrice = Number(pizzas[curID].price) + 2000, totalProductPrice = pizzaSizePrice + totalIngPrice"
          :class="{ 'bg-white rounded-2xl': pizzaSize === 2 }"
          class="hover:cursor-pointer p-2"
        >
          Большая
        </p>
      </div>
      <div class="flex items-center flex-wrap justify-between">
        <div :class="{ 'border border-main' : ingList.includes(ingridient) }" @click="sendIngridients(ingridient)" class="w-th ing-block rounded-xl my-4 text-center hover:cursor-pointer bg-white p-1" v-for="ingridient of pizzas[curID].ingridients" :key="ingridient">
          <img class="w-1/3 mx-auto" :src="ingridient.image" alt="">
          <p>{{ ingridient.title }}</p>
          <p>{{ ingridient.price }}</p>
        </div>
      </div>
      <p class="text-2xl font-bold text-center">{{ totalProductPrice }}</p>
      <button
        @click="sendObj()"
        class="bg-main text-white rounded-xl p-2 w-1/2 block mx-auto mt-5"
      >
        Добавить в корзину
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SinglePage",
  data() {
    return {
      pizzas: [],
      orders: [],
      pizzaSize: 1,
      pizzaSizePrice: 0,
      ready: null,
      curID: this.$route.params.id - 1,
      currentUser: localStorage.getItem("loggedUser"),
      totalPrice: 0,
      ingList: [],
      totalProductPrice: 0,
      totalIngPrice: 0,
      sentObj: null
    };
  },
  async mounted() {
    let res = await axios.get(
      "https://627a34aa73bad506858480a8.mockapi.io/api/goods"
    );
    this.pizzas = res.data;
    let orders = await axios.get(
      "https://627a34aa73bad506858480a8.mockapi.io/api/orders"
    );
    this.orders = orders.data;
    
    this.pizzaSizePrice = Number(this.pizzas[this.curID].price) + 1000
    this.totalProductPrice = this.pizzaSizePrice
  },
  methods: {
    async sendObj() {
      if (this.orders.length <= 0) {
        let str = {
          goods: [
            {
              title: this.pizzas[this.curID].title,
              price: this.pizzas[this.curID].price,
              image: this.pizzas[this.curID].images,
              amount: 1,
            },
          ],
          total: 0,
          userLogin: this.currentUser,
          status: false,
        };
        this.ready = str;
        await axios.post(
          "https://627a34aa73bad506858480a8.mockapi.io/api/orders",
          this.ready
        );
        console.log("отправлено");
        this.$router.go()
      } else if (this.orders.length > 0) {
        this.orders.forEach(item => {
          if(item.userLogin == this.currentUser && item.status === false) {
            this.sentObj = {
              title: this.pizzas[this.curID].title,
              price: this.totalProductPrice,
              size: this.pizzaSize,
              image: this.pizzas[this.curID].images[1],
              ingridient: this.ingList
            }
            item.goods.push(this.sentObj)        
            axios.put("https://627a34aa73bad506858480a8.mockapi.io/api/orders/1", item)
          } else {
            console.log('не вышло')
          }
        });
      }
    },
    sendIngridients(ingr) {
      if(this.ingList.includes(ingr) === false) {
        this.ingList.push(ingr)
        ingr.position = this.ingList.length-1
        this.totalIngPrice = this.totalIngPrice + parseInt(ingr.price)
      } else {
        if (this.ingList.length > 0) {
          this.ingList.splice(ingr.position,1)
          for (let i=0; i < this.ingList.length; i++) {
            this.ingList[i].position = i
          }
          this.totalIngPrice = this.totalIngPrice - parseInt(ingr.price)
        }
      }
      this.totalProductPrice = this.pizzaSizePrice + this.totalIngPrice
    }
  },
};
</script>