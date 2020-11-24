<template>
  <div class="box">
    <div class="headerBox">
      <p class="title">选择食品种类</p>
      <a-form class="form1">
        <div class="f1Box">
          <span>食品种类</span>
          <a-select v-if="firstName" :default-value="firstName" class="select1" @change="handleType">
            <a-select-option
              :value="item.id"
              v-for="(item, index) in typeList"
              :key="index"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </div>
        <div class="f1Box2">
          <a-collapse accordion>
            <a-collapse-panel header="添加食品种类">
              <div>
                <div class="footheader">
                  <span>食品种类</span>
                  <a-input
                    style="width: 50%; margin-left: 30px"
                    v-model="foodName"
                  />
                </div>
                <div class="footfood">
                  <span>种类描述</span>
                  <a-input
                    style="width: 50%; margin-left: 30px; margin-top: 30px"
                    v-model="foodContent"
                  />
                </div>
                <a-button
                  type="primary"
                  style="margin-left: 0; margin-top: 30px"
                  @click="addFood"
                >
                  提交
                </a-button>
              </div>
            </a-collapse-panel>
          </a-collapse>
        </div>
      </a-form>
    </div>
    <div class="bottomBox">
      <p class="title">添加食品</p>
      <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" >
        <a-form-item label="食品名称">
          <a-input
          v-model="addobj.name"
            style="width: 50%"
            v-decorator="[
              'note',
              {
                rules: [{ required: true, message: 'Please input your note!' }],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="食品活动">
          <a-input style="width: 50%" v-model="addobj.shopActive"/>
        </a-form-item>
        <a-form-item label="食品详情">
          <a-input style="width: 50%"  v-model="addobj.shopContent"/>
        </a-form-item>
        <a-form-item label="上传图片">
          <a-upload
            name="avatar"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            :before-upload="beforeUpload"
            @change="handleChange"
          >
            <img
              v-if="imageUrl"
              :src="imageUrl"
              alt="avatar"
              style="width: 150px; height: 150px"
            />
            <div
              v-else
              style="width: 150px; line-height: 150px; text-align: center"
            >
              <a-icon :type="loading ? 'loading' : 'plus'" />
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item label="食品特点">
          <a-select default-value="热销" style="width: 50%">
            <a-select-option value="招牌"> 招牌 </a-select-option>
            <a-select-option value="热销"> 热销 </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="食品规格">
          <a-radio-group v-model="value" >
            <a-radio :value="1"> 单规格 </a-radio>
            <a-radio :value="2"> 多规格 </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="包装费">
          <a-input-number
            id="inputNumber"
            v-model="addobj.specs[0].packing_fee"
            :min="1"
            :max="25"
          />
        </a-form-item>
        <a-form-item label="价格">
          <a-input-number id="inputNumber" v-model="addobj.specs[0].price" :min="1" :max="25" />
        </a-form-item>
        <a-button type="primary" style="margin-left: 500px" @click="handleClick"> 提交 </a-button>
      </a-form>
    </div>
  </div>
</template>
<script>
import "./addgoods.less";
import { addshoptype, getShoptype,addshop } from "../../api";
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default {
  name: "AddGoods",
  data() {
    return {
      typeList: [],
      foodName: "巧克力",
      foodContent: "bbb",

      firstName: "", //下拉列表中第一个商品名字
      loading: false,
      imageUrl: "",
      value:1,
      addobj:{
          restaurant_id: 1, //店铺id
          category_id:0,//类别id 
          name:'',
          image_path:'',
          specs:[{specs: '默认',packing_fee:0,price:20}],
          // shopActive:'',
          // shopContent:'',    
      }
    };
  },
  mounted() {
    // this.addobj.restaurant_id = this.$route.query.restaurant_id;
    getShoptype(this.addobj.restaurant_id).then((value) => {
      this.typeList = value;
      console.log(value,'----++')
      this.firstName = value[0].name;
      this.addobj.category_id = value[0].id
    });
  },
  methods: {
    async addFood() {
      if (!this.foodName) {
        this.$message.error("请输入食品种类");
        return;
      }
      if (!this.foodContent) {
        this.$message.error("请输入种类描述");
        return;
      }
      const result = await addshoptype({
        name: this.foodName,
        description: this.foodContent,
        restaurant_id: this.addobj.restaurant_id,
      });
      this.foodName = "";
      this.foodContent = "";
      this.$message.success("添加种类成功");
    },

    //biaodan
    handleChange(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl;
          this.addobj.image_path = imageUrl
          this.loading = false;
        });
      }
    },
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this.$message.error("You can only upload JPG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
    },
    handleType(value){
       this.addobj.category_id = value
    },
    handleClick(e){
      e.preventDefault()
      if(!this.addobj.name){
        this.$message.error("请输入食品名称");
        return
      }
      if(!this.addobj.shopActive){
        this.$message.error("请输入食品活动");
        return
      }
      if(!this.addobj.shopContent){
        this.$message.error("请输入食品详情");
        return
      }
      if(!this.addobj.image_path){
        this.$message.error("请添加图片");
        return
      }
      addshop(this.addobj).then(()=>{
          console.log('success');
          
      })
    }
  },
};
</script>
<style scope>
</style>