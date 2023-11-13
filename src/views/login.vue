<template>
    <div class="login-container">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
        <h2 class="login-title">医生-登录</h2>
        <el-form-item prop="doccode">
          <el-input v-model="loginForm.doccode" placeholder="医生编码"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="登录密码" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
          <!-- <el-button @click="goToRegister">注册</el-button> -->
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
  import axios from '@/axios';
  export default {
    data() {
      return {
        loginForm: {
          doccode: '',
          password: '',
        },
        loginRules: {
          doccode: [
            { required: true, message: '请输入医生编码', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
        },
      };
    },
    methods: {
      login() {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            // 在此处处理登录逻辑
            let req = {}
            req.doccode = this.loginForm.doccode
            req.password = this.loginForm.password
            axios({
                url: '/doctor/login',
                method: 'post',
                data: req
            }).then(res => {
                // console.log(res);
                this.$store.commit('setDoctor', req)
                this.$store.commit('setCookie', res.data.message)
             
                this.$router.push({
                    path: '/tjbg'
                });
            }).catch(e => {
                alert(e.data.message)
            })
            
          } else {
            console.log('表单验证失败');
            return false;
          }
        });
      },
      goToRegister() {
        // 在此处进行跳转到注册页面的逻辑
        // console.log('跳转到注册页面');
        this.$router.push({
            path: '/regiester'
        });
      },
    },
    
   
    mounted() {
        
    
        
    },
    
  };
  </script>
  
  <style>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .login-form {
    width: 400px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .login-title {
    font-size: 24px;
    margin-bottom: 20px;
  }
  </style>
  