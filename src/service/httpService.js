import axios from 'axios';

function setupHttpService() {
  return axios.create({
    baseURL: 'https://api.pokemontcg.io/v2',
    timeout: 10_000,
    headers: { 'X-Api-Key': process.env.VUE_APP_POKEMON_API_KEY },
  });
}

export const httpService = setupHttpService();
