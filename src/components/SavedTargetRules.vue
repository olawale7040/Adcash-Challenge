<template>
  <section class="section-container">
    <h1>Saved Targeting Rules</h1>
    <div class="saved-rules-table">
      <div class="table-head">
        <div class="column-one">Type</div>
        <div class="column-two">Rules</div>
        <div class="column-three">Action</div>
      </div>
      <div class="table-row" v-for="i in 4" :key="i">
        <div class="column-one">Country</div>
        <div class="column-two saved-rules-list">
          <ChipButton text="Estonia" />
          <ChipButton text="Mobile" />
          <ChipButton text="Entertainment" />
        </div>
        <div class="column-three">
          <img
            @click="isDeleteDialog = true"
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
  props: {},
  components: {
    ChipButton,
    DeleteDialog,
  },

  data: () => ({
    isDeleteDialog: false,
  }),

  created() {},
  methods: {
    closeDialog() {
      this.isDeleteDialog = false;
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
  width: 15%;
}
.column-two {
  width: 70%;
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
