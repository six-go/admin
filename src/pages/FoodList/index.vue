<template>
  <div class="table_container">
    <el-table :data="menu" style="width: 100%">
      <!-- 下拉框 -->
      <el-table-column type="expand" class="downBox">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="食品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="所属店铺">
              <span>{{ props.row.shop }}</span>
            </el-form-item>
            <el-form-item label="商品 ID">
              <span>{{ props.row.item_id }}</span>
            </el-form-item>
            <el-form-item label="餐馆 ID">
              <span>{{ props.row.restaurant_id }}</span>
            </el-form-item>
            <el-form-item label="食品介绍">
              <span>{{ props.row.description }}</span>
            </el-form-item>
            <el-form-item label="食品评分">
              <span>{{ props.row.satisfy_rate }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.tips }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <!-- 列表 -->
      <el-table-column prop="name" label="食品名称" width="220">
      </el-table-column>
      <el-table-column prop="description" label="食品介绍" width="220">
      </el-table-column>
      <el-table-column prop="satisfy_rate" label="满意率(%)" width="240">
      </el-table-column>
      <el-table-column label="操作">
        <el-button size="mini" @click="dialogFormVisible = true"
          >编辑</el-button
        >
        <el-button size="mini" type="danger">删除</el-button>
      </el-table-column>
      <!-- 弹框 -->
      <el-dialog
        title="收货地址"
        :visible.sync="dialogFormVisible"
        append-to-body
      >
        <el-form :model="form">
          <el-form-item label="食品ID" :label-width="formLabelWidth">
            <el-input
              v-model="form.item_id"
              autocomplete="off"
              class="inputBox"
            ></el-input>
          </el-form-item>
          <el-form-item label="食品名称(name)" :label-width="formLabelWidth">
            <el-input
              v-model="form.name"
              autocomplete="off"
              class="inputBox"
            ></el-input>
          </el-form-item>
          <el-form-item label="description" :label-width="formLabelWidth">
            <el-input
              v-model="form.description"
              autocomplete="off"
              class="inputBox"
            ></el-input>
          </el-form-item>
          <el-form-item label="图片路径" :label-width="formLabelWidth">
            <el-input
              v-model="form.image_path"
              autocomplete="off"
              class="inputBox"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="restaurant_id(int)"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="form.restaurant_id"
              autocomplete="off"
              class="inputBox"
            ></el-input>
          </el-form-item>
          <el-form-item label="category_id(int)" :label-width="formLabelWidth">
            <el-input
              v-model="form.category_id"
              autocomplete="off"
              class="inputBox"
            ></el-input>
          </el-form-item>
          <el-form-item label="specfoods(array)" :label-width="formLabelWidth">
            <el-input
              v-model="form.specfoods"
              autocomplete="off"
              class="inputBox"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="onSubmit">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 分页 -->
    </el-table>
    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :total="1000"
        :page-size="20"
        @current-change="switchPage"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { reqFoodList, reqFoodList1 } from "../../api";
export default {
  name: "FoodList",
  data() {
    return {
      limit: 20,
      offset: 0,
      menu: [],
      restaurant_id: 1,
      /*表单数据如下*/
      dialogFormVisible: false,
      form: {
        item_id: "",
        name: "",
        description: "",
        image_path: "",
        restaurant_id: null,
        category_id: null,
        specfoods: null,
      },
      formLabelWidth: "130px",
      /*******************/
    };
  },
  async mounted() {
    const menuData = await reqFoodList(20, 0);
    this.menu = menuData;
    console.log(this.menu);
  },
  methods: {
    editRow() {
      console.log("编辑");
    },
    onSubmit() {
      this.dialogFormVisible = false;
      console.log("提交成功");
      console.log(this.form);
    },
    async getFoodList() {
      const limit = this.limit;
      const offset = this.offset;
      const menuData = await reqFoodList(limit, offset);
      this.menu = menuData;
    },
    switchPage(val) {
      this.offset = (val - 1) * this.limit;
      this.getFoodList();
    },
  },
};
</script>
<style scoped>
.wrap-table {
  border: 1px solid #ececee;
}
.inputBox {
  width: 350px;
}
/* 下来菜单 */
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
/* 下拉框 */
.downBox {
  width: 50px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 50px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
/* 分页 */
.Pagination {
  display: flex;
  justify-content: flex-start;
  margin-top: 8px;
}
</style>
