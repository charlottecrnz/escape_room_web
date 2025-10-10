<template>
  <div class="room-scene" :style="{ backgroundImage: `url(${backgroundRoom})` }">
    <button class="hotspot drawer" @click="$emit('inspect', 'drawer')" aria-label="Tiroir"></button>
    <button class="hotspot drawer2" @click="$emit('inspect', 'drawer1')" aria-label="Tiroir1"></button>
    <button class="hotspot door" @click="$emit('inspect', 'door')" aria-label="Porte"></button>
    <button class="hotspot desk" @click="$emit('inspect', 'desk')" aria-label="Bureau"></button>
    <button class="hotspot closet" @click="$emit('inspect', 'closet')" aria-label="Armoire"></button>
    <button class="hotspot frame" @click="$emit('inspect', 'frame')" aria-label="Photo"></button>
  </div>
</template>

<script setup>
defineProps({
  backgroundRoom: String
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

/* Armoire */
.hotspot.closet {
  left: 77%;
  bottom: 6vh;
  width: clamp(270px, 14vw, 200px);
  height: clamp(580px, 7vh, 100px);
  transform: translateX(-50%);
}

/* Bureau (ordinateur) */
.hotspot.desk {
  left: 47.7%;
  bottom: 38vh;
  width: clamp(89px, 14vw, 200px);
  height: clamp(127px, 7vh, 100px);
  transform: translateX(-50%);
}

/* Porte */
.hotspot.door {
  right: 66%;
  bottom: 7vh;
  width: clamp(100px, 14vw, 200px);
  height: clamp(630px, 7vh, 100px);
  transform: translateX(-50%);
}

/* Cadre photo */
.hotspot.frame {
  left: 63.25%;
  bottom: 57vh;
  width: clamp(45px, 14vw, 45px);
  height: clamp(60px, 7vh, 100px);
  transform: translateX(-50%);
}

/* Tiroir gauche */
.hotspot.drawer2 {
  left: 37%;
  bottom: 24.8vh;
  width: clamp(108px, 14vw, 50px);
  height: clamp(40px, 7vh, 100px);
  transform: translateX(-50%);
}

/* Tiroir droit */
.hotspot.drawer {
  left: 58.4%;
  bottom: 24.8vh;
  width: clamp(110px, 14vw, 50px);
  height: clamp(40px, 7vh, 100px);
  transform: translateX(-50%);
}
</style>

