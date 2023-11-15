<template>
  <div>
    <button
      :title="text"
      class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
    >
      {{ name }} - {{ damage }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'PokemonAttack',
  props: ['name', 'damage', 'text'],
};
</script>

<style scoped></style>
