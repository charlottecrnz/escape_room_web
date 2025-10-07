<template>
  <!-- Page d'accueil -->
  <div v-if="startScreen" class="start-screen">
    <h1>🔐 Escape Game </h1>
      <p class="strapline">
        Vous vous réveillé enfermé dans un endroit que vous ne connaissez pas. <br>
        Le but est de trouver comment en sortir. <br>
        Pour cela, vous devez trouver des indices afin d'ouvrir les différentes pièces.
      </p>
    <button class="play-button" @click="startGame">Commencer</button>
  </div>

  <!-- Chambre -->
  <div v-else class="room-scene">
    <!-- Objets cliquables -->
    <img class="desk"  :src="deskImage"  alt="Bureau"   @click="inspect('desk')" />
    <img class="door"  :src="doorImage"  alt="Porte"    @click="inspect('door')" />
    <img class="trash" :src="trashImage" alt="Poubelle" @click="inspect('trash')" />
    <img class="frame" :src="frameImage" alt="Cadre"    @click="inspect('frame')" />

    <!-- Hotspot invisible du tiroir -->
    <button class="hotspot drawer" @click="inspect('drawer')" aria-label="Tiroir"></button>

    <!-- Champ de code -->
    <div v-if="showInput" class="input-box">
      <input v-model="codeInput" placeholder="Code à 4 chiffres" @keyup.enter="validateCode" />
      <button @click="validateCode">OK</button>
    </div>

    <!-- Message HUD -->
    <div class="hud">{{ message }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Images
import deskImage  from './assets/bureau.png'
import doorImage  from './assets/porte.png'
import trashImage from './assets/poubelle.png'
import frameImage from './assets/photo.png'

// États principaux
const startScreen = ref(true)
const message = ref("Regarde autour de toi…")
const showInput = ref(false)
const codeInput = ref("")
let currentObject = ""

// Codes du jeu
const computerCode = "1207"
const drawerCode   = "8421"

// Fonction qui démarre le jeu
function startGame() {
  startScreen.value = false
  message.value = "Tu es enfermé·e dans la chambre. Observe bien les objets autour de toi."
}

// Fonction qui affiche les différents phases en fonction des objets 
function inspect(name) {
  showInput.value = false
  currentObject = name

  switch (name) {
    case 'desk':
      message.value = "Sur le bureau, un ordinateur verrouillé t’attend. (Code JJMM)"
      showInput.value = true
      break
    case 'drawer':
      message.value = "Le tiroir du bureau est verrouillé. Peut-être qu’un code se cache quelque part..."
      showInput.value = true
      break
    case 'trash':
      message.value = "Tu regardes dans la poubelle... un papier chiffonné dit : « Le mot de passe est une date importante. »"
      break
    case 'frame':
      message.value = "Tu observes la photo : une date est inscrite dessous — 12/07/1990."
      break
    case 'door':
      message.value = "La porte est verrouillée. Il te faut une clé."
      break
  }
}

// Fonction qui vérifie si le code est bon
function validateCode() {
  if (currentObject === 'desk') {
    message.value = (codeInput.value === computerCode)
      ? "💻 Ordinateur déverrouillé : « Mot de passe tiroir : 8421 »."
      : "Code incorrect pour l’ordinateur."
  }

  if (currentObject === 'drawer') {
    message.value = (codeInput.value === drawerCode)
      ? "🗄️ Le tiroir s’ouvre ! À l’intérieur, tu trouves une clé brillante."
      : "Code incorrect pour le tiroir."
  }

  codeInput.value = ""
  showInput.value = false
}
</script>

<style scoped>
/* ---- ACCUEIL ---- */
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
/* ---- CHAMBRE ---- */
:global(body) { margin: 0; }

/* Fond de la scène */
.room-scene {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #f3e7f1;
  overflow: hidden;
}

/* Position des différents objets */
.desk {
  position: absolute;
  bottom: 0;                     
  left: 50%;                     
  transform: translateX(-50%);  
  width: clamp(220px, 34vw, 520px);
  cursor: pointer;
}

.door {
  position: absolute;
  bottom: 0; 
  left: 3vw;     
  width: clamp(120px, 18vw, 250px);
  cursor: pointer;
}

.trash {
  position: absolute;
  bottom: 0;   
  left: 50%; 
  transform: translateX(-100%);
  width: clamp(44px, 5.5vw, 80px);
  cursor: pointer;
}

.frame {
  position: absolute;
  left: 10vw;
  top: 8vh;
  width: clamp(60px, 10vw, 180px);
  cursor: pointer;
}

/* Tiroir */  /* Dupliquer et modifier pour les deux autres tiroirs */
.hotspot.drawer {
  position: absolute;
  left: 50%;
  bottom: 12vh;
  width: clamp(100px, 14vw, 200px);
  height: clamp(40px, 7vh, 100px);
  transform: translateX(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
}
.hotspot.drawer:hover {
  outline: 2px solid rgba(255, 255, 255, 0.25);
}

/* Message HUD */  /* A voir pour améliorer */
.hud {
  position: absolute;
  left: 50%;
  bottom: 2.5vh;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.5);
  padding: 1vh 2vw;
  border-radius: 10px;
  color: #e9eef8;
  font-family: 'Courier New', monospace;
  font-size: clamp(12px, 1.4vw, 18px);
  backdrop-filter: blur(2px);
  text-align: center;
  width: 90vw;
  max-width: 700px;
}

/* Zone de saisie du code */ /* A voir pour améliorer */
.input-box {
  position: absolute;
  left: 50%;
  bottom: 15vh;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  background: rgba(0, 0, 0, 0.45);
  padding: 10px 12px;
  border-radius: 10px;
  backdrop-filter: blur(2px);
}

.input-box input {
  width: clamp(120px, 20vw, 200px);
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: #0d1222;
  color: #fff;
  text-align: center;
}

.input-box button {
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  background: #6b8cff;
  color: #fff;
  cursor: pointer;
  transition: 0.2s;
}
.input-box button:hover {
  filter: brightness(1.1);
}

/* Responsive */
@media (max-width: 600px) {
  .hud {
    font-size: 12px;
    bottom: 3vh;
  }
  .input-box {
    bottom: 18vh;
    flex-direction: column;
    align-items: center;
  }
  .input-box input {
    width: 70vw;
  }
  .input-box button {
    width: 40vw;
  }
}

</style>
