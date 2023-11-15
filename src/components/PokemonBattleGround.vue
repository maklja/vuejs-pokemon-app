<template>
  <div class="m-10 flex justify-between items-center">
    <div class="flex flex-col gap-1">
      <pokemon-card
        :id="pokemonPlayer1.id"
        :name="pokemonPlayer1.name"
        :image="pokemonPlayer1.images.large"
      />
      <div class="p-1">
        <pokemon-health-bar
          :total="Number(pokemonPlayer1.hp)"
          :value="Number(battleLog.pokemonPlayer1HP)"
        />
      </div>
    </div>

    <div class="mx-5 w-full">
      <label
        for="battle-log"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center"
        >Battle log</label
      >
      <textarea
        id="battle-log"
        rows="20"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        readonly
        :value="battleLog.logs.join('\n')"
      ></textarea>
    </div>

    <div class="flex flex-col gap-1">
      <pokemon-card
        :id="pokemonPlayer2.id"
        :name="pokemonPlayer2.name"
        :image="pokemonPlayer2.images.large"
      />
      <div class="p-1">
        <pokemon-health-bar
          :total="Number(pokemonPlayer2.hp)"
          :value="Number(battleLog.pokemonPlayer2HP)"
        />
      </div>
    </div>
  </div>
  <div class="w-full flex justify-center items-center gap-1">
    <pokemon-attack
      v-for="attack in pokemonPlayer1.attacks"
      :key="attack.name"
      :name="attack.name"
      :damage="attack.damage"
      :text="attack.text"
    />
  </div>
</template>

<script>
import PokemonCard from './PokemonCard.vue';
import PokemonHealthBar from './PokemonHealthBar.vue';
import PokemonAttack from './PokemonAttack.vue';

export default {
  name: 'PokemonBattleGround',
  computed: {
    pokemonPlayer1() {
      return this.$store.state.pokemonPlayer1;
    },
    pokemonPlayer2() {
      return this.$store.state.pokemonPlayer2;
    },
    battleLog() {
      return this.$store.state.battleLog;
    },
  },
  components: { PokemonHealthBar, PokemonCard, PokemonAttack },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
