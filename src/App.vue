<template>
  <the-header></the-header>
  <cover-img/>
  <router-view v-slot="{ Component, route }">
    <transition  :name="route.meta.transition">
        <component :is="Component" />
      </transition>
  </router-view>
  <the-footer></the-footer>
</template>
<script>
import TheHeader from './components/fix/TheHeader.vue';
import CoverImg from './components/fix/CoverImg.vue';
import TheFooter from './components/fix/TheFooter.vue';
export default{
  components:{
    TheHeader, CoverImg, TheFooter
  },
  created() {
    this.$store.dispatch("books/loadBooks");
    this.$store.dispatch("books/getCategories");
  },
}
</script>
<style scoped>
*{
  margin: 0px;
  padding: 0px;
  background-color: #F8F4E1;
  box-sizing: border-box;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.75s ease-out;
}

.slide-enter-to {
  position: absolute;
  right: 0;
}

.slide-enter-from {
  position: absolute;
  right: -100%;
}

.slide-leave-to {
  position: absolute;
  left: -100%;
}

.slide-leave-from {
  position: absolute;
  left: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
