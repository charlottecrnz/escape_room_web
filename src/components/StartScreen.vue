<template>
  <div class="start-screen">
    <h1>🔐 Escape Game</h1>
    <p class="strapline">
      Tu te réveilles dans la chambre d'une personne inconnue. <br>
      Tout semble normal. Mais très vite, quelque chose ne tourne pas rond. <br>
      Chaque pièce que tu explores te rapproche de la sortie. <br>
      Mais attention : <strong>La maison n'est peut-être pas ce qu'elle semble être.</strong>
    </p>
    <button class="play-button" @click="$emit('start')">Commencer</button>
  </div>
</template>

<style scoped>
.start-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  animation: fadeIn 0.6s ease;
}

.start-screen h1 {
  font-size: 36px;
  color: #a5b8ff;
  margin-bottom: 20px;
}

.start-screen p {
  font-size: 16px;
  line-height: 1.5;
  max-width: 600px;
  margin-bottom: 30px;
}

.play-button {
  background-color: #6b8cff;
  color: white;
  font-size: 20px;
  border: none;
  padding: 14px 32px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s ease;
}
.play-button:hover {
  background-color: #8da3ff;
  transform: scale(1.05);
}

.start-screen .strapline {
  max-width: none;   
  width: 100%;       
  white-space: nowrap;       
  overflow: hidden;           
  text-overflow: ellipsis;    
}

</style>
