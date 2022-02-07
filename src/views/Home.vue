<template>
  <div>
    <Header />
    <main class="content">
      <AddTarget />
    </main>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import AddTarget from "@/components/AddTarget.vue";
export default {
  name: "Home",
  components: {
    Header,
    AddTarget,
  },
};
</script>
