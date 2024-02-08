function toggleMobileNav(){
    let menu = document.getElementById("navigation");
    let bars = document.querySelectorAll('.bar')
    
    menu.classList.toggle("navFlex");
    console.log("toggle");

    bars.forEach(bar => bar.classList.toggle('x'))
}

