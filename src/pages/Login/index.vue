<template>
  <div class="login-page">
    <div class="login-center">
      <h2 class="login-title">elm后台管理系统</h2>
    <a-form-model ref="ruleForm" :model="ruleForm" layout="vertical" :rules="rules" v-bind="layout" class="login-form">
    <a-form-model-item has-feedback class="form-item" prop="username" >
      <a-input v-model="ruleForm.username"  type="text" autocomplete="off" placeholder="用户名"/>
    </a-form-model-item>
    <a-form-model-item has-feedback prop="password" >
      <a-input v-model="ruleForm.password" type="password" autocomplete="off" placeholder="密码"/>
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 24, offset: 0 }" class="login-go">
      <a-button type="primary" @click="submitForm('ruleForm')" class="form-btn">
        登陆
      </a-button>
    </a-form-model-item>
    <p class="login-msg">温馨提示：</p>
    <p class="login-msg">未登录过的新用户，自动注册</p>
    <p class="login-msg">注册过的用户可凭账号密码登录</p>
    </a-form-model>
    
    </div>
  
  </div>
  
</template>
<script>
export default {
  name: 'Login',
  data() {
    let validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        callback();
      }
    };
    let validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: '_login',
        password: '_login',
      },
      rules: {
        username: [{ validator: validateUsername, trigger: 'change' }],
        password: [{ validator: validatePassword, trigger: 'change' }],
      },
      layout: {
        wrapperCol: { span: 24 },
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // 发送请求
          try {
            const { username ,password } = this.ruleForm
            await this.$store.dispatch('req_login' ,{ user_name: username ,password })
            // 跳转页面
            this.$router.push('/manage')
            this.$message.success('登陆成功！')
          } catch(e) {
             this.$message.error(e)
          }
        } else {
          this.$message.error('登陆失败')
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
.login-page {
  width: 100%;
  height: 100%;
  background-color: rgb(50, 64, 87);
  .login-center {
    position: absolute;
    top:-20px;
    left:0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 330px;
    height: 300px;
    text-align: center;
    .login-title {
      font-size: 34px;
      height: 50px;
      color: #fff;
    }
    .login-form {
      background-color: #fff;
      border-radius: 5px;
      height: 250px;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      .ant-form-explain {
        font-size: 12px ;
        text-align: left;
      }
      .form-item {
        margin-top: 10px;
      }
      .login-go {
        margin-bottom: 10px;
      }  
      div {
        width: 80%;
        // margin: 10px 0;
        input {
          width: 100%;
          // margin-top: 20px;
        }
        
      }
      div.ant-row:last-child{
        margin-bottom: 10px;
      }
      .form-btn {
        width: 100%;
        background-color: rgb(32, 160, 255);
      }
      .login-msg {
      text-align: center;
      font-size: 12px;
      color: red;
      padding: 0;
      margin: 0;
    }
    }
    
  }
}

</style>
