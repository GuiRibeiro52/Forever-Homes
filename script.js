document.addEventListener("DOMContentLoaded", function() {
    setupAdoptModal();
    setupDonateModal();
    populateDateFields();
    addDateFieldListeners();
});

////////////SCRIPT MODAL ADOÇÃO

function setupAdoptModal() {
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

  
    const submitButton = document.getElementById("btn-wanna");
    if (submitButton) {
        enableAdoptSubmitButton();
    }
}

function enableAdoptSubmitButton() {
    const submitButton = document.getElementById("btn-wanna");
    const checkbox = document.getElementById("privacyPolicy");
    const form = document.querySelector(".adopt-form");

    submitButton.disabled = true;

    checkbox.addEventListener("change", function() {
        submitButton.disabled = !checkbox.checked;
    });

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        if (validateAdoptForm()) {
            window.location.href = "sucess.html";
        }
    });

    const privacyLinks = form.querySelectorAll("a");
    privacyLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            window.open('https://www.google.com', '_blank');
        });
    });
}

function validateAdoptForm() {
    let isValid = true;
    const emailField = document.querySelector('#adopt-mod input[type="email"]');
    const fullNameField = document.querySelector('#adopt-mod input[type="text"]');
    const day = document.querySelector('select[name="day"]').value;
    const month = document.querySelector('select[name="month"]').value;
    const year = document.querySelector('select[name="year"]').value;
    const checkbox = document.getElementById("privacyPolicy");

    resetErrors();

    if (!fullNameField.value.trim()) {
        showError(fullNameField, "Please enter your full name.");
        isValid = false;
    }

    if (!validateEmail(emailField.value.trim())) {
        showError(emailField, "Please enter a valid email address.");
        isValid = false;
    }

    if (day === "select" || month === "select" || year === "select") {
        showError(document.querySelector('.date-birth'), "Please select a valid date of birth.");
        isValid = false;
    }

    if (!checkbox.checked) {
        alert("Please agree to the Privacy Policy and Terms of Conditions.");
        isValid = false;
    }

    return isValid;
}

/////////////FIM DO MODAL ADOÇÃO

/////////////SCRIPT MODAL DOAÇÃO

function setupDonateModal() {
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

    enableDonateSubmitButton();
}

function enableDonateSubmitButton() {
    const submitButton = document.getElementById("btn-wanna-help");
    const form = document.querySelector(".donate-form");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        if (validateDonateForm()) {
            window.location.href = "sucess.html";
        }
    });
}

function validateDonateForm() {
    let isValid = true;
    const emailField = document.getElementById("donate-email");
    const amountField = document.getElementById("money");
    const paymentMethods = document.getElementsByName("payment");

    resetErrors();

    if (!validateEmail(emailField.value.trim())) {
        showError(emailField, "Please enter a valid email address.");
        isValid = false;
    }

    if (!validateAmount(amountField.value.trim())) {
        showError(amountField, "Please enter a valid donation amount.");
        isValid = false;
    }

    if (![...paymentMethods].some(payment => payment.checked)) {
        showError(document.querySelector('.method'), "Please select a payment method.");
        isValid = false;
    }

    return isValid;
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

arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth
    })
})

const infiniteScroll = () => {
    if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition")
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth)
        carousel.classList.remove("no-transition")
    }
    else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition")
        carousel.scrollLeft = carousel.offsetWidth
        carousel.classList.remove("no-transition")
    }
}

carousel.addEventListener("scroll", infiniteScroll)

//////////////////FIM DO CARROSSEL

///////////ADICIONANDO ITENS AO CAMPO DATA DE NASCIMENTO E VERIFICANDO SE É UMA DATA VÁLIDA

function populateDateFields() {
    const daySelect = document.getElementById("day");
    const monthSelect = document.getElementById("month");
    const yearSelect = document.getElementById("year");

    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1900; year--) {
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

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateAmount(amount) {
    const re = /^[0-9]+(\.[0-9]{1,2})?$/;
    return re.test(amount);
}

function showError(element, message) {
    const error = document.createElement("span");
    error.className = "error-message";
    error.textContent = message;
    element.parentNode.insertBefore(error, element.nextSibling);
}

function resetErrors() {
    const errors = document.querySelectorAll(".error-message");
    errors.forEach(error => error.remove());
}
