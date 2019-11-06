<template>
  <div class="goods">
    <!-- 面包屑导航 -->
    <bread name1="商品管理" name2="商品列表"></bread>

    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
import bread from "../../components/bread";

export default {
  components: {
    bread
  },
  name: "goods",
  data() {
    return {};
  },
  methods: {}
};
</script>

<style>
div.goods{
  height: 600px;
  overflow: auto;
}
.goodsName {
  width: 300px;
}
</style>
