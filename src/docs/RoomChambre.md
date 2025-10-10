# RoomChambre.vue

## Rôle

Affiche la scène de la chambre dans l'escape game.
Cette scène contient plusieurs zones interactives invisibles positionnées précisément sur les objets cliquables de l'image de fond. <br>
Chaque clic sur un hotspot émet un événement `inspect` vers le composant parent, qui décide de la suite.

## Localisation

```bash
src/components/RoomChambre.vue
```

## Comportement général
<ul>
<li> Le fond de la pièce est défini dynamiquement via la prop `backgroundRoom`.
<li> Les boutons hotspots sont positionnés avec des coordonnées absolues pour correspondre aux éléments visibles sur l'image.
<li> Chaque hotspot est transparent, sans bordure, ni texte.
<li> Lorsqu'un hotspot est cliqué, un événement `inspect`est émis avec le nom de l'objet correspondant. 
</ul>

## Props
| Nom | Type | Requis | Description |
|----|-----|-----|--------|
| backgroundRoom | String | Oui | Chemin de l'image utilisée en fond de cène. Généralement une image de la pièce actuelle. |

## Evénements émis

| Nom | Payload | Description |
|---------|---------|--------|
| `inspect` | `objectName : string` | Emis lorsque le joueur clique sur une zone interactive. Le paramètre indique quel objet a été cliqué. |

## Liste des hotspots

| Elément | Classe CSS | Description |
|-------|------------|------------|
| Porte | `.door` | Sert à tenter de sortir de la pièce |
| Ordinateur | `.desk` | Permet d'accéder à l'ordinateur |
| Tiroir gauche | `.drawer2` | Permet d'ouvrir le tiroir gauche |
| Tiroir droit | `.drawer` | Permet d'ouvrir le tiroir droit |
| Armoire | `.closet` | Armoire verrouillée |
| Cadre photo | `.frame` | Montre une photo |

## Styles et positionnement
| Elément | Description |
|---------|------------|
| `.room-scène` | Conteneur principal fixé à droite de l'écran, sous le titre |
| `.hotspot` | Zones invisibles cliquables. `clamp()`est utilisé pour rendre la taille des zones responsives |

