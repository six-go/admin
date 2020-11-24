<template>
  <div class="outerBox">
    <div v-if="!adminInfo.user_name" class="container">
      <router-view></router-view>
    </div>
    <div v-else class="container">
      <!-- 导航栏区域 -->
      <ul class="nav" ref="nav">
        <div class="left-menu" ref="left-menu">
          <a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
            <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
          </a-button>
          <a-menu
            :default-selected-keys="[$route.path ? $route.path: '/manage']"
            :default-open-keys="[Object.keys(menuList).find(item => Object.keys(menuList[item]).indexOf($route.path) !== -1) || '数据管理']"
            mode="inline"
            theme="dark"
            :inline-collapsed="collapsed"
            @click="selectRoute"
            @openChange="openChange"
          >
            <a-menu-item key="/manage">
              <router-link to="/manage">
              <a-icon type="appstore" />
              <span>首页</span>
              </router-link>
            </a-menu-item>
            <a-sub-menu key="数据管理">
              <span slot="title"><a-icon type="database" /><span>数据管理</span></span>
              <a-menu-item key="/userList">
                <router-link to="/userList">用户列表</router-link>
              </a-menu-item>
              <a-menu-item key="/shopList">
                <router-link to="/shopList">商家列表</router-link>
              </a-menu-item>
              <a-menu-item key="/foodList">
                <router-link to="/foodList">食品列表</router-link>
              </a-menu-item>
              <a-menu-item key="/orderList">
                <router-link to="/orderList">订单列表</router-link>
              </a-menu-item>
               <a-menu-item key="/adminList">
                <router-link to="/adminList">管理员列表</router-link>
              </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="添加数据">
              <span slot="title"><a-icon type="plus" /><span>添加数据</span></span>
              <a-menu-item key="/addShop">
                <router-link to="/addShop">添加商铺</router-link>
              </a-menu-item>
              <a-menu-item key="/addGoods">
                <router-link to="/addGoods">添加商品</router-link>
              </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="图表">
              <span slot="title"><a-icon type="pie-chart" /><span>图表</span></span>
              <a-menu-item key="/visitor">
                <router-link to="/visitor">用户分布</router-link>
              </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="编辑">
              <span slot="title"><a-icon type="edit" /><span>编辑</span></span>
              <a-menu-item key="/vueEdit">
                <router-link to="/vueEdit">文本编辑</router-link>
              </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="设置">
              <span slot="title"><a-icon type="setting" /><span>设置</span></span>
              <a-menu-item key="/adminSet">
                <router-link to="/adminSet">管理员设置</router-link>
              </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="说明">
              <span slot="title"><a-icon type="info-circle" /><span>说明</span></span>
              <a-menu-item key="/explain">
                <router-link to="/explain">说明</router-link>
              </a-menu-item>
            </a-sub-menu>
          </a-menu>
        </div>
      </ul>
      <!-- 右侧内容区 -->
      <div class="content" ref="content">
        <div class="right-content" ref="right-content">
          <header class="home-header" >
          <div class="header-route">
            <div>
              <router-link to="/manage">首页</router-link>
              <span>/</span>
            </div>
            <div v-if="menu">
              <a>{{menu}}</a>
              <span>/</span>
            </div>
            <div v-if="menuItem">
              <a>{{menuItem}}</a>
              <span>/</span>
            </div>
          </div>
          <div class="admin-info">
            <div class="header-img" v-if="adminInfo.user_name">
            <span>{{adminInfo.user_name}}</span>
            <img :src="`https://elm.cangdu.org/img/${adminInfo.avatar}`" alt="" width="36" height="36">
            </div>
            <ul class="user-model" ref="user-model">
              <li>
                <a @click="toHome">首页</a>
              </li>
              <li>
                <a @click="logout">退出</a>
              </li>
            </ul>
          </div>
          </header>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 引入vuex辅助函数
