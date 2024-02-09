
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
            console.log(procuct);
			const { id, name, price, image } = procuct;
			main.innerHTML += 
			`
            <div class="fiets">
                <img src="${image}" alt="${name}">
                <div class="fietsOut">
                    <div class="fietsInner">
                        <p class="fietsNaam">${name}</p>
                        <p>${price}</p>
                    </div>
                    <button class="addCart">Kopen</button>
                </div>
            </div>
        `;
		});
    });
});