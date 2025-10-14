export function createInteractions(ctx) {
  const { photos, state, ui, nav, nextTick } = ctx

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
        door: () => ui.flashMessage("Pour ouvrir cette porte, il te faut une clé."),
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
          ctx.audio.playAudio(dictaphone1)
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
      door: () => ui.flashMessage("Tu ne peux pas ouvrir cette porte sans clé."),
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
      paper: () => {ui.openPhoto(photos.paper)}
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

    }
  }
}
