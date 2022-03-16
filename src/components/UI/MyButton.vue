<template>
  <a class="btn">
    <slot></slot>
  </a>
</template>

<script>
export default {
  name: 'my-button'
}
</script>

<style scoped>
.btn {
  margin-right: 30px;
  
  color: #778192;
  font-size: 12px;
  line-height: 14px;
  font-weight: 400;
  
  transition: all 0.1s linear;
  cursor: pointer;
}

.btn:hover {
  color: #1F2538;
}
</style>