import { mapState } from 'vuex'
export default {
  name: 'App',
  data() {
    return {
      collapsed: false,
      // 二级地址
      menu: '',
      menuItem: '',
      menuItemRoute: '',
      // 菜单列表
      menuList: {
        "数据管理": {'/userList': '用户列表' ,'/shopList': '商家列表' ,'/foodList': '食品列表' ,'/orderList': '订单列表' ,'/adminList': '管理员列表'},
        "添加数据": {'/addShop': '添加商铺' ,'/addGoods': '添加商品'},
        "图表": {'/visitor': '用户分布'},
        "编辑": {'/vueEdit': '文本编辑'},
        "设置": {'/adminSet': '管理员设置'},
        "说明": {'/explain': '说明'},
      },
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
      // this.$refs.nav.style.width = '80px'
      // console.log(this.$refs.nav)
    },
    
    // 被选中的子菜单
    selectRoute({ domEvent ,keyPath }) {
      // if(keyPath[0] !== '/manage') {
      //   this.menu = keyPath[1]
      //   this.menuItem = domEvent.target.textContent
      //   this.menuItemRoute = keyPath[0]
      // }
    },

    // 去首页
    toHome() {
      // 路由跳转
      this.$router.push('/manage')
      // 同时，将当前小框，高度设为0
      this.$refs['user-model'].classList.add('model-active')
    },

    // 退出登陆
    logout() {
      
    },

    // 开始被选中
    openChange(item) {
      console.log('++' ,item)
    }
  },
  mounted() {
    

  },
  computed: {
    ...mapState({
      adminInfo: state => state.adminInfo.adminInfo
    })
  },
  watch: {
    $route(val) {
      // 判断
      if(val.path === '/manage') {
        this.menu = ''
        this.menuItem = ''
      } if(val.path !== '/' && val.path !== '/manage'){
        this.menu = Object.keys(this.menuList).find(item => Object.keys(this.menuList[item]).indexOf(val.path) !== -1)
        this.menuItem = this.menuList[this.menu][val.path]
      }
    },
    adminInfo(val) {
      if(this.screenY) return
      this.$nextTick(() => {
        // 给左右两边绑定鼠标滚动事件
        // console.log(leftMaxHieght, rightMaxHeight ,this.screenY)
        // 初始化左右两边移动距离
        let leftY = 0;
        let rightY = 0;
        // 左边
        this.$refs['left-menu'].onwheel = (e) => {
          // 获取左边元素最高元素大小
          const leftMaxHieght = this.$refs['left-menu'].offsetHeight
          // 视口的高度
          this.screenY = document.body.offsetHeight
          if (e.wheelDelta > 0) {
            leftY += 30;
            // onContent.style.top = Y + 'px'
          } else {
            leftY -= 30;
          }
          // 边界判断
          leftY = leftY > 0 ? 0 : leftY < -Math.abs(this.screenY - leftMaxHieght) ?  -Math.abs(this.screenY - leftMaxHieght) : leftY;
          this.$refs['left-menu'].style.top = leftY + "px";
        }
        // 右边
        this.$refs['right-content'].onwheel = (e) => {
          // 获取右边元素最高的大小
          const rightMaxHeight = this.$refs['right-content'].offsetHeight
          // 视口的高度
          this.screenY = document.body.offsetHeight
          if (e.wheelDelta > 0) {
            rightY += 30;
            // onContent.style.top = Y + 'px'
          } else {
            rightY -= 30;
          }
          // 边界判断
          rightY = rightY > 0 ? 0 : rightY < -Math.abs(this.screenY - rightMaxHeight) ?  -Math.abs(this.screenY - rightMaxHeight) : rightY;
          this.$refs['right-content'].style.top = rightY + "px";
        }
      })
    },

  }
}
</script>
<style lang='less' rel='stylesheet/less' scoped>
@size: 100%;
.outerBox {
  width: @size;
  height: @size;
  .container {
    width: @size;
    height: @size;
    display: flex;
    // 导航栏
    .nav {
      width: 18%;
      background-color: rgb(0, 21, 41);
      height: @size;
      position: fixed;
      top: 0;
      left: 0;
      // transition: width 2s linear;
      .left-menu {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        min-height: 100%;
        transition: top 0.2s;
      }
      a {
        text-decoration: none;
      }
      .ant-menu-item:hover {
        background-color: #ccc;
      }
      router-link-active {
        color: rgb(31, 118, 243);
      }
    }

    // 内容区域
    .content {
      position: absolute;
      right: 0;
      top: 0;
      width: 82%;
      height: 100%;
      .right-content {
        position: absolute;
        right: 0;
        top: 0;
        width: 100%;
        min-height: 100%;
        transition: top 0.2s;
      }
      .home-header {
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: rgb(239, 242, 247);
        box-sizing: border-box;
        padding: 0 20px;
        .header-route {
          display: flex;
          font-size: 13px;
          a {
            text-decoration: none;
            color: #000;
            cursor: pointer;
          }
          span {
            padding: 0 5px;
            color: rgb(175, 174, 174);
          }
          div:last-child {
            a{
              cursor: text;
              color: rgb(175, 174, 174);
            }
            span {
              display: none;
            }
          }
        }
        .admin-info {
          position: relative;
          height: 50px;
          line-height: 50px;
          .header-img {
            cursor: pointer;
            span {
              margin-right: 10px;
            }
            img {
              border-radius: 50%;
            }
          }
          &:hover .user-model{
            height: 70px;
          }
          .model-active {
            height: 0;
          }
          .user-model {
            height: 0;
            overflow: hidden;
            position: absolute;
            top: 45px;
            left: 10px;
            width: 100px;
            text-align: center;
            background-color: #fff;
            box-shadow: 0 0 5px #ccc;
            transition:height 0.3s;
            li {
              line-height: 30px;
              &:first-child {
                margin-top: 5px;
              }
              &:last-child{
                margin-bottom: 5px;
              }
              a {
                color: #000;
                text-decoration: none;
                display: block;
                width: 100%;
                height: 100%;
              }
              &:hover {
                background-color: rgb(235, 233, 233);
              }
            }
          }
        }
      }
    }
  }
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
