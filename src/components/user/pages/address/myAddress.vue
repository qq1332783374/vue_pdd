<template>
    <div class="myAddress">
        <div class="addres-header">
            <i class="iconfont icon-2fanhui" @click="_back"></i>
            <span class="title">收货地址管理</span>
        </div>
        <div class="no-address" v-if="_getAddressList.length == 0">
            <i class="iconfont icon-dizhi"></i>
            <p>暂无收货地址</p>
        </div>
        <div class="address-list" v-else>
            <div class="address-item" v-for="(item,index) in _getAddressList" :key="index">
                <div class="address-content">
                    <div class="address-user">
                        <span class="address-name">{{item.consigner}}</span>
                        <span class="address-phone">{{item.mobile}}</span>
                    </div>
                    <div class="address-info">
                        <span>{{item.provinces.provinceName}} </span>
                        <span>{{item.provinces.cityList[0].cityName}} </span>
                        <span>{{item.provinces.cityList[0].districtList[0].districtName}} </span>
                        <span>{{item.address}} </span>
                    </div>
                    <div class="address-operation">
                        <div class="default">
                            <div class="check">
                                <label class="checkBox">
                                    <input type="checkbox" :checked="item.flag" @change="_setDefaultAddress(item)"> 
                                </label>
                                <div>
                                    <span v-if="item.flag">已设为默认</span>
                                    <span v-else>设为默认</span>
                                </div>
                                
                            </div>
                        </div>
                        <div class="editor">
                            <span @click="_editor(item)"><i class="iconfont icon-tubiaozhizuomobanyihuifu-"></i> 编辑</span>
                            <span @click="del(item)"><i class="iconfont icon-lajitongshanchu"></i> 删除</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="add-address">
            <button @click="addAddress"><i class="iconfont icon-jiufuqianbaoicon06"></i> 添加新地址</button>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
import axios from 'axios'
import { MessageBox } from 'mint-ui'
import editorAddress from './editorAddress'
export default {
    name: 'myAddress',
    data() {
        return {
            popupVisible: false,
            modalHide: false
        }
    },
    components: {
        editorAddress
    },
    methods: {
        _getAddress() {
            this.$store.dispatch('getAddress', this.$route.query.uuid)
        },
        _back() { // 返回
            history.go(-1)
        },
        addAddress() { // 添加地址
            this.$router.push({path:'/addAddress',query:{uuid:this.$route.query.uuid}})
        },
        _editor(item) {  // 编辑
            this.$store.dispatch('editorAddress', item)
            this.$router.push({path:'/editorAddress'})
        },
        del(item) {  // 删除
            MessageBox.confirm('确定执行此操作?').then(action => {
                axios.get('/pdd/deleteExpressAddress', {
                    params: {
                        id: item.id,
                    }
                }).then((res) =>{
                    if(res.data == 'ok') {
                        this._getAddress()
                        Toast({
                            message: '操作成功',
                            iconClass: 'iconfont icon-duigou'
                        })
                        this._getAddress()
                    }
                })
            }).catch((e) =>{
                console.log(e)
            })
        },
        _setDefaultAddress(item) { // 设为默认
            var obj = {
                id: item.id,
                uuid: item.uid
            }
            MessageBox.confirm('确定执行此操作?').then(action => {
                axios.get('/pdd/defaultAddress', {
                    params: {
                        id: obj.id,
                        uuid: obj.uuid
                    }
                }).then((res) =>{
                    if(res.data == 'ok') {
                        this._getAddress()
                        Toast({
                            message: '操作成功',
                            iconClass: 'iconfont icon-duigou'
                        })
                    }
                })
            }).catch((e) =>{
                console.log(e)
            })
        }
    },
    created() {
        // 获取地址
        this._getAddress()
    },
    computed: {
        _getAddressList() {
            return this.$store.getters.getAddressList
        }
    },
}
</script>

<style scoped>
.myAddress{
    width: 100%;
    background: #f5f5f5;
}
.addres-header {
    display: flex;
    padding: 10px;
    margin-bottom: 10px;
    background: #fff;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
}
.addres-header span{
    flex: 1;
    display: flex;
    justify-content: center;
    font-size: 16px;
}
.no-address {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 40px 0px;
}
.no-address i{
    font-size: 64px;
}
.no-address p {
    font-size: 16px;
}
.address-list {
    padding-top: 55px;
}
.add-address {
    display: flex;
    width: 100%;
    height: 50px;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding: 0px 10px;
}
.add-address button {
    width: 100%;
    height: 100%;
    border: none;
    background: #e02e24;
    color: #fff;
    border-radius: 4px;
}
input[type='checkbox']{
    width: 20px;
    height: 20px;
    background-color: #fff;
    -webkit-appearance:none;
    border: 1px solid #c9c9c9;
    border-radius: 50%;
    outline: none;
}
.checkBox input[type=checkbox]:checked{
   background: url('../../images/checked.png') no-repeat;
   background-size: cover;
}
.address-item {
    background: #fff;
    margin-bottom: 15px;
    box-sizing: border-box;
    padding: 10px;
}
.address-item .address-user {
    display: flex;
}
span.address-name {
    flex: 1;
}
span.address-phone {
    flex: 1;
    text-align: right;
}
.address-item .address-info {
    padding-bottom: 15px;
    padding-top: 10px;
}
.address-item .address-operation {
    display: flex;
    align-items: center;
    border-top: 1px solid #ddd;
    padding: 5px 0;
}
.address-item .address-operation .default {
    flex: 1;
}
.address-item .address-operation .default .check {
    display: flex;
    align-items: center;
}
.address-item .address-operation .default .editor {
    flex: 1;
    text-align: right;
}
.editorAddress{
    width: 100%;
    height: 100%;
}
</style>
