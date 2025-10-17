<template>
  <div class="numpad-container">
    <div class="numpad-display">{{ code }}</div>

    <button v-for="n in 9" :key="n" class="numpad-btn" :class="'btn' + n" @click="$emit('press', n)"></button>
    <button class="numpad-btn btn0" @click="$emit('press', 0)"></button>
  </div>
</template>

<script setup>
defineProps({
  code: String
})
</script>

<style scoped>
.numpad-container {
  position: fixed;
  left: 50%;
  bottom: 58vh;
  transform: translateX(-50%);
  z-index: 9999;
}

.numpad-display {
  position: absolute;
  top: -26px;
  left: 65px;
  transform: translateX(-50%);
  width: 120px;
  height: 15px;
  background: rgba(70,70,70,0.85);
  color: white;
  border-radius: 6px;
  text-align: center;
  line-height: 18px;
  font-family: 'Courier New', monospace;
  letter-spacing: 2px;
  font-size: 13px;
  z-index: 10000;
  transform: rotateZ(-2deg);
}


.numpad-btn {
  position: absolute;
  box-sizing: border-box;
  padding: 0 !important;
  margin: 0 !important;

  background: transparent /*!important*/;
  border: none !important;
  box-shadow: none !important;
  color: transparent;
  font-size: 0;

  width: 26px !important;
  min-width: 0 !important;
  -webkit-appearance: none;
  appearance: none;

  height: 25px;
  cursor: pointer;
  z-index: 10000;
}


.btn1 { left: 75px;   top: -3px; }
.btn2 { left: 113px;  top: -4px; }
.btn3 { left: 150px;  top: -6px; }

.btn4 { left: 75px;   top: 32px; }
.btn5 { left: 113px;  top: 31px; }
.btn6 { left: 150px;  top: 29px; }

.btn7 { left: 75px;   top: 69px; }
.btn8 { left: 113px;  top: 68px; }
.btn9 { left: 150px;  top: 66px; }

.btn0     { left: 111px;  top: 104px; }


</style>
