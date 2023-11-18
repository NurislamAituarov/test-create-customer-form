<template>
  <div class="form__group" :class="`form__group-${groupType}`">
    <input
      :value="value"
      @input="$emit('input', $event.target.value)"
      :type="type"
      :id="id"
      :placeholder="placeholder"
    />
    <span
      v-if="id === 'city' && validations.$error && !validations.required"
      class="form__error"
      >Город проживания обязателен</span
    >
    <span v-if="id === 'number' && !validations.numeric" class="form__error">
      Номер состоит из цифр
    </span>
  </div>
</template>

<script>
export default {
  name: "FormGroup",
  props: {
    value: { type: String },
    type: { type: String },
    placeholder: { type: String },
    id: { type: String },
    validations: { type: Object },
    groupType: { type: String },
  },
};
</script>



<style scoped lang="scss">
.form__group {
  border-radius: 4px;
  label {
    display: inline-block;
    margin-bottom: 5px;
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
  .form__error {
    color: #f57f6c;
    display: block;
    font-size: 12px;
    line-height: 14px;
  }
}
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