<template>
  <div class="add-shop">
    <a-form-model
    ref="ruleForm"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    class="add-shop-form"
  > 
    <!-- 店铺名称 -->
    <a-form-model-item ref="name" label="店铺名称" prop="name">
      <a-input
        v-model="form.name"
        @blur="
          () => {
            $refs.name.onFieldBlur();
          }
        "
      />
    </a-form-model-item>
    <!-- 详细地址 -->
    <a-form-model-item label="详情地址" prop="region">
      <a-select v-model="form.region" placeholder="请输入地址">
        <a-select-option value="shanghai">
          Zone one
        </a-select-option>
        <a-select-option value="beijing">
          Zone two
        </a-select-option>
      </a-select>
      <span>当前城市：{{city}}</span>
    </a-form-model-item>
    <!-- 联系电话 -->
    <a-form-model-item ref="phone" label="联系电话" prop="phone">
      <a-input
        v-model="form.phone"
        @blur="
          () => {
            $refs.phone.onFieldBlur();
          }
        "
      />
    </a-form-model-item>
    <!-- 店铺简介 -->
    <a-form-model-item label="店铺简介" prop="synopsis">
      <a-input
        v-model="form.synopsis"
      />
    </a-form-model-item>
    <!-- 店铺标语 -->
    <a-form-model-item  label="店铺标语" prop="title">
      <a-input
        v-model="form.title"
      />
    </a-form-model-item>
    <!-- 店铺分类 -->
    <a-form-model-item label="店铺分类" prop="classify" :wrapper-col="{ span: 5, offset: 0 }" v-if="categoryList.length">
       <a-cascader
        :options="categoryList"
        change-on-select
        :default-value="categoryList"
        @change="onChange"
      />
    </a-form-model-item>
    <!-- 店铺特点 -->
    <a-form-model-item label="店铺特点" prop="delivery" :wrapper-col="{ span: 9, offset: 0 }">
      <span>品牌保证</span><a-switch v-model="form.delivery_1" />
      <span>蜂鸟专送</span><a-switch v-model="form.delivery_2" />
      <span>新开店铺</span><a-switch v-model="form.delivery_3" />
      <span>外卖保</span><a-switch v-model="form.delivery_4" />
      <span>准时达</span><a-switch v-model="form.delivery_5" />
      <span>开发票</span><a-switch v-model="form.delivery_6" />
    </a-form-model-item>
    <!-- 配送费 -->
    <a-form-model-item  label="配送费" prop="cost" :wrapper-col="{ span: 4, offset: 0 }">
      <a-input
        v-model="form.cost"
      />
      <i class="el-icon-minus icon-minus-plus dec" @click="form.cost < 1 ? '' : form.cost--"></i>
      <i class="el-icon-plus icon-minus-plus inc" @click="form.cost++"></i>
    </a-form-model-item>
    <!-- 起送价 -->
    <a-form-model-item  label="起送价" prop="begin_price" :wrapper-col="{ span: 4, offset: 0 }">
      <a-input
        v-model="form.begin_price"
      />
      <i class="el-icon-minus icon-minus-plus dec" @click="form.begin_price < 1 ? '' : form.begin_price--"></i>
      <i class="el-icon-plus icon-minus-plus inc" @click="form.begin_price++"></i>
    </a-form-model-item>
    <!-- 营业时间 -->
    <a-form-model-item  label="营业时间" prop="begin-end-time" :wrapper-col="{ span: 16, offset: 0 }">
      <el-time-select
        placeholder="起始时间"
        v-model="startTime"
        :picker-options="{
          start: '05:30',
          step: '00:15',
          end: '23:30'
        }">
      </el-time-select>
      <el-time-select
        placeholder="结束时间"
        v-model="endTime"
        :picker-options="{
          start: '05:30',
          step: '00:15',
          end: '23:30',
          minTime: startTime
        }">
      </el-time-select>
    </a-form-model-item>
    <!-- 上传店铺头像 -->
    <a-form-model-item  label="上传店铺头像"  :wrapper-col="{ span: 5, offset: 0 }">
      <a-upload
        method="post"
        name="avatar_1"
        list-type="picture-card"
        class="avatar-uploader"
        :show-upload-list="false"
        action="https://elm.cangdu.org/v1/addimg/shop"
        :before-upload="beforeUpload"
        @change="handleChange1"
      >
        <img v-if="imageUrl_1" :src="imageUrl_1" alt="avatar" />
        <div v-else>
          <a-icon :type="loading_1 ? 'loading' : 'plus'" />
        </div>
      </a-upload>
    </a-form-model-item>
    <!-- 上传营业执照 -->
    <a-form-model-item  label="上传营业执照"  :wrapper-col="{ span: 5, offset: 0 }">
      <a-upload
        name="avatar_2"
        list-type="picture-card"
        class="avatar-uploader"
        :show-upload-list="false"
        action="https://elm.cangdu.org/v1/addimg/shop"
        :before-upload="beforeUpload"
        @change="handleChange2"
      >
        <img v-if="imageUrl_2" :src="imageUrl_2" alt="avatar" />
        <div v-else>
          <a-icon :type="loading_2 ? 'loading' : 'plus'" />
        </div>
      </a-upload>
    </a-form-model-item>
    <!-- 上传餐饮服务许可证 -->
    <a-form-model-item  label="上传餐饮服务许可证"  :wrapper-col="{ span: 5, offset: 0 }">
      <a-upload
        name="avatar_3"
        list-type="picture-card"
        class="avatar-uploader"
        :show-upload-list="false"
        action="https://elm.cangdu.org/v1/addimg/shop"
        :before-upload="beforeUpload"
        @change="handleChange3"
      >
        <img v-if="imageUrl_3" :src="imageUrl_3" alt="avatar" />
        <div v-else>
          <a-icon :type="loading_3 ? 'loading' : 'plus'" />
        </div>
      </a-upload>
    </a-form-model-item>
    <!-- 优惠活动 -->
    <a-form-model-item label="优惠活动" prop="classify" :wrapper-col="{ span: 5, offset: 0 }">
      <a-select :default-value="`${selectData[0].key}:${selectData[0].name}`" @change="selectChecked">
        <a-select-option :value="item.key+':'+item.name" v-for="item in selectData" :key="item.key">
          {{item.name}}
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <el-dialog title="提示" :visible.sync="visible" width="40%">
        <p>请输入活动详情</p>
        <el-input v-model="discountText" autocomplete="off"></el-input>
        <div slot="footer" class="dialog-footer">
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </div>
    </el-dialog>
    <!-- 活动表格 -->
    <a-form-model-item :wrapper-col="{ span: 16, offset: 0 }">
      <a-table :columns="columns" :data-source="tableData" :pagination="false">
        <a-button type="danger" slot="delete" slot-scope="text ,record" @click="currentDel(text.key)">删除</a-button>
      </a-table>
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 4, offset: 6 }">
      <a-button type="primary" @click="onSubmit">
        立即创建
      </a-button>
    </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
