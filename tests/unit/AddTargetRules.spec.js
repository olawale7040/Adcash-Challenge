import { shallowMount } from "@vue/test-utils";
import AddTargetRules from "@/components/AddTargetRules.vue";
import { targetingTypes, availableOptions } from "@/utils/exampleData";

const form = {
  targeting_type_id: "",
  rules: [],
};
const form_error = {
  rules: [],
  targeting_type_id: [],
};
const submitTargetingRule = jest.fn();
const handleResetForm = jest.fn();
const spinner = true;
describe("AddTargetRules", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(AddTargetRules, {
      propsData: {
        targetingTypes,
        availableOptions,
        form,
        form_error,
        submitTargetingRule,
        handleResetForm,
        spinner,
      },
    });
  });

  it("Display component title", () => {
    expect(wrapper.html()).toContain("Ad Targeting");
  });

  it("Select Targeting Type", async () => {
    // get targeting options
    const options = wrapper
      .find('[data-testId="targeting-type"]')
      .findAll("option");
    // Select targeting option 'Category' value must be '1'
    await options.at(1).setSelected();
    expect(wrapper.find("option:checked").element.value).toBe("1");
    const items = wrapper
      .find('[data-testId="targeting-rules"]')
      .props("items");
    expect(items.length).toBe(5);
  });

  it("trigger reset button", async () => {
    // trigger the element
    await wrapper.find('[data-testId="reset-button"]').trigger("click");
    expect(handleResetForm).toHaveBeenCalled();
  });

  it("trigger submit targeting form form", async () => {
    // trigger the element
    await wrapper
      .find('[data-testId="add-target-form"]')
      .trigger("submit.prevent");
    expect(submitTargetingRule).toHaveBeenCalled();
  });
});
