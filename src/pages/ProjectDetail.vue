<template>
  <div>
	<div class="img-container">
		<img class="header-img" src="assets/aiubf.png" alt="">
	</div>
	<div class="detail__title">
		3D BUILDING
	</div>
	<svg class="title-line" width="1142" height="2" viewBox="0 0 1142 2" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M771 1H1142" stroke="#7F8084" stroke-width="2"/>
		<path d="M0 1H596" stroke="#7F8084" stroke-width="2"/>
	</svg>
	<div id="sub1" class="detail__subtitle">PROJECT INFO</div>
	<div id="info1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
	<div id="info2">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident</div>
	<div id="sub2" class="detail__subtitle">EXPERIENCE</div>

	<div @click="$router.push('/aiu')" class="btn">explore</div>

	<div class="img-wrap-full">
		<img src="assets/aiurec.png" alt="">
	</div>

	<div class="img-wrap-half-left">
		<img src="assets/lef.png" alt="">
	</div>

	<div class="img-wrap-half-right">
		<img src="assets/rig.png" alt="">
	</div>

	<div class="img-wrap-full-bottom">
	</div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.header-img {
	position: absolute;
	top: 0;
	left: 73px;
	width: 1294px;
	height: 515px;
	object-fit: cover;
	border-radius: 0px 0px 10px 10px;
}

.detail__title {
	position: absolute;
	width: 280px;
	left: 149px;
	top: 595px;

	font-size: 60px;
	line-height: 54px;
	letter-spacing: -0.03em;

	color: #FFFFFF;
}

.title-line {
	position: absolute;
	left: 149px;
	top: 679px;
}

.detail__subtitle {
	position: absolute;
	width: 106px;
	height: 24px;
	left: 149px;
	top: 695px;

	font-weight: 500;
	font-size: 26px;
	line-height: 24px;

	letter-spacing: -0.03em;

	color: #FFFFFF;
}
#info1 {
	position: absolute;
	width: 254px;
	height: 72px;
	left: 149px;
	top: 739px;

	font-family: Rubik;
	font-style: normal;
	font-weight: normal;
	font-size: 16px;
	line-height: 18px;

	letter-spacing: -0.03em;

	color: #FFFFFF;
}
#info2 {
	position: absolute;
	width: 254px;
	height: 90px;
	left: 482px;
	top: 739px;

	font-family: Rubik;
	font-style: normal;
	font-weight: normal;
	font-size: 16px;
	line-height: 18px;

	letter-spacing: -0.03em;

	color: #FFFFFF;
}

#sub2 {
	position: absolute;
	width: 93px;
	height: 24px;
	left: 920px;
	top: 695px;
}

.btn {
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	width: 160px;
	height: 38px;
	left: 920px;
	top: 739px;

	background: #FFFFFF;
	border-radius: 4px;

	font-family: Rubik;
	font-weight: 600;
	font-size: 14px;
	line-height: 18px;
	/* identical to box height, or 129% */

	letter-spacing: -0.03em;

	color: #212228;
	cursor: pointer;
	transition: all 0.1s linear;
}

.btn:hover {
	background: #5C50E3;
	color: #ffffff;
}

.img-wrap-full {
	position: absolute;
	width: 100%;
	max-width: 1294px;
	left: 73px;
	top: 974px;

	border-radius: 10px;
	object-fit: cover;
}

.img-wrap-half-left {
	position: absolute;
	width: 100%;
	max-width: 637px;
	left: 73px;
	top: 1645px;

	border-radius: 10px;
	object-fit: cover;
}

.img-wrap-half-right {
	position: absolute;
	width: 100%;
	max-width: 637px;
	left: 730px;
	top: 1645px;

	border-radius: 10px;
	object-fit: cover;
}

</style>
