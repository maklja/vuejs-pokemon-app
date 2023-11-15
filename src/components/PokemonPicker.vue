<template>
  <div class="p-4 flex flex-col gap-8">
    <div class="flex justify-around items-center">
      <pokemon-player
        :id="pokemonPlayer1?.id"
        :name="pokemonPlayer1?.name"
        :image="pokemonPlayer1?.images.small"
        @player-click="removePlayer('player1')"
      />

      <div class="h-full flex flex-col items-center gap-8">
        <img class="w-16 h-16" alt="versus" src="@/assets/vs.png" />

        <button
          class="bg-blue-500 text-white font-bold py-2 px-4 rounded"
          :class="{
            'opacity-50 cursor-not-allowed': !canGameStart,
            'hover:bg-blue-700': canGameStart,
          }"
          :disabled="!canGameStart"
          @click="startGame()"
        >
          Start game
        </button>
      </div>

      <pokemon-player
        :id="pokemonPlayer2?.id"
        :name="pokemonPlayer2?.name"
        :image="pokemonPlayer2?.images.small"
        @player-click="removePlayer('player2')"
      />
    </div>

    <div class="border border-slate-500"></div>

    <div>
      <div class="sticky top-1.5 left-0 w-full flex justify-center z-10">
        <search-input
          :model-value="search"
          @update:model-value="searchChange"
        />
      </div>

      <pokemon-list
        :pokemon-items="pokemonList"
        @item-click="onCardClick"
      ></pokemon-list>
      <div v-if="errorMessage" class="w-full text-center text-red-600 text-lg">
        {{ errorMessage }}
      </div>
      <circle-spinner v-show="loading" />
    </div>
  </div>
</template>

<script>
import PokemonList from './PokemonList.vue';
import PokemonPlayer from './PokemonPlayer.vue';
import CircleSpinner from './CircleSpinner.vue';
import SearchInput from './SearchInput.vue';
import { fetchPokemonList } from '../service/pokemon';

export default {
  name: 'PokemonPicker',
  data() {
    return {
      page: 1,
      pageSize: 40,
      loading: false,
      errorMessage: '',
    };
  },
  computed: {
    search() {
      return this.$store.state.search;
    },
    pokemonList() {
      return this.$store.state.pokemonList;
    },

    pokemonPlayer1() {
      return this.$store.state.pokemonPlayer1;
    },
    pokemonPlayer2() {
      return this.$store.state.pokemonPlayer2;
    },
    canGameStart() {
      return this.$store.state.canGameStart;
    },
  },
  components: { PokemonList, PokemonPlayer, CircleSpinner, SearchInput },
  methods: {
    async searchChange(search) {
      this.loading = false;
      this.page = 1;

      this.$store.commit('setSearch', search);
      this.$store.commit('clearPokemonList');
      await this.fetchPokemonList();
      window.scrollTo({
        top: 0,
        left: 0,
      });
    },
    removePlayer(player) {
      switch (player) {
        case 'player1':
          return this.$store.commit('setPokemonPlayer1', null);
        case 'player2':
          return this.$store.commit('setPokemonPlayer2', null);
      }
    },
    isPokemonPlayer(pokemonId) {
      return [this.pokemonPlayer1?.id, this.pokemonPlayer2?.id]
        .filter(Boolean)
        .includes(pokemonId);
    },
    async fetchPokemonList() {
      if (this.loading) {
        return;
      }

      try {
        this.loading = true;
        const searchQuery = this.search ? `name:${this.search}*` : '';
        const { data } = await fetchPokemonList(
          this.page,
          this.pageSize,
          searchQuery
        );
        this.$store.commit(
          'addToPokemonList',
          data.map((pokemon) => ({
            ...pokemon,
            disabled: this.canGameStart && !this.isPokemonPlayer(pokemon.id),
            selected: this.isPokemonPlayer(pokemon.id),
          }))
        );
      } catch (error) {
        console.error(error);
        this.errorMessage =
          'Failed to retrieve pokemon cards. Please try again later.';
      } finally {
        this.loading = false;
      }
    },
    infiniteScrollListener() {
      const { scrollTop, offsetHeight } = document.documentElement;
      const scrollPosition = scrollTop + window.innerHeight;
      if (!this.loading && scrollPosition >= offsetHeight) {
        this.page++;
        this.fetchPokemonList();
      }
    },
    onCardClick(id) {
      if (this.pokemonPlayer1?.id === id) {
        return this.$store.commit('setPokemonPlayer1', null);
      }

      if (this.pokemonPlayer2?.id === id) {
        return this.$store.commit('setPokemonPlayer2', null);
      }

      const pokemon = this.pokemonList.find((pokemon) => pokemon.id === id);
      if (this.pokemonPlayer1 == null) {
        return this.$store.commit('setPokemonPlayer1', pokemon);
      }
      if (this.pokemonPlayer2 == null) {
        return this.$store.commit('setPokemonPlayer2', pokemon);
      }
    },
    startGame() {
      this.$store.commit('startBattle');
      this.$router.push({ name: 'battle-ground' });
    },
  },
  beforeMount() {
    this.$store.commit('clearPokemonList');
    this.fetchPokemonList();

    window.addEventListener('scroll', this.infiniteScrollListener);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.infiniteScrollListener);
  },
};
</script>

<style scoped></style>
