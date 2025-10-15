<template>
<!-- Scènes -->
 <!-- Page d'accueil -->
<StartScreen v-if="startScreen" @start="startGame" />

  <!-- Chambre-->
<RoomChambre
  v-else-if="currentScene === 'chambre'"
  @inspect="inspect"
  :backgroundRoom="backgroundRoom"
/>

<RoomCouloir
  v-else-if="currentScene === 'couloir'"
  @inspect="inspect"
  :backgroundCouloir="isFrameFalled ? backgroundCouloir1 : backgroundCouloir"
/>


  <!-- Cuisine-->
<RoomCuisine
  v-else-if="currentScene === 'cuisine'"
  @inspect="inspect"
  :backgroundCuisine="backgroundCuisine"
/>

  <!-- Bureau médical-->
<Med
  v-else-if="currentScene === 'med'"
  @inspect="inspect"
  :backgroundMed="backgroundMed"
/>

  <!-- Fond sombre derrière la photo -->
  <div v-if="showPhoto" class="photo-overlay" @click="closePhoto"></div>

  <!-- Image affichée -->
  <img v-if="showPhoto" :src="currentImage" alt="Objet inspecté" class="photo-full"/>

  <!-- Message -->
  <div v-if="showMessage" class="hud">{{ message }}</div>

  <!-- Champ de code -->
  <form v-if="showInput" class="input-box" @submit.prevent="validateCode">
    <input v-model="codeInput" placeholder="Mot de passe" inputmode="numeric"
    pattern="\d*" maxlength="4" ref="codeField" required/>
  </form>

  <!-- Numpad du tiroir -->
<Numpad
  v-if="showNumpad && ['drawer', 'drawer1'].includes(currentObject) && showPhoto"
  :code="codeInput"
  @press="pressNumber"
  @clear="clearCode"
/>

  <!-- Inventaire -->
  <Inventory
    v-if="!startScreen"
    :inventory="inventory"
    @use="useItem"
  />

  <!-- Bouton retour photo -->
  <button v-if="showPhoto" class="back-btn-top" @click="closePhoto">Retour</button>

  <!-- Boutons de navigation de scènes -->
  <button v-if="!startScreen" class="backback-btn-top" @click="handleBack">Retour</button>
  <button v-if="!startScreen" class="exit-btn-top" @click="quitToHome">Quitter</button>

  <!-- Hotspot de la clé -->
  <button
    v-if="isDrawerUnlocked && !hasKey && showPhoto && currentImage === drawerOpen"
    class="hotspot key"
    @click="pickUp('key')"
    aria-label="Clé"
  ></button>

  <!-- Hotspot du papier froissé dans le couloir -->
  <button
    v-if="isPhotoPotOpen && showPhoto && currentImage === pot"
    class="hotspot paper"
    @click="inspect('paper')"
    aria-label="Papier"
  ></button>

  <!-- Hotspot de la partie 1 de la photo -->
  <button
    v-if="isPhotoBooksOpen && !hasPart1 && showPhoto && currentImage === livres"
    class="hotspot part1"
    @click="pickUp('part1')"
    aria-label="Partie1"
  ></button>

</template>

<script setup>
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue'

// Composants
import StartScreen from '../components/StartScreen.vue'
import RoomChambre from '../components/RoomChambre.vue'
import Inventory from '../components/Inventory.vue'
import Numpad from '../components/Numpad.vue'
import RoomCouloir from '../components/RoomCouloir.vue'
import RoomCuisine from '../components/RoomCuisine.vue'
import Med from '../components/Med.vue'
import { createInteractions } from '../game/interactions.js'

