import { shallowMount } from "@vue/test-utils";
import Header from "@/components/Header.vue";

describe("Header", () => {
  it("Component renders well", () => {
    const container = shallowMount(Header, {});
    expect(container.html()).toContain("AdCash Coding Challenge");
  });
});
