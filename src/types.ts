export type Show = {
  name: string;
  language: string;
  summary: string;
  id: number;
  genres: string[];
  image: {
    medium: string;
  };
  rating: {
    average: number;
  };
  premiered: string;
  _embedded: {
    seasons: {
      id: number;
      number: number;
      name: string;
      image: {
        medium: string;
      };
      premiereDate: string;
      episodeOrder: number;
      summary: string;
    }[];
  };
};
