<template>
  <GameView />
</template>

<script setup>
import GameView from './views/GameView.vue'
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  overflow: hidden; /* empêche toute barre de scroll */
  width: 100%;
  height: 100%;
}
</style>