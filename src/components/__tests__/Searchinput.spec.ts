import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import SearchInput from "../SearchInput.vue";

describe("SearchInput", () => {
  it("prefill", () => {
    const wrapper = mount(SearchInput, { props: { value: "Friends" } });
    expect(wrapper.get("input").element.value).toContain("Friends");
  });

  it("searchChange event", async () => {
    const wrapper = mount(SearchInput, { props: { value: "Friends" } });

    wrapper.find("button").trigger("click");

    await wrapper.vm.$nextTick();

    const searchChangeEvent = wrapper.emitted("searchChange") as unknown[];
    expect(searchChangeEvent[0]).toEqual(["Friends"]);
  });
});
