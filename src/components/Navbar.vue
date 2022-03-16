<template>
  <div class="navbar">
    <div class="wrapp">
      <div @click="$router.push('/')" class="studio">home page</div>
      <div class="nur-sultan">nur-sultan, kz</div>
      <div class="contact">contact</div>
      <div>2021</div>
      <!-- <div class="burger">
        <svg width="35" height="10" viewBox="0 0 35 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="35" height="3" rx="0.6" fill="#212228"/>
          <rect y="7" width="35" height="3" rx="0.6" fill="#212228"/>
        </svg>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>

.navbar {
  display: flex;
  align-items: center;
  position: fixed;
  width: 1294px;
  height: 55px;
  left: 73px;
  top: 25px;

  background: #FFFFFF;
  box-shadow: 0px 2px 15px rgba(33, 34, 40, 0.3);
  border-radius: 8px;

  z-index: 1001;
}

.wrapp {
  width: 100%;
  max-width: 1294px;
  display: flex;
  justify-content: space-between;
  padding: 21px 76px 16px;

  font-size: 18px;
  line-height: 18px;
  text-transform: uppercase;

  letter-spacing: -0.03em;

  color: #212228;
}

.studio {
  cursor: pointer;
  color: #212228;
  transition: color 0.1s linear;
}

.studio:hover {
  color: #5C50E3;
}

.burger {
  display: flex;
  align-items: center;
  padding-bottom: 4px;
}

</style>
