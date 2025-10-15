<template>
  <div class="room-scene" :style="{ backgroundImage: `url(${backgroundSalon})` }">
    <button class="hotspot door" @click="$emit('inspect', 'door')" aria-label="Porte"></button>
    <button class="hotspot interrupteur" @click="$emit('inspect', 'interrupteur')" aria-label="Interrupteur"></button>
    <button class="hotspot miroir" @click="$emit('inspect', 'miroir')" aria-label="Miroir"></button>


  </div>
</template>

<script setup>
defineProps({
  backgroundSalon: String
})
</script>

<style scoped>
.room-scene {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.hotspot {
  position: absolute;
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
}
.hotspot:focus,
.hotspot:active {
  outline: none;
  border: none;
}

/* ---- POSITION DES HOTSPOTS ---- */

/* Interrupteur */
.hotspot.interrupteur {
  left: 32%;
  bottom: 58vh;
  width: 10px;
  height: 25px;
  transform: translateX(-50%);
}

/* Miroir*/
.hotspot.miroir {
  left: 36.6%;
  bottom: 61.5vh;
  width: clamp(70px, 14vw, 50px);
  height: clamp(120px, 7vh, 50px);;
  transform: translateX(-50%);
}

/* Porte de droite */
.hotspot.door {
  right: 32%;
  bottom: 41vh;
  width: clamp(70px, 14vw, 60px);
  height: clamp(350px, 7vh, 100px);
  transform: translateX(-50%);
}

/* Tiroir haut gauche */
.hotspot.drawer {
  left: 62%;
  bottom: 29vh;
  width: clamp(52px, 14vw, 45px);
  height: clamp(38px, 7vh, 20px);
  transform: translateX(-50%);
  transform: rotateZ(50deg)
}
/* Tiroir haut droit */
.hotspot.drawer1 {
  left: 65%;
  bottom: 21vh;
  width: clamp(60px, 14vw, 45px);
  height: clamp(30px, 7vh, 100px);
  transform: translateX(-50%);
  transform: rotateZ(50deg)
}

/* Tiroir milieu */ 
.hotspot.drawer2 {
  left: 63.5%;
  bottom: 9vh;
  width: clamp(50px, 14vw, 50px);
  height: clamp(130px, 7vh, 100px);
  transform: translateX(-50%);
  transform: rotateZ(140deg);
}

/* Tiroir bas */
.hotspot.drawer3 {
  left: 63.5%;
  bottom: 0vh;
  width: clamp(20px, 14vw, 20px);
  height: clamp(110px, 7vh, 100px);
  transform: translateX(-50%);
  transform: rotateZ(150deg);
}

/* Pot */
.hotspot.pot {
  left: 75%;
  bottom: 32vh;
  width: clamp(55px, 14vw, 20px);
  height: clamp(74px, 7vh, 20px);
  transform: translateX(-50%);
}

/* Livres */
.hotspot.books {
  left: 70.8%;
  bottom: 33.2vh;
  width: clamp(66px, 14vw, 20px);
  height: clamp(40px, 7vh, 20px);
  transform: translateX(-50%);
}

/* Cadre photo */
.hotspot.frame {
  left: 57.28%;
  bottom: 62.33vh;
  width: clamp(66px, 14vw, 20px);
  height: clamp(80px, 7vh, 20px);
  transform: translateX(-50%);
}

</style>

