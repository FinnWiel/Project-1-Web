
window.addEventListener("load", (event) => {

//Get data from json file and get it into the HTML
const main = document.querySelector(".main-page");
const jsonFile = "data/fietsen.json";


fetch(jsonFile)
  .then((respone) => {
    return respone.json();
  })
  .then((data) => {
    data
      .map((product) => {
        const { id, name, price, image } = product;
        main.innerHTML += `
          <div class="fiets">
              <img src="${image}" alt="${name}">
              <div class="fietsOut">
                  <div class="fietsInner">
                      <p class="fietsNaam">${name}</p>
                      <p>${price}</p>
                  </div>
                  <a href="fiets-kopen.html?id=${id}" class="addCart">Meer info</a>
              </div>
          </div>
      `;
      });
  });

});