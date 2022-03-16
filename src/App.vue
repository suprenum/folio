<template>
  <navbar></navbar>
  <div class="app">
    <!-- <canvas class="webgl"></canvas> -->
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  components: {
    Navbar
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;600&family=Teko:wght@500;700&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
	overflow-x: hidden;
  font-family: 'Teko', Helvetica, sans-serif;
  font-weight: bold;
  letter-spacing: -0.03em;
	background-color: #212228;
  -webkit-font-smoothing: antialiased;
}

li {
  list-style: none;
}

a {
	text-decoration: none;
}

.app {
  padding: 20px;
}

h1 {
  font-size: 70px;
}

section {
	height: 100vh;
}

</style>
