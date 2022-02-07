<template>
  <div class="page-container">
    <h1>Ad Targeting</h1>
    <div class="form-container">
      <form>
        <div class="form-row">
          <div class="target-type-form">
            <div class="form-label">Type</div>
            <select class="form-control" name="target_type">
              <option value="Germany">Germany</option>
            </select>
          </div>
          <div class="target-rule-form">
            <div class="form-label">Rules</div>
            <v-combobox
              class="vuetify-combo"
              v-model="model"
              :filter="filter"
              :hide-no-data="!search"
              :items="items"
              :search-input.sync="search"
              hide-selected
              label="Search for an option"
              multiple
              small-chips
              flat
              solo
            >
              <template v-slot:no-data>
                <v-list-item>
                  <v-chip color="blue lighten-3`" label small>
                    {{ search }}
                  </v-chip>
                </v-list-item>
              </template>
              <template v-slot:selection="{ attrs, item, parent, selected }">
                <v-chip
                  v-if="item === Object(item)"
                  v-bind="attrs"
                  :color="`${item.color} lighten-3`"
                  :input-value="selected"
                  label
                  small
                >
                  <span class="pr-2">
                    {{ item.text }}
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
          <button class="btn reset-btn">Reset</button>
          <button class="btn add-btn">Add rule</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddTarget",
  components: {},
  data: () => ({
    editing: null,
    items: [
      {
        text: "Foo",
      },
      {
        text: "Bar",
      },
    ],
    model: [
      {
        text: "Foo",
        color: "blue",
      },
    ],
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

.btn {
  border-radius: 3px;
  padding: 16px 20px;
  font-size: 14px;
  line-height: 100%;
  border: none;
  cursor: pointer;
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
</style>
<style>
.vuetify-combo.v-text-field > .v-input__control > .v-input__slot:before {
  border: 0px;
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
