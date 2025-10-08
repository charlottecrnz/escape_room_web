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
  <div v-else class="room-scene" :style="{ backgroundImage: `url(${backgroundRoom})` }">

    <!-- Hotspots invisibles des différents éléments cliquables -->
    <button class="hotspot drawer" @click="inspect('drawer')" aria-label="Tiroir"></button>
    <button class="hotspot drawer2" @click="inspect('drawer1')" aria-label="Tiroir1"></button>
    <button class="hotspot door" @click="inspect('door')" aria-label="Porte"></button>
    <button class="hotspot desk" @click="inspect('desk')" aria-label="Bureau"></button>
    <button class="hotspot closet" @click="inspect('closet')" aria-label="Armoire"></button>
    <button class="hotspot frame" @click="inspect('frame')" aria-label="Photo"></button>
  </div>

  <!-- Images affichées pour les différents objets -->
  <img v-if="showPhoto" :src="currentImage" alt="Objet inspecté" class="photo-full"/>
  
  <!-- Message -->
  <div v-if="showMessage" class="hud">{{ message }}</div>

  <!-- Champ de code -->
  <form v-if="showInput" class="input-box" @submit.prevent="validateCode">
    <input v-model="codeInput" placeholder="Mot de passe" inputmode="numeric"
    pattern="\d*" maxlength="4" ref="codeField" required/>
  </form>
  

  <!-- Bouton retour -->
  <button v-if="showPhoto" class="back-btn-top" @click="closePhoto">Retour</button>

</template>

<script setup>
import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue'

// Images
import backgroundRoom  from './assets/fond_chambre.png'
import frame from './assets/photo.png'
import drawer2 from './assets/tiroir1.png'
import drawer from './assets/tiroir.png'
import macLocked from './assets/mac.png'
import macUnlocked from './assets/macunlocked.png'
import drawerOpen from './assets/tiroirOuvert.png'

const showPhoto = ref(false)
const currentImage = ref(null)

function openPhoto(image) {
  currentImage.value = image
  showPhoto.value = true
  showMessage.value = false
}

function closePhoto() {
  showPhoto.value = false
  currentImage.value = null
  showMessage.value = false

  showInput.value = false
  codeInput.value = ""
  codeField.value?.blur()

  showMessage.value = false
}

// Optionnel : fermer avec Échap
function onKeydown(e) {
  if (e.key === 'Escape' && showPhoto.value) closePhoto()
}
onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))

// Gère le focus automatique sur l’input
async function showCodeBox() {
  showInput.value = true
  await nextTick()
  codeField.value?.focus()
}


// États principaux
const startScreen = ref(true)
const message = ref("")
const showMessage = ref(false)
const showInput = ref(false)
const codeInput = ref("")
let currentObject = ""
let messageTimer = null
const isComputerUnlocked = ref(false)
const isDrawerUnlocked = ref(false)

// Codes du jeu
const computerCode = "1207"
const drawerCode   = "8421"

// Fonction qui démarre le jeu
function startGame() {
  startScreen.value = false
}

// Fonction qui affiche les différents phases en fonction des objets 
function inspect(name) {
  showInput.value = false
  currentObject = name
  showMessage.value = false 

  switch (name) {
    case 'desk':
      if (isComputerUnlocked.value) {
        openPhoto(macUnlocked)
      } else {
        showInput.value = true
        openPhoto(macLocked)
        showCodeBox()
      }
      break
    case 'drawer':
      if (isDrawerUnlocked.value) {
        openPhoto(drawerOpen)
      } else {
        showInput.value = true
        openPhoto(drawer)
        showCodeBox()
      }
      break
    case 'drawer1':
      openPhoto(drawer2)
      break
    case 'frame':
      openPhoto(frame)
      break
    case 'door':
      flashMessage("La porte est verrouillée. Il faut une clé.")
      break
    case 'closet':
      flashMessage("Cette armoire est verrouillée.")
      break
  }
}

// Fonction qui vérifie si le code est bon
async function validateCode() {
  if (currentObject === 'desk') {
    if (codeInput.value === computerCode) {
      isComputerUnlocked.value = true
      openPhoto(macUnlocked)
      showInput.value = false
    } else {
      flashMessage("Code incorrect", 1500)
      showInput.value = true
      await nextTick()
      codeField.value?.focus()
    }
  }

  if (currentObject === 'drawer') {
    if (codeInput.value === drawerCode) {
      isDrawerUnlocked.value = true
      openPhoto(drawerOpen)
      showInput.value = false
    } else {
      flashMessage("Code incorrect", 1500)
      showInput.value = true
      await nextTick()
      codeField.value?.focus()
    }
  }

  codeInput.value = ""
}

