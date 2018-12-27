<template>
    <div class="myArea">
        <van-tabs v-model="active">
            <div class="area-scroll">
                <div class="">
                    <van-tab title="省">
                        <div class="area-item" v-for="(pro,index) in ProvinceList" :key="index" @click="getCitys(pro,index)" :class="{active:count==index}">
                            <span class="names">{{pro.provinceName}}</span>
                            <span class="direction">></span>
                        </div>
                    </van-tab>
                    <van-tab title="市" v-if="isShow">
                        <div class="area-item" v-for="(citys,index1) in CityLis" :key="index1" @click="getDistrict(citys,index1)" :class="{active:count1==index1}">
                            <span class="names">{{citys.cityName}}</span>
                            <span class="direction">></span>
                        </div>
                    </van-tab>
                    <van-tab title="区" v-if="isShow1">
                        <div class="area-item" v-for="(district,index2) in DistrictList" :key="index2" @click="reg(district,index2)" :class="{active:count2 == index2}">
                            <span class="names">{{district.districtName}}</span>
                            <span class="direction">></span>
                        </div>
                    </van-tab>
                </div>
            </div>
        </van-tabs>
    </div>
</template>

<script>
import scroll  from './scroll'
import BScroll from 'better-scroll'
import axios from 'axios'
export default {
    name: 'myArea',
    components: {
        scroll
    },
    data() {
        return {
            active:0,
            count:0,
            count1:0,
            count2:0,
            pdc:{} ,  // 省，市，区
            ProvinceList:[], // 省
            CityLis:[] , // 市
            DistrictList:[], // 区
            isShow: false,
            isShow1: false,
        }
    },
    methods: {
        _initBScroll () {
            this.TestScroll = new BScroll('.area-scroll', {
                scrollY: true,
                probeType: 1
            })
        },
        getCitys(pro,index) {  // 获取市
            this.count = index
            this.pdc.pro = pro
            this.isShow = true
            axios.get('/pdd/getCityListByProvinceId', {
                params: {
                    provinceId:pro.provinceId 
                }
            }).then((res) =>{
                this.CityLis = res.data
                this.active = 1
            })
        }, 
        getDistrict(citys,index1) {  // 获取区
            this.count1 = index1
            this.pdc.citys = citys
            this.isShow1 = true
            axios.get('/pdd/getDistrictListByCityId', {
                params: {
                    cityId: citys.cityId 
                }
            }).then((res) =>{
                this.DistrictList = res.data
                this.active = 2
                
            })
        },
        reg(item,index2) {
            this.count2 = index2
            this.pdc.district = item
            this.$store.dispatch('pdc', this.pdc)
            this.$emit('pickerHide',false)
        }
    },
    mounted() {
        this.$nextTick(() =>{
            setTimeout(() =>{
                this._initBScroll()
            },500)
        })
        
    },
    created() {
        // 获取省级
        axios.get('/pdd/getProvinceList').then((res) =>{
            this.ProvinceList = res.data
            this.active = 0
        }) 
    }
}
</script>

<style scoped>
.myArea{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.area-scroll{
    width: 100%;
    height: 300px;
    overflow: hidden;
    background: #fff;
}
.area-item {
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    font-size: 16px;
    border-bottom: 1px solid #ddd;
    display: flex;
    align-items: center;
}
span.names {
    flex: 1;
}
span.direction {
    flex: 1;
    text-align: right;
    color: #f44;
    font-weight: bold;
    font-family: cursive;
}
.active{
    color: #f44;
}
</style>
