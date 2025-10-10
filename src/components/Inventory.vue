<template>
  <div class="inventory">
    <h2>Inventaire</h2>
    <div class="inventory-grid">
      <div
        v-for="(item, index) in inventory"
        :key="index"
        class="inventory-slot"
        @click="$emit('use', item)"
      >
        <img v-if="item" :src="item.icon" :alt="item.name" />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  inventory: Array
})
</script>

<style scoped>
:root {
  --inv-offset-x: 24px;
  --inv-offset-y: 24px; 
}

.inventory {
  position: fixed;
  right: 14px;
  top: 100px;
  width: 160px;
  height: calc(100vh - var(--inv-offset-y) - 24px); /* 24px = marge bas symétrique; ajuste si besoin */
  background: rgba(0, 0, 0, 0);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  z-index: 960;
  border-radius: 10px;
}

.inventory h2 {
  position: fixed;
  right: 55px;     /* négatif = sort du panneau vers la gauche */
  top: 53px;
  transform: rotate(0deg);
  transform-origin: left top;
  /* background: rgba(255,255,255,0.15) */;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 18px;
  letter-spacing: 1px;
}

.inventory-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  width: 100%;
}

.inventory-slot {
  width: 60px;
  height: 60px;
  background: rgba(200, 200, 200, 0.3);
  border: 2px solid rgba(255,255,255,0.2);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.inventory-slot img {
  max-width: 50px;
  max-height: 50px;
}
</style>
