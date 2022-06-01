const BASE_URL = 'https://api.thecatapi.com/v1/images/search';
const catBtn = document.getElementById('change-cat');
const catImg = document.getElementById('imagem');

const getCats = async () => {
    try {
        const data = await fetch(BASE_URL);
        const json = await data.json(); // Pode ser feito com .then() e .catch()

        return json[0].url;
    } catch (e) {
        console.log(e.message);
    }
};

const loadImg = async () => {
    catImg.src = await getCats();
}

loadImg();

catBtn.addEventListener('click', loadImg);