function flashMessage(text, ms = 2500) {
  // Affiche le texte
  message.value = text
  showMessage.value = true

  // Reset du timer précédent si besoin
  if (messageTimer) clearTimeout(messageTimer)

  // Cache après ms
  messageTimer = setTimeout(() => {
    showMessage.value = false
    messageTimer = null
  }, ms)
}

onBeforeUnmount(() => {if (messageTimer) clearTimeout(messageTimer)})

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
.room-scene{
  width: 100vw;
  height: 100vh;
  background-size: contain;      /* ou 'contain' / 'auto' */
  background-position: center; /* centre la photo */
  background-repeat: no-repeat;/* ou 'repeat' si papier peint */
  overflow: hidden;
}



/* Armoire */
.hotspot.closet {
  position: absolute;
  left: 86%;
  bottom: 0vh;
  width: clamp(270px, 14vw, 200px);
  height: clamp(580px, 7vh, 100px);
  transform: translateX(-50%);
  background: transparent; /*transparent*/
  border: none;
  cursor: pointer;
}
.hotspot.closet:hover {
  outline: 2px solid rgba(255, 255, 255, 0.25);
}

/* Ordinateur sur le bureau */
.hotspot.desk {
  position: absolute;
  left: 56%;
  bottom: 32vh;
  width: clamp(90px, 14vw, 200px);
  height: clamp(124px, 7vh, 100px);
  transform: translateX(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
}
.hotspot.desk:hover {
  outline: 2px solid rgba(255, 255, 255, 0.25);
}

/* Porte */
.hotspot.door {
  position: absolute;
  right: 58%;
  bottom: 1vh;
  width: clamp(100px, 14vw, 200px);
  height: clamp(630px, 7vh, 100px);
  transform: translateX(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
}
.hotspot.door:hover {
  outline: 2px solid rgba(255, 255, 255, 0.25);
}


/* Cadre photo */
.hotspot.frame {
  position: absolute;
  left: 71.8%;
  bottom: 50vh;
  width: clamp(45px, 14vw, 45px);
  height: clamp(60px, 7vh, 100px);
  transform: translateX(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
}
.hotspot.frame:hover {
  outline: 2px solid rgba(255, 255, 255, 0.25);
}

/* Tiroir 1 */ 
.hotspot.drawer {
  position: absolute;
  left: 67%;
  bottom: 18.4vh;
  width: clamp(110px, 14vw, 50px);
  height: clamp(40px, 7vh, 100px);
  transform: translateX(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
}
.hotspot.drawer:hover {
  outline: 2px solid rgba(255, 255, 255, 0.25);
}

/* Tiroir 2 */
.hotspot.drawer2 {
  position: absolute;
  left: 45.2%;
  bottom: 18.4vh;
  width: clamp(108px, 14vw, 50px);
  height: clamp(40px, 7vh, 100px);
  transform: translateX(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
}
.hotspot.drawer2:hover {
  outline: 2px solid rgba(255, 255, 255, 0.25);
}

/* Message */
.hud {
  position: fixed;
  left: 50%;
  bottom: 4vh;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.55);
  padding: 1vh 2vw;
  border-radius: 10px;
  color: #e9eef8;
  font-family: 'Courier New', monospace;
  font-size: clamp(12px, 1.4vw, 18px);
  backdrop-filter: blur(2px);
  text-align: center;
  width: 90vw;
  max-width: 700px;
  z-index: 950; /* au-dessus de l'image */
}

/* Zone de saisie du code */ /* A voir pour améliorer */
.input-box {
  position: fixed;
  left: 50%;
  bottom: 38vh;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 10px;
  backdrop-filter: blur(2px);
  z-index: 950;
}

.input-box input {
  width: clamp(160px, 20vw, 120px);
  padding: 7px 10px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background: #5a5a5b;
  color: #faf9f9;
  text-align: center;
}
/*
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
*/
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


/* Image affichée par-dessus la scène */
.photo-full {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: min(70vw, 900px);
  max-height: 75vh;
  border-radius: 12px;
  /* box-shadow: 0 6px 18px rgba(25, 25, 25, 0.633); */
  z-index: 900; 
  transition: opacity 0.3s ease, transform 0.3s ease;
}

/* Bouton "Retour" en haut à droite */
.back-btn-top {
  position: fixed;
  top: 20px;
  right: 24px;
  background: #686869;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 16px;
  cursor: pointer;
  z-index: 999;
  transition: transform 0.15s ease, filter 0.15s ease;
}
.back-btn-top:hover {
  filter: brightness(1.1);
  transform: translateY(-1px);
}

/* Mobile : passer en colonne */
@media (max-width: 680px) {
  .lightbox-content {
    flex-direction: column;
  }
  .lightbox-img {
    max-width: 86vw;
    max-height: 60vh;
  }
  .back-btn {
    width: 100%;
    text-align: center;
  }
}


</style>
