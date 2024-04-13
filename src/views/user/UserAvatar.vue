<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { Upload } from '@element-plus/icons-vue'
import { useUserStore } from '../../stores'
import { userUpdateAvatarService } from '../../api/user'

const userStore = useUserStore()

const imgUrl = ref(userStore.user.user_pic)
const uploadRef = ref()
const onSelectFile = (uploadFile) => {
    const reader = new FileReader()
    reader.readAsDataURL(uploadFile.raw)
    reader.onload = () => {
        imgUrl.value = reader.result
    }
}

const onUpdateAvatar = async () => {
    await userUpdateAvatarService(imgUrl.value)
    await userStore.getUser()
    ElMessage.success('更换头像成功')
}

</script>
<template>
    <page-container title="更换头像">
        <el-upload ref="uploadRef" class="avatar-uploader" :show-file-list="false" :auto-upload="false"
            :on-change="onSelectFile">
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
                <Plus />
            </el-icon>
        </el-upload>
        <br>
        <el-button @click="uploadRef.$el.querySelector('input').click()" type="primary" :icon="Plus"
            size="large">选择图片</el-button>
        <el-button @click="onUpdateAvatar" type="success" :icon="Upload" size="large">上传图片</el-button>
    </page-container>
</template>



<style lang="scss" scoped>
.avatar-uploader {
    :deep() {
        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }

        .el-upload {
            border: 1px dashed var(--el-border-color);
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: var(--el-transition-duration-fast);
        }

        .el-upload:hover {
            border-color: var(--el-color-primary);
        }

        .el-icon.avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            text-align: center;
        }
    }
}
</style>