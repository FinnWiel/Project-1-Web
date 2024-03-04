window.addEventListener("load", (event) => {
    //Gets the current year for footer
    let copyright = document.getElementById("year");
    let currentYear = new Date().getFullYear();
    copyright.innerHTML = currentYear;
});

//Toggles mobile nav menu
function toggleMobileNav() {
    let menu = document.getElementById("navigation");
    let bars = document.querySelectorAll(".bar");

    menu.classList.toggle("navFlex");
    console.log("toggle");

    bars.forEach((bar) => bar.classList.toggle("x"));
}

//Bike on footer
document.addEventListener('DOMContentLoaded', domloaded, false);
function domloaded() {

    //Create canvas
    var can = document.getElementById('canvas');
    can.height = 40; can.width = window.innerWidth;
    var ctx = can.getContext('2d');

    var x = 0, y = can.height;
    var speed = 1;

    function draw() {
        //Draw canvas
        can.width = window.innerWidth
        ctx.fillStyle = "#56BDE9";
        ctx.fillRect(0, 0, can.width, can.height);

        //Draw bike
        ctx.beginPath();
        ctx.font = '30px FontAwesome';
        ctx.fillStyle = 'white';
        ctx.fillText('\uf206', x, y); //'\uf206' is unicode for the bike 
        ctx.fill();

        //Move bike
        x += speed;

        if (x >= can.width + 100) {
            x = -50;
        }
        requestAnimationFrame(draw);
    }
    draw();
}

//Dynamic open/closed message on homepage
function OpenClose() {
    var spanText = document.getElementById("openspan");
    var today = new Date();
    var weekDay = today.getDay();
    var curHour = today.getHours();
    var curMinute = today.getMinutes();


    if (weekDay === 0) { // Day 0 = sunday
        spanText.innerHTML = "Gesloten";
    }
    else if (weekDay === 1) {
        if ((curHour > 12 || (curHour === 12 && curMinute >= 30)) && curHour < 18) {
            spanText.innerHTML = "Open";
        } else {
            spanText.innerHTML = "Gesloten";
        }
    }
    else if (weekDay >= 2 && weekDay <= 4) {
        if ((curHour > 8 || (curHour === 8 && curMinute >= 30)) && curHour < 18) {
            spanText.innerHTML = "Open";
        } else {
            spanText.innerHTML = "Gesloten";
        }
    }
    else if (weekDay === 5) {
        if ((curHour > 8 || (curHour === 8 && curMinute >= 30)) && (curHour < 19 || (curHour === 19 && curMinute < 30))) {
            spanText.innerHTML = "Open";
        } else {
            spanText.innerHTML = "Gesloten";
        }
    }
    else if (weekDay === 6) {
        if (curHour >= 9 && curHour < 17) {
            spanText.innerHTML = "Open";
        } else {
            spanText.innerHTML = "Gesloten";
        }
    }
}
// Run OpenClose when page loads
window.onload = function () {
    OpenClose();

    // Run OpenClose every 30s to update status
    setInterval(OpenClose, 30000);
};

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

    // Loop through each delete button
    deleteButtons.forEach(function (button) {
        button.addEventListener('click', function (event) {
            // Get the parent element of the clicked delete button (which is the container div)
            var productContainer = event.target.closest('.Products');
            if (productContainer) {
                productContainer.remove();
                checkProducts();
            }
        });
    });

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
    plusButtons.forEach(function (plusButtons, index) {
        plusButtons.addEventListener("click", function () {

            var currentValue = parseInt(numberDisplays[index].textContent);
            var currentPriceValue = parseInt(priceDisplays[index].textContent);

            numberDisplays[index].textContent = currentValue + 1;
            priceDisplays[index].textContent = currentPriceValues = currentPriceValue + 150.00;
        });
    });

    plusButtons2.forEach(function (plusButtons2, index) {
        plusButtons2.addEventListener("click", function () {

            var currentValue = parseInt(numberDisplays2[index].textContent);
            var currentPriceValue = parseInt(priceDisplays2[index].textContent);

            numberDisplays2[index].textContent = currentValue + 1;
            priceDisplays2[index].textContent = currentPriceValues = currentPriceValue + 900.00;
        });
    });


    // Loop through each minus button
    minusButtons.forEach(function (minusButtons, index) {
        minusButtons.addEventListener("click", function () {

            var currentValue = parseInt(numberDisplays[index].textContent);
            var currentPriceValue = parseInt(priceDisplays[index].textContent);

            if (currentValue > 1) {
                numberDisplays[index].textContent = currentValue - 1;
                priceDisplays[index].textContent = currentPriceValue = currentPriceValue - 150.00;
            }
        });
    });



    minusButtons2.forEach(function (minusButtons2, index) {
        minusButtons2.addEventListener("click", function () {

            var currentValue = parseInt(numberDisplays2[index].textContent);
            var currentPriceValue = parseInt(priceDisplays2[index].textContent);

            if (currentValue > 1) {
                numberDisplays2[index].textContent = currentValue - 1;
                priceDisplays2[index].textContent = currentPriceValue = currentPriceValue - 900.00;
            }
        });
    });

    checkProducts();
});

