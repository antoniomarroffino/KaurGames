
function Forza4() {
    let matrice = [             // 0 cella vuota, 1 giocatore1, 2 giocatore2
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ];
    let numeroRighe = 6;
    let numeroColonne = 7;
    let utenteCorrente = 1;
    let partitaInCorso = true;
    let timeId;
    let secondiTrascorsi = 0;

    this.creaTabellaGioco = function () {
        matrice = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]
        ];
        utenteCorrente = 1;
        secondiTrascorsi = 0;
        let strTab = "<table>";
        let numCella = 0;
        for (let r = 0; r < numeroRighe; r++) {
            strTab += "<tr>";
            for (let c = 0; c < numeroColonne; c++) {
                strTab += `<td id="cella_${numCella}"><div class="cellaPedina"></div></td>`;
                numCella++;
            }
            strTab += "</tr>";
        }
        strTab += "</table>";
        document.getElementById("contenitoreGioco").innerHTML += `<div id="divGioco">${strTab}</div>`;
        assegnaOnclickCelle();
        stringaGiocatoreCorrente();
        partitaInCorso = true;
        clearInterval(timeId);
        timeId = setInterval(mostraTempoTrascorso, 1000);
        this.mostraCelle();
    }

    let mostraTempoTrascorso = function () {
        document.getElementById("box-3-tempoTrascorso").innerHTML = `<strong>Tempo trascorso: </strong>${secondiTrascorsi} secondi`;
        secondiTrascorsi++;
    }

    let stringaGiocatoreCorrente = function () {
        // let colore;
        let coloreAvviso;
        if (utenteCorrente == 1) {
            // colore = "red";
            coloreAvviso = "alert-danger";
        }
        else {
            // colore = "yellow";
            coloreAvviso = "alert-warning";
        }
        document.getElementById("row-3").innerHTML = `<div class="alert ${coloreAvviso}" id="vittoria-sconfitta">` +
            `<strong>Turno del giocatore ${utenteCorrente}</strong>` +
            '</div>';
    }

    let controllaCellaCliccata = function (cellaCliccata) {
        let str = cellaCliccata.id;
        str = str.substring('cella_'.length);      // rimuove "cella_" e tiene solo il numero della cella
        let numeroCellaCliccata = parseInt(str);
        let rigaCellaCliccata = parseInt(numeroCellaCliccata / numeroColonne);
        let colonnaCellaCliccata = numeroCellaCliccata % numeroColonne;

        if (partitaInCorso) {
            if (cellaVuota(rigaCellaCliccata, colonnaCellaCliccata)) {
                posizionaNellaRigaPiuBassaLibera(colonnaCellaCliccata);
                // mostraCella(numeroCellaCliccata, rigaCellaCliccata, colonnaCellaCliccata);
                forza4.mostraCelle();
                controllaPossibiliVincite();

                if (partitaInCorso) {
                    if (presentiCaselleLibere() == true) {
                        utenteSuccessivo();
                    }
                    else {
                        document.getElementById("row-3").innerHTML = `<div class="alert alert-secondary" id="vittoria-sconfitta">` +
                            `<strong>Pareggio!</strong>` +
                            '</div>';
                        partitaInCorso = false;
                    }

                }
                if (partitaInCorso == false) {
                    clearInterval(timeId);
                    creaTastoRigioca();
                }
            }
        }

    }

    let cellaVuota = function (rigaCellaCliccata, colonnaCellaCliccata) {
        if (matrice[rigaCellaCliccata][colonnaCellaCliccata] == 0)
            return true;
        return false;
    }

    let posizionaNellaRigaPiuBassaLibera = function (colonnaCellaCliccata) {        // posiziona la pedina nella cella più bassa libera
        let cellaOccupata = true;
        let r = numeroRighe - 1;
        do {
            if (matrice[r][colonnaCellaCliccata] == 0) {
                cellaOccupata = false;
                matrice[r][colonnaCellaCliccata] = utenteCorrente;
            }
            else r -= 1;
            // if (r < 0) cellaOccupata = false;
        } while (cellaOccupata == true);
    }


    let utenteSuccessivo = function () {    // cambia l'utente che deve effettuare la giocata
        if (utenteCorrente == 1) utenteCorrente = 2;
        else utenteCorrente = 1;
        stringaGiocatoreCorrente();
    }

    let assegnaOnclickCelle = function () {
        let arrayCelle = document.getElementsByTagName("td");
        for (let numCella = 0; numCella < arrayCelle.length; numCella++) {
            arrayCelle[numCella].onclick = function () {
                controllaCellaCliccata(this);
            }
        }
    }

    this.mostraCelle = function () {
        let posCorrenteTabella = 0;
        for (let r = 0; r < numeroRighe; r++) {
            for (let c = 0; c < numeroColonne; c++) {
                mostraCella(posCorrenteTabella, r, c);
                posCorrenteTabella++;
            }
        }
    }

    let mostraCella = function (posCorrenteTabella, riga, colonna) {
        let cella = document.getElementsByTagName("td")[posCorrenteTabella];
        if (matrice[riga][colonna] == 1) {
            cella.getElementsByClassName("cellaPedina")[0].style = "background-color: red;";
            cella.style = "background-color: blue;";
        }
        else if (matrice[riga][colonna] == 2) {
            cella.getElementsByClassName("cellaPedina")[0].style = "background-color: yellow;";
            cella.style = "background-color: blue;";
        }
        else {
            cella.getElementsByClassName("cellaPedina")[0].style = "background-color: gray;";
        }
    }

    let controllaPossibiliVincite = function () {
        for (let r = 0; r < numeroRighe; r++) {
            for (let c = 0; c < numeroColonne; c++) {
                if (matrice[r][c] == utenteCorrente) {      // scorre tutta la matrice e controlla le celle del colore dell'utente che ha appena giocato
                    controllaPedineVicine(r, c);
                }
            }
        }
    }

    let contatoreSerieUguali = 0;

    let controllaPedineVicine = function (r, c) {
        contatoreSerieUguali = 1;
        controlloDirezione1(r, c);
        contatoreSerieUguali = 1;
        controlloDirezione2(r, c);
        contatoreSerieUguali = 1;
        controlloDirezione3(r, c);
        contatoreSerieUguali = 1;
        controlloDirezione4(r, c);
    }

    let controlloDirezione1 = function (r, c) {
        if (c < numeroColonne - 1) {
            c += 1;
            if (confrontaPedine(r, c) == true) {
                controlloDirezione1(r, c);
            }
        }
    }

    let controlloDirezione2 = function (r, c) {
        if (r < numeroRighe - 1 && c < numeroColonne - 1) {
            r += 1;
            c += 1;
            if (confrontaPedine(r, c) == true) {
                controlloDirezione2(r, c);
            }
        }
    }

    let controlloDirezione3 = function (r, c) {
        if (r < numeroRighe - 1) {
            r += 1;
            if (confrontaPedine(r, c) == true) {
                controlloDirezione3(r, c);
            }
        }
    }

    let controlloDirezione4 = function (r, c) {
        if (r < numeroRighe - 1 && c > 0) {
            r += 1;
            c -= 1;
            if (confrontaPedine(r, c) == true) {
                controlloDirezione4(r, c);
            }
        }
    }



    let confrontaPedine = function (r, c) {
        if (matrice[r][c] == utenteCorrente) {
            contatoreSerieUguali += 1;
            if (contatoreSerieUguali == 4) {
                let colore;
                if (utenteCorrente == 1) {
                    colore = "rosso";
                }
                else {
                    colore = "giallo";
                }
                document.getElementById("row-3").innerHTML = `<div class="alert alert-success" id="vittoria-sconfitta">` +
                    `<strong>Ha vinto il giocatore ${utenteCorrente}! (${colore})</strong>` +
                    '</div>';
                document.getElementById("vittoria-sconfitta").style.fontSize = "3.0em";

                partitaInCorso = false;
                // creaTastoRigioca();
            }
            return true;
        }
        else {
            contatoreSerieUguali = 0;
            return false;
        }
    }

    let presentiCaselleLibere = function () {
        for (let r = 0; r < numeroRighe; r++) {
            for (let c = 0; c < numeroColonne; c++) {
                if (matrice[r][c] == 0) return true;
            }
        }
        return false;
    }

    this.azzeraTimeId = function () {
        clearInterval(timeId);
    }





}

