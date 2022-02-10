<template>
  <div>
    <Header />
    <main class="content">
      <AddTargetRules
        v-bind="{
          form,
          availableOptions,
          targetingTypes,
          submitTargetingRule,
          form_error,
          spinner,
          handleResetForm,
        }"
      />
      <SavedTargetRules
        v-bind="{
          savedTargetRules,
          findTargetType,
          getRuleName,
          removeDeletedItem,
          errorHandling,
        }"
      />
      <SuccessMessage v-bind="{ message }" />
      <ErrorMessage v-bind="{ message }" />
    </main>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import AddTargetRules from "@/components/AddTargetRules.vue";
import SavedTargetRules from "@/components/SavedTargetRules.vue";
import SuccessMessage from "@/components/SuccessMessage.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";
import {
  getTargetingTypes,
  getCategoryTypes,
  getCountryTypes,
  getDeviceTypes,
  getSavedTargetingRules,
  addNewRules,
} from "@/Api";
export default {
  name: "Home",
  components: {
    Header,
    AddTargetRules,
    SavedTargetRules,
    SuccessMessage,
    ErrorMessage,
  },
  data: () => ({
    targetingTypes: [],
    categoryTypes: [],
    countryTypes: [],
    deviceTypes: [],
    currentRules: [],
    form: {
      targeting_type_id: "",
      rules: [],
    },
    form_error: {
      rules: [],
      targeting_type_id: [],
    },
    spinner: false,
    message: {
      success: "",
      error: "",
    },
    errorHandling: "",
  }),

  mounted() {
    // Fetching all data
    this.getAllData();
  },
  methods: {
    getAllData() {
      Promise.all([
        getTargetingTypes(),
        getCategoryTypes(),
        getCountryTypes(),
        getDeviceTypes(),
        getSavedTargetingRules(),
      ])
        .then((resp) => {
          this.targetingTypes = eval(resp.data);
          if (resp.length > 0) {
            this.targetingTypes = eval(resp[0].data);
            this.categoryTypes = eval(resp[1].data);
            this.countryTypes = eval(resp[2].data);
            this.deviceTypes = eval(resp[3].data);
            this.currentRules = eval(resp[4].data);
          } else {
            //  error handling
            this.errorHandling = "An error has occurred";
          }
        })
        .catch((error) => {
          //  error handling
          this.errorHandling = "An error has occurred";
        });
    },
    findTargetType(id) {
      return this.targetingTypes.find((type) => type.id === id).name;
    },
    // Return rule name from ruleId
    getRuleName(ruleId) {
      let allTypes = [
        ...this.categoryTypes,
        ...this.countryTypes,
        ...this.deviceTypes,
      ];
      const typeFound = allTypes.find((type) => type.id === Number(ruleId));
      if (typeFound) {
        return typeFound.name;
      }
      return "";
    },
    // Submit/Add New Targeting Rule
    submitTargetingRule() {
      this.form_error = {
        rules: [],
        targeting_type_id: [],
      };
      if (!this.form.targeting_type_id) {
        this.form_error.targeting_type_id[0] = "Please select option";
      } else if (this.form.rules.length < 1) {
        this.form_error.rules[0] = "Please select rule";
      } else {
        this.spinner = true;
        const { rules, targeting_type_id } = this.form;
        let rulesSelected = rules.map((item) => item.id.toString());
        let payload = { targeting_type_id, rules: rulesSelected };
        addNewRules(payload)
          .then((response) => {
            if (response.status === 200) {
              let newRules = this.generateNewAddedRules(payload);
              this.currentRules = [...this.currentRules, ...newRules];
              this.handleResetForm();
              this.message.success = "Rule saved successfully";
            } else {
              this.message.error = "An error has occurred";
            }
          })
          .catch((error) => {
            this.message.error = "An error occurred while saving";
          })
          .finally(() => {
            this.spinner = false;
          });
      }
    },
    // Clear/Reset form
    handleResetForm() {
      this.form = { rules: [], targeting_type_id: "" };
    },
    // Exclude/Remove the selected rule
    uniqueTargetingRule(arr1) {
      return arr1.reduce((acc, val) => {
        const findItem = this.currentRules.findIndex((el) => el.rule == val.id);
        if (findItem === -1) {
          acc.push(val);
        }
        return acc;
      }, []);
    },
    // Generate new rule and update state
    generateNewAddedRules(payload) {
      const { targeting_type_id, rules } = payload;
      return rules.map((item) => {
        return { id: item, targeting_type_id, rule: item };
      });
    },
    // Remove/Delete rule
    removeDeletedItem(payload) {
      const { rules } = payload;
      this.currentRules = this.currentRules.filter(
        (item) => rules.indexOf(item.rule) === -1
      );
    },
  },
  computed: {
    // Available option base on selected target
    availableOptions() {
      const { targeting_type_id } = this.form;
      let rules;
      switch (targeting_type_id) {
        case 1:
          rules = this.categoryTypes;
          return this.uniqueTargetingRule(rules);
        case 2:
          rules = this.countryTypes;
          return this.uniqueTargetingRule(rules);
        case 3:
          rules = this.deviceTypes;
          return this.uniqueTargetingRule(rules);
        default:
          return [];
      }
    },
    // Recomputing existing rules for proper loop in grid
    savedTargetRules() {
      const arr = this.currentRules;
      if (arr.length > 0) {
        return arr.reduce((acc, val) => {
          const index = acc.findIndex(
            (el) => el.targeting_type_id === val.targeting_type_id
          );
          if (index !== -1) {
            acc[index]["rules"].push(val.rule);
          } else {
            acc.push({ ...val, rules: [`${val.rule}`] });
          }
          return acc;
        }, []);
      }
      return [];
    },
  },
};
</script>
