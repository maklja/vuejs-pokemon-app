<template>
  <div
    @click="() => $emit('click', id)"
    class="relative rounded-sm overflow-hidden"
    :class="{ 'border-solid border-2 border-sky-500': selected }"
  >
    <div
      v-if="disabled"
      class="absolute w-full h-full backdrop-brightness-50"
    ></div>
    <img :alt="name" :src="image" loading="lazy" :title="name" />
  </div>
</template>

<script>
export default {
  name: 'PokemonCard',
  props: ['id', 'name', 'image', 'selected', 'disabled'],
  emits: ['click'],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
