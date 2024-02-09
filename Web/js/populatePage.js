
window.addEventListener("load", (event) => {
//Get data from json file and make it into HTML
const main = document.querySelector(".kopen-page");
const jsonFile = "data/fietsen.json";

//change value of item to another id to change the bike displaying

const searchParams = new URLSearchParams(window.location.search);
let item = searchParams.get('id');


fetch(jsonFile)
	.then((respone) => {
		return respone.json();
	})
	.then((data) => {
		data.filter(x => x.id == item).map((procuct) => {
			const { id, name, price, image, brand, description, color } = procuct;
			main.innerHTML += 
			`
            <div class="fiets">
            <img src="${image}" alt="${name}">
            <div class="fietsOut">
                <div class="fietsInner">
                    <div class="nameBrand">
                        <h3 class="fietsNaam">${name}</h3>
                        <p>${brand}</p>
                    </div>
                    <p class="price">${price}</p>
                    <div class="extraInfo">
                        <p>${description}</p>
                        <p>Kleur: ${color}</p>
                    </div>
    
                </div>
                <button class="addCart"> <img src="img/cart-shopping-solid.svg" alt="cart icon" height="40px">Toevoegen aan winkelwagen</button>
            </div>
        </div>
        `;
		});
    });

});