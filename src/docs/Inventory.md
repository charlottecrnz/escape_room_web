# Inventory.vue

## Rôle

Affiche l'inventaire du joueur dans l'interface de jeu.
Présente les objets collectés dans une grille et permet de cliquer sur un objet pour l'utiliser.

## Localisation

```bash
src/components/Inventory.vue
```

## Comportement général
<ul>
<li> Affiche un titre "Inventaire".
<li> Montre une grille de 4 cases (2x2 par défaut).
<li> Chaque case répresente un slot d'inventaire. Si le slot contient un objet, son icône et son nom sont affichés. Si le slot est vide, une case grisée est affichée.
<li> Lorsque le joueur clique sunr une case contenant un objet, le composant émet un événement `use` avec l'objet en paramètre. 
</ul>

## Props
| Nom | Type | Requis | Description |
|----|-----|-----|--------|
| inventory | Array | Oui | Tableau contenant les objets du joueur. Chaque objet peut être `null` (slot vide) ou un objet `{name, icon}`. |

## Styles et positionnement
| Elément | Description |
|---------|------------|
| `.inventory` | Conteneur principal fixé à droite de l'écran, sous le titre |
| `.inventory-grid` | Grille 2x2 contenant les cases d'objets |
| `.inventory-slot` | Case grise avec légère transparence et survol cliquable |
| `.inventory-slot img` | Image redimensionnée à 50x50px max |
