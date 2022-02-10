<template>
  <div>
    <Header />
    <main class="content">
      <div v-if="successText" class="success message-wrapper">
        <div class="msg-content">{{ successText }}</div>
      </div>
      <div v-if="errorText" class="error message-wrapper">
        <div class="msg-content">{{ errorText }}</div>
      </div>
      <AddTarget
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
        v-bind="{ savedTargetRules, findTargetType, computeRules }"
      />
    </main>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import AddTarget from "@/components/AddTarget.vue";
import SavedTargetRules from "@/components/SavedTargetRules.vue";
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
    AddTarget,
    SavedTargetRules,
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
    successMessage: false,
    successText: "",
    errorMessage: false,
    errorText: "",
  }),

  mounted() {
    this.getAllData();
    // this.getApi();
  },
  methods: {
    getApi() {
      fetch("https://private-anon-82e8a3143d-adcashdsp.apiary-mock.com/types", {
        responseType: "text",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((response) => {})
        .catch((err) => {
          console.log(err);
        });
    },
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
            //  error handling for
          }
        })
        .catch((error) => {
          //  error handling for
          console.log(error);
        });
    },
    findTargetType(id) {
      return this.targetingTypes.find((type) => type.id === id).name;
    },
    computeRules(ruleId) {
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
    submitTargetingRule(event) {
      event.preventDefault();
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
            console.log(response);
            this.successText = "Rule saved successfully";
            let newRules = this.generateNewAddedRules(payload);
            this.currentRules = [...this.currentRules, ...newRules];
            this.handleResetForm();
          })
          .catch((error) => {
            this.errorText = "An error occurred while saving";
          })
          .finally(() => {
            this.spinner = false;
          });
      }
    },
    handleResetForm() {
      this.form = { rules: [], targeting_type_id: "" };
    },
    uniqueTargetingRule(arr1, arr2) {
      return arr1.reduce((acc, val) => {
        const findItem = arr2.findIndex((el) => el.rule == val.id);
        if (findItem === -1) {
          acc.push(val);
        }
        return acc;
      }, []);
    },
    generateNewAddedRules(payload) {
      const { targeting_type_id, rules } = payload;
      return rules.map((item) => {
        return { id: item, targeting_type_id, rule: item };
      });
    },
  },
  computed: {
    availableOptions() {
      const { targeting_type_id } = this.form;
      const existingRules = this.savedTargetRules;
      console.log(existingRules, "hey update");
      let rules;
      switch (targeting_type_id) {
        case 1:
          rules = this.categoryTypes;
          return this.uniqueTargetingRule(rules, existingRules);
        case 2:
          rules = this.countryTypes;
          return this.uniqueTargetingRule(rules, existingRules);
        case 3:
          rules = this.deviceTypes;
          return this.uniqueTargetingRule(rules, existingRules);
        default:
          return [];
      }
    },
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
  watch: {
    errorText: {
      handler: function (val) {
        if (val) {
          setTimeout(() => {
            val = false;
            this.errorText = "";
          }, 4000);
        }
      },
    },
    successText: {
      handler: function (val) {
        if (val) {
          setTimeout(() => {
            val = false;
            this.successText = "";
          }, 4000);
        }
      },
    },
  },
};
</script>
