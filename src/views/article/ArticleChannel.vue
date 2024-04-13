<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { artGetChannelsService, artDelChannelService } from '../../api/article'
import ChannelEdit from './components/ChannelEdit.vue'
import { ElMessage, ElMessageBox } from "element-plus"
import "element-plus/es/components/message/style/css"
import "element-plus/es/components/message-box/style/css"
//import ELMessageBox from 'element-plus'
//import pagecontainer from '../../components/PageContainer.vue'
const channelList = ref([])
const loading = ref(false)
const dialog = ref()



const getChannelList = async () => {
  loading.value = true
  const res = await artGetChannelsService()
  channelList.value = res.data.data
  loading.value = false
}
getChannelList()
const onEditChannel = (row) => {
  dialog.value.open(row)
}
const onAddChannel = () => {
  dialog.value.open({})
}
const onDelChannel = async (row) => {
  await ElMessageBox.confirm('确定要删除吗', '温馨提示', {
    type: 'waring',
    confimButtonText: '确认',
    cancelButtonText: '取消'
  })
  await artDelChannelService(row.id)
  ElMessage.success('删除成功')
  getChannelList()
}
const onSuccess = () => {
  getChannelList()
}
</script>
<template>
  <PageContainer title="违约分类">
    <template #extra>
      <el-button @click="onAddChannel">添加分类</el-button>
    </template>

    <el-table v-loading="loading" :data="channelList" style="width: 100%">
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="cate_name" label="分类名称"></el-table-column>
      <el-table-column prop="cate_alias" label="分类别名"></el-table-column>
      <el-table-column label="操作" width="150">
        <!-- row 就是 channelList 的一项， $index 下标 -->
        <template #default="{ row, $index }">
          <el-button :icon="Edit" circle plain type="primary" @click="onEditChannel(row, $index)"></el-button>
          <el-button :icon="Delete" circle plain type="danger" @click="onDelChannel(row, $index)"></el-button>
        </template>
      </el-table-column>

      <template #empty>
        <el-empty description="没有数据"></el-empty>
      </template>
    </el-table>

    <channel-edit ref="dialog" @success="onSuccess"></channel-edit>
  </PageContainer>
</template>
<style lang="scss" scoped></style>
