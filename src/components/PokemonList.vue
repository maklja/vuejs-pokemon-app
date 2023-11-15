<template>
  <div
    class="p-6 grid justify-items-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
  >
    <div class="col-span-full" :style="{ height: `${offset}px` }"></div>
    <div
      :class="{
        'cursor-pointer hover:scale-105 transition duration-150 ease-in-out':
          !pokemon.disabled,
        'cursor-not-allowed': pokemon.disabled,
      }"
      v-for="pokemon in visiblePokemonItems"
      :key="pokemon.id"
      ref="pokemonItemRefs"
    >
      <pokemon-card
        :id="pokemon.id"
        :name="pokemon.name"
        :disabled="pokemon.disabled"
        :image="pokemon.images.large"
        :selected="pokemon.selected"
        @click="($event) => $emit('item-click', $event)"
      />
    </div>
  </div>
</template>

<script>
import PokemonCard from './PokemonCard.vue';
import { currentTailwindScreenSize } from '../utils';

export default {
  name: 'PokemonList',
  props: ['pokemon-items'],
  emits: ['item-click'],
  data() {
    return {
      offset: 0,
      scrollPosition: 0,
      cardTopOffset: 0,
      cardHeight: null,
    };
  },
  components: { PokemonCard },
  computed: {
    visiblePokemonItems() {
      let columnNumber = 2;
      switch (currentTailwindScreenSize()) {
        case '2xl':
        case 'xl':
        case 'lg':
          columnNumber = 5;
          break;
        case 'md':
          columnNumber = 4;
          break;
        case 'sm':
          columnNumber = 3;
          break;
      }

      return this.pokemonItems.filter((_pokemonItem, i) => {
        const cardHeightTop = this.cardHeight * Math.floor(i / columnNumber);
        const cardHeightBottom = this.cardHeight + cardHeightTop;
        // TODO bottom offset
        return (
          cardHeightBottom >= this.offset
          // &&
          // cardHeightTop <= this.offset + window.innerHeight + 300
        );
      });
    },
  },
  methods: {
    scrollPositionListener() {
      if (!this.cardHeight) {
        return;
      }

      this.scrollPosition = document.documentElement.scrollTop;
      const offsetDistance =
        this.cardHeight * Math.floor(this.scrollPosition / this.cardHeight) -
        this.cardTopOffset;
      this.offset = Math.min(offsetDistance, 0);
    },
    setCardHeight() {
      const { pokemonItemRefs } = this.$refs;
      if (!pokemonItemRefs) {
        return;
      }

      this.cardTopOffset = pokemonItemRefs[0]?.offsetTop ?? 0;
      this.cardHeight = 1.1 * (pokemonItemRefs[0]?.offsetHeight ?? 0);
    },
  },
  beforeMount() {
    window.addEventListener('scroll', this.scrollPositionListener);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.scrollPositionListener);
  },
  updated() {
    if (!this.cardHeight) {
      this.$nextTick(() => this.setCardHeight());
    }
  },
};
</script>

<style scoped></style>
