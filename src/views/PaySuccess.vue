<template>
  <div class="PaySuccess">
      支付成功{{time}}秒跳转
  </div>
</template>

<script>
export default {
    data() {
        return {
            time:3
        }
    },
    created(){
        setInterval(time=>{
            this.time--
            if(this.time==0){
                this.$router.push('Car')
            }
        },1000)
    }
};
</script>

<style lang="less" scoped>

</style>