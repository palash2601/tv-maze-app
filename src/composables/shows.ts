import { ref } from "vue";

type show = {
  name: string;
  language: string;
  summary: string;
  id: number;
  image: {
    medium: string;
  }
};

type shows = {
  score: number;
  show: show;
};

export default function useShows() {
  const show = ref<show>();
  const shows = ref<shows[]>([]);
  const isLoading = ref(false);

  function fetchShows(queryStr: string) {
    isLoading.value = true;
    fetch(`https://api.tvmaze.com/search/shows?q=${queryStr}`)
      .then((response) => response.json())
      .then((data) => (shows.value = data))
      
      .finally(() => {
        isLoading.value = false;
      });
  }

  function fetchShow(showId: string) {
    isLoading.value = true;
    fetch(`https://api.tvmaze.com/shows/${showId}`)
      .then((response) => response.json())
      .then((data) => (show.value = data))
      .finally(() => (isLoading.value = false));
  }

  return { show, shows, fetchShows, fetchShow, isLoading };
}
