const sharp = require('sharp')
const axios = require('axios')
const path = require('node:path')

const dateData = new Date()
const day = dateData.getDate()
const month = dateData.getMonth() + 1
const year = dateData.getFullYear()

const imageUrl = `https://bot.fnbr.co/shop-image/fnbr-shop-${day}-${month}-${year}.png`;

function takeShop() {
    axios.get(imageUrl, { responseType: 'arraybuffer' })
      .then(response => {
        const buffer = Buffer.from(response.data);
    
        sharp(buffer)
          .metadata()
          .then(metadata => {
            const imageWidth = metadata.width;
            const imageHeight = metadata.height;
    
            // Diviser l'image en 4 parties horizontalement après avoir enlevé la partie haute
            const dividedHeight = Math.floor(imageHeight / 4);
    
            sharp(buffer)
              .extract({ left: 0, top: 0, width: imageWidth, height: dividedHeight })
              .toFile(path.join('./autoMessage/fortniteShopImage/','part1.png'), (err, info) => {
                if (err) console.error('Erreur lors de la division de la partie 1 :', err);
                console.log('Partie 1 divisée avec succès !');
              })
            
            sharp(buffer)
              .extract({ left: 0, top: dividedHeight, width: imageWidth, height: dividedHeight })
              .toFile(path.join('./autoMessage/fortniteShopImage/','part2.png') , (err, info) => {
                if (err) console.error('Erreur lors de la division de la partie 2 :', err);
                console.log('Partie 2 divisée avec succès !');
              })
    
            sharp(buffer)
              .extract({ left: 0, top: dividedHeight * 2, width: imageWidth, height: dividedHeight })
              .toFile(path.join('./autoMessage/fortniteShopImage/','part3.png'), (err, info) => {
                if (err) console.error('Erreur lors de la division de la partie 3 :', err);
                console.log('Partie 3 divisée avec succès !');
              })
    
            sharp(buffer)
              .extract({ left: 0, top: dividedHeight * 3, width: imageWidth, height: dividedHeight })
              .toFile(path.join('./autoMessage/fortniteShopImage/','part4.png'), (err, info) => {
                if (err) console.error('Erreur lors de la division de la partie 4 :', err);
                console.log('Partie 4 divisée avec succès !');
              })
          })
          .catch(err => {
            console.error('Erreur lors de la récupération des métadonnées de l\'image :', err);
          })
      })
      .catch(err => {
        console.error('Erreur lors du téléchargement de l\'image :', err);
      })
}

module.exports = takeShop