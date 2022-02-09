<template>
  <div class="chip-button">
    <div class="chip-text">
      {{ text }}
    </div>
    <div class="cancel-icon" @click="$emit('click')">
      <img src="../assets/img/close.svg" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  components: {},
  data: () => ({}),
};
</script>
<style scoped>
.chip-button {
  border: 1px dashed #0781f2;
  box-sizing: border-box;
  border-radius: 50px;
  padding: 8px 16px;
  display: flex;
  cursor: pointer;
  background: rgba(111, 181, 246, 0.2);
}
.chip-text {
  font-weight: normal;
  font-size: 12px;
  line-height: 140%;
  color: #53585f;
  margin-right: 4px;
  margin-top: 1.5px;
  color: #0781f2;
}
.cancel-icon,
.cancel-icon img {
  height: 20px;
}
</style>
