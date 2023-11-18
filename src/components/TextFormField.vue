<template>
  <div class="form__group">
    <label :for="fieldId"
      >{{ label }}<span v-if="required" class="required">*</span></label
    >
    <input
      :value="value"
      :type="inputType"
      :id="fieldId"
      :class="{ 'form__input-error': validations.$error }"
      @input="$emit('input', $event.target.value)"
    />

    <span
      v-if="
        fieldId === 'lastName' && validations.$error && !validations.required
      "
      class="form__error"
      >Фамилия обязательна</span
    >
    <span
      v-if="fieldId === 'lastName' && !validations.minLength"
      class="form__error"
      >Имя должно состоять минимум из 3 букв.</span
    >
    <span
      v-if="
        fieldId === 'firstName' && validations.$error && !validations.required
      "
      class="form__error"
      >Имя обязательно</span
    >
    <!-- phone -->
    <span
      v-if="
        fieldId === 'phoneNumber' && validations.$error && !validations.required
      "
      class="form__error"
      >Номер телефона обязателен</span
    >
    <span
      v-else-if="fieldId === 'phoneNumber' && !validations.startsWith7"
      class="form__error"
      >Номер телефона должен начинаться с 7</span
    >
    <span
      v-else-if="fieldId === 'phoneNumber' && !validations.numeric"
      class="form__error"
    >
      Номер состоит из цифр
    </span>
    <span
      v-else-if="fieldId === 'phoneNumber' && !validations.minLength"
      class="form__error"
      >Номер телефона должен содержать 11 цифр</span
    >
  </div>
</template>
  
  <script>
export default {
  props: {
    label: String,
    required: {
      type: Boolean,
      default: false,
    },
    fieldId: String,
    value: [String, Number],
    inputType: {
      type: String,
      default: "text",
    },
    validations: { type: Object },
  },
};
</script>
  


<style scoped lang="scss">
.form__group {
  border-radius: 4px;
  label {
    display: inline-block;
    margin-bottom: 5px;
    color: gray;
  }
  input {
    padding: 7px 11px;
    display: block;
    max-width: 100%;
    width: 100%;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #dbdbdb;
    color: #363636;
    transition: all 0.5s;
    &:focus {
      box-shadow: 0 0 6px 2px rgba(10, 10, 10, 0.07);
    }
  }

  .required {
    color: red;
  }
  .form__input-error {
    border: 1px solid #f79483;
  }
}
.form__error {
  color: #f57f6c;
  display: block;
  font-size: 12px;
  line-height: 14px;
}
</style>