document.addEventListener('DOMContentLoaded', function () {
    var cartData = JSON.parse(localStorage.getItem('cart'));
    var productHolder = document.getElementById('Product-holder');
    var totalPrice = 0;
    // Check if there are items in the cart
    if (cartData && cartData.length > 0) {
        // Loop through each item in the cart data
        cartData.forEach(function (item) {
            var price = item.price;
            var replacedPrice = price.replace("$", "");
            var quantity = item.quantity || 1;
            var productDiv = document.createElement('div');

            // Create the HTML structure for each product item
            productHolder.innerHTML += `
                    <div class="Products">  
                        <ul>
                            <li class="Photo-bike"><img alt="Fiets" style="height: 100px;" src="${item.image}"> </li>
                            <li class="Bike-name">${item.name}</li>
                            <li class="Price">${item.price}</li>
                            <li class="Delete">verwijderen</li>
                            <li class="Amount">
                                <span class="minus">-</span>
                                <span class="number">1</span>
                                <span class="plus">+</span>
                            </li>
                        </ul> 
                    </div>
                `;
            // Append the productDiv to productHolder //
            productHolder.appendChild(productDiv);
            totalPrice += parseFloat(replacedPrice) * quantity;
        });
    } document.getElementById('total').innerText = "Totaal: €" + totalPrice.toFixed(2);

    // Event listener for plus and minus buttons
    productHolder.addEventListener('click', function (event) {
        var target = event.target;
        if (target.classList.contains('plus') || target.classList.contains('minus')) {
            var productContainer = target.closest('.Products');
            var quantityElement = productContainer.querySelector('.number');
            var quantity = parseInt(quantityElement.innerText);
            var priceElement = productContainer.querySelector('.Price');
            var priceString = priceElement.innerText;
            var productPrice = parseFloat(priceString.replace(/[^\d.-]/g, ''));

            if (target.classList.contains('plus')) {
                quantity++;
                totalPrice += productPrice;
            } else {
                if (quantity > 1) {
                    quantity--;
                    totalPrice -= productPrice;
                }
            }
            quantityElement.innerText = quantity;
            document.getElementById('total').innerText = "Totaal: €" + totalPrice.toFixed(2);

            // Update the quantity in the cartData and localStorage
            var productName = productContainer.querySelector('.Bike-name').innerText;
            cartData.forEach(function (item) {
                if (item.name === productName) {
                    item.quantity = quantity;
                }
            });
            localStorage.setItem('cart', JSON.stringify(cartData));
        }
    });
    var checkoutButton = document.getElementById('Checkout');
    checkoutButton.addEventListener('click', function () {
        alert("Totaal: €" + totalPrice.toFixed(2));
    });
});
document.addEventListener('DOMContentLoaded', function () {

    // Function to check if there are any products left
    function checkProducts() {
        var productHolder = document.getElementById('Product-holder');
        var products = productHolder.querySelectorAll('.Products');
        var checkoutHolder = document.querySelector('.CheckoutHolder');
        // If there are no products left, remove the CheckoutHolder and display text
        if (products.length === 0) {

            if (checkoutHolder) {
                checkoutHolder.remove();
            }
            var mainPage = document.getElementById('Product-holder');
            var Leeg = document.createElement('p');
          
            Leeg.textContent = "U heeft geen producten in uw winkelwagen :(";
            Leeg.style.textAlign = "center";

            var mainPage = document.getElementById('Product-holder');
            mainPage.appendChild(Leeg);
        }
    }
    

    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('Delete')) {
            var productContainer = event.target.closest('.Products');
            var cartData = JSON.parse(localStorage.getItem('cart'));

            if (productContainer) {
                // Extract the price of the product being deleted
                var priceElement = productContainer.querySelector('.Price');
                var priceString = priceElement.innerText;
                var productPrice = parseFloat(priceString.replace(/[^\d.-]/g, ''));

                // Remove the deleted product from localStorage
                if (cartData && cartData.length > 0) {
                    var productName = productContainer.querySelector('.Bike-name').innerText;
                    cartData = cartData.filter(function (item) {
                        return item.name !== productName;
                    });

                    // Update the cart data in localStorage
                    localStorage.setItem('cart', JSON.stringify(cartData));

                    // Update the total price
                    var totalPriceElement = document.getElementById('total');
                    var totalPriceString = totalPriceElement.innerText;
                    var totalPrice = parseFloat(totalPriceString.replace(/[^\d.-]/g, ''));
                    totalPrice -= productPrice;
                    totalPriceElement.innerText = "Totaal: €" + totalPrice.toFixed(2);

                    // Remove the product from the display
                    productContainer.remove();

                    // Check if there are any products left
                    checkProducts();
                }
            }
        }
    });

    checkProducts();
});



