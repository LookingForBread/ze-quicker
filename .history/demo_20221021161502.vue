<script setup>
import { reactive , ref ,getCurrentInstance} from 'vue'
import {getUser,addUser,updateUser,deleteUser,getUserDetail} from '@/api/system'
import {baseModelOptions,baseFilterOptions} from './options'

// const { proxy } = getCurrentInstance();

const state = reactive({
  baseModelOptions: baseModelOptions(),
  baseFilterOptions: baseFilterOptions(),
  title: "User管理",
  baseModelName: 'User信息',
  addBtnName: '添加User',
  editBtnName: '',
  delBtnName: '',
  primaryKey: 'id',
  getTableFn: getUser,
  addFn: addUser,
  editFn: updateUser,
  deleteFn: deleteUser,
  detailFn: getUserDetail,
  // multipleDelete: true,
  pageInfo: { total: 0, base:{limit: 8,current: 1} },
})

</script>

<template>
  <BaseTablePage 
    :tableOptions="state" 
  >
    <template v-slot:column>
    	<el-table-column align="center" prop="Username" label="User名" />
      <el-table-column align="center" prop="realName" label="姓名" />
      <el-table-column align="center" prop="deptName" label="部门" />
      <el-table-column align="center" prop="gender" label="性别">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.gender==1?'男':scope.row.gender==2?'女':'未知' }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="email" label="邮箱" />
      <el-table-column align="center" prop="mobile" label="手机号" />
  	</template>
  </BaseTablePage>
</template>

<style scoped>

</style>
