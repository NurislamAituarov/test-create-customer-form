<template>
  <form @submit.prevent="submitForm" class="form">
    <div class="form__group">
      <label for="lastName">Фамилия<span class="required">*</span></label>
      <input
        v-model="$v.lastName.$model"
        type="text"
        id="lastName"
        :class="{ 'form__input-error': $v.lastName.$error }"
      />
      <span
        v-if="$v.lastName.$error && !$v.lastName.required"
        class="form__error"
        >Фамилия обязательна</span
      >
      <span v-if="!$v.lastName.minLength" class="form__error"
        >Имя должно состоять минимум из 3 букв.</span
      >
    </div>

    <div class="form__group">
      <label for="firstName">Имя<span class="required">*</span></label>
      <input
        v-model="$v.firstName.$model"
        type="text"
        id="firstName"
        :class="{ 'form__input-error': $v.firstName.$error }"
      />
      <span
        v-if="$v.firstName.$error && !$v.firstName.required"
        class="form__error"
        >Имя обязательно</span
      >
    </div>

    <div class="form__group">
      <label for="patronymic">Отчество</label>
      <input v-model="$v.patronymic.$model" type="text" id="patronymic" />
    </div>

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

    <div class="form__group">
      <label for="phoneNumber"
        >Номер телефона<span class="required">*</span></label
      >
      <input
        v-model="$v.phoneNumber.$model"
        type="text"
        id="phoneNumber"
        :class="{ 'form__input-error': $v.phoneNumber.$error }"
      />
      <span
        v-if="$v.phoneNumber.$error && !$v.phoneNumber.required"
        class="form__error"
        >Номер телефона обязателен</span
      >
      <span v-else-if="!$v.phoneNumber.startsWith7" class="form__error"
        >Номер телефона должен начинаться с 7</span
      >
      <span v-else-if="!$v.phoneNumber.numeric" class="form__error">
        Номер состоит из цифр
      </span>
      <span v-else-if="!$v.phoneNumber.minLength" class="form__error"
        >Номер телефона должен содержать 11 цифр</span
      >
    </div>

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
        v-model="$v.index.$model"
        type="text"
        placeholder="Индекс"
        id="index"
        group-type="index"
        :validations="$v.index"
      />
      <form-group
        v-model="$v.country.$model"
        type="text"
        placeholder="Страна"
        id="country"
        group-type="country"
        :validations="$v.country"
      />
      <form-group
        type="text"
        v-model="$v.region.$model"
        placeholder="Облость"
        id="region"
        group-type="region"
        :validations="$v.region"
      />
      <form-group
        type="text"
        v-model="$v.city.$model"
        placeholder="Город*"
        id="city"
        group-type="city"
        :validations="$v.city"
      />
      <form-group
        v-model="$v.street.$model"
        type="text"
        placeholder="Улица"
        id="street"
        group-type="street"
        :validations="$v.street"
      />
      <form-group
        v-model="$v.house.$model"
        type="text"
        placeholder="Дом"
        id="house"
        group-type="house"
        :validations="$v.house"
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
      <div class="form__group form__group-series">
        <input
          v-model="$v.series.$model"
          type="text"
          id="series"
          placeholder="Серия"
        />
      </div>
      <div class="form__group form__group-number">
        <input
          v-model="$v.number.$model"
          type="text"
          id="number"
          placeholder="Номер"
          :class="{ 'form__input-error': $v.number.$error }"
        />
        <span v-if="!$v.number.numeric" class="form__error">
          Номер состоит из цифр
        </span>
      </div>
      <div class="form__group form__group-issuedBy">
        <input
          v-model="$v.issuedBy.$model"
          type="text"
          id="issuedBy"
          placeholder="Кем выдан"
        />
      </div>
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

export default {
  components: { FormSelect, BaseBtn, FormGroup },
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
