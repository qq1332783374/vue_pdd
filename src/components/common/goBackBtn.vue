<template>
    <div class="goBackBtn">
        <button class="back" @click="goBack">
            <span>
                <
            </span>
        </button>
    </div>
</template>

<script>
export default {
    name: 'goBackBtn',
    methods: {
        goBack() {
            history.back(-1)
        }
    }
}
</script>

<style scoped>
.goBackBtn{
    position: fixed;
    top: 10px;
    left: 10px;
    z-index: 9999;
}
.back {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: none;
    color: #fff;
    text-align: center;
    background: rgba(0, 0, 0, 0.55);
    cursor: pointer;
}
</style>
