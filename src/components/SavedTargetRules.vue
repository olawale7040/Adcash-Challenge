<template>
  <section class="section-container">
    <h1>Saved Targeting Rules</h1>
    <div class="saved-rules-table">
      <div class="table-head">
        <div class="column-one">Type</div>
        <div class="column-two">Rules</div>
        <div class="column-three">Action</div>
      </div>
      <div class="table-row">
        <div class="column-one">Country</div>
        <div class="column-two">Rules</div>
        <div class="column-three">
          <img src="../assets/img/delete.svg" alt="" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {},
  components: {},

  data: () => ({}),

  created() {},
  methods: {},
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
</style>
