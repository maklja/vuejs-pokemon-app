import { httpService } from '../httpService';

export async function fetchPokemonList(page = 1, pageSize = 50, query) {
  const { data } = await httpService.get('/cards', {
    params: { page, pageSize, q: query },
  });

  return data;
}
