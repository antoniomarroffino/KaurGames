
function ColpisciLaTalpa() {
    let punti;
    let dimensioneTalpa;
    let altezzaCampo;
    let lunghezzaCampo;
    let timeId;

    this.creaStruttura = function () {
        punti = 0;
        dimensioneTalpa = 100;
        altezzaCampo = 500;
        lunghezzaCampo = 600;
        document.getElementById("box-2").innerHTML = '<div id="contenutoreGioco"></div>'
        document.getElementById("contenutoreGioco").style.height = `${altezzaCampo}px`;
        document.getElementById("contenutoreGioco").style.width = `${lunghezzaCampo}px`;

        clearInterval(timeId);
        timeId = setInterval(mostraTalpa, 1500);
    }

    let mostraTalpa = function () {
        let xTalpa, yTalpa;
        xTalpa = Math.floor(Math.random() * (lunghezzaCampo - dimensioneTalpa) + 0);
        yTalpa = Math.floor(Math.random() * (altezzaCampo - dimensioneTalpa) + 0);

        document.getElementById("contenutoreGioco").innerHTML = `<img id="talpa1" class="talpa" height="${dimensioneTalpa}" width="${dimensioneTalpa}">`;
        document.getElementsByClassName("talpa")[0].style.left = `${xTalpa}px`;
        document.getElementsByClassName("talpa")[0].style.top = `${yTalpa}px`;
        document.getElementById("talpa1").onclick = function () { colpisciLaTalpa.talpaPresa(); };
    }

    this.talpaPresa = function () {
        document.getElementsByClassName("talpa")[0].className += " talpaColpita";
        aggiornaPunteggio();
    }
    let aggiornaPunteggio = function () {
        punti++;
        document.getElementById("box-3-punti").innerHTML = `<strong>Punti ottenuti: </strong>${punti}`;
    }

    this.terminaPartita = function () {
        clearInterval(timeId);
    }


}


function crea() {
    document.getElementsByTagName("body")[0].innerHTML += '<div class="container text-center my-5 titolo">' +
        '1 2 2 COLPISCI LA TALPA 2 2 9' +
        '</div>';
    creaScheletro();

}

function creaScheletro() {
    document.getElementsByTagName("body")[0].innerHTML +=
        '<div class="container-fluid" id="container">' +
        '<div class="row" id="row-2">' +
        '<div class="col-md-3" id="box-1">' +
        '</div>' +
        '<div class="col-md-6" id="box-2">' +
        '<button id="bottone-gioca" onclick="gioca()">GIOCA</button>' +
        // '<div class="alert-primary" id="comeSiGioca" >Come si gioca?' +
        // '</div>' +
        '</div>' +
        '<div class="col-3 alert alert-secondary" id="box-3">' +
        '<div id="box-3-punti">' +
        '</div>' +
        // '<div id="box-3-aumento">' +
        // '</div>' +
        '</div>' +
        '</div>' +
        '<div class="row" id="row-3">' +
        '</div>' +
        '</div>';
}

function gioca() {
    document.getElementsByTagName("div")[1].remove();
    document.getElementById("bottone-gioca").style.display = 'none';
    document.getElementById("bottone-gioca").style.visibility = "hidden";

    start();
}

function start() {
    colpisciLaTalpa.creaStruttura();
    // snake.settings();
    // snake.posizionaTesta();
    // snake.posizionaMela();
    // document.getElementsByTagName("body")[0].onkeydown = snake.spostamento;
    document.getElementById("box-3").style.visibility = "visible";
    document.getElementById("box-3-punti").innerHTML = `<strong>Punti ottenuti: </strong>0`;

    document.getElementById("box-1").innerHTML = '<div class="button bottone-menù" onclick="tornaAlMenu()">' +
        '<button id="bottone-tornaAlMenù">TORNA AL MENU</button>' +
        '</div>';
}

function tornaAlMenu() {
    document.getElementById("container").remove();
    colpisciLaTalpa.terminaPartita();
    crea();
}
