<template>
    <div class="addAddress">
        <div class="add-header">
            <i class="iconfont icon-2fanhui" @click="_back"></i>
            <span class="title">编辑收货地址</span>
        </div>
        <div class="add-info">
            <form>
                <div class="info-item">
                    <label class="info-title">收货人</label>
                    <input type="text" name="consigner" placeholder="请输入收货人名字" v-model="getEditorAddressInfo.consigner">
                </div>
                <div class="info-item">
                    <label class="info-title">联系电话</label>
                    <input type="tel" name="mobile" maxlength="11" placeholder="请输入联系电话" v-model="getEditorAddressInfo.mobile">
                </div>
                <div class="info-item" @click="selectAddress">
                    <label class="info-title">所在地区</label>
                    <input type="text" name="region" placeholder="请选择 >" v-model="region">
                </div>
                <div class="info-item">
                    <label class="info-title">详细地址</label>
                    <textarea name="address" placeholder="请输入详细地址信息" v-model="getEditorAddressInfo.address"></textarea>
                </div>
                <div class="footer">
                    <button type="button" @click="saveNewAddress">保存</button>
                </div>
            </form>
        </div>
        <div>
           <mt-popup
                v-model="popupVisible"
                position="bottom"
                class="pick"
            >
                <div class="pop-btn">
                    <p @click="cancle">取消</p>
                </div>
                <my-area @pickerHide="pickerHide"></my-area>
            </mt-popup>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import myArea from 'components/common/myArea'
import { Toast } from 'mint-ui'
export default {
    name: 'editorAddress',
    components: {
        scroll,
        myArea
    },
    data() {
        return {
            consigner:'', // 收货人
            mobile:'', // 联系电话
            region:'',  // 三级联动地址
            address:'',  // 详细地址
            province:'', // 省级id
            city:'',  // 城市id
            district:'',  // 地区id
            popupVisible: false ,  // 选择器显示
        }
    },
    methods: {
        _back() {
            history.go(-1)
        },
        selectAddress() { 
            this.popupVisible = true
        },
        cancle() { // 取消
            this.popupVisible = false
        },
        pickerHide(obj) {
            this.popupVisible = obj
            this.region = this._getPdc.pro.provinceName+'/'+this._getPdc.citys.cityName +'/'+ this._getPdc.district.districtName
        },
        saveNewAddress() {  // 保存地址
            if(!this.getEditorAddressInfo.consigner) {  // 收货人
                Toast('收货人不能为空')
                return
            }else if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.getEditorAddressInfo.mobile)) { // 电话
                Toast('请输入正确的电话号码')
                return
            }else if(!this.getEditorAddressInfo.address) {
                Toast('详细地址不能为空')
                return
            }
            // 三级区域修改和维修改
           if(this._getPdc.pro == undefined){  // 默认未修改
               var obj = {
                   id: this.getEditorAddressInfo.id,
                   consigner: this.getEditorAddressInfo.consigner,
                   mobile: this.getEditorAddressInfo.mobile,
                   province: this.getEditorAddressInfo.provinces.provinceId,
                   city: this.getEditorAddressInfo.provinces.cityList[0].cityId,
                   district: this.getEditorAddressInfo.provinces.cityList[0].districtList[0].districtId,
                   address: this.getEditorAddressInfo.address
               }
               this.$store.dispatch('updateExpressAddress', obj)
           }else{  // 已经修改
               var obj1 = {
                   id: this.getEditorAddressInfo.id,
                   consigner: this.getEditorAddressInfo.consigner,
                   mobile: this.getEditorAddressInfo.mobile,
                   province: this._getPdc.pro.provinceId,
                   city: this._getPdc.citys.cityId,
                   district: this._getPdc.district.districtId,
                   address: this.getEditorAddressInfo.address
               }
               this.$store.dispatch('updateExpressAddress', obj1)
           }

            
        }
    },
    computed: {
        _getPdc() {
            return this.$store.getters.getPdc
        },
        getEditorAddressInfo() {
            return this.$store.getters.editorAddressInfo
        }
    },
    mounted() {
        this.region = this.getEditorAddressInfo.provinces.provinceName+'/'+this.getEditorAddressInfo.provinces.cityList[0].cityName +'/'+ this.getEditorAddressInfo.provinces.cityList[0].districtList[0].districtName
    } 
}
</script>

<style scoped>
.test {
    width: 100%;
    height: 300px;
    overflow: hidden;
}
.pick{
    width: 100%;
}
.pop-btn {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ddd;
    box-sizing: border-box;
    padding: 0 10px;
    font-size: 16px;
}
.pop-btn p{
    flex: 1;
}
.pop-btn p:nth-child(2) {
    text-align: right;
}
.editorAddress{
    width: 100%;
    height: 100%;
}
.add-header{
    display: flex;
    padding: 10px;
    margin-bottom: 10px;
    background: #fff;
}
.add-header span{
    flex: 1;
    display: flex;
    justify-content: center;
    font-size: 16px;
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
.add-info {
    background: #fff;
}
.info-item {
    display: flex;
    box-sizing: border-box;
    padding: 10px;
    align-items: center;
    border-bottom: 1px solid #ccc;
}
label.info-title {
    width: 25.22%;
    color: #999;
}
input[type="text"], input[type="tel"]{
    width: 100%;
    border: none;
    outline: none;
}
textarea{
    width: 100%;
    resize: none;
    border: none;
    outline: none;
}
.check-address {
    text-align: right;
    flex: 1;
}
.check {
    flex: 1;
    text-align: right;
}
.footer {
    background: #f5f5f5;
    display: flex;
    box-sizing: border-box;
    padding: 5px;
    width: 100%;
    height: 50px;
}
.footer button{
    width: 100%;
    background: #f44;
    border: none;
    color: #fff;
    border-radius: 4px;
}
</style>
