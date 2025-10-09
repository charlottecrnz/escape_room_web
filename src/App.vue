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
  
  <!-- Numpad du tiroir (superposé à l'image) -->
 <div
  v-if="showNumpad && currentObject === 'drawer' && showPhoto"
  class="numpad-container"
>
  <div class="numpad-display">{{ codeInput }}</div>

  <button v-for="n in 9" :key="n" class="numpad-btn" :class="'btn' + n" @click="pressNumber(n)"></button>
  <button class="numpad-btn btn0" @click="pressNumber(0)"></button>
  <button class="numpad-btn btnClear" @click="clearCode">C</button>
</div>


  <!-- Bouton retour -->
  <button v-if="showPhoto" class="back-btn-top" @click="closePhoto">Retour</button>

  <!-- Inventaire -->
  <div v-if="!startScreen" class="inventory">
    <h2>Inventaire</h2>
    <div class="inventory-grid">
      <div
        v-for="(item, index) in inventory"
        :key="index"
        class="inventory-slot"
        @click="useItem(item)"
      >
      <img v-if="item" :src="item.icon" :alt="item.name" />
      </div>
    </div>
  </div>

  <!-- Hotspot de la clé, visible seulement quand le tiroir est ouvert et la clé non encore prise -->
<button
  v-if="isDrawerUnlocked && !hasKey && showPhoto && currentImage === drawerOpen"
  class="hotspot key"
  @click="pickUpKey"
  aria-label="Clé"
></button>

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
import keyImg from './assets/cle.png'
import drawerOpenNoKey from './assets/tiroirOuvertsanscle.png'



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
  showNumpad.value = false
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
        openPhoto(hasKey.value ? drawerOpenNoKey : drawerOpen)
        showNumpad.value = false
      } else {
        openPhoto(drawer)
        showInput.value = false
        codeInput.value = ""
        // n'affiche le numpad que quand la photo du tiroir est effectivement visible
        nextTick(() => {
          if (showPhoto.value && currentImage.value === drawer) {
            showNumpad.value = true
          }
        })
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
      showNumpad.value = false
    } else {
      flashMessage("Code incorrect", 1500)
      showInput.value = false
      await nextTick()
      codeField.value?.focus()
      
    }
  }

  if (!showPhoto.value) {
    showNumpad.value = false
  }

  codeInput.value = ""
}

// --- INVENTAIRE ---
const inventory = ref([null, null, null, null]) // 4 cases vides pour l'instant
const hasKey = ref(false) // pour savoir si la clé est récupérée

// Fonction pour récupérer la clé
function pickUpKey() {
  if (!hasKey.value) {
    const emptyIndex = inventory.value.findIndex(slot => slot === null)
    if (emptyIndex !== -1) {
      inventory.value[emptyIndex] = { name: 'key', icon: keyImg }
      hasKey.value = true
      flashMessage("Vous avez trouvé une clé !")

      // Si on est en train d'afficher le tiroir ouvert, remplacer l'image par celle sans clé
      if (showPhoto.value && currentImage.value === drawerOpen) {
        currentImage.value = drawerOpenNoKey
      }
    }
  }
}

