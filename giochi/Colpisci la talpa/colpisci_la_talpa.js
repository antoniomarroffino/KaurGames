
function ColpisciLaTalpa() {
    let punti;
    let dimensioneTalpa;
    let altezzaCampo;
    let lunghezzaCampo;
    let timeIdTalpa1, timeIdTalpa2, timeIdTalpa3;
    let tempoMedioTalpa;
    let numeroTalpe;
    let posizioneTalpe = [[0, 0], [0, 0], [0, 0]];
    let tempoRimanente;
    let timeIdTempoRimanente;
    let difficolta;

    this.creaStruttura = function () {
        punti = 0;
        altezzaCampo = 500;
        lunghezzaCampo = 600;
        document.getElementById("box-3-tempoRimanente").innerHTML = `<strong>Tempo rimanente: </strong>${tempoRimanente} secondi`;
        document.getElementById("box-2").innerHTML = '<div id="contenutoreGioco"></div>'
        document.getElementById("contenutoreGioco").style.height = `${altezzaCampo}px`;
        document.getElementById("contenutoreGioco").style.width = `${lunghezzaCampo}px`;

        clearInterval(timeIdTempoRimanente);
        timeIdTempoRimanente = setInterval(aggiornaTempoRimanente, 1000);

        creaTalpe();
    }
    let aggiornaTempoRimanente = function () {
        tempoRimanente--;
        document.getElementById("box-3-tempoRimanente").innerHTML = `<strong>Tempo rimanente: </strong>${tempoRimanente} secondi`;
        if (tempoRimanente == 0) tempoDiGiocoEsaurito();
    }
    let creaTalpe = function () {
        if (numeroTalpe == 1) {
            clearInterval(timeIdTalpa1);
            timeIdTalpa1 = setInterval(mostraTalpa, tempoMedioTalpa, 1);
            document.getElementById("contenutoreGioco").innerHTML = `<span id="divTalpa${1}" class="divTalpa"></span>`;
        }
        else if (numeroTalpe == 3) {
            clearInterval(timeIdTalpa1);
            document.getElementById("contenutoreGioco").innerHTML = `<span id="divTalpa${1}" class="divTalpa"></span>`;
            // timeIdTalpa1 = setInterval(mostraTalpa, Math.floor(Math.random() * (400 - 0) + 0) + tempoMedioTalpa, 1);
            timeIdTalpa1 = setInterval(mostraTalpa, 1000, 1);
            clearInterval(timeIdTalpa2);
            document.getElementById("contenutoreGioco").innerHTML += `<span id="divTalpa${2}" class="divTalpa"></span>`;
            // timeIdTalpa2 = setInterval(mostraTalpa, Math.floor(Math.random() * (400 - 0) + 0) + tempoMedioTalpa, 2);
            timeIdTalpa2 = setInterval(mostraTalpa, 1800, 2);
            clearInterval(timeIdTalpa3);
            document.getElementById("contenutoreGioco").innerHTML += `<span id="divTalpa${3}" class="divTalpa"></span>`;
            // timeIdTalpa3 = setInterval(mostraTalpa, Math.floor(Math.random() * (1000 - 0) + 0) + tempoMedioTalpa, 3);
            timeIdTalpa3 = setInterval(mostraTalpa, 3000, 3);
        }
    }

    this.imposta = function (difficoltaScelta) {
        difficolta = difficoltaScelta;
        if (difficoltaScelta == "facile") {
            dimensioneTalpa = 120;
            tempoMedioTalpa = 1500;
            numeroTalpe = 1;
            tempoRimanente = 180;
        } else if (difficoltaScelta == "normale") {
            dimensioneTalpa = 100;
            tempoMedioTalpa = 1200;
            numeroTalpe = 1;
            tempoRimanente = 120;
        } else if (difficoltaScelta == "difficile") {
            dimensioneTalpa = 90;
            tempoMedioTalpa = 3000;
            numeroTalpe = 3;
            tempoRimanente = 120;
        }
    }

    let mostraTalpa = function (numeroTalpa) {
        let xTalpa, yTalpa;
        let valido = false;
        do {
            xTalpa = Math.floor(Math.random() * (lunghezzaCampo - 40 - dimensioneTalpa) + 0);
            yTalpa = Math.floor(Math.random() * (altezzaCampo - 40 - dimensioneTalpa) + 0);
            if (numeroTalpe == 1) valido = true;
            else if (posizioneValida(xTalpa, yTalpa, numeroTalpa)) valido = true;
        } while (valido == false);

        posizioneTalpe[numeroTalpa - 1][0] = xTalpa;
        posizioneTalpe[numeroTalpa - 1][1] = yTalpa;

        document.getElementById(`divTalpa${numeroTalpa}`).innerHTML = `<img id="talpa${numeroTalpa}" class="talpa" height="${dimensioneTalpa}" width="${dimensioneTalpa}">`;
        document.getElementById(`talpa${numeroTalpa}`).style.left = `${xTalpa}px`;
        document.getElementById(`talpa${numeroTalpa}`).style.top = `${yTalpa}px`;
        document.getElementById(`talpa${numeroTalpa}`).onclick = function () { colpisciLaTalpa.talpaPresa(numeroTalpa); };
    }
    let posizioneValida = function (xTalpa, yTalpa, numeroTalpa) {
        for (let i = 0; i < 3; i++) {
            if (i != numeroTalpa - 1) {
                if (Math.abs(xTalpa - posizioneTalpe[i][0]) < dimensioneTalpa && Math.abs(yTalpa - posizioneTalpe[i][1]) < dimensioneTalpa) {
                    return false;
                }
            }
        }
        return true;
    }

    this.talpaPresa = function (numeroTalpa) {
        document.getElementById(`talpa${numeroTalpa}`).className += " talpaColpita";
        aggiornaPunteggio();
    }
    let aggiornaPunteggio = function () {
        punti++;
        document.getElementById("box-3-punti").innerHTML = `<strong>Punti ottenuti: </strong>${punti}`;
    }

    let tempoDiGiocoEsaurito = function () {
        document.getElementById("row-3").innerHTML = `<div class="alert alert-success" id="vittoria-sconfitta">` +
            `<strong>Tempo terminato! Hai ottenuto ${punti} punti!</strong>` +
            '</div>';
        colpisciLaTalpa.terminaPartita();
        for (let i = 0; i < numeroTalpe; i++) {
            document.getElementById(`talpa${i + 1}`).onclick = null;
        }
        creaTastoRigioca();
    }

    this.terminaPartita = function () {
        clearInterval(timeIdTempoRimanente);
        clearInterval(timeIdTalpa1);
        clearInterval(timeIdTalpa2);
        clearInterval(timeIdTalpa3);
    }

    this.difficoltaPartitaPrecedente = function () {
        return difficolta;
    }


}


