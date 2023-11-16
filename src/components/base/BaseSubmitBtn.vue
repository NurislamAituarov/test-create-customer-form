<template>
  <button type="submit" class="btn" :class="{ success: loading === 'success' }">
    {{ loading === "disabled" ? "Создать" : "" }}
    {{ loading === "success" ? "Пользователь создан" : "" }}
    <base-spinner v-if="loading === 'pending'" />
  </button>
</template>

<script>
import BaseSpinner from "./BaseSpinner.vue";
export default {
  components: { BaseSpinner },
  name: "BaseSubmitBtn",
  props: {
    loading: { type: String },
  },
};
</script>

<style scoped lang="scss">
.btn {
  height: 40px;
  padding: 10px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: all 0.5s;
  background-color: #d7d7d7;
  font-weight: 700;
  &:hover {
    opacity: 0.7;
  }
}
.success {
  color: green;
  position: relative;
  &::after {
    content: "✔";
  }
}
</style>