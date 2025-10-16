export function createInteractions(ctx) {
  const { photos, state, ui, nav, nextTick, audio } = ctx

  return {
    med: {
        drawer1: () => {
          if (state.isDrawerUnlocked.value) {
            ui.openPhoto(state.hasKey.value ? photos.drawerOpenNoKey : photos.drawerOpen)
            ui.setShowNumpad(false)
          } else {
            ui.openPhoto(photos.drawer)
            ui.setShowInput(false)
            nextTick(() => {
              if (ctx.showPhoto.value && ctx.currentImage.value === photos.drawer) {
                ui.setShowNumpad(true)
              }
            })
          }
        },
        drawer: () => ui.openPhoto(photos.postithorloge),
        door: () => {
          if (!state.isDoorOpenMed.value) {
            ui.flashMessage("Pour ouvrir cette porte, il te faut une clé.")}
          else {
            nav.goToScene('couloir')
          }
        },
        desk: () => {
            if (state.isComputerUnlocked.value) {
            ui.openPhoto(photos.macUnlocked)
            } else {
            ui.setShowInput(true)
            ui.openPhoto(photos.macLocked)
            ui.showCodeBox()
            }
        },
        files: () => ui.openPhoto(photos.dossiers),
        dictaphone: () => {
          ui.flashMessage("Lecture du rapport du médecin…")
          if (!audio.currentlyPlaying) {
            audio.playAudio(audio.dictaphone1)
            audio.currentlyPlaying = true
            setTimeout(() => (audio.currentlyPlaying = false), 5000) // durée approximative de ton mp3
          }
        },
    },

    cuisine: {
      drawer: () => {
        ui.openPhoto(photos.drawer2)
        ui.flashMessage("Ce tiroir contient des ustensiles, rien d’utile.")
        ui.setShowNumpad(false)
      },
    },

    couloir: {
      door: () => nav.goToScene('salon'),
      door2: () => nav.goToScene('cuisine'),
      frame: () => {
        if(!state.isFrameFalled.value){
          state.isFrameFalled.value = true
          ui.flashMessage("Le cadre est tombé... quelque chose a changé.")
        }
        else{
          ui.openPhoto(photos.gravure)
        }
        
      },
      pot: () => {
        ui.openPhoto(photos.pot)
        state.isPhotoPotOpen.value = true;
      },
      paper: () => {ui.openPhoto(photos.paper)},
      books: () => {
        if (!state.hasPart1.value) {
            ui.openPhoto(photos.livres)
            state.isPhotoBooksOpen.value = true
          } 
        else {
            ui.openPhoto(photos.livres_sans_partie1)
          }
      },
      part1: () => {
        ui.openPhoto(photos.partie1)
      }
    },

    chambre: {
        desk: () => {
        if (state.isComputerUnlocked.value) {
          ui.openPhoto(photos.macUnlocked)
        } else {
          ui.setShowInput(true)
          ui.openPhoto(photos.macLocked)
          ui.showCodeBox()
        }
      },
      
      drawer: () => {
        if (state.isDrawerUnlocked.value) {
          ui.openPhoto(state.hasKey.value ? photos.drawerOpenNoKey : photos.drawerOpen)
          ui.setShowNumpad(false)
        } else {
          ui.openPhoto(photos.drawer)
          ui.setShowInput(false)
          nextTick(() => {
            ui.setShowNumpad(true)
          })
        }
      },

      drawer1: () => ui.openPhoto(photos.drawer2),
      frame: () => ui.openPhoto(photos.frame),
      door: () => ui.flashMessage("La porte est verrouillée. Il faut une clé."),
      closet: () => ui.openPhoto(photos.closet),

    },
    salon: {
      interrupteur: () => {
        if (state.isLightOn.value){
          state.isLightOn.value = false
        }
        else {
          state.isLightOn.value = true
        }
      },
      miroir: () => {
        if (state.isLightOn.value){
          ui.openPhoto(photos.miroir)
        }
        else {
          ui.openPhoto(photos.miroirNoir)
        }
      },
      pillow : () => {ui.openPhoto(photos.telecommande)
        state.isPhotoTelecommandeOpen.value = true
      },
      tv: () => {
        if (!state.hasTelecommande.value){
          ui.flashMessage("Il vous manque quelque chose.")
        }
        else {
          if(state.isFrameFalled.value){
            ui.openPhoto(photos.cameraCadreTombe)
          }
          else {
            ui.openPhoto(photos.camera)
          }
        }
      }

    }
  }
}
