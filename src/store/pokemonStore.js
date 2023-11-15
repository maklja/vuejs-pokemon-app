import { createStore } from 'vuex';

function isPokemonPickedByPlayer(state, pokemon) {
  return (
    pokemon.id === state.pokemonPlayer1?.id ||
    pokemon.id === state.pokemonPlayer2?.id
  );
}

export const store = createStore({
  state() {
    return {
      search: '',
      pokemonList: [],
      pokemonPlayer1: null,
      pokemonPlayer2: null,
      battleLog: {
        started: false,
        pokemonPlayer1HP: 0,
        pokemonPlayer2HP: 0,
        logs: [],
      },
      canGameStart: false,
    };
  },
  mutations: {
    setSearch(state, search) {
      state.search = search;
    },
    addToPokemonList(state, pokemonList) {
      state.pokemonList = [...state.pokemonList, ...pokemonList];
    },
    clearPokemonList(state) {
      state.pokemonList = [];
    },
    setPokemonPlayer1(state, pokemonPlayer1) {
      state.pokemonPlayer1 = pokemonPlayer1;
      state.canGameStart = Boolean(pokemonPlayer1 && state.pokemonPlayer2);
      state.pokemonList = state.pokemonList.map((pokemon) => {
        const isPokemonPlayer = isPokemonPickedByPlayer(state, pokemon);
        return {
          ...pokemon,
          disabled: state.canGameStart && !isPokemonPlayer,
          selected: isPokemonPlayer,
        };
      });
    },
    setPokemonPlayer2(state, pokemonPlayer2) {
      state.pokemonPlayer2 = pokemonPlayer2;
      state.canGameStart = Boolean(pokemonPlayer2 && state.pokemonPlayer1);
      state.pokemonList = state.pokemonList.map((pokemon) => {
        const isPokemonPlayer = isPokemonPickedByPlayer(state, pokemon);
        return {
          ...pokemon,
          disabled: state.canGameStart && !isPokemonPlayer,
          selected: isPokemonPlayer,
        };
      });
    },
    startBattle(state) {
      state.battleLog = {
        started: true,
        pokemonPlayer1HP: state.pokemonPlayer1.hp,
        pokemonPlayer2HP: state.pokemonPlayer2.hp,
        logs: [
          `Battle ${state.pokemonPlayer1.name} vs ${state.pokemonPlayer2.name} is about to start`,
        ],
      };
    },
  },
});
