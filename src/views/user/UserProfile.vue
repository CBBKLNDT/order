<script setup>
    import PageContainer from '../../components/PageContainer.vue'
    import { ref } from 'vue'
    import { useUserStore } from '../../stores/modules/user'
    import { ElMessage } from 'element-plus'
    import { userUpdateInfoservice } from '../../api/user'
    const { user: { email, id, nickname, username }, getUser } = useUserStore()
    const formRef = ref()
    const form = ref({
        id,
        username,
        nickname,
        email
    })


    const rules = ref({
        nickname: [
            { required: true, message: '请输入用户昵称', trigger: 'blur' },
            {
                validator: (rule, value, callback) => {
                    if (value && value.length >= 2 && value.length <= 10) {
                        callback()
                    } else {
                        callback(new Error('昵称必须是2-10位的非空字符串'))
                    }
                }, trigger: 'blur'
            }
        ],
        email: [
            { required: true, message: '请输入用户邮箱', trigger: 'blur' },
            {
                validator: (rule, value, callback) => {
                    const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
                    if (emailReg.test(value)) {
                        callback()
                    } else {
                        callback(new Error('邮箱格式不正确'))
                    }
                }, trigger: 'blur'
            }
        ]
    })



    const submitForm = async () => {
        await formRef.value.validate()
        await userUpdateInfoservice(form.value)
        getUser()
        ElMessage.success('修改成功')
    }
</script>

<template>
    <page-container title="基本资料">
        <!-- 表单部分 -->
        <el-form ref="formRef" :model="form" label-width="120px" :rules="rules">
            <el-form-item label="登录名称" prop="username">
                <el-input v-model="form.username" disabled></el-input>
            </el-form-item>
            <el-form-item label="用户昵称" prop="nickname">
                <el-input v-model="form.nickname"></el-input>
            </el-form-item>
            <el-form-item label="用户邮箱" prop="email">
                <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm">提交修改</el-button>
            </el-form-item>
        </el-form>

    </page-container>
</template>

<style lang="scss" scoped>

</style>