<template>
  <div class="dialog-container">
    <div class="dialog-wrap">
      <div class="dialog-header">
        <div class="dialog-title">Delete Rule</div>
        <div class="close-btn" @click="closeDialog">
          <img src="../assets/img/close.svg" alt="" />
        </div>
      </div>
      <div class="dialog-content">
        <div class="delete-item-msg">
          You are about to delete targeting rule
        </div>
        <div class="delete-item-prompt">Do you wish to continue?</div>
      </div>
      <div class="dialog-footer">
        <button
          data-testId="go-back-button"
          class="btn grey-btn"
          @click="closeDialog"
          style="margin-right: 24px"
        >
          No, Go back
        </button>
        <button
          @click="handleDeleteTarget"
          class="btn red-btn"
          data-testId="proceed-button"
        >
          Yes, Proceed
          <img
            src="../assets/img/preloader.gif"
            style="margin-left: 20px"
            class="button-spinner"
            v-show="spinner"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    closeDialog: {
      type: Function,
      required: true,
    },
    handleDeleteTarget: {
      type: Function,
      required: true,
    },
    spinner: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style scoped>
.dialog-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.dialog-wrap {
  background: #ffffff;
  flex-direction: column;
  min-width: 332px;
  box-shadow: 2px 2px 30px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
}
.dialog-header {
  background: #f7f7f8;
  box-shadow: 0px 1px 2px rgba(30, 27, 34, 0.1);
  border-radius: 4px 4px 0px 0px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
}
.dialog-title {
  font-size: 18px;
  line-height: 130%;
  text-align: left;
  color: #1b1e22;
  font-weight: bold;
}
.close-btn img,
.close-btn {
  height: 23px;
  cursor: pointer;
}
.dialog-content {
  padding: 24px;
}
.dialog-footer {
  padding: 0px 16px 16px 16px;
  display: flex;
  justify-content: flex-end;
}
.delete-item-msg {
  font-size: 14px;
  line-height: 130%;
  color: #1b1e22;
  width: 356px;
  text-align: left;
}
.delete-item-prompt {
  font-size: 14px;
  line-height: 130%;
  color: #6f7680;
  margin-top: 24px;
  text-align: left;
}
.grey-btn {
  background: #ffffff;
  font-style: normal;
  font-weight: 500;
  color: #979da5;
}
.red-btn {
  font-style: normal;
  font-weight: 500;
  color: #fdfdfd !important;
  background: #d45b54 !important;
}
</style>


