
const FRECCIA_SINISTRA = 37;
const FRECCIA_ALTO = 38;
const FRECCIA_DESTRA = 39;
const FRECCIA_BASSO = 40;

function Gioco2048() {
    let matrice = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    let matriceTempCelleSommate = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    let puntiOttenuti;
    let dimensioneMatrice = 4;
    let spostamentoValido = false;

    this.creaTabella = function () {
        matrice = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        let strTab = "<table id='tabellaGioco'>";
        var cont = 0;
        for (let r = 0; r < dimensioneMatrice; r++) {
            strTab += "<tr>";
            for (let c = 0; c < dimensioneMatrice; c++) {
                strTab += `<td id="${cont}"></td>`;
                cont++;
            }
            strTab += "</tr>";
        }
        strTab += "</table>";
        document.getElementById("divgioco").innerHTML = strTab;
        this.mostraMatrice();
        this.generaNumero();
        this.generaNumero();
    }

    this.mostraMatrice = function () {
        let celleTabella = document.getElementById("tabellaGioco").getElementsByTagName("td");
        var cont = 0;
        for (let r = 0; r < dimensioneMatrice; r++) {
            for (let c = 0; c < dimensioneMatrice; c++) {
                celleTabella[cont].className = `cellaNumeri${matrice[r][c]}`;
                if (matrice[r][c] == 0) {
                    celleTabella[cont].innerHTML = "";
                } else {
                    celleTabella[cont].innerHTML = matrice[r][c];
                }
                cont++;
            }
        }
    }

    this.generaNumero = function () {
        let rCasuale, cCasuale;
        let numeroGenerato = 2;
        if (matricePiena() == false) {
            do {
                rCasuale = Math.floor(Math.random() * (dimensioneMatrice - 0) + 0);
                cCasuale = Math.floor(Math.random() * (dimensioneMatrice - 0) + 0);
            } while (matrice[rCasuale][cCasuale] != 0);
            matrice[rCasuale][cCasuale] = numeroGenerato;
            this.mostraMatrice();
        }
    }

    let matricePiena = function () {
        for (let r = 0; r < dimensioneMatrice; r++) {
            for (let c = 0; c < dimensioneMatrice; c++) {
                if (matrice[r][c] == 0) {
                    return false;
                }
            }
        }
        return true;
    }


    this.direzioneNord = function () {
        matriceTempCelleSommate = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        spostamentoValido = false;
        for (let r = 0 + 1; r < dimensioneMatrice; r++) {
            for (let c = 0; c < dimensioneMatrice; c++) {
                if (matrice[r][c] != 0) {
                    spostaANord(r, c);
                }
            }
        }
        this.mostraMatrice();
    }
    let spostaANord = function (r, c) {
        if (r > 0) {
            if (matrice[r - 1][c] == 0) {
                matrice[r - 1][c] = matrice[r][c];
                matrice[r][c] = 0;
                spostaANord(r - 1, c);
                spostamentoValido = true;
            }
            else if (matrice[r - 1][c] == matrice[r][c] && matriceTempCelleSommate[r - 1][c] != 1) {
                matrice[r - 1][c] = matrice[r - 1][c] * 2;
                matrice[r][c] = 0;
                spostamentoValido = true;
                matriceTempCelleSommate[r - 1][c] = 1;      // segna che nella mossa corrente quel numero è gia stato sommato
            }
        }
    }

    this.direzioneSud = function () {
        matriceTempCelleSommate = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        spostamentoValido = false;
        for (let r = dimensioneMatrice - 2; r >= 0; r--) {
            for (let c = 0; c < dimensioneMatrice; c++) {
                if (matrice[r][c] != 0) {
                    spostaASud(r, c);
                }
            }
        }
        this.mostraMatrice();
    }
    let spostaASud = function (r, c) {
        if (r < dimensioneMatrice - 1) {
            if (matrice[r + 1][c] == 0) {
                matrice[r + 1][c] = matrice[r][c];
                matrice[r][c] = 0;
                spostaASud(r + 1, c);
                spostamentoValido = true;
            }
            else if (matrice[r + 1][c] == matrice[r][c] && matriceTempCelleSommate[r + 1][c] != 1) {
                matrice[r + 1][c] = matrice[r + 1][c] * 2;
                matrice[r][c] = 0;
                spostamentoValido = true;
                matriceTempCelleSommate[r + 1][c] = 1;
            }
        }
    }

    this.direzioneOvest = function () {
        matriceTempCelleSommate = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        spostamentoValido = false;
        for (let r = 0; r < dimensioneMatrice; r++) {
            for (let c = 0 + 1; c < dimensioneMatrice; c++) {
                if (matrice[r][c] != 0) {
                    spostaAOvest(r, c);
                }
            }
        }
        this.mostraMatrice();
    }
    let spostaAOvest = function (r, c) {
        if (c > 0) {
            if (matrice[r][c - 1] == 0) {
                matrice[r][c - 1] = matrice[r][c];
                matrice[r][c] = 0;
                spostaAOvest(r, c - 1);
                spostamentoValido = true;
            }
            else if (matrice[r][c - 1] == matrice[r][c] && matriceTempCelleSommate[r][c - 1] != 1) {
                matrice[r][c - 1] = matrice[r][c - 1] * 2;
                matrice[r][c] = 0;
                spostamentoValido = true;
                matriceTempCelleSommate[r][c - 1] = 1;
            }
        }
    }

    this.direzioneEst = function () {
        matriceTempCelleSommate = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        spostamentoValido = false;
        for (let r = 0; r < dimensioneMatrice; r++) {
            for (let c = dimensioneMatrice - 2; c >= 0; c--) {
                if (matrice[r][c] != 0) {
                    spostaAEst(r, c);
                }
            }
        }
        this.mostraMatrice();
    }
    let spostaAEst = function (r, c) {
        if (c < dimensioneMatrice - 1) {
            if (matrice[r][c + 1] == 0) {
                matrice[r][c + 1] = matrice[r][c];
                matrice[r][c] = 0;
                spostaAEst(r, c + 1);
                spostamentoValido = true;
            }
            else if (matrice[r][c + 1] == matrice[r][c] && matriceTempCelleSommate[r][c + 1] != 1) {
                matrice[r][c + 1] = matrice[r][c + 1] * 2;
                matrice[r][c] = 0;
                spostamentoValido = true;
                matriceTempCelleSommate[r][c + 1] = 1;
            }
        }
    }


    this.controllaValiditaMossa = function () {
        if (spostamentoValido) return true;
        else return false;
    }

    this.controllaPossibileVincita = function () {
        for (let r = 0; r < dimensioneMatrice; r++) {
            for (let c = 0; c < dimensioneMatrice; c++) {
                if (matrice[r][c] == 2048) {
                    giocoInCorso = false;
                    console.log("HAI VINTO");
                }
            }
        }
    }



    this.controllaSePossibiliMosse = function () {
        if (matricePiena() == false) {
            if (controllaSePossibiliSomme() == true)
                return true;
            return false;
        }
        return false;
    }
    let controllaSePossibiliSomme = function () {
        for (let r = 0; r < dimensioneMatrice; r++) {
            for (let c = 0; c < dimensioneMatrice; c++) {
                if (r + 1 < dimensioneMatrice) {
                    if (matrice[r][c] == matrice[r + 1][c]) {
                        return true;
                    }
                }
                if (c + 1 < dimensioneMatrice) {
                    if (matrice[r][c] == matrice[r][c + 1]) {
                        return true;
                    }
                }
                return false;
            }
        }
    }





}


