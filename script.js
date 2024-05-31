const btnAdopt = document.querySelectorAll("#btn-applyAdopt")
const modal = document.querySelector("dialog")
const buttonClose = document.getElementById("btnCloseModal")


btnAdopt.forEach(button => {
    button.onclick = function() {
        modal.showModal()
        document.body.style.overflow = "hidden"
    }
})


buttonClose.onclick = function(){
    modal.close()
    document.body.style.overflow = "auto"
}

window.onclick = function(e) {
    if (e.target == modal) {
        modal.close();
        document.body.style.overflow = "auto"; 
    }
}

window.onkeydown = function(e) {
    if (e.key === "Escape") {
        modal.close();
        document.body.style.overflow = "auto"; 
    }
}

//SCRIPT DO CARROSSEL

const carousel = document.querySelector(".carousel")
const arrowBtns = document.querySelectorAll(".wrapper .arrow")
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const carouselChildrens = [...carousel.children]


let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth)

carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML)
})

carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

arrowBtns.forEach(btn =>{
    btn.addEventListener("click",() =>{
        carousel.scrollLeft += btn.id === "left" ?  -firstCardWidth : firstCardWidth
    })
})

const infiniteScroll = () => {
    if(carousel.scrollLeft === 0){
        carousel.classList.add("no-transition")
        carousel.scrollLeft = carousel.scrollWidth - ( 2 * carousel.offsetWidth)
        carousel.classList.remove("no-transition")
    }
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
        carousel.classList.add("no-transition")
        carousel.scrollLeft = carousel.offsetWidth
        carousel.classList.remove("no-transition")
    }
}

carousel.addEventListener("scroll", infiniteScroll)

//FIM DO CARROSSEL