function useItem(item) {
  if (!item) return

  if (item.name === 'key') {
    // Si le joueur clique sur la porte avec la clé en sa possession
    if (currentObject === 'door') {
      flashMessage("Vous avez déverrouillé la porte ! 🎉")
      // Tu pourrais ensuite déclencher une nouvelle scène ici
    } else {
      flashMessage("Il faut cliquer sur la porte pour utiliser la clé.")
    }
  }
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

const showNumpad = ref(false)
// passe à false quand tout est réglé pour les rendre invisibles
const numpadDebug = ref(true)  // <- mettre false quand fini

function pressNumber(num) {
  if (codeInput.value.length < 4) codeInput.value += String(num)
  if (codeInput.value.length === 4) validateCode()
}

function clearCode() {
  codeInput.value = "";
}

</script>

<style scoped>
:global(html, body) {
  margin: 0;
  padding: 0;
  overflow: hidden; /* empêche toute barre de scroll */
  width: 100%;
  height: 100%;
}

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
/*:global(body) { margin: 0; }*/

/* Fond de la scène */
.room-scene {
  position: fixed; /* permet de vraiment occuper tout l’écran sans scroll */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.hotspot {
  overflow: hidden;
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

/* Armoire */
.hotspot.closet {
  position: absolute;
  left: 77%;
  bottom: 6vh;
  width: clamp(270px, 14vw, 200px);
  height: clamp(580px, 7vh, 100px);
  transform: translateX(-50%);
  background: transparent; /*transparent*/
  border: none;
  cursor: pointer;
}


/* Ordinateur sur le bureau */
.hotspot.desk {
  position: absolute;
  left: 47.7%;
  bottom: 38vh;
  width: clamp(89px, 14vw, 200px);
  height: clamp(127px, 7vh, 100px);
  transform: translateX(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
}


/* Porte */
.hotspot.door {
  position: absolute;
  right: 66%;
  bottom: 7vh;
  width: clamp(100px, 14vw, 200px);
  height: clamp(630px, 7vh, 100px);
  transform: translateX(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
}

/* Cadre photo */
.hotspot.frame {
  position: absolute;
  left: 63.25%;
  bottom: 57vh;
  width: clamp(45px, 14vw, 45px);
  height: clamp(60px, 7vh, 100px);
  transform: translateX(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
}


/* Tiroir 1 */ 
.hotspot.drawer {
  position: absolute;
  left: 58.4%;
  bottom: 24.8vh;
  width: clamp(110px, 14vw, 50px);
  height: clamp(40px, 7vh, 100px);
  transform: translateX(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
}

/* Tiroir 2 */
.hotspot.drawer2 {
  position: absolute;
  left: 37%;
  bottom: 24.8vh;
  width: clamp(108px, 14vw, 50px);
  height: clamp(40px, 7vh, 100px);
  transform: translateX(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
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
  bottom: 39vh;
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

/* ---- INVENTAIRE ---- */
:root {
  --inv-offset-x: 24px; /* plus grand => plus à GAUCHE depuis le bord droit */
  --inv-offset-y: 24px; /* plus grand => plus BAS depuis le haut */
}

/* ---- INVENTAIRE ---- */
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


/* --- Hotspot de la clé --- */
.hotspot.key {
  position: absolute;
  left: 46%;     /* même base que le tiroir pour bien la placer */
  bottom: 33vh;    /* ajuste selon l'endroit exact où tu veux la clé */
  width: 100px;
  height: 100px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 980; /* au-dessus du tiroir */
}

/* --- Numpad --- */ 
:global(.numpad-container) {
  position: fixed;
  left: 50%;
  bottom: 58vh;
  transform: translateX(-50%);
  z-index: 9999;
}

:global(.numpad-display) {
  position: absolute;
  top: -40px;
  left: 50px;
  transform: translateX(-50%);
  width: 120px;
  height: 20px;
  background: rgba(70,70,70,0.85);
  color: white;
  border-radius: 6px;
  text-align: center;
  line-height: 23px;
  font-family: 'Courier New', monospace;
  letter-spacing: 2px;
  font-size: 16px;
  z-index: 10000;
}


:global(.numpad-btn) {
  position: absolute;
  box-sizing: border-box;
  padding: 0 !important;
  margin: 0 !important;

  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  color: transparent;
  font-size: 0;

  width: 25px !important;
  min-width: 0 !important;
  -webkit-appearance: none;
  appearance: none;

  height: 25px;
  cursor: pointer;
  z-index: 10000;
}


:global(.btn1) { left: 7px;   top: 7px; }
:global(.btn2) { left: 41px;  top: 7px; }
:global(.btn3) { left: 74px;  top: 7px; }

:global(.btn4) { left: 7px;   top: 42px; }
:global(.btn5) { left: 41px;  top: 42px; }
:global(.btn6) { left: 74px;  top: 42px; }

:global(.btn7) { left: 7px;   top: 74px; }
:global(.btn8) { left: 41px;  top: 74px; }
:global(.btn9) { left: 74px;  top: 74px; }

:global(.btn0)     { left: 41px;  top: 107px; }
:global(.btnClear) { left: 7px;   top: 107px; }


</style>
