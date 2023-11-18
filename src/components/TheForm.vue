<template>
  <form @submit.prevent="submitForm" class="form">
    <text-form-field
      label="Фамилия"
      fieldId="lastName"
      v-model="$v.lastName.$model"
      :validations="$v.lastName"
      required
    />

    <text-form-field
      label="Имя"
      fieldId="firstName"
      v-model="$v.firstName.$model"
      :validations="$v.firstName"
      required
    />

    <text-form-field
      label="Отчество"
      fieldId="patronymic"
      v-model="$v.patronymic.$model"
      :validations="$v.patronymic"
    />

    <div class="form__group form__group-date">
      <label for="birthdate"
        >Дата рождения<span class="required">*</span></label
      >
      <input
        v-model="$v.birthdate.$model"
        type="date"
        id="birthdate"
        :class="{ 'form__input-error': $v.birthdate.$error }"
      />
      <span
        v-if="$v.birthdate.$error && !$v.birthdate.required"
        class="form__error"
        >Дата рождения обязательна</span
      >
    </div>

    <text-form-field
      label="Номер телефона"
      fieldId="phoneNumber"
      v-model="$v.phoneNumber.$model"
      :validations="$v.phoneNumber"
      required
    />

    <div class="form__group">
      <label for="phoneNumber">Пол</label>

      <form-select
        label="Пол"
        placeholder="муж"
        :options="['муж', 'жен']"
        v-model="$v.gender.$model"
      />
    </div>

    <div class="form__group">
      <label for="customerGroup"
        >Группа клиентов<span class="required">*</span></label
      >

      <form-select
        v-model="$v.customerGroup.$model"
        label="Группа клиентов"
        placeholder=""
        multiselect
        :error="$v.customerGroup.$error"
        :options="['VIP', 'Проблемные', 'ОМС']"
      />

      <span
        v-if="$v.customerGroup.$error && !$v.customerGroup.required"
        class="form__error"
        >Группа клиентов обязательна</span
      >
    </div>

    <div class="form__group">
      <label for="doctor">Лечащий врач</label>

      <form-select
        label="Лечащий врач"
        placeholder="-"
        :options="['Иванов', 'Захаров', 'Чернышева']"
        v-model="$v.doctor.$model"
      />
    </div>

    <div class="form__group form__group-checkbox">
      <label for="noSms">Не отправлять СМС</label>
      <input v-model="$v.noSms.$model" type="checkbox" id="noSms" />
    </div>

    <hr class="line" />

    <h4>Адрес:</h4>

    <div class="address">
      <form-group
        v-for="field of addressFields"
        :key="field.name"
        v-model="$v[field.name].$model"
        type="text"
        :placeholder="field.placeholder"
        :id="field.name"
        :group-type="field.name"
        :validations="$v[field.name]"
      />
    </div>

    <hr class="line" />

    <h4>Паспорт:</h4>

    <div class="passport">
      <div class="form__group form__group-documentType">
        <label for="doctor">Тип документа<span class="required">*</span></label>

        <form-select
          label="Тип документа"
          placeholder="-"
          :options="[
            'Паспорт',
            'Свидетельство о рождении',
            'Вод. удостоверение',
          ]"
          :error="$v.documentType.$error"
          v-model="$v.documentType.$model"
        />

        <span
          v-if="$v.documentType.$error && !$v.documentType.required"
          class="form__error"
          >Тип документа обязательна</span
        >
      </div>

      <form-group
        v-model="$v.series.$model"
        type="text"
        placeholder="Серия"
        id="series"
        group-type="series"
        :validations="$v.series"
      />

      <form-group
        v-model="$v.number.$model"
        type="text"
        id="number"
        placeholder="Номер"
        group-type="number"
        :validations="$v.number"
      />

      <form-group
        v-model="$v.issuedBy.$model"
        type="text"
        placeholder="Кем выдан"
        id="issuedBy"
        group-type="issuedBy"
        :validations="$v.issuedBy"
      />

      <div class="form__group form__group-dateIssue">
        <label for="birthdate"
          >Дата выдачи<span class="required">*</span></label
        >
        <input
          v-model="$v.dateIssue.$model"
          type="date"
          id="dateIssue"
          placeholder="Дата выдачи*"
          :class="{ 'form__input-error': $v.dateIssue.$error }"
        />
        <span
          v-if="$v.dateIssue.$error && !$v.dateIssue.required"
          class="form__error"
          >Дата выдачи обязательна</span
        >
      </div>
    </div>

    <base-btn :loading="loading" />
  </form>
