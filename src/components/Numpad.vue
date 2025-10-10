<template>
  <div class="numpad-container">
    <div class="numpad-display">{{ code }}</div>

    <button v-for="n in 9" :key="n" class="numpad-btn" :class="'btn' + n" @click="$emit('press', n)"></button>
    <button class="numpad-btn btn0" @click="$emit('press', 0)"></button>
    <button class="numpad-btn btnClear" @click="$emit('clear')"></button>
  </div>
</template>

<script setup>
defineProps({
  code: String
})
</script>

<style scoped>
:global(.numpad-container) {
  position: fixed;
  left: 50%;
  bottom: 58vh;
  transform: translateX(-50%);
  z-index: 9999;
}

:global(.numpad-display) {
  position: absolute;
  top: -40px;
  left: 50px;
  transform: translateX(-50%);
  width: 120px;
  height: 20px;
  background: rgba(70,70,70,0.85);
  color: white;
  border-radius: 6px;
  text-align: center;
  line-height: 23px;
  font-family: 'Courier New', monospace;
  letter-spacing: 2px;
  font-size: 16px;
  z-index: 10000;
}


:global(.numpad-btn) {
  position: absolute;
  box-sizing: border-box;
  padding: 0 !important;
  margin: 0 !important;

  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  color: transparent;
  font-size: 0;

  width: 25px !important;
  min-width: 0 !important;
  -webkit-appearance: none;
  appearance: none;

  height: 25px;
  cursor: pointer;
  z-index: 10000;
}


:global(.btn1) { left: 7px;   top: 7px; }
:global(.btn2) { left: 41px;  top: 7px; }
:global(.btn3) { left: 74px;  top: 7px; }

:global(.btn4) { left: 7px;   top: 42px; }
:global(.btn5) { left: 41px;  top: 42px; }
:global(.btn6) { left: 74px;  top: 42px; }

:global(.btn7) { left: 7px;   top: 74px; }
:global(.btn8) { left: 41px;  top: 74px; }
:global(.btn9) { left: 74px;  top: 74px; }

:global(.btn0)     { left: 41px;  top: 107px; }
:global(.btnClear) { left: 7px;   top: 107px; }

</style>
