<template>
  <div>
    <!-- 头部 -->
    <el-breadcrumb separator="/" class="headerList">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 中间遍历区域 -->
    <el-table :data="foods" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="食品名称：">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="餐馆名称：">
              <span>{{ props.row.restaurant_name }}</span>
            </el-form-item>
            <el-form-item label="食品 ID：">
              <span>{{ props.row.item_id }}</span>
            </el-form-item>
            <el-form-item label="餐馆 ID：">
              <span>{{ props.row.restaurant_id }}</span>
            </el-form-item>
            <el-form-item label="食品介绍：">
              <span>{{ props.row.description }}</span>
            </el-form-item>
            <el-form-item label="餐馆地址：">
              <span>{{ props.row.restaurant_address }}</span>
            </el-form-item>
            <el-form-item label="食品评分：">
              <span>{{ props.row.rating }}</span>
            </el-form-item>
            <el-form-item label="食品分类：">
              <span>{{ props.row.category_name }}</span>
            </el-form-item>
            <el-form-item label="月销量：">
              <span>{{ props.row.month_sales }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商品 ID" prop="category_id"> </el-table-column>
      <el-table-column label="商品名称" prop="name"> </el-table-column>
      <el-table-column label="评分" prop="rating"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹框 -->

    <el-dialog title="修改食品信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="食品名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="食品介绍" :label-width="formLabelWidth">
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="食品分类" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="热销榜">
            <el-option label="热销榜" value="shanghai"></el-option>
            <el-option label="优惠" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <!-- 上传图片 -->
        <span>点击上传</span>
        <el-form-item>
          <el-upload action="#" list-type="picture-card" :auto-upload="false">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{ file }">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt=""
              />
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleDownload(file)"
                >
                  <i class="el-icon-download"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <!-- 上传结束 -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定修改</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 弹框结束 -->
  </div>
</template>
<script>
export default {
  name: "FoodList",
  data() {
    return {
      foods: [],
      formLabelWidth: "120px",
      form: {
        name: "",
        description: "",
        id: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",

      // 上传图片
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
    };
  },
  //--------
  methods: {
    // 获取列表
    async getFoodList() {
      await this.$store.dispatch("reqgetFoodList");
      this.foods = this.$store.state.foods;
    },
    //删除api'地址
    async deldeteFoodList(id) {
      await this.$store.dispatch("reqdeleteFood", id);
    },

    async requpdatefood({
      item_id,
      name,
      description,
      image_path,
      restaurant_id,
      id,
      specfoods,
    }) {
      const result = await this.$store.dispatch("requpdatefood", {
        item_id,
        name,
        description,
        image_path,
        restaurant_id,
        id,
        specfoods,
      });
    },

    // 点击编辑
    handleEdit(a, b) {
      this.dialogFormVisible = true;
      this.form.name = this.$store.state.foods[a].name;
      this.form.description = this.$store.state.foods[a].description;
      this.form.id = this.$store.state.foods[a].category_id;

      this.form.item_id = this.$store.state.foods[a].item_id;

      this.form.rating = this.$store.state.foods[a].rating;
      this.form.month_sales = this.$store.state.foods[a].month_sales;
      this.form.restaurant_id = this.$store.state.foods[a].restaurant_id;

      this.form.image_path = this.$store.state.foods[a].image_path;
      this.form.specfoods = this.$store.state.foods[a].specfoods;

      console.log(this.form.name);
    },
    // 删除
    handleDelete(a, b) {
      // this.deldeteFoodList(b.category_id);
    },

    onSubmit() {
      const item_id = this.form.item_id;
      const name = this.form.name;
      const description = this.form.description;
      const image_path = this.form.image_path;
      const restaurant_id = this.form.restaurant_id;
      const id = this.form.id;
      const specfoods = this.form.specfoods;

      this.requpdatefood({
        item_id,
        name,
        description,
        image_path,
        restaurant_id,
        id,
        specfoods,
      });
      this.getFoodList();
    },

    // 上传图片
    handleRemove(file) {
      console.log(file);
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      // console.log(file);
    },
  },
  mounted() {
    this.getFoodList();
  },
  // async getFoodListID(id) {
  //   const result = await this.$store.dispatch("getFoodListID", id);
  //   const foods = this.$store.state.foodsList;
  //   console.log(foods);
  //   foods.forEach((item, index) => {
  //     const add = {};
  //     add.name = item.name;
  //     add.item_id = item.item_id;
  //     add.description = item.description;
  //     add.rating = item.rating;
  //     add.month_sales = item.month_sales;
  //     add.restaurant_id = item.restaurant_id;
  //     add.category_id = item.category_id;
  //     add.image_path = item.image_path;
  //     add.specfoods = item.specfoods;
  //     add.index = index;
  //     this.foodsList.push(add);
  //   });
  // },
};
</script>
<style scoped>
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  width: 178px;
  height: 178px;
  position: relative;
  overflow: hidden;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.headerList {
  height: 60px;
  line-height: 60px;
  padding-left: 20px;
}
</style>
