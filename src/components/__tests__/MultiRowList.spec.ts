import { describe, it, expect } from "vitest";

import { mount, RouterLinkStub } from "@vue/test-utils";
import MultiRowList from "../MultiRowList.vue";

describe("MultiRowList", () => {
  it("should render img tag for each item in given items", () => {
    const wrapper = mount(MultiRowList, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
      props: {
        items: [
          {
            image: "someImage",
            id: 1,
            name: "Friends",
            link: "somelink",
          },
          {
            image: "someImage",
            id: 2,
            name: "Friends2",
            link: "somelink",
          },
        ],
      },
    });
    expect(wrapper.findAll("img").length).toEqual(2);
  });

  it("should render given template in slot", () => {
    const wrapper = mount(MultiRowList, {
      slots: {
        1: '<div id="slot-1">slot 1 div</div>',
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
      props: {
        items: [
          {
            image: "someImage",
            id: 1,
            name: "Friends",
            link: "somelink",
          },
          {
            image: "someImage",
            id: 2,
            name: "Friends2",
            link: "somelink",
          },
        ],
      },
    });
    expect(wrapper.html()).toContain('<div id="slot-1">slot 1 div</div>');
    expect(wrapper.find("#slot-1").exists()).toBe(true);
  });
});
