import { describe, it, expect, beforeAll } from "vitest";

import { mount, RouterLinkStub } from "@vue/test-utils";
import ShowsList from '../ShowsList.vue'
import PrimeVue from 'primevue/config';

const showMockData = {
  name: '',
  language: '',
  summary: '',
  id: 1,
  genres: ['', ''],
  image: {
    medium: '',
  },
  rating: {
    average: 1,
  },
  premiered: '',
  _embedded: {
    seasons: [{
      id: 1,
      number: 1,
      name: '',
      image: {
        medium: '',
      },
      premiereDate: '',
      episodeOrder: 1,
      summary: '',
    }]
  }
}

describe("ShowsList", () => {

  it("should render skeleton when isLoading is true", () => {
    const wrapper = mount(ShowsList, { global: {
      stubs: {
        RouterLink: RouterLinkStub,
      },
      plugins: [PrimeVue],
    },props: { isLoading: true, shows: [] } });
   expect(wrapper.find('[data-test="skeleton"]').exists()).toBe(true)
  });

  describe('carousel visibility is true', () => {
    const props = { isLoading: false, shows: [1,2,3,4,5,6].map((item) => ({...showMockData, id: item})) }
    const mountConfigs = { global: {
      stubs: {
        RouterLink: RouterLinkStub,
      },
      plugins: [PrimeVue],
    },props:  {...props}}
    beforeAll(() => {
      window.innerWidth = 1200;
    });
    it("should render carousel", async () => {
      const wrapper = mount(ShowsList, {...mountConfigs});
      await wrapper.vm.$nextTick();
      expect(wrapper.find('[data-test="Carousel"]').exists()).toBe(true);
    });

    it("should NOT render MultiRowList", async () => {
      const wrapper = mount(ShowsList, {...mountConfigs});
      await wrapper.vm.$nextTick();
      expect(wrapper.find('[data-test="MultiRowList"]').exists()).toBe(false);
    });
  })
  

  describe('carousel visibility is false', () => {

    const props = { isLoading: false, shows: [1,2].map((item) => ({...showMockData, id: item})) }
    const mountConfigs = { global: {
      stubs: {
        RouterLink: RouterLinkStub,
      },
      plugins: [PrimeVue],
    },props:  {...props}}
    beforeAll(() => {
      window.innerWidth = 1200;
    });

    it("should NOT render carousel", async () => {
      const wrapper = mount(ShowsList, {...mountConfigs});
      await wrapper.vm.$nextTick();
      expect(wrapper.find('[data-test="Carousel"]').exists()).toBe(false);
    });

    it("should render MultiRowList", async () => {
      const wrapper = mount(ShowsList, {...mountConfigs});
      await wrapper.vm.$nextTick();
      expect(wrapper.find('[data-test="MultiRowList"]').exists()).toBe(true);
    });
  })

  describe('carousel visibility', () => {
    const props = { isLoading: false, shows: [1,2,3,4,5,6].map((item) => ({...showMockData, id: item})) }
    const mountConfigs = { global: {
      stubs: {
        RouterLink: RouterLinkStub,
      },
      plugins: [PrimeVue],
    },props:  {...props}}


    it('should be true when width > 1024 & item > 4', async () => {
      const wrapper = mount(ShowsList, {...mountConfigs});
      await wrapper.vm.$nextTick();
      expect(wrapper.find('[data-test="Carousel"]').exists()).toBe(true);
    })

    it('should be false when width > 1024 & item < 4', async () => {
      const wrapper = mount(ShowsList, {...mountConfigs, props: { isLoading: false, shows: [1,2,3].map((item) => ({...showMockData, id: item})) }});
      await wrapper.vm.$nextTick();
      expect(wrapper.find('[data-test="Carousel"]').exists()).toBe(false);
    })

    it('should be false when width > 1024 & item = 4', async () => {
      const wrapper = mount(ShowsList, {...mountConfigs, props: { isLoading: false, shows: [1,2,3,4].map((item) => ({...showMockData, id: item})) }});
      await wrapper.vm.$nextTick();
      expect(wrapper.find('[data-test="Carousel"]').exists()).toBe(false);
    })
  })

  

});