// Images
import backgroundRoom from '../assets/fond_chambre.png'
import frame from '../assets/photo.png'
import drawer2 from '../assets/tiroir1.png'
import drawer from '../assets/tiroir.png'
import macLocked from '../assets/mac.png'
import macUnlocked from '../assets/macunlocked.png'
import drawerOpen from '../assets/tiroirOuvert.png'
import keyImg from '../assets/cle.png'
import drawerOpenNoKey from '../assets/tiroirOuvertsanscle.png'
import backgroundCouloir from '../assets/couloir.png'
import backgroundCuisine from '../assets/cuisine.png'
import backgroundMed from '../assets/bureau_med.png'
import postithorloge from '../assets/postithorloge.png'
import dossiers from '../assets/dossiers.png'
import dictaphone1 from '../assets/dictaphone1.mp3'
import backgroundCouloir1 from '../assets/couloir_sanscadre.png'
import gravure from '../assets/gravure.png'
import pot from '../assets/pot.png'
import paper from '../assets/papier.png'
import livres from '../assets/livres.png'
import partie1 from '../assets/partie1.png'
import livres_sans_partie1 from '../assets/livres_sans_partie1.png'

// --- ÉTATS PRINCIPAUX ---
const startScreen = ref(true)
const showPhoto = ref(false)
const showMessage = ref(false)
const showInput = ref(false)
const showNumpad = ref(false)
const currentImage = ref(null)
const codeInput = ref("")
const message = ref("")
const codeField = ref(null)
let currentObject = ""
let messageTimer = null
const isFrameFalled = ref(false)
const isPhotoPotOpen = ref(false)
const isPhotoBooksOpen = ref(false)
const hasPart1 = ref(false)


// États d’avancement du jeu
const isComputerUnlocked = ref(false)
const isDrawerUnlocked = ref(false)
const hasKey = ref(false)

// Codes
const computerCode = "1010"
const drawerCode   = "8421"

// --- INVENTAIRE ---
const inventory = ref([null, null, null, null])


// --- INTERACTIONS ---
const interactions = createInteractions({
  photos: {
    drawer,
    drawerOpen,
    drawerOpenNoKey,
    macLocked,
    macUnlocked,
    frame,
    drawer2,
    postithorloge,
    dossiers,
    gravure,
    pot,
    paper,
    partie1,
    livres,
    livres_sans_partie1,
  },
  state: {
    isDrawerUnlocked,
    isComputerUnlocked,
    hasKey,
    isFrameFalled,
    isPhotoPotOpen,
    isPhotoBooksOpen,
    hasPart1,
  },
  ui: {
    openPhoto,
    flashMessage,
    showCodeBox,
    setShowNumpad: v => { showNumpad.value = v },
    setShowInput: v => { showInput.value = v },
    validateCode,
  },
  nav: {
    goToScene,
  },
  nextTick,
  showPhoto, 
  currentImage,
  audio: { playAudio, dictaphone1},
})

// --- FONCTIONS GÉNÉRALES ---
/** Pile des scènes visitées : on push pour avancer, on pop pour Retour */
const sceneStack = ref([])

const currentScene = computed(() => {
  return sceneStack.value[sceneStack.value.length - 1] ?? null
})

function startGame() {
  resetAll()                  // remet tout à zéro proprement
  startScreen.value = false
  sceneStack.value = ['med']  // première pièce
}

function goToScene(name) {
  sceneStack.value.push(name)
  showPhoto.value = false
}

function handleBack() {
  // Priorité UX : si une photo/overlay est ouverte, on la ferme d'abord
  if (showPhoto.value) {
    closePhoto()
    return
  }
  if (sceneStack.value.length > 1) {
    sceneStack.value.pop()
  } else {
    // Déjà à la première scène du jeu
    flashMessage('Tu es déjà dans la première pièce.')
  }
}

function quitToHome() {
  resetAll()
  startScreen.value = true
}

/** Réinitialise l’état du jeu (sans quitter/afficher l’accueil) */
function resetAll() {
  // UI
  showPhoto.value = false
  currentImage.value = null
  showMessage.value = false
  showInput.value = false
  showNumpad.value = false
  codeInput.value = ''
  message.value = ''
  // Progression
  isComputerUnlocked.value = false
  isDrawerUnlocked.value = false
  hasKey.value = false
  inventory.value = [null, null, null, null]
  // Navigation
  sceneStack.value = []
}


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

function onKeydown(e) {
  if (e.key === 'Escape' && showPhoto.value) closePhoto()
}
onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))

function flashMessage(text, ms = 2500) {
  message.value = text
  showMessage.value = true
  if (messageTimer) clearTimeout(messageTimer)
  messageTimer = setTimeout(() => {
    showMessage.value = false
    messageTimer = null
  }, ms)
}

