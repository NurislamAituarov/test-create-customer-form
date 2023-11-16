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

    <h3>Адрес:</h3>

    <div class="address">
      <div class="form__group form__group-index">
        <input
          v-model="$v.index.$model"
          type="text"
          id="index"
          placeholder="Индекс"
        />
      </div>
      <div class="form__group form__group-country">
        <input
          v-model="$v.country.$model"
          type="text"
          id="index"
          placeholder="Страна"
        />
      </div>
      <div class="form__group form__group-region">
        <input
          v-model="$v.region.$model"
          type="text"
          id="index"
          placeholder="Облость"
        />
      </div>
      <div class="form__group form__group-city">
        <input
          v-model="$v.city.$model"
          type="text"
          id="index"
          placeholder="Город*"
        />
        <span v-if="$v.city.$error && !$v.city.required" class="form__error"
          >Город проживания обязателен</span
        >
      </div>
      <div class="form__group form__group-street">
        <input
          v-model="$v.street.$model"
          type="text"
          id="index"
          placeholder="Улица"
        />
      </div>
      <div class="form__group form__group-house">
        <input
          v-model="$v.house.$model"
          type="text"
          id="index"
          placeholder="Дом"
        />
      </div>
    </div>

    <base-btn :loading="loading" />
  </form>
</template>

<script>
import { required, minLength, helpers } from "vuelidate/lib/validators";
import BaseBtn from "./base/BaseSubmitBtn.vue";
import FormSelect from "./FormSelect.vue";

export default {
  components: { FormSelect, BaseBtn },
  data() {
    return {
      // Form model
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
            (this.submitStatus = null);
          this.loading = "success";
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
  }
  input {
    padding: 7px 11px;
    display: block;
    box-shadow: inset 0 0.0625em 0.125em rgba(10, 10, 10, 0.05);
    max-width: 100%;
    width: 100%;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #dbdbdb;
    color: #363636;
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
}
</style>
