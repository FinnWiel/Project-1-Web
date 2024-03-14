
window.addEventListener("load", (event) => {
    //Get data from json file and make it into HTML
    const main = document.querySelector(".kopen-page");
    const jsonFile = "data/fietsen.json";
    //change value of item to another id to change the bike displaying
    const searchParams = new URLSearchParams(window.location.search);
    let item = searchParams.get('id');

    if (parseInt(item) <= 4 && parseInt(item) != 0) {
        fetch(jsonFile)
            .then((response) => {
                // console.log(response.json());
                return response.json();
            })
            .then((data) => {
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
                        <button class="addCart" data-id="${id}" data-name="${name}" data-price="${price}" data-color="${color}" data-brand="${brand}" data-description="${description}" data-image="${image}">
                        <img src="img/cart-shopping-solid.svg" alt="cart icon" height="40px">Toevoegen aan winkelwagen
                    </button>
                    
                    </div>
                </div>
                `;
                });

                // Add event listeners to all "Add to Cart" buttons
                const addToCartButtons = document.querySelectorAll(".addCart");
                addToCartButtons.forEach(button => {
                    button.addEventListener("click", addToCartClicked);

                });
            });
    } else {
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

    

    //  adding the product to local storage
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
    const existingItemIndex = cart.findIndex(item => item.id === id);

    if (existingItemIndex !== -1) {
        // If the item already exists, you can display an alert message or take appropriate action
        alert("This item is already in your cart.");
        return; // Exit the function, do not add the item again
    }

        // If the product already exists, display an alert message
        cart.push(cartItem);
        localStorage.setItem('cart', JSON.stringify(cart));
    
        // alert that shows that the item is already in the localstorage.
        alert(name + " has been added to your cart.");
    
}
