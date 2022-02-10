<template>
  <div v-if="message.success" class="success message-wrapper">
    <div class="msg-content">{{ message.success }}</div>
  </div>
</template>
<script>
export default {
  name: "SuccessMessage",
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  created() {},
  watch: {
    "message.success": {
      immediate: false,
      handler: function (newValue, oldValue) {
        if (newValue !== oldValue) {
          setTimeout(() => {
            this.message.success = "";
          }, 4000);
        }
      },
    },
  },
};
</script>

