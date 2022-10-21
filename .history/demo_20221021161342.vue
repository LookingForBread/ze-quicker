<script setup>
import { reactive , ref ,getCurrentInstance} from 'vue'
import {getDemo,addDemo,updateDemo,deleteDemo,getDemoDetail} from '@/api/system'
import {baseModelOptions,baseFilterOptions} from './options'

// const { proxy } = getCurrentInstance();

const state = reactive({
  baseModelOptions: baseModelOptions(),
  baseFilterOptions: baseFilterOptions(),
  title: "demo管理",
  baseModelName: 'demo信息',
  addBtnName: '添加demo',
  editBtnName: '',
  delBtnName: '',
  primaryKey: 'id',
  getTableFn: getDemo,
  addFn: addDemo,
  editFn: updateDemo,
  deleteFn: deleteDemo,
  detailFn: getDemoDetail,
  multipleDelete: true,
  pageInfo: { total: 0, base:{limit: 8,current: 1} },
})

</script>

<template>
  <BaseTablePage 
    :tableOptions="state" 
  >
    <template v-slot:column>
    	<el-table-column align="center" prop="Demoname" label="demo名" />
      <el-table-column align="center" prop="realName" label="姓名" />
      <el-table-column align="center" prop="deptName" label="部门" />
      <el-table-column align="center" prop="gender" label="性别">
        <template #default="scope">
        
          <span style="margin-left: 10px">{{ scope.row.gender==1?'男':scope.row.gender==2?'女':'未知' }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="email" label="邮箱" />
      <el-table-column align="center" prop="mobile" label="手机号" />
      <el-table-column align="center" prop="status" label="状态">
        <template #default="scope">
          <el-tag v-if="scope.row.status === 0" size="small" type="danger">停用</el-tag>
          <el-tag v-else size="small" type="success">启用</el-tag>
        </template>
      </el-table-column>
  	</template>
  </BaseTablePage>
</template>

<style scoped>

</style>
