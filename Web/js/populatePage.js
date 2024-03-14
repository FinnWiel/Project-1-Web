/*document.addEventListener("DOMContentLoaded", function () {
    window.addEventListener("load", (event) => {
        //Get data from json file and make it into HTML
        const main = document.querySelector(".kopen-page");
        const jsonFile = "data/fietsen.json";
        //change value of item to another id to change the bike displaying
        const searchParams = new URLSearchParams(window.location.search);
        let item = searchParams.get('id');

        if (parseInt(item) <= 4 && parseInt(item) != 0) {
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
                <button class="addCart" id="${id}"> <img src="img/cart-shopping-solid.svg" alt="cart icon" height="40px">Toevoegen aan winkelwagen</button>
            </div>
        </div>
        `;
                    });
                });


        } else {
            main.innerHTML += `<h1>Oops, seems like something went wrong!</h1>`;
        }
    });
});
*/
window.addEventListener("load", (event) => {
    //Get data from json file and make it into HTML
    const main = document.querySelector(".kopen-page");
    const jsonFile = "data/fietsen.json";

    //change value of item to id in the URL
    const searchParams = new URLSearchParams(window.location.search);
    let item = searchParams.get('id');

    if(parseInt(item) <= 4 && parseInt(item) != 0){
        fetch(jsonFile)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            data.filter(x => x.id == item).map((product) => {
                const { id, name, price, image, brand, description, color } = product;
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
                        <button class="addCart" data-id="${id}" data-name="${name}" data-price="${price}" data-color="${color}" data-brand="${brand}" data-description="${description}"> <img src="img/cart-shopping-solid.svg" alt="cart icon" height="40px">Toevoegen aan winkelwagen</button>
                    </div>
                </div>
                `;
            });

            // Add event listeners to all "addCart" buttons
            const addToCartButtons = document.querySelectorAll(".addCart");
            addToCartButtons.forEach(button => {
                button.addEventListener("click", addToCartClicked);
               
            });
        });
    }   else {
       `<h1>Oops, seems like something went wrong!</h1>`;
    }
});


// Function to handle "Add to Cart" button click
function addToCartClicked(event) {
    // Get the product details from the clicked button's data attributes
    const id = event.target.dataset.id;
    const name = event.target.dataset.name;
    const price = event.target.dataset.price;
    const brand = event.target.dataset.brand;
    const image = event.target.dataset.image;
    const color = event.target.dataset.color;
    const description = event.target.dataset.description;

    // Here, you can implement the logic to add the product to the cart.
    // You can use local storage or session storage to store cart items,
    // or you can send an AJAX request to your server to handle the cart functionality.
    // For demonstration purposes, let's assume we're using local storage.

    // Example of adding the product to local storage
    const cartItem = {
        id: id,
        name: name,
        price: price,
        brand: brand,
        image: image,
		color: color,
		description: description
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cart));

    // Optionally, you can provide feedback to the user that the item has been added to the cart.
    alert( id + " " + name + " " + price + " " + brand + " " + color);
    console.log(  name  + " " + price + " " + brand + " " + color);


    // You can redirect the user to the cart page or perform any other actions as needed.
}