function crea() {
    document.getElementById("areaCentralePagina").innerHTML = '<div id="titoloGiocoSchermataIniziale" class="container text-center my-5 titolo">' +
        '1 2 2 COLPISCI LA TALPA 2 2 9' +
        '</div>';
    creaScheletro();
}

function creaScheletro() {
    document.getElementById("areaCentralePagina").innerHTML +=
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
        '<div id="box-3-tempoRimanente">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="row" id="row-3">' +
        '</div>' +
        '</div>';
}


function gioca() {
    var strEasy = "facile";
    var strNormal = "normale";
    var strHard = "difficile";

    // document.getElementsByTagName("div")[1].remove();
    document.getElementById("titoloGiocoSchermataIniziale").remove();

    document.getElementById("bottone-gioca").style.display = 'none';
    document.getElementById("bottone-gioca").style.visibility = "hidden";

    var str = '<div class="container alert alert-secondary" id="menù-container"><div class="row menu-scelta"><h2>Seleziona la modalità di gioco.</h2>' +
        '<div class="row menu-scelta"><button class="btn" id="bottone-facile" onclick="start(\'' + strEasy + '\')">FACILE</button>' +
        '<button class="btn" id="bottone-normale" onclick="start(\'' + strNormal + '\')">NORMALE</button>' +
        '<button class="btn" id="bottone-difficile" onclick="start(\'' + strHard + '\')">DIFFICILE</button></div>' +
        '</div>';
    document.getElementById("box-2").innerHTML += str;
}


function start(difficoltaScelta) {
    colpisciLaTalpa.imposta(difficoltaScelta);
    colpisciLaTalpa.creaStruttura();

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

function creaTastoRigioca() {
    document.getElementById("box-1").innerHTML += '<div class="bottone-menù" onclick="rigioca()">' +
        '<button id="bottone-rigioca">RIGIOCA</button>' +
        '</div>';
}

function rigioca() {
    document.getElementById("container").remove();
    creaScheletro();
    start(colpisciLaTalpa.difficoltaPartitaPrecedente());
}
