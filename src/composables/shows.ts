import { ref, computed } from "vue";

import type { Show } from '../types'

const HOST = `https://api.tvmaze.com`;
const API_URLS = {
  SEARCH: '/search/shows',
  SHOWS: '/shows/'
};

export default function useShows() {
  const show = ref<Show>();
  const shows = ref<Show[]>([]);
  const showsSearchResults = ref<Show[]>([]);
  
  const isLoading = ref(false);
  const page = ref(0)
  const error = ref<string>('')

  const showsCount = computed(() => shows.value.length)

  const hasMoreShows = ref(true);

  const showsByGenre = computed(() => {
    return (genre: string) => {
      
      return shows.value.filter((show) => {
        return show.genres.includes(genre)
      })
    }
  })

  const loadMoreShows = async () => {
    isLoading.value = true
      
      const result = await fetchApi<Show[]>(
        `${`${HOST}`}/shows?page=${page.value}`
      );
          
      shows.value = shows.value.concat(result)
      page.value++

      if (result.length === 0) {
        hasMoreShows.value = false
      }
      isLoading.value = false
  }

  async function searchShows(queryStr: string) {
    isLoading.value = true;
    const data = await fetchApi<{show: Show}[]>(
      `${`${HOST}${API_URLS.SEARCH}`}?q=${queryStr}`
    );
    showsSearchResults.value = data.map(item => item.show);
    isLoading.value = false;
  }

  async function fetchShowDetails(showId: string) {
    isLoading.value = true;
    show.value = await fetchApi<Show>(
      `${`${HOST}${API_URLS.SHOWS}`}${showId}?embed[]=seasons`
    );
    isLoading.value = false
  }

  type FetchOptions<S> = {
    method: string;
    body: S;
  };

  function fetchApi<T, S = void>(url: string, options?: FetchOptions<S>): Promise<T> {
    const { method, body } = options ?? {};
    error.value = '';
    return fetch(url, {
      method,
      body: body && JSON.stringify(body)
    }).then((response) => {
      if (response.ok) {
        return response.json() as unknown as T;
      }
      error.value = 'Something went wrong';
      isLoading.value = false;
      throw new Error('Something went wrong');
    }).catch(() => {
      error.value = 'Something went wrong';
      isLoading.value = false;
      throw new Error('Something went wrong');
    });
  }

  return { show, shows, fetchShowDetails, isLoading, searchShows, hasMoreShows,
    loadMoreShows, showsCount, showsByGenre, error, showsSearchResults };
}
