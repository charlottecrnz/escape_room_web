<template>
  <div class="room-scene" :style="{ backgroundImage: `url(${backgroundMed})` }">
    <button class="hotspot door" @click="$emit('inspect', 'door')" aria-label="Porte"></button>
    <button class="hotspot drawer" @click="$emit('inspect', 'drawer')" aria-label="Tiroir"></button>
    <button class="hotspot drawer1" @click="$emit('inspect', 'drawer1')" aria-label="Tiroir1"></button>
    <button class="hotspot desk" @click="$emit('inspect', 'desk')" aria-label="Bureau"></button>
    <button class="hotspot files" @click="$emit('inspect', 'files')" aria-label="Dossier"></button>
    <button class="hotspot dictaphone" @click="$emit('inspect', 'dictaphone')" aria-label="Dictaphone"></button>
  </div>
</template>

<script setup>
defineProps({
  backgroundMed: String
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

/* Porte */
.hotspot.door {
  left: 27.3%;
  bottom: 35.7vh;
  width: clamp(250px, 14vw, 100px);
  height: clamp(433px, 7vh, 100px);
  transform: translateX(-50%)
}


/* Tiroir haut */
.hotspot.drawer {
  left: 67.5%;
  bottom: 10.2vh;
  width: clamp(230px, 14vw, 45px);
  height: clamp(76px, 7vh, 20px);
  transform: translateX(-50%);
}

/* Tiroir bas */
.hotspot.drawer1 {
  left: 67.5%;
  bottom: 0vh;
  width: clamp(230px, 14vw, 45px);
  height: clamp(73px, 7vh, 20px);
  transform: translateX(-50%);
}


/* Ordinateur */
.hotspot.desk {
  left: 49.88%;
  bottom: 26vh;
  width: clamp(197px, 14vw, 20px);
  height: clamp(159px, 7vh, 20px);
  transform: translateX(-50%);
}

/* Dossiers */
.hotspot.files {
  left: 33.3%;
  bottom: 26.5vh;
  width: clamp(175px, 14vw, 20px);
  height: clamp(56px, 7vh, 20px);
  transform: translateX(-50%);
}


/* Dictaphone */
.hotspot.dictaphone {
  left: 64%;
  bottom: 26vh;
  width: clamp(32px, 14vw, 20px);
  height: clamp(50px, 7vh, 20px);
  transform: translateX(-50%);
}
</style>

