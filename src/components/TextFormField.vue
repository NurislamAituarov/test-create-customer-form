<template>
  <div class="form__group" :class="`form__group-${fieldId}`">
    <label v-if="label" :for="fieldId"
      >{{ label }}<span v-if="required" class="required">*</span></label
    >
    <input
      :value="value"
      :type="inputType"
      :id="fieldId"
      :placeholder="placeholder"
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
    <!-- error address -->
    <span
      v-if="fieldId === 'city' && validations.$error && !validations.required"
      class="form__error"
      >Город проживания обязателен</span
    >
    <span
      v-if="fieldId === 'number' && !validations.numeric"
      class="form__error"
    >
      Номер состоит из цифр
    </span>
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
    placeholder: { type: String, default: "" },
  },
};
</script>
  


<style scoped lang="scss">
.form__group-city,
.form__group-house {
  grid-column: 3/5;
}
.form__group-country {
  grid-column: 2/5;
}
.form__group-region,
.form__group-street {
  grid-column: 1/3;
}
.form__group-city,
.form__group-house {
  grid-column: 3/5;
}

.form__group-issuedBy {
  grid-column: 1/3;
}
</style>