function inspect(name) {
  const scene = currentScene.value
  const sceneActions = interactions[scene]
  currentObject = name 

  if (sceneActions && sceneActions[name]) {
    sceneActions[name]() 
  } else {
    flashMessage("Rien de spécial ici.")
  }
}

// --- VALIDATION DE CODE ---
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

  if (currentObject === 'drawer1') {
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

async function showCodeBox() {
  showInput.value = true
  await nextTick()
  codeField.value?.focus()
}

// --- NUMPAD ---
async function pressNumber(num) {
  if (codeInput.value.length < 4) {
    codeInput.value += String(num)
  }

  if (codeInput.value.length === 4) {
    setTimeout(() => {
      validateCode()
    }, 200)
  }
}

function clearCode() {
  codeInput.value = ""
}

// --- INVENTAIRE ---
function pickUp(name) {
  currentObject = name
  if(name == 'key'){
      if (!hasKey.value) {
        const emptyIndex = inventory.value.findIndex(slot => slot === null)
      if (emptyIndex !== -1) {
        inventory.value[emptyIndex] = { name: 'key', icon: keyImg }
        hasKey.value = true
        flashMessage("Vous avez trouvé une clé !")

        if (showPhoto.value && currentImage.value === drawerOpen) {
          currentImage.value = drawerOpenNoKey
        }
      }
    }
  }
  if(name == 'part1'){
    if (!hasPart1.value) {
        const emptyIndex = inventory.value.findIndex(slot => slot === null)
      if (emptyIndex !== -1) {
        inventory.value[emptyIndex] = { name: 'part1', icon: partie1 }
        hasPart1.value = true
        flashMessage("Vous avez trouvé une clé !")

        if (showPhoto.value && currentImage.value === livres) {
          currentImage.value = livres_sans_partie1
        }
      }
    }
  }

}

function useItem(item) {
  if (!item) return
  if (item.name === 'key') {
    if (currentObject === 'door') {
      flashMessage("Vous avez déverrouillé la porte ! 🎉")
      const index = inventory.value.findIndex(i => i && i.name === 'key')
      if (index !== -1) inventory.value[index] = null
      hasKey.value = false
      goToScene('couloir');
    } else {
      flashMessage("Il faut cliquer sur la porte pour utiliser la clé.")
    }
  }
}

onBeforeUnmount(() => {
  if (messageTimer) clearTimeout(messageTimer)
})

// --- Lecture d'audio --- 
const audioPlayer = ref(null)

function playAudio(src) {
  // Stoppe l’ancien son s’il y en a un
  if (audioPlayer.value) {
    audioPlayer.value.pause()
    audioPlayer.value.currentTime = 0
  }

  // Joue le nouveau son
  audioPlayer.value = new Audio(src)
  audioPlayer.value.play()
}

</script>

<style scoped>
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

.hotspot.key {
  position: absolute;
  left: 46%;
  bottom: 33vh;
  width: 100px;
  height: 100px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 980;
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

.backback-btn-top {
  position: fixed;
  top: 20px;
  left: 50px;
  width: 120px;
  height: 50px;
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
.backback-btn-top:hover {
  filter: brightness(1.1);
  transform: translateY(-1px);
}

.exit-btn-top {
  position: fixed;
  bottom: 20px;
  left: 50px;
  width: 120px;
  height: 50px;
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
.exit-btn-top:hover {
  filter: brightness(1.1);
  transform: translateY(-1px);
}

.photo-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.65); /* fond semi-transparent */
  z-index: 890; /* juste en dessous de ton image (z-index: 900 dans ton code) */
  backdrop-filter: blur(2px); /* optionnel : léger flou de fond */
  transition: opacity 0.3s ease;
}

.hotspot.paper {
  position: absolute;
  left: 41.5%;    
  bottom: 24.7vh;    
  width: 259px;
  height: 289px;
  z-index: 980;
}

.hotspot.part1 {
  position: absolute;
  left: 38.67%;    
  bottom: 29vh;    
  width: 82px;
  height: 109px;
  z-index: 980;
}
</style>
