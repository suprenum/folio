<template>
  <div>
    <section>
	  <div class="subtitle">DIGITAL STUDIO OF</div>
	  <div class="title">VISUAL DESIGN & CREATIVE DEVELOPMENT</div>
    </section>
    <section>
      <div class="container">
		<img @click="$router.push('/aiu-detail')" class="images" src="assets/aiub.png" alt="">
		<img @click="$router.push('/galaxy')" class="images" src="assets/galax.png" alt="">
		<a href="http://172.20.10.5:8081" target="_blanck"><img class="images" src="assets/sphe.png" alt=""></a>
	  </div>
	  <div class="project-wrapp">
		<div @click="$router.push('/aiu-detail')" class="name-wrapp">
			<div class="project-name">3d building</div>
			<div class="project-date">2021</div>
		</div>
		<div @click="$router.push('/galaxy')" class="name-wrapp">
			<div class="project-name">galaxy animation</div>
			<div class="project-date">2021</div>
		</div>
		<div class="name-wrapp">
			<div class="project-name">particle system</div>
			<div class="project-date">2021</div>
		</div>
	  </div>
    </section>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>

.subtitle {
	position: absolute;
	width: 157px;
	height: 21px;
	left: 140px;
	top: 197px;
	
	font-size: 20px;

	color: #FFFFFF;
}

.title {
	position: absolute;
	width: 570px;
	height: 132px;
	left: 140px;
	top: 225px;

	font-size: 60px;
	line-height: 54px;

	color: #FFFFFF;

}

.container {
	display: flex;
	justify-content: space-between;
	position: absolute;
	width: 1294px;
	height: 467px;
	left: 73px;
	top: 580px;
}

.images {
	width: 418px;
	height: 467px;
	border-radius: 10px;
	cursor: pointer;
}

.project-wrapp {
	display: flex;
	justify-content: space-between;
	position: absolute;
	width: 1294px;
	height: 44px;
	left: 73px;
	top: 1063px;

	text-transform: uppercase;
	cursor: pointer;
}

.name-wrapp {
	display: flex;
	justify-content: space-between;
	width: 418px;
	height: 44px;
}

.project-name {
	width: 126px;
	height: 44px;

	font-size: 26px;
	line-height: 24px;


	color: #FFFFFF;
}

.project-date {
	font-size: 26px;
	line-height: 24px;
	
	color: #66676D;
}

</style>
