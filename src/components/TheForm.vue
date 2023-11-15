<template>
  <form @submit.prevent="submitForm" class="form">
    <div class="form__group">
      <label for="lastName">Фамилия*</label>
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
      <label for="firstName">Имя*</label>
      <input v-model="$v.firstName.$model" type="text" id="firstName" />
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
      <label for="birthdate">Дата рождения*</label>
      <input v-model="$v.birthdate.$model" type="date" id="birthdate" />
      <span
        v-if="$v.birthdate.$error && !$v.birthdate.required"
        class="form__error"
        >Дата рождения обязательна</span
      >
    </div>

    <div class="form__group">
      <label for="phoneNumber">Номер телефона*</label>
      <input v-model="$v.phoneNumber.$model" type="text" id="phoneNumber" />
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
      <label for="gender">Пол</label>
      <select v-model="$v.gender.$model" id="gender">
        <!-- Add options for gender -->
      </select>
    </div>

    <div class="form__group">
      <label for="customerGroup">Группа клиентов*</label>
      <select v-model="$v.customerGroup.$model" id="customerGroup" multiple>
        <option value="VIP">VIP</option>
        <option value="Проблемные">Проблемные</option>
        <option value="ОМС">ОМС</option>
      </select>
      <span v-if="!$v.customerGroup.required">Группа клиентов обязательна</span>
    </div>

    <div class="form__group">
      <label for="doctor">Лечащий врач</label>
      <select v-model="$v.doctor.$model" id="doctor">
        <!-- Add options for doctors -->
      </select>
    </div>

    <div class="form__group">
      <label for="noSms">Не отправлять СМС</label>
      <input v-model="$v.noSms.$model" type="checkbox" id="noSms" />
    </div>

    <button type="submit">Submit</button>
  </form>
</template>

<script>
import { required, minLength, helpers } from "vuelidate/lib/validators";

export default {
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

      submitStatus: null,
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
  },
  methods: {
    submitForm() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
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

          this.$v.$reset();
        }, 500);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.form {
  max-width: 768px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form__group {
  border-radius: 4px;
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
  .form__input-error {
    border: 1px solid #f79483;
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
</style>
