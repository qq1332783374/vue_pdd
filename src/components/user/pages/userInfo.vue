<template>
    <div class="userInfo">
        <div class="title">
            <i class="iconfont icon-2fanhui" @click="goBack"></i>
            <span>基本信息</span>
        </div>
        <form class="info">
            <div class="info-item">
                <label class="item-label">头像</label>
                <div class="item-content">
                    <img src="//pinduoduoimg.yangkeduo.com/avatar/default/7.png@98w_1l_70Q_50sh.webp" alt="">
                </div>
            </div>
            <div class="info-item" @click="_name">
                <label class="item-lable">昵称</label>
                <div class="item-content">
                    <span v-if="_getUserInfo.userInfo.userName != null">
                        {{_getUserInfo.userInfo.userName}}
                    </span>
                    <span v-else>
                        未知
                    </span>
                </div>
            </div>
            <div class="info-item" @click="_sex">
                <label class="item-lable">性别</label>
                <div class="item-content">
                    <span v-if="_getUserInfo.userInfo.sex != null">
                        {{_getUserInfo.userInfo.sex}}
                    </span>
                    <span v-else>
                        未知
                    </span>
                </div>
            </div>
             <div class="info-item" @click="_phone">
                <label class="item-lable">电话</label>
                <div class="item-content">
                    <span v-if="_getUserInfo.userInfo.userPhone != null">
                        {{_getUserInfo.userInfo.userPhone}}
                    </span>
                    <span v-else>
                        未填写
                    </span>
                </div>
            </div>
            <div class="info-item" @click="_address">
                <label class="item-lable">常住地</label>
                <div class="item-content">
                    <span v-if="_getUserInfo.userInfo.address != null">
                        {{_getUserInfo.userInfo.address}}
                    </span>
                    <span v-else>
                        未填写
                    </span>
                </div>
            </div>
            <div class="info-item" @click="_birthday">
                <label class="item-lable">生日</label>
                <div class="item-content">
                    <span v-if="_getUserInfo.userInfo.birthday != null">
                        {{_getUserInfo.userInfo.birthday | formatTime("YMD")}}
                    </span>
                    <span v-else>
                        未填写
                    </span>
                </div>
            </div>
            <div class="info-item" @click="_sign">
                <label class="item-lable">个性签名</label>
                <div class="item-content">
                    <span v-if="_getUserInfo.userInfo.sign != null">
                        {{_getUserInfo.userInfo.sign}}
                    </span>
                    <span v-else>
                        未填写
                    </span>
                </div>
            </div>
            <div class="from-footer">
                <div class="footer-btn">
                    <button type="button" @click="_updateUserInfo">确定</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
export default {
    name: 'userInfo',
    methods: {
        goBack() {  // 返回上一级
            history.go(-1)
        },
        _updateUserInfo() {
            var obj = {
                birthday: this._getUserInfo.userInfo.birthday,
                sex: this._getUserInfo.userInfo.sex,
                sign: this._getUserInfo.userInfo.sign,
                userName: this._getUserInfo.userInfo.userName,
                userPhone: this._getUserInfo.userInfo.userPhone,
                address: this._getUserInfo.userInfo.address
            }
            MessageBox.confirm('是否要更新用户新?').then(action => {
                this.$store.dispatch('updateUserInfo', obj)
            }).catch((e) =>{
                console.log(e)
            })
            
        },
        _sign() {
            MessageBox.prompt('请输入个性签名',{
                inputValue: this._getUserInfo.userInfo.sign
            }).then(({ value, action }) => {
                if(action == 'confirm') {
                    this._getUserInfo.userInfo.sign = value

                }
            }).catch((e) =>{
                console.log(e)
            })
        },
        _birthday() {
            MessageBox.prompt('请输入生日',{
                inputValidator:(val) =>{
                    if(val === null) {
                        return true; // 初始校验
                    }
                    return (/^([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8])))$/.test(val))
                },
                inputErrorMessage:'请输入格式为:年-月-日 的日期！',
                inputValue: this._getUserInfo.userInfo.birthday
            }).then(({ value, action }) => {
                if(action == 'confirm') {
                    this._getUserInfo.userInfo.birthday = value
                }
            }).catch((e) =>{
                console.log(e)
            })
        },
        _address() {
            MessageBox.prompt('请输入常住地址',{
                inputValidator:(val) =>{
                    if(val === null) {
                        return true; // 初始校验
                    }
                    return !(val.length <1 || val.length>20)
                },
                inputErrorMessage:'常用地址不能为空哦！',
                inputValue: this._getUserInfo.userInfo.address
            }).then(({ value, action }) => {
                if(action == 'confirm') {
                    this._getUserInfo.userInfo.address = value

                }
            }).catch((e) =>{
                console.log(e)
            })
        },
        _phone() {
            MessageBox.prompt('请输入电话',{
                inputValidator:(val) =>{
                    if(val === null) {
                        return true; // 初始校验
                    }
                    return (/^[1][3,4,5,7,8][0-9]{9}$/.test(val))
                },
                inputErrorMessage:'请输入正确的电话号码！',
                inputValue: this._getUserInfo.userInfo.userPhone
            }).then(({ value, action }) => {
                if(action == 'confirm') {
                    this._getUserInfo.userInfo.sex = userPhone
                }
            }).catch((e) =>{
                console.log(e)
            })
        },
        _sex() { 
            MessageBox.prompt('请输入性别',{
                inputValidator:(val) =>{
                    if(val === null) {
                        return true; // 初始校验
                    }
                    return (val ==='男' || val === '女')
                },
                inputErrorMessage:'请输入正确的性别！',
                inputValue: this._getUserInfo.userInfo.sex
            }).then(({ value, action }) => {
                if(action == 'confirm') {
                    this._getUserInfo.userInfo.sex = value
                }
            }).catch((e) =>{
                console.log(e)
            })
        },
        _name() {
            MessageBox.prompt('请输入姓名',{
                inputValidator:(val) =>{
                    if(val === null) {
                        return true; // 初始校验
                    }
                    return !(val.length <1 || val.length>8)
                },
                inputErrorMessage:'用户昵称在1~8位',
                inputValue: this._getUserInfo.userInfo.userName
            }).then(({ value, action }) => {
                if(action == 'confirm') {
                    this._getUserInfo.userInfo.userName = value

                }
            }).catch((e) =>{
                console.log(e)
            })
        },
        beforeClose(action, done) {
            if (action === 'confirm') {
                setTimeout(done, 1000);
            } else {
                done();
            }
        }
    },
    computed: {
        _getUserInfo() {
            return this.$store.getters.getLoginInfo
        }
    }
}
</script>

<style scoped>
.userInfo {
    width: 100%;
    height: 100%;
}
.title {
    box-sizing: border-box;
    padding: 10px;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    margin-bottom: 10px;
}
.title span{
    flex: 1;
    text-align: center;
}
.info-item {
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding: 10px;
    background: #fff;
    border-bottom: 1px solid #ddd;
}
.info-item img{
    width: 60px;
    height: 60px;
    border-radius: 50%;
}
label.item-label {
    flex: 1;
}
.item-content {
    flex: 1;
    text-align: right; 
}
.footer-btn {
    display: flex;
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    height: 60px;
    justify-content: center;
    align-items: center;
}
.footer-btn button{
    width: 100%;
    height: 100%;
    background: #f44;
    border: none;
    color: #fff;
    box-shadow: 2px 2px 4px #ddd;
}
</style>
