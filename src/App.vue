<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import NavPage from './views/NavPage/NavPage.vue'
</script>

<template>
  <!-- <header>
    <div class="wrapper">
      <HelloWorld msg="You did it!" />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView /> -->
  <header>1</header>
  <div class="main-container">
    <NavPage />
    <div class="main-content">
      <!-- <div>你的位置</div> -->
      <RouterView />
    </div>
  </div>
</template>
<style scoped>
header {
  height: 60px;
  background-color: #fff;
}
.main-container {
  flex-grow: 1;
  display: flex;
  .main-content {
    /* height: 100%; */
    flex-grow: 1;
    padding: 10px 10px;
    overflow: hidden;
  }
}
</style>
