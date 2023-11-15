<template>
  <div
    class="bg-slate-100 rounded-md border-slate-300 border-2 p-1 transition duration-150 ease-in-out"
    :class="{
      'hover:scale-105 hover:border-sky-500 cursor-pointer ': allowFocus,
    }"
    @click.stop.prevent="() => $emit('player-click', id)"
  >
    <div class="w-40 h-56 flex flex-col justify-center">
      <img
        :alt="name"
        :src="image"
        loading="lazy"
        title="Click to remove player"
      />
    </div>
  </div>
</template>

<script>
import pokemonPlaceholderImg from '../assets/pokemon-placeholder.png';

export default {
  name: 'PokemonPlayer',
  emits: ['player-click'],
  props: {
    id: String,
    name: String,
    image: {
      type: String,
      default: pokemonPlaceholderImg,
    },
    allowFocus: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped></style>
