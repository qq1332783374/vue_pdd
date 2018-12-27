<template>
    <div class="login">
        <div class="login-inner">
            <div class="login-header">
                <div class="login-header-title">
                    验证码登陆
                </div>
            </div>
            <div class="login-content">
                <form>
                    <section class="login-message">
                        <input type="tel" maxlength="11" placeholder="请输入手机号码" v-model="phoneNumber">
                        <button 
                            class="get-verification" 
                            @click="_getVerification"
                            :disabled="!phoneRight"
                            v-if="!count"
                            type="button"
                        >
                            获取验证码
                        </button>
                        <button class="get-verification" v-else disabled type="button">
                            已发送{{count}}s
                        </button>
                    </section>
                    <section class="login-verification">
                        <input type="tel" maxlength="8" placeholder="验证码" v-model="verification" ref="code">
                    </section>
                    <section class="login-hint">
                        温馨提示登录时将自动注册，且代表已同意
                        <a href="javascript:;">服务协议与隐私政策</a>
                    </section>
                    <button type="button" class="login-submit" @click="_login">登陆</button>
                </form>
                <button type="button" class="login-back" @click="_back">返回</button>
            </div> 
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
    name: 'login',
    data() {
        return {
            phoneNumber:'', // 手机号码
            verification:'',  // 验证码
            count:0 , // 倒计时
        }
    },
    methods: {
        _getVerification() {  // 获取验证码
            // 请求验证码
            this.$store.dispatch('getVerification',this.phoneNumber)
            Toast("验证码已发送")
            this.count = 5
            this.interval = setInterval(() =>{
                this.count--
                if(this.count == 0) {
                    clearInterval(this.interval)
                }
            },1000)
        },
        _login() { // 登陆
            // 判断手机号码
            if(!this.phoneNumber) {
                Toast('请输入手机号码')
                return
            }else if(!this.phoneRight) {
                Toast('请输入正确的手机号码')
                return
            }
            // 判断验证码
            if(!this.verification) {
                Toast('请输入验证码')
                return
            }else if(!this.verificationRight) {
                Toast('请输入正确的验证码')
                return
            }else if(this.verification != this.getLoginInfo.info.code) {
                Toast('验证码不正确，请检查')
                return
            }
            // 手机验证码登陆
            this.$store.dispatch('loginInfo',this.getLoginInfo.info)
            
            // 登陆成功
            if(this.getLoginInfo.isLogin) {
                Toast(this.getLoginInfo.msg)
                this.$router.push({path:'/user'})
            }
        },
        _back() {  // 返回
            this.$router.push({path:'/home'})
        },

    },
    computed: {
      // 验证手机号是否合理
      phoneRight() {
        return /^[1][3,4,5,7,8][0-9]{9}$/.test(this.phoneNumber)
      },
      verificationRight() {
          return /^[0-9]{6}$/.test(this.verification)
      },
      getLoginInfo() {
          return this.$store.getters.getLoginInfo
      },
      
    },
    mounted() {
        
    }
}
</script>

<style scoped>
.login{
    width: 100%;
    height: 100%;
    background: #fff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
}
.login-inner {
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;
}
.login-header-title {
    padding-top: 40px;
    padding-bottom: 10px;
    text-align: center;
    font-size: 18px;
    color: #9370db;
    font-weight: 700;
    border-bottom: 2px solid #9370db;
}
section.login-message {
    position: relative;
    margin-top: 16px;
    height: 48px;
    font-size: 14px;
    background: #fff;
}
section.login-message input{
    width: 100%;
    height: 100%;
    padding-left: 8px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #ddd;
    border-radius: 4px;
    outline: 0;
    font: 400 14px Arial;
}
section.login-message button{
    position: absolute;
    top: 50%;
    right: 10px;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    border: 0;
    color: #ccc;
    font-size: 14px;
    background: transparent;
}
section.login-verification {
    position: relative;
    margin-top: 16px;
    height: 48px;
    font-size: 14px;
    background: #fff;
}
section.login-verification input{
    width: 100%;
    height: 100%;
    padding-left: 8px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #ddd;
    border-radius: 4px;
    outline: 0;
    font: 400 14px Arial;
}
section.login-hint {
    position: relative;
    margin-top: 16px;
    height: 48px;
    font-size: 14px;
    background: #fff;
}
section.login-hint a{
    color: #9370db;
    text-decoration: none;
}
button.login-submit {
    display: block;
    width: 100%;
    height: 42px;
    margin-top: 30px;
    border-radius: 4px;
    background: #9370db;
    color: #fff;
    text-align: center;
    font-size: 16px;
    line-height: 42px;
    border: 0;
}
button.login-back {
    display: block;
    width: 100%;
    height: 42px;
    margin-top: 15px;
    border-radius: 4px;
    background: transparent;
    border: 1px solid #9370db;
    color: #9370db;
    text-align: center;
    font-size: 16px;
    line-height: 42px;
}
</style>
