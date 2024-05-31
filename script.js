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

// PARA CHAMAR OUTRA PÁGINA HTML

document.getElementById("viewAdoptablesBtn").onclick = function(){
    window.location.href = "adoptables.html";
}

document.querySelectorAll("#btn-wanna").onclick = function(){
    window.location.href = "sucess.html";
}






