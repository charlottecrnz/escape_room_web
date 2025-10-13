<template>
  <div class="room-scene" :style="{ backgroundImage: `url(${backgroundCuisine})` }">
    <button class="hotspot door" @click="$emit('inspect', 'drawer')" aria-label="Porte"></button>
    <button class="hotspot door1" @click="$emit('inspect', 'drawer1')" aria-label="Porte1"></button>
    <button class="hotspot door2" @click="$emit('inspect', 'door')" aria-label="Porte2"></button>
    <button class="hotspot drawer" @click="$emit('inspect', 'desk')" aria-label="Tiroir"></button>
    <button class="hotspot drawer1" @click="$emit('inspect', 'desk')" aria-label="Tiroir1"></button>
    <button class="hotspot drawer2" @click="$emit('inspect', 'desk')" aria-label="Tiroir2"></button>
    <button class="hotspot drawer3" @click="$emit('inspect', 'desk')" aria-label="Tiroir3"></button>
    <button class="hotspot books" @click="$emit('inspect', 'closet')" aria-label="Livres"></button>
    <button class="hotspot pot" @click="$emit('inspect', 'frame')" aria-label="Pot"></button>
  </div>
</template>

<script setup>
defineProps({
  backgroundCuisine: String
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

/* Porte de gauche */
.hotspot.door {
  left: 26%;
  bottom: 0vh;
  width: clamp(155px, 14vw, 100px);
  height: clamp(720px, 7vh, 100px);
  transform: translateX(-50%);
}

/* Porte du milieu */
.hotspot.door1 {
  left: 46.5%;
  bottom: 28vh;
  width: clamp(89px, 14vw, 200px);
  height: clamp(400px, 7vh, 50px);;
  transform: translateX(-50%);
}

/* Porte de droite */
.hotspot.door2 {
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
</style>

