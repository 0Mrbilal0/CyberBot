# CyberBot

## Commandes de lancement du bot

### Commandes pour lancer le bot temporairement :

`npm start` : lance le bot basiquement `CTRL+C` pour arreter

`npm run watch` : lance le bot en regardant les modifications

### Commande pour crée un processus :

----------

pm2 sert a la gestion des processus nodeJs

- `pm2 start server.js{nom du fichier source}` : permet de crée le processus qui laisse le bot allumée
- `pm2 restart server.js{nom du fichier source}` : permet de relancer le processus
- `pm2 stop server.js{nom du fichier source}` : permet de stoper le processus
----------