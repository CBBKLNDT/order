<script setup>
defineProps({
  title: {
    required: true,
    type: String
  }
})


</script>

<template>
  <el-card class="pagecontainer">
    <template #header>
      <div class="header">
        <span>{{ title }}</span>
        <div class="extra">
          <slot name="extra"></slot>
        </div>
      </div>
    </template>
    <slot></slot>
  </el-card>
  
</template>

<style lang="scss" scoped>
.pagecontainer {
  min-height: 100%;
  box-sizing: border-box;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
