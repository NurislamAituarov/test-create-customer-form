<template>
  <div class="FormSelect__control" :class="{ multiselect: multiselect }">
    <button
      ref="button"
      class="FormSelect__button"
      aria-haspopup="listbox"
      :id="`${_uid}-button`"
      :aria-labelledby="`${_uid}-label ${_uid}-button`"
      :aria-expanded="optionsVisible"
      :class="{ 'form__input-error': error }"
      @click.prevent="toggleOptions"
      @keyup.up.down.prevent="showOptions"
      @keyup.up.prevent="selectPrevOption"
      @keyup.down.prevent="selectNextOption"
    >
      {{ valueMain }}
      <span v-if="!value" class="FormSelect__placeholder">{{
        placeholder
      }}</span>
      <SvgAngle
        class="FormSelect__icon"
        :class="{ 'FormSelect__icon--rotate-180': optionsVisible }"
      />
    </button>

    <ul
      v-show="optionsVisible"
      ref="options"
      tabindex="-1"
      role="listbox"
      :aria-labelledby="`${_uid}-label`"
      :aria-activedescendant="activeDescendant"
      class="FormSelect__options"
      @keyup.up.prevent="selectPrevOption"
      @keyup.down.prevent="selectNextOption"
      @keydown="search"
      @keydown.up.down.prevent
      @keydown.enter.esc.prevent="reset"
    >
      <li
        v-for="(option, index) in options"
        :key="option.label || option"
        :id="`${_uid}-option-${index}`"
        :aria-selected="activeOptionIndex === index"
        :class="{
          'has-focus': activeOptionIndex === index,
          'selected-option': multiselect && value.includes(option),
        }"
        class="FormSelect__option"
        role="option"
        @click="handleOptionClick(option)"
      >
        {{ option.label || option }}
      </li>
    </ul>
  </div>
</template>
  
  <script>
import SvgAngle from "./SvgAngle.vue";

let resetKeysSoFarTimer;

export default {
  name: "FormSelect",
  components: {
    SvgAngle,
  },
  model: {
    event: "change",
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: "Select",
    },
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      type: [String, Number, Array],
      default: "",
    },
    multiselect: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      keysSoFar: "",
      tabKeyPressed: false,
      optionsVisible: false,
    };
  },
  computed: {
    activeOptionIndex() {
      return this.options.findIndex(
        (x) => x.value === this.value || x === this.value
      );
    },
    prevOptionIndex() {
      const next = this.activeOptionIndex - 1;
      return next >= 0 ? next : this.options.length - 1;
    },
    nextOptionIndex() {
      const next = this.activeOptionIndex + 1;
      return next <= this.options.length - 1 ? next : 0;
    },
    activeDescendant() {
      return `${this._uid}-option-${this.activeOptionIndex}`;
    },

    valueMain() {
      if (this.multiselect) {
        return this.value.length ? this.value.join(", ") : "-";
      }

      return this.value;
    },
  },
  methods: {
    handleFocusTrap() {
      this.optionsVisible = true;
      this.$refs.button.focus();
    },
    handleOptionClick(option) {
      if (this.multiselect) {
        this.$emit("change", [...this.value, option]);
      } else {
        this.$emit("change", option);
      }

      this.reset();
    },
    handleBlur(e) {
      if (this.$el.contains(e.relatedTarget)) return;
      this.hideOptions();
    },
    toggleOptions() {
      this.optionsVisible ? this.hideOptions() : this.showOptions();
    },
    async showOptions() {
      this.optionsVisible = true;
      await this.$nextTick();
      this.$refs.options.focus();
    },
    hideOptions() {
      this.optionsVisible = false;
    },
    async reset() {
      this.hideOptions();
      await this.$nextTick();
      this.$refs.button.focus();
    },
    setupFocus() {
      if (this.value) return;
      this.$emit("change", this.options[0]);
    },
    selectPrevOption() {
      this.$emit("change", this.options[this.prevOptionIndex]);
    },
    selectNextOption() {
      this.$emit("change", this.options[this.nextOptionIndex]);
    },
    search(e) {
      clearTimeout(resetKeysSoFarTimer);
      // No alphanumeric key was pressed.
      if (e.key.length > 1) return;

      resetKeysSoFarTimer = setTimeout(() => {
        this.keysSoFar = "";
      }, 500);

      this.keysSoFar += e.key;
      const matchingOption = this.options.find((x) =>
        (x.value || x).toLowerCase().startsWith(this.keysSoFar)
      );

      if (!matchingOption) return;

      this.$emit("change", matchingOption);
    },
  },
};
</script>
  
  <style scoped lang="scss">
.FormSelect {
  &__control {
    max-width: 200px;
    position: relative;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #dbdbdb;
    color: #363636;
  }

  &__button {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 10px;
    font-weight: bold;
  }

  &__icon {
    transition: transform 0.2s;

    &--rotate-180 {
      transform: rotate(180deg);
    }
  }

  &__options {
    margin: 0;
    padding: 0;
    list-style-type: none;
    outline: none;
  }

  &__option {
    cursor: default;
    padding: 5px 10px;
    cursor: pointer;
    &.has-focus {
      background-color: rgba(#d5d5d5, 0.25);
    }
  }
}
.visually-hidden {
  display: none;
}
.multiselect {
  max-width: 100%;
}
.selected-option {
  pointer-events: none;
  opacity: 0.5;
}
.form__input-error {
  border: 1px solid #f79483;
}
</style>
  