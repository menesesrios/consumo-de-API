const API_URL_RANDOM = 'https://api.thedogapi.com/v1/images/search?limit=2&api_key=live_3wgPVjpBH1k7ZgC42RrKcQuhQAQJ0DSWMLEdquC0wjxfEAdMkUcn5HYe1bCFJSbM';
const API_URL_FAVORITES = 'https://api.thedogapi.com/v1/favourites';
const API_URL_FAVORITES_DELETE = (id) => `https://api.thedogapi.com/v1/favourites/${id}`;

const spanError = document.getElementById('error')

async function loadRandomDogs (){
    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();
    console.log('random')
    console.log(data)

    if (res.status !== 200){
        spanError.innerHTML= 'hubo un error: ' + res.status;
    }else {
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        const btn1 = document.getElementById('btn1');
        const btn2 = document.getElementById('btn2');

        img1.src = data[0].url;
        img2.src = data[1].url;

        btn1.onclick = () => saveFavouriteDog(data[0].id);
        btn2.onclick = () => saveFavouriteDog(data[1].id);
    }
}

async function loadFavoritesDogs (){
    const res = await fetch(API_URL_FAVORITES, {
        method: 'GET',
        headers:{
           'X-API-KEY':'live_3wgPVjpBH1k7ZgC42RrKcQuhQAQJ0DSWMLEdquC0wjxfEAdMkUcn5HYe1bCFJSbM',
        },
    });

    const data = await res.json();
    console.log('favorites')
    console.log(data)

    if (res.status !== 200){
        spanError.innerHTML= 'hubo un error: ' + res.status + data.message;
        
    } else {
        const section = document.getElementById ('favoritesDogs')
        section.innerHTML ="";
        const h2 = document.createElement('h2');
        const h2Text = document.createTextNode ('Favorites Dogs');
        h2.appendChild(h2Text);
        section.appendChild(h2);
        
        
        data.forEach(dog => {
    
           const article = document.createElement('article');
           const img = document.createElement('img'); 
           const btn = document.createElement('button');
           const btnText = document.createTextNode('Eliminar de favoritos')
           
           
           img.src = dog.image.url; 
           img.width = 150; 
           btn.appendChild(btnText);
           btn.onclick = () => deleteFavoriteDog(dog.id);
           article.appendChild(img);
           article.appendChild(btn);
           section.appendChild(article);
        });
       
    }
}

async function saveFavouriteDog(id){
    const res = await fetch(API_URL_FAVORITES,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'X-API-KEY' : 'live_3wgPVjpBH1k7ZgC42RrKcQuhQAQJ0DSWMLEdquC0wjxfEAdMkUcn5HYe1bCFJSbM'
        },
        body: JSON.stringify ({
            image_id: id
        }),
    });
    const data = await res.json();

    console.log('save')
    console.log(res)

    if (res.status !== 200){
        spanError.innerHTML= 'hubo un error: ' + res.status + data.message;
    } else {
        console.log('Dog guardado en favoritos')
        loadFavoritesDogs();
    }
}

async function deleteFavoriteDog(id) {
    const res = await fetch(API_URL_FAVORITES_DELETE (id),{
        method: 'DELETE',
        headers:{
            'X-API-KEY' : 'live_3wgPVjpBH1k7ZgC42RrKcQuhQAQJ0DSWMLEdquC0wjxfEAdMkUcn5HYe1bCFJSbM'
        }
    });
    const data = await res.json();

    if (res.status !== 200){
        spanError.innerHTML= 'hubo un error: ' + res.status + data.message;
    }else{
        console.log('Dog eliminado de favoritos')
        loadFavoritesDogs()
    }
    
     
}

loadRandomDogs();
loadFavoritesDogs();
