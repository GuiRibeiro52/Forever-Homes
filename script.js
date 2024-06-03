
////////////SCRIPT MODAL ADOÇÃO

const btnAdopt = document.querySelectorAll("#btn-applyAdopt");
const modalAdopt = document.getElementById("adopt-mod");
const buttonCloseAdopt = document.getElementById("btnCloseModal");

if (btnAdopt && modalAdopt && buttonCloseAdopt) {
    btnAdopt.forEach(button => {
        button.onclick = function() {
            modalAdopt.showModal();
            document.body.style.overflow = "hidden";
        }
    });

    buttonCloseAdopt.onclick = function() {
        modalAdopt.close();
        document.body.style.overflow = "auto";
    };

    window.onclick = function(e) {
        if (e.target == modalAdopt) {
            modalAdopt.close();
            document.body.style.overflow = "auto"; 
        }
    };

    window.onkeydown = function(e) {
        if (e.key === "Escape") {
            modalAdopt.close();
            document.body.style.overflow = "auto"; 
        }
    };
}


/////////////FIM DO MODAL ADOÇÃO

/////////////SCRIPT MODAL DOAÇÃO
const btnDonate = document.querySelectorAll("#btn-donate");
const modalDonate = document.getElementById("donate-mod");
const buttonCloseDonate = document.getElementById("btnCloseModalDonate");

if (btnDonate && modalDonate && buttonCloseDonate) {
    btnDonate.forEach(button => {
        button.onclick = function() {
            modalDonate.showModal();
            document.body.style.overflow = "hidden";
        }
    });

    buttonCloseDonate.onclick = function() {
        modalDonate.close();
        document.body.style.overflow = "auto";
    };

    window.onclick = function(e) {
        if (e.target == modalDonate) {
            modalDonate.close();
            document.body.style.overflow = "auto"; 
        }
    };

    window.onkeydown = function(e) {
        if (e.key === "Escape") {
            modalDonate.close();
            document.body.style.overflow = "auto"; 
        }
    };
}


//////////////FIM DO MODAL DOAÇÃO


///////////////SCRIPT DO CARROSSEL

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

//////////////////FIM DO CARROSSEL


///////////ADICIONANDO ITENS AO CAMPO DATA DE NASCIMENTO E VERIFICANDO SE É UMA DATA VÁLIDA
document.addEventListener("DOMContentLoaded", function() {
    populateDateFields();
    addDateFieldListeners();
});

function populateDateFields() {
    const daySelect = document.getElementById("day");
    const monthSelect = document.getElementById("month");
    const yearSelect = document.getElementById("year");

    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1900 ; year--) {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }

    
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    months.forEach((month, index) => {
        const option = document.createElement("option");
        option.value = index + 1; 
        option.textContent = month;
        monthSelect.appendChild(option);
    });

    
    populateDays(daySelect, 31);
}

function populateDays(daySelect, numberOfDays) {
    daySelect.innerHTML = '<option value="select">Day</option>'; 
    for (let day = 1; day <= numberOfDays; day++) {
        const option = document.createElement("option");
        option.value = day;
        option.textContent = day;
        daySelect.appendChild(option);
    }
}

function addDateFieldListeners() {
    const daySelect = document.getElementById("day");
    const monthSelect = document.getElementById("month");
    const yearSelect = document.getElementById("year");

    monthSelect.addEventListener("change", function() {
        updateDays(daySelect, monthSelect, yearSelect);
    });

    yearSelect.addEventListener("change", function() {
        updateDays(daySelect, monthSelect, yearSelect);
    });
}

function updateDays(daySelect, monthSelect, yearSelect) {
    const month = parseInt(monthSelect.value);
    const year = parseInt(yearSelect.value);

    if (month && year) {
        let numberOfDays;
        switch (month) {
            case 2:
                
                numberOfDays = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 29 : 28;
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                numberOfDays = 30;
                break;
            default:
                numberOfDays = 31;
                break;
        }
        populateDays(daySelect, numberOfDays);
    }
}

