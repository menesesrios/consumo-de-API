
const API_URL_RANDOM = 'https://api.thedogapi.com/v1/images/search?limit=2&api_key=live_3wgPVjpBH1k7ZgC42RrKcQuhQAQJ0DSWMLEdquC0wjxfEAdMkUcn5HYe1bCFJSbM';
const API_URL_FAVORITES = 'https://api.thedogapi.com/v1/favourites?limit=2&api_key=live_3wgPVjpBH1k7ZgC42RrKcQuhQAQJ0DSWMLEdquC0wjxfEAdMkUcn5HYe1bCFJSbM';

async function loadRandomDogs (){
    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();
    
    console.log('random')
    console.log(data)
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    

    img1.src = data[0].url;
    img2.src = data[1].url;
    
}

async function loadFavoritesDogs (){
    const res = await fetch(API_URL_FAVORITES);
    const data = await res.json();
    
    console.log('favourites')
    console.log(data)

  
}
loadRandomDogs();
loadFavoritesDogs();