</template>

<script>
import {
  required,
  minLength,
  helpers,
  numeric,
} from "vuelidate/lib/validators";
import BaseBtn from "./base/BaseSubmitBtn.vue";
import FormSelect from "./FormSelect.vue";
import FormGroup from "./FormGroup.vue";
import TextFormField from "./TextFormField.vue";

export default {
  components: { FormSelect, BaseBtn, FormGroup, TextFormField },
  data() {
    return {
      lastName: "",
      firstName: "",
      patronymic: "",
      birthdate: null,
      phoneNumber: "",
      gender: "",
      customerGroup: [],
      doctor: "",
      noSms: false,

      index: "",
      country: "",
      region: "",
      city: "",
      street: "",
      house: "",

      documentType: "",
      series: "",
      number: "",
      issuedBy: "",
      dateIssue: "",

      submitStatus: null,
      loading: "disabled",

      addressFields: [
        { name: "index", placeholder: "Индекс" },
        { name: "country", placeholder: "Страна" },
        { name: "region", placeholder: "Область" },
        { name: "city", placeholder: "Город*" },
        { name: "street", placeholder: "Улица" },
        { name: "house", placeholder: "Дом" },
      ],
    };
  },
  validations: {
    lastName: { required, minLength: minLength(3) },
    firstName: { required },
    patronymic: {},
    birthdate: { required },
    phoneNumber: {
      required,
      numeric,
      minLength: minLength(11),
      startsWith7: helpers.regex("startsWith", /^7/),
    },
    gender: {},
    customerGroup: { required },
    doctor: {},
    noSms: {},
    index: {},
    country: {},
    region: {},
    city: { required },
    street: {},
    house: {},
    documentType: { required },
    series: {},
    number: { numeric },
    issuedBy: {},
    dateIssue: { required },
  },
  methods: {
    submitForm() {
      this.loading = "pending";
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
        this.loading = "disabled";
      } else {
        this.submitStatus = "PENDING";
        setTimeout(() => {
          this.submitStatus = "OK";
          (this.lastName = ""),
            (this.firstName = ""),
            (this.patronymic = ""),
            (this.birthdate = null),
            (this.phoneNumber = ""),
            (this.gender = ""),
            (this.customerGroup = []),
            (this.doctor = ""),
            (this.noSms = false),
            (this.submitStatus = null),
            (this.city = ""),
            (this.index = ""),
            (this.country = ""),
            (this.region = ""),
            (this.street = ""),
            (this.house = ""),
            (this.documentType = ""),
            (this.series = ""),
            (this.number = ""),
            (this.issuedBy = ""),
            (this.dateIssue = ""),
            (this.loading = "success");
          setTimeout(() => {
            this.loading = "disabled";
          }, 1000);
          this.$v.$reset();
        }, 1000);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.form {
  max-width: 600px;
  height: 80vh;
  overflow-y: auto;
  padding: 20px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 0px #dadada;
  .btn {
    margin-top: 20px;
  }
}

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

.form__group-checkbox {
  display: flex;
  align-items: center;
  gap: 20px;
  label {
    cursor: pointer;
    margin: 0;
  }

  input {
    cursor: pointer;
    position: relative;
    width: 20px;
    height: 20px;
    &:before {
      opacity: 0;
      content: "✔";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    &:focus {
      outline: 0;
      border: 1px solid darken(blue, 5%);
    }
    &:active {
      outline: none;
    }
    &:hover {
      outline: none;
    }
    &:checked {
      background: blue;
      color: rgba(white, 1);
    }
  }
}
.form__group-date {
  max-width: 200px;
}
.form__error {
  color: #f57f6c;
  display: block;
  font-size: 12px;
  line-height: 14px;
}

.line {
  height: 1px;
  margin: 15px 0 10px;
  background-color: #dbdbdb;
  border: none;
}

.address {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 10px;
}

.passport {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;

  .form__group-documentType {
    grid-column: 1/3;
    .form-select__control {
      max-width: 100%;
    }
  }

  .form__group-issuedBy {
    grid-column: 1/3;
  }
  .form__group-dateIssue {
    grid-row: 4;
    max-width: 200px;
  }
}

@media all and (max-width: 768px) {
  .form {
    padding: 10px;
    box-shadow: none;
    height: 100%;
    .form__group,
    .form-select__control {
      max-width: 100% !important;
    }
  }

  .passport,
  .address {
    grid-template-columns: 1fr;
    .form__group {
      grid-column: 1;
    }
  }
}
</style>
