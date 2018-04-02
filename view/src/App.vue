<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}
body{
  background: #f3f5f7;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
/* chrome scroll style */
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar
{
  width: 8px;
  height: 8px;
  background-color: rgba(244,245,249,1);
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track
{
  background-color: rgba(244,245,249,1);
}

/*定义滑块*/
::-webkit-scrollbar-thumb
{
  border-radius: 20px;
  background-color: rgba(209,213,219,1);
}

</style>