function crea() {
    document.getElementById("areaCentralePagina").innerHTML = '<div  id="titoloGiocoSchermataIniziale" class="container text-center my-5 titolo">' +
        '1 2 2 FORZA 2 QUATTRO 2 2 9' +
        '</div>';
    creaScheletro();

}

function creaScheletro() {
    // document.getElementById("areaCentralePagina").innerHTML +=
    //     '<div class="container-fluid" id="container">' +
    //     '<div class="row" id="row-2">' +
    //     '<div class="col-md-3" id="box-1">' +
    //     '</div>' +
    //     // '<div class="col-md-6" id="box-2">' +
    //     '<div class="col-md-6" id="box-2"><div id="contenitoreGioco"></div>' +
    //     '<button id="bottone-gioca" onclick="gioca()">GIOCA</button>' +
    //     '</div>' +
    //     '<div class="col-3 alert alert-secondary" id="box-3">' +
    //     '<div id="box-3-tempoTrascorso">' +
    //     '</div>' +
    //     '</div>' +
    //     '</div>' +
    //     '<div class="row" id="row-3">' +
    //     '</div>';
    document.getElementById("areaCentralePagina").innerHTML +=
        '<div class="container" id="container">' +


        '<div class="row text-center" id="row-3">' +
        '</div>' +


        '<div class="row justify-content-between" id="row-2">' +

        '<div class="col-lg-3 align-self-center order-1  d-flex justify-content-center flex-wrap" id="box-1">' +
        '</div>' +

        '<div class="col-lg-auto d-flex justify-content-center order-2" id="box-2">' +
        '<div id="contenitoreGioco"></div>' +
        '<button id="bottone-gioca" onclick="gioca()">GIOCA</button>' +
        '</div>' +

        '<div class="col-lg-3 align-self-center order-3" id="box-3">' +
        '<div id="box-3-tempoTrascorso">' +
        '</div>' +
        '</div>' +

        '</div>' +


        '</div>';
}

function gioca() {
    document.getElementById("titoloGiocoSchermataIniziale").remove();
    start();
}

function start() {
    document.getElementById("bottone-gioca").style.display = 'none';
    document.getElementById("bottone-gioca").style.visibility = "hidden";

    document.getElementById("box-3").style.visibility = "visible";
    document.getElementById("box-3-tempoTrascorso").innerHTML = `<strong>Tempo trascorso: </strong>0 secondi`;

    forza4.creaTabellaGioco();
    document.getElementById("box-1").innerHTML = '<div class="bottone-menù" onclick="tornaAlMenu()">' +
        '<button id="bottone-tornaAlMenù">TORNA AL MENU</button>' +
        '</div>';
}

function tornaAlMenu() {
    document.getElementById("container").remove();
    forza4.azzeraTimeId();
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
    start();
}
