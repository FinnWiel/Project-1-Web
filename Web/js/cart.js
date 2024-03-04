
//************* CART PAGE JS ***************************///*
document.addEventListener('DOMContentLoaded', function () {

    // Select all delete buttons
    var deleteButtons = document.querySelectorAll('.Delete');

    // Function to check if there are any products left
    function checkProducts() {
        var productHolder = document.getElementById('Product-holder');
        var products = productHolder.querySelectorAll('.Products');

        // If there are no products left, remove the CheckoutHolder and display text
        if (products.length === 0) {
            var checkoutHolder = document.querySelector('.CheckoutHolder');
            if (checkoutHolder) {
                checkoutHolder.remove();
            }

            // Create a text element
            var Leeg = document.createElement('p');
            Leeg.textContent = "U heeft geen producten in uw winkelwagen";
            Leeg.style.textAlign = "center";

            // Append the text element to the main page
            var mainPage = document.querySelector('.main-page');
            mainPage.appendChild(Leeg);
        }
    }

   

        // Select all plus, minus, and number elements
        var plusButtons = document.querySelectorAll(".plus");
        var plusButtons2 = document.querySelectorAll(".plus2");

        var minusButtons = document.querySelectorAll(".minus");
        var minusButtons2 = document.querySelectorAll(".minus2");

        var numberDisplays = document.querySelectorAll(".number");
        var numberDisplays2 = document.querySelectorAll(".number2");

        var priceDisplays = document.querySelectorAll(".Price");
        var priceDisplays2 = document.querySelectorAll(".Price2");

        // Loop through each plus button
        plusButtons.forEach(function (plusButton, index) {
            plusButton.addEventListener("click", function () {
                var currentValue = parseInt(numberDisplays[index].textContent);
                var currentPriceValue = parseFloat(priceDisplays[index].textContent.replace("€", ""));
                var priceItem = 150.00;

                numberDisplays[index].textContent = currentValue + 1;
                priceDisplays[index].textContent = "€" + (currentPriceValue + priceItem).toFixed(2);
                updateTotal();
            });
        });

        // Loop through each plus button
        plusButtons2.forEach(function (plusButtons2, index) {
            plusButtons2.addEventListener("click", function () {

                var currentValue = parseInt(numberDisplays2[index].textContent);
                var currentPriceValue = parseFloat(priceDisplays2[index].textContent.replace("€", ""));
                var priceItem = 900.00;

                numberDisplays2[index].textContent = currentValue + 1;
                priceDisplays2[index].textContent = "€" + (currentPriceValue + priceItem).toFixed(2);
                updateTotal();
            });
        });

        // Loop through each minus button
        minusButtons.forEach(function (minusButtons, index) {
            minusButtons.addEventListener("click", function () {

                var currentValue = parseInt(numberDisplays[index].textContent);
                var currentPriceValue = parseFloat(priceDisplays[index].textContent.replace("€", ""));
                var priceItem = 150.00;

                if (currentValue > 1) {
                    numberDisplays[index].textContent = currentValue - 1;
                    priceDisplays[index].textContent = "€" + (currentPriceValue - priceItem).toFixed(2);
                    updateTotal();
                }
            });
        });

        minusButtons2.forEach(function (minusButtons2, index) {
            minusButtons2.addEventListener("click", function () {

                var currentValue = parseInt(numberDisplays2[index].textContent);
                var currentPriceValue = parseFloat(priceDisplays2[index].textContent.replace("€", ""));
                var priceItem = 900.00;

                if (currentValue > 1) {
                    numberDisplays2[index].textContent = currentValue - 1;
                    priceDisplays2[index].textContent = "€" + (currentPriceValue - priceItem).toFixed(2);
                    updateTotal();
                }
            });
        });

        // Loop through each delete button
        deleteButtons.forEach(function (button) {
        button.addEventListener('click', function (event) {
            // Get the parent element of the clicked delete button (which is the container div)
            var productContainer = event.target.closest('.Products');
            if (productContainer) {
                productContainer.remove();
                checkProducts();
                updateTotal();
            }
        });
        });

        function updateTotal() {
            var total = 0;

            // Loop through each price display and sum up the total
            priceDisplays.forEach(function (priceDisplay) {
                total += parseFloat(priceDisplay.textContent.replace("€", ""));
            });

            priceDisplays2.forEach(function (priceDisplay2) {
                total += parseFloat(priceDisplay2.textContent.replace("€", ""));
            });

            // Update the total display element
            document.getElementById("total").textContent = "Total: €" + total.toFixed(2);
        }
        updateTotal();
});