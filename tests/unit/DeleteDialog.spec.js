import { shallowMount } from "@vue/test-utils";
import DeleteDialog from "@/components/DeleteDialog.vue";

const handleDeleteTarget = jest.fn();
const closeDialog = jest.fn();
const spinner = true;
describe("DeleteDialog", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(DeleteDialog, {
      propsData: {
        handleDeleteTarget,
        closeDialog,
        spinner,
      },
    });
  });
  it("Component renders well", () => {
    expect(wrapper.html()).toContain("Delete Rule");
  });
  it("trigger go back button", async () => {
    // trigger the element
    await wrapper.find('[data-testId="go-back-button"]').trigger("click");
    expect(closeDialog).toHaveBeenCalled();
  });
  it("trigger proceed button click", async () => {
    await wrapper.find('[data-testId="proceed-button"]').trigger("click");
    expect(handleDeleteTarget).toHaveBeenCalled();
  });
});
