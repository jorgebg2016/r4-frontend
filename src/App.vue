<template>
  <div id="app" class="absolute-box">
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-width: 400px;
  letter-spacing: 1px;
}

.relative-box {
  height: 100%;
  width: 100%;
  position: absolute;
}

.absolute-box {
  height: 100%;
  width: 100%;
  position: absolute;
}
</style>
