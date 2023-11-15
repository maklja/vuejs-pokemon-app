<template>
  <div class="w-full h-3 rounded-md overflow-hidden bg-neutral-300">
    <div
      class="w-full h-full bg-lime-600"
      :style="{ width: `${percent}%` }"
    ></div>
  </div>
  <div class="w-full text-center">{{ value }} / {{ total }}</div>
</template>

<script>
export default {
  name: 'PokemonHealthBar',
  props: {
    total: {
      type: Number,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  computed: {
    percent() {
      return Math.round((this.value / this.total) * 100);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
