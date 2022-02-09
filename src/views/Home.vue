<template>
  <div>
    <Header />
    <main class="content">
      <AddTarget v-bind="{ form, selectionOptions, targetingTypes }" />
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
    savedTargetRules: [],
    form: {
      targeting_type_id: 1,
    },
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
        .then((response) => {
          console.log(response, "fetch");
        })
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
            this.savedTargetRules = this.reduceSavedRules(eval(resp[4].data));
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

    reduceSavedRules(arr) {
      return arr.reduce((acc, val, ind) => {
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
  },
  computed: {
    selectionOptions() {
      const { targeting_type_id } = this.form;
      switch (targeting_type_id) {
        case 1:
          return this.categoryTypes;
        case 2:
          return this.countryTypes;
        case 3:
          return this.deviceTypes;
        default:
          return [];
      }
    },
  },
};
</script>
