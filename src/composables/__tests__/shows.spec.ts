import { describe, it, expect, vi, afterEach } from "vitest";
import useShows from "@/composables/shows";

const showMockData = {
  name: "",
  language: "",
  summary: "",
  id: 1,
  genres: ["", ""],
  image: {
    medium: "",
  },
  rating: {
    average: 1,
  },
  premiered: "",
  _embedded: {
    seasons: [
      {
        id: 1,
        number: 1,
        name: "",
        image: {
          medium: "",
        },
        premiereDate: "",
        episodeOrder: 1,
        summary: "",
      },
    ],
  },
};

describe("shows composable: loadMoreShows", () => {
  const { loadMoreShows, shows, hasMoreShows } = useShows();

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should insert new items from response in shows", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(
        () =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                ok: true,
                json: () => [showMockData],
              });
            }, 0);
          })
      )
    );

    await loadMoreShows();

    expect(shows.value.length).toBe(1);

    await loadMoreShows();

    expect(shows.value.length).toBe(2);
  });

  it("should set hasMoreShows to true if response has items", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(
        () =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                ok: true,
                json: () => [showMockData],
              });
            }, 0);
          })
      )
    );
    await loadMoreShows();

    expect(hasMoreShows.value).toBeTruthy();
  });

  it("should set hasMoreShows to false if response has no items", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(
        () =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                ok: true,
                json: () => [],
              });
            }, 0);
          })
      )
    );

    await loadMoreShows();

    expect(hasMoreShows.value).toBeFalsy();
  });
});
