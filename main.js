console.log ('hello world')

const URL = 'https://api.thedogapi.com/v1/images/search'

async function myDog (){
    const res = await fetch(URL);
    const data = await res.json();
    const img = document.querySelector('img');
        img.src = data [0].url
}

const myButton = document.querySelector("button");
myButton.onclick = myDog;