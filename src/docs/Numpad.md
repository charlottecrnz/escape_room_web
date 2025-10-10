# Numpad.vue

## Rôle

Pavé numérique invisible superposé à une image. Affiche la saisie courante et émet des événements quand l'utilisateur appuie sur un chiffre ou efface.

## Localisation

```bash
src/components/Numpad.vue
```

## Comportement général
<ul>
<li> Affiche la valeur du code en cours dans un afficheur compact.
<li> Rend cliquables des zones transparentes allignées sur un visuel de numpad (positions absolues).
<li> Emet soit `press` avec le chiffre (0-9) quand on clique sur un touche soit `clear` quand on clique sur la touche d'effacement.
</ul>
Le composant ne valide pas le code et ne gère pas la longueur : cette logique reste dans le parent.

## Props
| Nom | Type | Requis | Description |
|----|-----|-----|--------|
| code | String | Oui | Texte à afficher dans l'afficheur |

## Evénements émis

| Nom | Payload | Description |
|---------|---------|--------|
| `press` | `digit : number` | Appui sur une touche 0-9 |
| `clear` | (aucun) | Demande d'effacement du code courant |

## Liste des hotspots

| Elément | Classe CSS | Description |
|-------|------------|------------|
| Numpad | `.numpad-container` | Sert de base au numpad |
| Affichage | `.numpad-display` | Permet d'afficher le code |
| Boutons | `.numpad-btn` | Permet d'appuyer sur les boutons |


## Styles et positionnement
| Elément | Description |
|---------|------------|
| `.numpad-container` | Positionné en fixed|
| `.numpad-display` | Petit afficheur au dessus du pavé numérique |
| `.numpad-btn` | Boutons totalements transparents positionnés au pixel près |

