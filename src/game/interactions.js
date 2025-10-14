export function createInteractions(ctx) {
  const { photos, state, ui, nav, nextTick } = ctx

  return {
    med: {
      
    
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
