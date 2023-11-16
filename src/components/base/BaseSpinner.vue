<template>
  <transition name="v-btn-label" mode="out-in">
    <div v-if="true">
      <span class="spinner"></span>
    </div>
  </transition>
</template>

<script>
export default {
  name: "BaseSpinner",
};
</script>



<style scoped lang="scss">
.spinner {
  display: inline-block;
  margin: 0 8px;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  border: 0.215em solid transparent;
  vertical-align: middle;
  font-size: 16px;
  border-top-color: rgb(255, 255, 255);
  animation: spin 1s cubic-bezier(0.55, 0.15, 0.45, 0.85) infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>