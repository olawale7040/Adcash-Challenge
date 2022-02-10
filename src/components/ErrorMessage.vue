<template>
  <div v-if="message.error" class="error message-wrapper">
    <div class="msg-content">{{ message.error }}</div>
  </div>
</template>
<script>
export default {
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  created() {},
  watch: {
    "message.error": {
      immediate: false,
      handler: function (newValue, oldValue) {
        if (newValue !== oldValue) {
          setTimeout(() => {
            this.message.error = "";
          }, 4000);
        }
      },
    },
  },
};
</script>

