<script setup>
import { Delete, Edit } from '@element-plus/icons-vue'
import { ref } from "vue"
import ChannelSelect from './components/ChannelSelect.vue'
import { artDelService, artGetDetailService, artGetListService } from '../../api/article';
import ArticleEdit from './components/ArticleEdit.vue';
import { formatTime } from '../../utils/format.js'
import { ElMessage, ElMessageBox } from 'element-plus';
import { baseURL } from '@/utils/request'
import axios from 'axios'

const articleList = ref([])
const loading = ref(false)
const total = ref(0)
//const cateId = ref()

const params = ref({
    pagenum: 1,
    pagesize: 5,
    cate_id: '',
    state: ''
})
const imgUrl = ref('')

const getArticleList = async () => {
    loading.value = true

    const res = await artGetListService(params.value)
    articleList.value = res.data.data
    for (let i = 0; i < articleList.value.length; i++) {
        const art_inf = await artGetDetailService(articleList.value[i].id)

        imgUrl.value = baseURL + art_inf.data.data.cover_img
        // articleList.value[i].cover_img = file
        articleList.value[i].cover_img = imgUrl.value
    }

    total.value = res.data.total

    loading.value = false
}
getArticleList()




const onSearch = () => {
    params.value.pageenum = 1
    getArticleList()
}

const onReset = () => {
    params.value.pageenum = 1
    params.value.cate_id = ""
    params.value.state = ''
    getArticleList()
}


const articleEditRef = ref()
const onAddArticle = () => {
    articleEditRef.value.open({})
}


const onEditArticle = (row) => {
    articleEditRef.value.open(row)
}
const onDeleteArticle = async (row) => {
    await ElMessageBox.confirm('此操作将永久删除该违约记录，是否继续？', "提示", {
        confirmButtonText: '确定',
        cancelButtonText: "取消",
        type: 'warning'

    })
    await artDelService(row.id)
    ElMessage.success('删除成功')
    getArticleList()
}
const onSuccess = (type) => {
    if (type === 'add') {
        const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
        params.value.pagenum = lastPage
    }
    getArticleList()
}

const onCurrentChange = (page) => {
    params.value.pagenum = page
    getArticleList()
}

const onSizeChange = (size) => {
    params.value.pagenum = 1
    params.value.pagesize = size
    getArticleList()
}

let isflag = true
let isMore = false
const load = async () => {
    isflag = true
    isMore = false
    //const res = await artGetListService(params.value)
    if (isflag) {
        articleList.value = articleList.value.concat(articleList.value)
        setTimeout(() => {
            isflag = false
        }, 1000)
    }
    // const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    // params.value.pagenum = lastPage
    // 
}

</script>
<template>
    <page-container title="违约管理">
        <template #extra>
            <el-button @click="onAddArticle">添加违约信息</el-button>
        </template>
        <!-- 表单 -->
        <el-form inline>
            <el-form-item label="违约分类">
                <Channel-Select v-model="params.cate_id" width="200px"></Channel-Select>
            </el-form-item>
            <el-form-item label="违约状态">
                <el-select style="width: 200px;" v-model="params.state">
                    <el-option label="违约中" value="已发布"></el-option>
                    <el-option label="重生" value="草稿"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item style="margin-left: 310px;">
                <el-button type="primary" @click="onSearch">搜索</el-button>
                <el-button @click="onReset">重置</el-button>
            </el-form-item>
        </el-form>

        <!-- 表格 -->
        <el-table :data="articleList" v-el-table-infinite-scroll="load">

            <el-table-column label="违约企业" prop="title">
                <template #default="{ row }">
                    <el-link>{{ row.title }}</el-link>
                </template>
            </el-table-column>
            <el-table-column label="违约类型" prop="cate_name"></el-table-column>
            <el-table-column label="申请时间" prop="pub_date">
                <template #default="{ row }">
                    {{ formatTime(row.pub_date) }}
                </template>
            </el-table-column>
            <el-table-column label="状态" prop="state">
                <template #default="{ row }">
                    {{ row.state === '已发布' ? '违约中' : '已重生' }}
                </template>
            </el-table-column>


            <el-table-column label="违约图片" prop="cover_img">
                <template #default="{ row }">
                    <img v-lazy="row.cover_img" style="width: 100px;height: 100px;" alt="">
                </template>
            </el-table-column>


            <el-table-column label="操作">
                <template #default="{ row }">
                    <el-button circle plain type="primary" :icon="Edit" @click="onEditArticle(row)"></el-button>
                    <el-button circle plain type="danger" :icon="Delete" @click="onDeleteArticle(row)"></el-button>
                </template>
            </el-table-column>

        </el-table>
        <el-alert v-if="isflag" title="正在努力加载中..." type="success" center :closable="false" show-icon />
        <el-alert v-if="isMore" title="没有更多啦！" type="warning" center show-icon />

        <el-pagination v-model:current-page="params.pagenum" v-model:page-size="params.pagesize"
            :page-sizes="[2, 3, 5, 10]" :background="true" layout="jumper, total, sizes, prev, pager, next"
            :total="total" @size-change="onSizeChange" @current-change="onCurrentChange"
            style="margin-top: 20px; justify-content: flex-end" />

        <article-edit ref="articleEditRef" @success="onSuccess"></article-edit>
    </page-container>
</template>
<style lang="scss" scoped></style>
