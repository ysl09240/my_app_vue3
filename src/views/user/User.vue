<template>
  <div class="manage">
    <el-dialog title="提示" v-model="dialogVisible" width="60%" :before-close="handleClose">
      <el-form
        :inline="true"
        :model="userForm"
        :rules="rules"
        label-width="auto"
        ref="userFormRef"
        class="userForm"
      >
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输入姓名" v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input placeholder="请输入年龄" v-model.number="userForm.age"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input placeholder="请输入手机号码" v-model.number="userForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="userForm.sex" placeholder="请选择" style="width:100px">
            <el-option label="男" :value="0"></el-option>
            <el-option label="女" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker
            v-model="userForm.birth"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-DD"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input placeholder="请输入地址" v-model="userForm.addr"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="handleAdd">+新增</el-button>
      <el-form :inline="true" :model="userSearchForm">
        <el-form-item>
          <el-input placeholder="请输入名称" v-model="userSearchForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchSubmit()">查 询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="manage-table">
      <el-table :data="tableData" size="small" style="width: 100%">
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="sex" label="性别">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.sex===0?'男':'女' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="birth" label="出生日期"></el-table-column>
        <el-table-column prop="phone" label="手机号码"></el-table-column>
        <el-table-column prop="addr" label="地址"></el-table-column>
        <el-table-column prop="addr" label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pager">
        <el-pagination
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, ref, getCurrentInstance, onMounted } from "vue";
export default {
  setup() {
    const { proxy } = getCurrentInstance();
    const pageData = reactive({
      page: 1,
      limit: 10
    });
    const total = ref(0);
    const tableData = ref([]);
    let dialogVisible = ref(false);
    let modelType = ref(0);
    const userSearchForm = reactive({
      name: ""
    });
    const userForm = reactive({
      name: "",
      age: "",
      phone: "",
      sex: "",
      birth: "",
      addr: ""
    });
    const rules = reactive({
      name: [{ required: true, message: "请输入姓名", trigger: "change" }],
      age: [
        { required: true, message: "请输入年龄", trigger: "change" },
        { type: "number", message: "年龄必须为数字值" }
      ],
      phone: [
        { required: true, message: "请输入手机号码", trigger: "change" },
        { type: "number", message: "手机必须为数字值" }
      ],
      sex: [{ required: true, message: "请选择性别", trigger: "change" }],
      birth: [
        {
          required: true,
          message: "请选择日期",
          trigger: "change"
        }
      ],
      addr: [{ required: true, message: "请输入地址", trigger: "change" }]
    });
    const handleClose = () => {
      proxy.$refs.userFormRef.resetFields();
      dialogVisible.value = false;
    };
    const submit = () => {
      proxy.$refs.userFormRef.validate(valid => {
        if (valid) {
          if (modelType.value == 0) {
            proxy.$api.addUser(userForm);
            getUserList();
          } else {
            proxy.$api.editUser(userForm);
            getUserList();
          }
          handleClose();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };
    const cancel = () => {
      handleClose();
    };
    const handleEdit = row => {
      dialogVisible.value = true;
      modelType.value = 1;
      //浅拷备
      Object.assign(userForm,row);
    };
    const handleDelete = async row => {
      let res = await proxy.$api.delUser(row);
      if (res && res.msg === "删除成功") {
        getUserList();
      }
    };
    const handleAdd = () => {
      dialogVisible.value = true;
      modelType.value = 0;
    };
    const getUserList = async () => {
      let res = await proxy.$api.getUser({ ...pageData, ...userSearchForm });
      console.log(res, "getUser");
      tableData.value = res.list;
      total.value = res.count;
    };
    const handleCurrentChange = val => {
      pageData.page = val;
      getUserList();
    };
    const searchSubmit = () => {
      getUserList();
    };
    onMounted(() => {
      getUserList();
    });
    return {
      pageData,
      total,
      tableData,
      userForm,
      dialogVisible,
      modelType,
      userSearchForm,
      handleClose,
      handleAdd,
      handleEdit,
      handleDelete,
      handleCurrentChange,
      searchSubmit,
      cancel,
      submit,
      rules
    };
  }
};
</script>
<style lang="less" scoped>
.manage {
  height: 90%;
  .manage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-form {
      height: 40px;
    }
  }
  .dialog-footer {
    display: flex;
    justify-content: center;
  }
  .manage-table {
    position: relative;
    height: calc(100%-62px);
    .pager {
      position: absolute;
      right: 20px;
    }
  }
}
</style>
