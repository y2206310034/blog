<template>
    <el-row > 
        <el-col :span="12" class="left">
            <span>
                <i class="el-icon-s-home"></i>
            </span>
            <span>PastLove Admin</span>
        </el-col>
        <el-col :span="12" class="right">
            <div>
                上次登陆是:
                <span>{{getLastLoginTime}}</span>
            </div>
        </el-col>
    </el-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed:{
        ...mapGetters(["getLastLoginTime"])
    }
}
</script>

<style lang="scss">

</style>