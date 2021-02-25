<template>
  <template class="login-page">
    <el-form :model="formData" status-icon ref="ruleForm" label-width="120px" class="login-form" show-message="true">
      <el-form-item label="Email">
        <el-input type="email" v-model="formData.email" autocomplete="off" required></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <el-input type="password" v-model="formData.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-checkbox v-model="isSignUp">Зарегистрироваться</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button class="submit-btn" type="primary" @click="submitForm">Вход</el-button>
      </el-form-item>
    </el-form>
  </template>
</template>

<script>
import { defineComponent } from "vue";

  export default defineComponent({
    data() {
      return {
        formData: {
          email: '',
          password: '',
        },
        isSignUp: false,
      }
    },
    methods: {
      submitForm() {
        this.isSignUp
          ? this.$store.dispatch('signupRequest', this.formData).then(res => {
            if (!res) {
              this.$notify.error({
                title: 'Ошибка регистрации',
                message: 'Возможно пользователь уже зарегистрирован'
              });
            }
          })
          : this.$store.dispatch('loginRequest', this.formData).then(res => {
            if (!res) {
              this.$notify.error({
                title: 'Ошибка авторизации',
                message: 'Возможно вы не зарегистрированны или неправильно ввели пароль'
              });
            }
          })        
      }
    }
  })
</script>

<style lang="scss">
  .login-page {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .login-form {
      padding: 60px 60px 30px 30px;
      box-shadow: 0 0 5px 0px rgba(0,113,0,0.2);

      .submit-btn {
        margin-left: 15px;
      }
    }
  }
</style>
