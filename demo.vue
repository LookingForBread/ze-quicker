<script setup>
import { reactive } from 'vue'
import {getDemoPage,addDemo,updateDemo,deleteDemo,getDemoDetail} from './api'
import {baseModelOptions,baseFilterOptions} from './options'

// const { proxy } = getCurrentInstance();

const state = reactive({
  baseModelOptions: baseModelOptions(),
  baseFilterOptions: baseFilterOptions(),
  title: "Demo管理",
  baseModelName: 'Demo信息',
  addBtnName: '添加Demo',
  editBtnName: '',
  delBtnName: '',
  primaryKey: 'id',
  getTableFn: getDemoPage,
  addFn: addDemo,
  editFn: updateDemo,
  deleteFn: deleteDemo,
  detailFn: getDemoDetail,
  showEditBtn: true,
  showDeleteBtn: true,
  // rowControl: {
  //   showEditBtn: false,
  //   showDelBtn: false
  // },
  permission: {//菜单管理中添加权限
    add: 'system:user:list',
    edit: 'system:user:list',
    delete: 'system:user:list',
    detail: 'system:user:list',
  },
  pageInfo: { total: 0, base:{limit: 8,current: 1} },
})

</script>

<template>
  <BaseTablePage 
    :tableOptions="state" 
  >
    <template v-slot:column>
    	<el-table-column align="center" prop="Demoname" label="Demo名" />
      <el-table-column align="center" prop="realName" label="姓名" />
  	</template>
  </BaseTablePage>
</template>

<style scoped>

</style>