const columns = [
  { title: '活动标题', dataIndex: 'title', key: 'title' },
  { title: '活动名称', dataIndex: 'name', key: 'name' },
  { title: '活动详情', dataIndex: 'detail', key: 'detail' },
  { title: '操作', dataIndex: '', key: 'x', scopedSlots: { customRender: 'delete' } },
];

// 引入vuex
import { mapState ,mapGetters } from 'vuex'
export default {
  name: 'AddShop',
  data() {
    return {
      // 定位地址
      addr: '',
      labelCol: { span: 4 },
      wrapperCol: { span: 12 },
      other: '',
      // 上传图片
      loading_1: false,
      loading_2: false,
      loading_3: false,
      imageUrl_1: '',
      imageUrl_2: '',
      imageUrl_3: '',
      form: {
        name: '',
        region: undefined,
        phone: '',
        synopsis: '',
        title: '',
        classify: '',
        delivery_1: true,
        delivery_2: true,
        delivery_3: true,
        delivery_4: true,
        delivery_5: true,
        delivery_6: true,
        begin_price: '20',
        cost: '5',
        type: [],
        resource: '',
        desc: '',
      },
      rules: {
        name: [
          { required: true, message: 'Please input Activity name', trigger: 'blur' },
          { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
        ],
        region: [{ required: true, message: 'Please select Activity zone', trigger: 'change' }],
        phone: [{ required: true, message: 'Please pick a date', trigger: 'change' }],
        type: [
          {
            type: 'array',
            required: true,
            message: 'Please select at least one activity type',
            trigger: 'change',
          },
        ],
        resource: [
          { required: true, message: 'Please select activity resource', trigger: 'change' },
        ],
        desc: [{ required: true, message: 'Please input activity form', trigger: 'blur' }],
      },
      columns,
      // 开始和结束时间
      startTime: '',
      endTime: '',
      // 优惠活动
      selectData:[
        {
          key: 1,
          title: '减',
          name: '满减优惠',
          detail: '满30减5，满60减8',
        },
        {
          key: 2,
          title: '特',
          name: '优惠大酬宾',
          detail: '',
        },
        {
          key: 3,
          title: '新',
          name: '新用户立减',
          detail: '',
        },
        {
          key: 4,
          title: '领',
          name: '进店领券',
          detail: '',
        },
      ],
      // 表格
      tableData: [
        {
          key: 1,
          title: '减',
          name: '满减优惠',
          detail: '满30减5，满60减8',
        },
      ],
      // 是否显示弹框
      visible: false,
      // 优惠内容
      discountText: '',
      // 当前表格的数量
      key: 1,
      // 活动标题
      title: '减',
      // 活动名称
      disName: '',
      // 当前所在城市
      city: ''
    };
  },
  async mounted() {
    var cityCode = returnCitySN.cid;
    console.log(returnCitySN)
    const reg = /省([\s\S]+)市/
    this.city = returnCitySN.cname.match(reg)[1]
    // 分发action
    this.$store.dispatch('req_shopcategorylist')
    // 初始化表格数据
    // this.tableData = this.selectData.filter(item => item.detail)
    
  },
  computed: {
    ...mapState({
      shopCategoryList: state => state.shops.shopCategoryList
    }),
    ...mapGetters(['categoryList'])
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },

    // 上传图片的连个方法
    handleChange1(info) {
      if (info.file.status === 'uploading') {
        console.log(info.file.status)
        this.loading_1 = true;
        return;
      }
      if (info.file.status === 'done') {
        console.log('done')
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl_1 = imageUrl;
          this.loading_1 = false;
        });
      }
      console.log('hand')
    },
    handleChange2(info) {
      console.log(info ,file)
      if (info.file.status === 'uploading') {
        this.loading_2 = true;
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl_2 = imageUrl;
          this.loading_2 = false;
        });
      }
    },
    handleChange3(info) {
      console.log(info ,file)
      if (info.file.status === 'uploading') {
        this.loading_3 = true;
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl_3 = imageUrl;
          this.loading_3 = false;
        });
      }
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!');
      }
      return isJpgOrPng && isLt2M;
    },
    // 店铺分类下拉事件
    onChange(value, selectedOptions) {
      console.log(value ,selectedOptions)
    },
    // 优惠被选中
    selectChecked(value) {
      // 当前活动标题
      const selected = this.selectData.find(item => (item.key + '') === value.split(':')[0])
      this.title = selected.title
      this.disName = selected.name
      // 弹出框
      this.visible = true
    },
    cancel() {
      this.visible = false
      if(!this.discountText) {
        this.$message.info('取消输入')
      }
    },
    confirm() {
      // 关闭弹框
      this.visible = false
      if(!this.discountText) {
        this.$message.info('请输入活动详情')
      } else {
        // 调用接口
        // 更新表格数据
        this.tableData.push({
          key: ++this.key,
          title: this.title,
          name: this.disName,
          detail: this.discountText
        })
        // 清空数据
        this.title = ''
        this.disName = ''
        this.discountText = ''
      }
    },

    // 获取删除
    currentDel(key) {
      this.tableData.forEach((item ,index)=> {
        if(item.key === key) {
          this.tableData.splice(index ,1)
        }
      })
    }
  },
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
.add-shop {
  width: 100%;
  .add-shop-form {
    margin-left: 180px;
    margin-top: 20px;
    .avatar-uploader > .ant-upload {
      width: 128px;
      height: 128px;
    }
    .ant-upload-select-picture-card i {
      font-size: 32px;
      color: #ccc;
    }
    .ant-form-item-control {
      position: relative;
      .icon-minus-plus {
        position: absolute;
        top:0;
        width: 30px;
        height: 30px;
        // background-color: #ccc;
        margin-top: -5px;
        line-height: 30px;
        text-align: center;
        border-left: 1px solid #ccc;
        font-size: 20px;
        cursor: pointer;
      }
      .dec {
        right: 31px;
      }
      .inc {
        right: 0;
      }
    }
  }
}
</style>
