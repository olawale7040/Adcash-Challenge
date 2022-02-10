<template>
  <section class="section-container">
    <h1>Ad Targeting</h1>
    <div class="form-container">
      <form @submit="submitTargetingRule">
        <div class="form-row">
          <div class="target-type-form">
            <div class="form-label rules-label">
              <div>Type</div>
              <div class="error-msg" v-if="form_error.targeting_type_id">
                {{ form_error.targeting_type_id[0] }}
              </div>
            </div>
            <select
              v-model="form.targeting_type_id"
              class="form-control"
              name="target_type"
            >
              <option value="">-select option-</option>
              <option
                v-for="target in targetingTypes"
                :key="target.id"
                :value="target.id"
                v-if="target.id < 4"
              >
                {{ target.name }}
              </option>
            </select>
          </div>
          <div class="target-rule-form">
            <div class="form-label rules-label">
              <div>Rules</div>
              <div class="error-msg" v-if="form_error.rules">
                {{ form_error.rules[0] }}
              </div>
            </div>
            <v-combobox
              class="vuetify-combo"
              v-model="form.rules"
              :filter="filter"
              :hide-no-data="!search"
              :items="availableOptions"
              :search-input.sync="search"
              hide-selected
              label="Search for an option"
              item-value="availableOptions.name"
              item-text="name"
              multiple
              small-chips
              flat
              solo
            >
              <template v-slot:selection="{ attrs, item, parent, selected }">
                <v-chip
                  v-if="item === Object(item)"
                  v-bind="attrs"
                  :color="`${item.name} lighten-3`"
                  :input-value="selected"
                  label
                  small
                >
                  <span class="pr-2">
                    {{ item.name }}
                  </span>
                  <v-icon small @click="parent.selectItem(item)">
                    $delete
                  </v-icon>
                </v-chip>
              </template>
            </v-combobox>
          </div>
        </div>
        <div class="form-row btn-wrapper">
          <button @click="handleResetForm" type="reset" class="btn reset-btn">
            Reset
          </button>
          <button type="submit" class="btn add-btn">
            Add rule
            <img
              src="../assets/img/preloader.gif"
              style="margin-left: 20px"
              class="button-spinner"
              v-show="spinner"
            />
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: "AddTarget",
  props: {
    targetingTypes: {
      type: Array,
      required: true,
    },
    availableOptions: {
      type: Array,
      required: true,
    },
    form: {
      type: Object,
      required: true,
    },
    form_error: {
      type: Object,
      required: true,
    },
    submitTargetingRule: {
      type: Function,
      required: true,
    },
    spinner: {
      type: Boolean,
      required: true,
    },
    handleResetForm: {
      type: Function,
      required: true,
    },
  },
  components: {},
  data: () => ({
    x: 0,
    search: null,
    y: 0,
  }),
  methods: {
    filter(item, queryText, itemText) {
      if (item.header) return false;

      const hasValue = (val) => (val != null ? val : "");

      const text = hasValue(itemText);
      const query = hasValue(queryText);

      return (
        text.toString().toLowerCase().indexOf(query.toString().toLowerCase()) >
        -1
      );
    },
  },
  watch: {
    "form.targeting_type_id": {
      immediate: false,
      handler: function (newValue, oldValue) {
        if (newValue !== oldValue) {
          this.form.rules = [];
        }
      },
    },
  },
};
</script>
<style scoped>
.form-container {
  margin-top: 32px;
}
.form-row {
  display: flex;
  gap: 32px;
}
.target-type-form {
  width: 30%;
}
.target-rule-form {
  width: 70%;
}
.form-label {
  font-size: 16px;
  /* color: #f1356d; */
  color: #0781f2;
  text-align: left;
}

.form-control {
  background: #ffffff;
  border: 1px solid #e4e5e7;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 16px;
  width: 100%;
  margin-top: 16px;
  height: 50px;
  cursor: pointer;
  padding-bottom: 8px;
}
.form-control:focus {
  outline: none;
}
.btn-wrapper {
  margin-top: 32px;
  justify-content: flex-end;
  gap: 24px;
}

.reset-btn {
  background: #ffffff;
  font-style: normal;
  font-weight: normal;
  color: #0781f2;
}
.add-btn {
  background: #0781f2;
  color: #fdfdfd;
  font-style: normal;
  font-weight: 500;
}
.rules-label {
  display: flex;
  justify-content: space-between;
}
.error-msg {
  color: red;
  float: right;
  font-size: 12px;
  margin-right: 15px;
}
</style>
<style>
.vuetify-combo.v-text-field > .v-input__control > .v-input__slot:before {
  border: 0psg;
}
.vuetify-combo .v-input__slot {
  border: solid 1px #ced4da;
  margin-bottom: 0 !important;
  margin-top: 16px;
}
.vuetify-combo.v-text-field.v-text-field--enclosed .v-text-field__details {
  display: none;
}
</style>
