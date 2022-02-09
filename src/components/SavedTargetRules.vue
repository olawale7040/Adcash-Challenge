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
            v-on:click="handleDeleteRule"
            :text="computeRules(item)"
          />
        </div>
        <div class="column-three">
          <img
            @click="handleDeleteRule"
            src="../assets/img/delete.svg"
            alt=""
          />
        </div>
      </div>
    </div>
    <DeleteDialog v-if="isDeleteDialog" v-bind="{ closeDialog }" />
  </section>
</template>

<script>
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
  }),

  created() {
    console.log(this.savedTargetRules, "saved....");
  },
  methods: {
    closeDialog() {
      this.isDeleteDialog = false;
    },
    handleDeleteRule() {
      this.isDeleteDialog = true;
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
