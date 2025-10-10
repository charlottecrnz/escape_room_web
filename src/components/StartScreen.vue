<template>
  <div class="start-screen">
    <h1>🔐 Escape Game</h1>
    <p class="strapline">
      Tu te réveilles dans la chambre d'une personne inconnue. <br>
      Tout semble normal. Mais très vite, quelque chose ne tourne pas rond. <br>
      Chaque pièce que tu explores te rapproche de la sortie. <br>
      Mais attention : <strong>La maison n'est peut-être pas ce qu'elle semble être.</strong>
    </p>
    <h2>🎮 Comment jouer</h2>
    <p class="strapline">
      <ul class="rules">
        <li>Clique sur les différents objets pour les inspecter ou débloquer des indices.</li>
        <li>Certains éléments nécessitent d’avoir trouvé d’autres objets au préalable.</li>
        <li>Si tu cliques sur un objet réutilisable, il sera automatiquement ajouté à ton inventaire. Chaque objet ne peut être utilisé qu’une seule fois.</li>
        <li>Observe attentivement les détails des pièces : <strong> Un mot, une image, un son peuvent être essentiels.</strong></li>
      </ul>
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
  min-height: 40vh;
  animation: fadeIn 0.6s ease;
}

.start-screen h1 {
  font-size: 36px;
  color: #cda757;
  margin-bottom: 6px;
}

.start-screen h2 {
  position : fixed;
  top : 310px;
  font-size: 28px;
  color: #a5b8ff;
  margin-bottom: 10px;
}

.start-screen p {
  font-size: 16px;
  line-height: 1.5;
  max-width: 600px;
  margin-bottom: 40px;
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

.start-screen .rules {
  text-align: left;          /* important */
  list-style: disc;          /* puces classiques */
  list-style-position: outside;
  padding-left: 1.5rem;      /* espace pour les puces */
  margin: 1rem auto;         /* centre le bloc sans centrer le texte */
  max-width: 950px;          /* optionnel : limite la largeur */
}

.start-screen .rules li { margin: 0.4rem 0; } /* espacement vertical */

</style>
