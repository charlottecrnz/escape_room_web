<template>
  <div class="game">
    <!-- 🏠 Écran d’accueil -->
    <div v-if="startScreen" class="start-screen">
      <h1>🔐 Escape Game</h1>
      <p> Vous venez de vous réveiller enfermé dans cette pièce. Le but est de trouver comment sortir de la maison.
        Pour cela, vous devez trouver des indices dans différentes pièces afin d'ouvrir les portes.
      </p>
      <button class="play-button" @click="startGame">Commencer</button>
    </div>

    <!-- 🎮 Écran du jeu -->
    <div v-else>
      <h1>🔐 La Chambre</h1>
      <p>{{ message }}</p>

      <div class="room">
        <!-- Image du bureau avec zones cliquables -->
        <div class="desk-container">
          <img :src="deskImage" alt="Bureau" class="desk-image" />

          <!-- Zones cliquables invisibles -->
          <button class="hotspot hotspot-desk" @click="inspect('desk')"></button>
          <button class="hotspot hotspot-drawer" @click="inspect('drawer')"></button>
        </div>

        <!-- Objets indépendants -->
        <div class="object" @click="inspect('trash')">
          <img :src="trashImage" alt="Poubelle" />
          <span>Poubelle</span>
        </div>

        <div class="object" @click="inspect('frame')">
          <img :src="frameImage" alt="Cadre photo" />
          <span>Cadre photo</span>
        </div>

        <div class="object" @click="inspect('door')">
          <img :src="doorImage" alt="Porte" />
          <span>Porte</span>
        </div>
      </div>

      <!-- zone de saisie de code -->
      <div v-if="showInput" class="input-zone">
        <input
          v-model="codeInput"
          placeholder="Entrez le code à 4 chiffres"
          @keyup.enter="validateCode"
        />
        <button @click="validateCode">Valider</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 🏁 État de l’écran d’accueil
const startScreen = ref(true)

// 🖼️ Import des images (tes fichiers)
import deskImage from './assets/bureau.png'
import trashImage from './assets/poubelle.png'
import frameImage from './assets/photo.png'
import doorImage from './assets/porte.png'

// --- Variables du jeu ---
const message = ref("Tu es enfermé·e dans la chambre. Clique sur les objets pour chercher des indices.")
const showInput = ref(false)
const codeInput = ref("")
let currentObject = ""

const computerCode = "1207"
const drawerCode = "8421"

// --- Fonction : démarrer le jeu ---
function startGame() {
  startScreen.value = false
  message.value = "Tu es enfermé·e dans la chambre. Clique sur les objets pour chercher des indices."
}

// --- Fonction : quand on clique sur un objet ---
function inspect(name) {
  showInput.value = false
  currentObject = name

  switch (name) {
    case 'desk':
      message.value = "Sur le bureau, un ordinateur verrouillé attend un code à 4 chiffres (JJMM)."
      showInput.value = true
      break
    case 'drawer':
      message.value = "Le tiroir du bureau est verrouillé. Peut-être qu’un code se cache quelque part..."
      showInput.value = true
      break
    case 'trash':
      message.value = "Tu regardes dans la poubelle... un papier chiffonné dit : 'Le mot de passe est une date importante.'"
      break
    case 'frame':
      message.value = "Tu observes la photo : une date est inscrite dessous — 12/07/1990."
      break
    case 'door':
      message.value = "La porte est verrouillée. Il faut sûrement une clé pour l’ouvrir."
      break
  }
}

// --- Fonction : valider un code ---
function validateCode() {
  if (currentObject === 'desk') {
    if (codeInput.value === computerCode) {
      message.value = "💻 L’ordinateur s’allume et affiche : 'Mot de passe tiroir : 8421'."
    } else {
      message.value = "Code incorrect pour l’ordinateur."
    }
  }

  if (currentObject === 'drawer') {
    if (codeInput.value === drawerCode) {
      message.value = "🗄️ Le tiroir s’ouvre ! À l’intérieur, tu trouves une clé brillante. Tu peux maintenant sortir."
    } else {
      message.value = "Code incorrect pour le tiroir."
    }
  }

  codeInput.value = ""
  showInput.value = false
}
</script>

<style scoped>
body {
  margin: 0;
  background: radial-gradient(circle at center, #1c1f2b 0%, #0c0e15 100%);
  color: #e4e4e4;
  font-family: 'Share Tech Mono', monospace;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.game {
  background-color: rgba(20, 22, 30, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.6);
  padding: 30px 40px;
  max-width: 900px;
  text-align: center;
}

.room {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  margin-top: 30px;
}

/* --- Image du bureau --- */
.desk-container {
  position: relative;
  width: 400px;
  height: 250px;
}

.desk-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

/* --- Zones cliquables invisibles --- */
.hotspot {
  position: absolute;
  background-color: rgba(255, 255, 255, 0);
  border: none;
  cursor: pointer;
}

.hotspot:hover {
  background-color: rgba(255, 255, 255, 0.15);
}

/* Ajuste les positions selon ton image */
.hotspot-desk {
  top: 20%;
  left: 30%;
  width: 40%;
  height: 30%;
}

.hotspot-drawer {
  bottom: 10%;
  left: 35%;
  width: 30%;
  height: 20%;
}

/* --- Objets cliquables (poubelle, cadre, porte) --- */
.object {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease, filter 0.3s ease;
}

.object:hover {
  transform: scale(1.05);
  filter: brightness(1.2);
}

.object img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.object span {
  margin-top: 8px;
  font-size: 14px;
  color: #d7d7d7;
}

/* --- Zone de saisie du code --- */
.input-zone {
  margin-top: 25px;
}

input {
  background: #10131f;
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #ffffff;
  padding: 10px 12px;
  border-radius: 6px;
  width: 180px;
  text-align: center;
  font-size: 16px;
  outline: none;
  transition: all 0.2s ease;
}

input:focus {
  border-color: #6b8cff;
  box-shadow: 0 0 8px rgba(107, 140, 255, 0.3);
}

.input-zone button {
  background-color: #6b8cff;
  color: white;
  border: none;
  margin-left: 10px;
  border-radius: 6px;
  padding: 10px 18px;
  cursor: pointer;
  transition: 0.2s;
}

.input-zone button:hover {
  background-color: #8da3ff;
  transform: scale(1.05);
}

/* --- Écran d'accueil --- */
.start-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  animation: fadeIn 0.6s ease;
}

.start-screen h1 {
  font-size: 32px;
  color: #a5b8ff;
  margin-bottom: 15px;
}

.start-screen p {
  font-size: 16px;
  color: #ddd;
  max-width: 500px;
  line-height: 1.5;
  margin-bottom: 25px;
}

.play-button {
  background-color: #6b8cff;
  color: white;
  font-size: 18px;
  border: none;
  padding: 12px 28px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s ease;
}

.play-button:hover {
  background-color: #8da3ff;
  transform: scale(1.05);
}

/* Animation douce d’apparition */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
