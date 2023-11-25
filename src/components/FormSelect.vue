<template>
  <div class="form-select__control" :class="{ multiselect: multiselect }">
    <button
      ref="button"
      type="button"
      class="form-select__button"
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
      <span v-if="!value" class="form-select__placeholder">{{
        placeholder
      }}</span>
      <SvgAngle
        class="form-select__icon"
        :class="{ 'form-select__icon--rotate-180': optionsVisible }"
      />
    </button>

    <ul
      v-show="optionsVisible"
      ref="options"
      tabindex="-1"
      role="listbox"
      :aria-labelledby="`${_uid}-label`"
      :aria-activedescendant="activeDescendant"
      class="form-select__options"
      :class="{ 'form__input-error': error }"
      @keyup.up.prevent="selectPrevOption"
      @keyup.down.prevent="selectNextOption"
      @keydown.up.down.prevent
      @keydown.enter.esc.prevent="reset"
    >
      <li
        v-for="(option, index) in options"
        :key="option.label || option"
        :ref="setItemRef"
        role="option"
        tabindex="0"
        class="form-select__option"
        :id="`${_uid}-option-${index}`"
        :aria-selected="activeOptionIndex === index"
        :class="{
          'has-focus': activeOptionIndex === index,
          'selected-option': multiselect && value.includes(option),
        }"
        @click="handleOptionClick(option)"
        @keydown.enter.prevent="handleOptionClick(option)"
      >
        {{ option.label || option }}
      </li>
    </ul>
  </div>
</template>
  
  <script>
import SvgAngle from "./SvgAngle.vue";

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
      optionsRef: [],
      optionIndex: -1,
    };
  },

  computed: {
    activeOptionIndex() {
      return this.options.findIndex(
        (x) => x.value === this.value || x === this.value
      );
    },

    activeDescendant() {
      return `${this._uid}-option-${this.activeOptionIndex}`;
    },

    valueMain() {
      if (this.multiselect) {
        return Array.isArray(this.value) && this.value.length
          ? this.value.join(", ")
          : "-";
      }

      return this.value;
    },
  },
  methods: {
    handleOptionClick(option) {
      if (this.multiselect) {
        this.$emit("change", this.updateValuesWithOption(option));
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
      this.optionIndex -= 1;
      if (this.optionIndex < 0) {
        this.optionIndex = this.options.length - 1;
      }

      this.optionsRef[this.optionIndex].focus();
    },

    selectNextOption() {
      this.optionIndex += 1;
      if (this.optionIndex >= this.options.length) {
        this.optionIndex = 0;
      }
      this.optionsRef[this.optionIndex].focus();
    },

    updateValuesWithOption(option) {
      const updatedValues = this.value.includes(option)
        ? this.value.filter((el) => el !== option)
        : [...this.value, option];

      return updatedValues;
    },

    setItemRef(el) {
      if (el) {
        this.optionsRef.push(el);
      }
    },
  },
};
</script>
  
  <style scoped lang="scss">
.form-select {
  &__control {
    max-width: 200px;
    position: relative;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #dbdbdb;
    color: #363636;
    &:focus-within {
      box-shadow: 0 0 6px 2px rgba(10, 10, 10, 0.07);
    }
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
    color: black;
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
    &:focus {
      box-shadow: 0 0 6px 2px rgba(10, 10, 10, 0.07);
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
  opacity: 0.5;
}
</style>
  