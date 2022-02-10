<template>
  <section class="section-container">
    <h1>Saved Targeting Rules</h1>
    <div class="saved-rules-table">
      <div class="table-head">
        <div class="column-one">Type</div>
        <div class="column-two">Rules</div>
        <div class="column-three">Action</div>
      </div>
      <div
        class="table-row"
        v-for="rule in savedTargetRules"
        :key="rule.id"
        v-if="rule.targeting_type_id < 4"
      >
        <div class="column-one">
          {{ findTargetType(rule.targeting_type_id) }}
        </div>
        <div class="column-two saved-rules-list">
          <ChipButton
            v-for="item in rule.rules"
            :key="item"
            v-on:click="handleDeleteModal(rule.targeting_type_id, item)"
            :text="computeRules(item)"
          />
        </div>
        <div class="column-three">
          <img
            @click="handleDeleteModal(rule.targeting_type_id, rule.rules)"
            src="../assets/img/delete.svg"
            alt=""
          />
        </div>
      </div>
      <div class="loading-container" v-if="savedTargetRules.length < 1">
        Loading....
      </div>
    </div>
    <DeleteDialog
      v-if="isDeleteDialog"
      v-bind="{ closeDialog, handleDeleteTarget, spinner }"
    />
  </section>
</template>

<script>
import { deleteTargetingRules } from "@/Api";
import ChipButton from "./ChipButton.vue";
import DeleteDialog from "./DeleteDialog.vue";
export default {
  props: {
    savedTargetRules: {
      type: Array,
      required: true,
    },
    findTargetType: {
      type: Function,
      required: true,
    },
    computeRules: {
      type: Function,
      required: true,
    },
  },
  components: {
    ChipButton,
    DeleteDialog,
  },

  data: () => ({
    isDeleteDialog: false,
    deleteItem: {
      targeting_type_id: "",
      rules: [],
    },
    spinner: false,
  }),

  created() {},
  methods: {
    closeDialog() {
      this.isDeleteDialog = false;
    },
    handleDeleteModal(targeting_type_id, items) {
      this.isDeleteDialog = true;
      let rules = [];
      if (Array.isArray(items)) {
        rules = items;
      } else {
        rules.push(items);
      }
      this.deleteItem = { targeting_type_id, rules };
    },
    handleDeleteTarget() {
      this.spinner = true;
      const payload = this.deleteItem;
      deleteTargetingRules(payload)
        .then((response) => {
          if (response.status === 200) {
            console.log(response, "success");
            this.isDeleteDialog = false;
          }
        })
        .catch((error) => {})
        .finally(() => {
          this.spinner = false;
        });
    },
  },
  computed: {},
};
</script>
<style scoped>
.saved-rules-table {
  margin-top: 32px;
}
.table-row,
.table-head {
  display: flex;
  padding: 12px 20px;
  border: 1px solid;
  text-align: left;
  font-weight: bold;
}
.column-three,
.column-one {
  width: 18%;
}
.column-two {
  width: 64%;
}
.column-three {
  text-align: right;
}
.column-three img {
  cursor: pointer;
}
.table-row {
  font-weight: initial;
  border-top: none;
}
.saved-rules-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