// document.onkeydown = checkKey;
// function checkKey(e) {
document.onkeydown = function checkKey() {
    let tasto = window.event.keyCode;

    if (tasto == FRECCIA_ALTO) {
        // console.log("FRECCIA_ALTO");
        gioco2048.direzioneNord();
        if (gioco2048.controllaValiditaMossa()) {
            gioco2048.generaNumero();
        }
    }
    else if (tasto == FRECCIA_BASSO) {
        // console.log("FRECCIA_BASSO");
        gioco2048.direzioneSud();
        if (gioco2048.controllaValiditaMossa()) {
            gioco2048.generaNumero();
        }
    }
    else if (tasto == FRECCIA_SINISTRA) {
        // console.log("FRECCIA_SINISTRA");
        gioco2048.direzioneOvest();
        if (gioco2048.controllaValiditaMossa()) {
            gioco2048.generaNumero();
        }
    }
    else if (tasto == FRECCIA_DESTRA) {
        // console.log("FRECCIA_DESTRA");
        gioco2048.direzioneEst();
        if (gioco2048.controllaValiditaMossa()) {
            gioco2048.generaNumero();
        }
    }

}


function crea() {
    document.getElementsByTagName("body")[0].innerHTML += '<div class="container text-center my-5 titolo">' +
        '1 2 2 <span class="titoloNumeri">2048</span> 2 2 9' +
        '</div>';
    creaScheletro();

}

function creaScheletro() {
    document.getElementsByTagName("body")[0].innerHTML +=
        '<div class="container-fluid" id="container">' +
        '<div class="row" id="row-2">' +
        '<div class="col-md-3" id="box-1">' +
        '</div>' +
        // '<div class="col-md-6" id="box-2">' +
        '<div class="col-md-6" id="box-2"><div id="divgioco"></div>' +
        '<button id="bottone-gioca" onclick="gioca()">GIOCA</button>' +
        '</div>' +
        '<div class="col-3 alert alert-secondary" id="box-3">' +
        '<div id="box-3-tempoTrascorso">' +
        '</div>' +
        // '<div id="box-3-numeroMine">' +
        // '</div>' +
        '</div>' +
        '</div>' +
        '<div class="row" id="row-3">' +
        '</div>';
}

function gioca() {
    document.getElementsByTagName("div")[1].remove();
    start();
}

function start() {
    document.getElementById("bottone-gioca").style.display = 'none';
    document.getElementById("bottone-gioca").style.visibility = "hidden";

    // document.getElementById("box-3").style.visibility = "visible";
    // document.getElementById("box-3-tempoTrascorso").innerHTML = `<strong>Tempo trascorso: </strong>0 secondi`;

    gioco2048.creaTabella();
    document.getElementById("box-1").innerHTML = '<div class="bottone-menù" onclick="tornaAlMenu()">' +
        '<button id="bottone-tornaAlMenù">TORNA AL MENU</button>' +
        '</div>';
}

function tornaAlMenu() {
    document.getElementById("container").remove();
    // forza4.azzeraTimeId();
    crea();
}
