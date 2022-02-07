<template>
  <div>
    <Header />
    <main class="content">
      <AddTarget />
      <SavedTargetRules />
    </main>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import AddTarget from "@/components/AddTarget.vue";
import SavedTargetRules from "@/components/SavedTargetRules.vue";
export default {
  name: "Home",
  components: {
    Header,
    AddTarget,
    SavedTargetRules,
  },
};
</script>
