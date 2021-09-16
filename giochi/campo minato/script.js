const BOMBA = 9;

var matriceFacile = [
    [0, 0, 0, 0, 0, 0, 0, 0, ],
    [0, 0, 0, 0, 0, 0, 0, 0, ],
    [0, 0, 0, 0, 0, 0, 0, 0, ],
    [0, 0, 0, 0, 0, 0, 0, 0, ],
    [0, 0, 0, 0, 0, 0, 0, 0, ],
    [0, 0, 0, 0, 0, 0, 0, 0, ],
    [0, 0, 0, 0, 0, 0, 0, 0, ],
    [0, 0, 0, 0, 0, 0, 0, 0, ]
];
var matriceNormale = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
var matriceDifficile = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

var campoMinato = new Object();
campoMinato.rigioca = false;
campoMinato.creaTabella = function(righe, colonne, classe) {
    campoMinato.contMosse = 0;
    campoMinato.bombaScoperta = false;
    campoMinato.righe = righe;
    campoMinato.colonne = colonne;
    campoMinato.contCaselle = campoMinato.righe * campoMinato.colonne;
    campoMinato.modalita = classe; //str 
    campoMinato.rigioca = false;
    campoMinato.partitaTerminata = false;
    campoMinato.bandieraAttiva = false;
    var cont = 0;
    if (campoMinato.righe == 8)
        campoMinato.matrice = matriceFacile;
    else if (campoMinato.righe == 10)
        campoMinato.matrice = matriceNormale;
    else
        campoMinato.matrice = matriceDifficile;

    campoMinato.azzeraMatrice();

    if (campoMinato.righe == 8)
        campoMinato.appoggio = matriceFacile;
    else if (campoMinato.righe == 10)
        campoMinato.appoggio = matriceNormale;
    else
        campoMinato.appoggio = matriceDifficile;

    var str = '<table align="center">';
    for (var r = 0; r < campoMinato.righe; r++) {
        str += '<tr>';
        for (var c = 0; c < campoMinato.colonne; c++) {
            str += '<td class="' + campoMinato.modalita + ' coperto" onclick="campoMinato.scopri(this.id)" id =' + cont + '></td>';
            cont++;
        }
        str += '</tr>';
    }
    str += '</table>';
    document.getElementById('box-2').innerHTML += str;
}

campoMinato.azzeraMatrice = function() {
    for (var r = 0; r < campoMinato.righe; r++)
        for (var c = 0; c < campoMinato.colonne; c++)
            campoMinato.matrice[r][c] = 0;
}

campoMinato.posizionaMine = function(mine) {
    campoMinato.numeroMine = mine;
    for (var i = 0; i < campoMinato.numeroMine; i++) {
        do {
            var r = Math.floor(Math.random() * campoMinato.righe);
            var c = Math.floor(Math.random() * campoMinato.colonne);
        } while (campoMinato.matrice[r][c] == BOMBA);
        campoMinato.matrice[r][c] = BOMBA; //9 è il numero che indica la mina
    }
}

campoMinato.stampaNumeri = function() {
    for (var r = 0; r < campoMinato.righe; r++)
        for (var c = 0; c < campoMinato.colonne; c++)
            document.getElementsByTagName('td')[r * campoMinato.righe + c].innerHTML += campoMinato.matrice[r][c];
}


campoMinato.riempiMatrice = function() {
    for (var r = 0; r < campoMinato.righe; r++) {
        for (var c = 0; c < campoMinato.colonne; c++) {
            if (campoMinato.matrice[r][c] >= BOMBA) { //mina rilevata

                if (r == 0 && c == 0) {
                    campoMinato.matrice[r][c + 1]++;
                    campoMinato.matrice[r + 1][c + 1]++;
                    campoMinato.matrice[r + 1][c]++;
                } else if (r == 0 && c == campoMinato.righe - 1) {
                    campoMinato.matrice[r][c - 1]++;
                    campoMinato.matrice[r + 1][c - 1]++;
                    campoMinato.matrice[r + 1][c]++;
                } else if (r == campoMinato.righe - 1 && c == 0) {
                    campoMinato.matrice[r - 1][c]++;
                    campoMinato.matrice[r - 1][c + 1]++;
                    campoMinato.matrice[r][c + 1]++;
                } else if (r == campoMinato.righe - 1 && c == campoMinato.righe - 1) {
                    campoMinato.matrice[r][c - 1]++;
                    campoMinato.matrice[r - 1][c - 1]++;
                    campoMinato.matrice[r - 1][c]++;
                } else {
                    if (c != 0) {
                        if (r != 0)
                            campoMinato.matrice[r - 1][c - 1]++;
                        if (r != campoMinato.righe - 1)
                            campoMinato.matrice[r + 1][c - 1]++;
                        campoMinato.matrice[r][c - 1]++;
                    }
                    if (c != campoMinato.righe - 1) {
                        if (r != 0)
                            campoMinato.matrice[r - 1][c + 1]++;
                        if (r != campoMinato.righe - 1)
                            campoMinato.matrice[r + 1][c + 1]++;
                        campoMinato.matrice[r][c + 1]++;
                    }
                    if (r != 0) {
                        if (c != 0)
                            campoMinato.matrice[r - 1][c - 1]++;
                        if (c != campoMinato.righe - 1)
                            campoMinato.matrice[r - 1][c + 1]++;
                        campoMinato.matrice[r - 1][c]++;
                    }
                    if (r != campoMinato.righe - 1) {
                        if (c != 0)
                            campoMinato.matrice[r + 1][c - 1]++;
                        if (c != campoMinato.righe - 1)
                            campoMinato.matrice[r + 1][c + 1]++;
                        campoMinato.matrice[r + 1][c]++;
                    }
                    if (r > 0 && r < campoMinato.righe - 1 && c > 0 && c < campoMinato.righe - 1) {
                        campoMinato.matrice[r - 1][c - 1]--;
                        campoMinato.matrice[r - 1][c + 1]--;
                        campoMinato.matrice[r + 1][c + 1]--;
                        campoMinato.matrice[r + 1][c - 1]--;
                    }
                    if (r == 0) {
                        campoMinato.matrice[r + 1][c - 1]--;
                        campoMinato.matrice[r + 1][c + 1]--;
                    } else
                    if (r == campoMinato.righe - 1) {
                        campoMinato.matrice[r - 1][c - 1]--;
                        campoMinato.matrice[r - 1][c + 1]--;
                    }
                    if (c == 0) {
                        campoMinato.matrice[r - 1][c + 1]--;
                        campoMinato.matrice[r + 1][c + 1]--;
                    } else
                    if (c == campoMinato.righe - 1) {
                        campoMinato.matrice[r - 1][c - 1]--;
                        campoMinato.matrice[r + 1][c - 1]--;
                    }
                }
            }
        }
    }
}

campoMinato.stampaMine = function() {
    for (var r = 0; r < campoMinato.righe; r++) {
        for (var c = 0; c < campoMinato.colonne; c++) {
            if (campoMinato.matrice[r][c] >= BOMBA)
                campoMinato.matrice[r][c] = '*';
        }
    }
}

campoMinato.isBombaTrovata = function() {
    if (campoMinato.bombaScoperta)
        sconfitta();
}

campoMinato.scopri = function(idCasella)  {
    var maxR = campoMinato.righe - 1;
    var pos = parseInt(idCasella);
    var r = parseInt(pos / campoMinato.righe);
    var c = pos % campoMinato.righe;

    if (campoMinato.bandieraAttiva) {
        if (campoMinato.appoggio[r][c] == 0) {
            document.getElementsByTagName('td')[idCasella].innerHTML = '<img class="mina" src="immagini/bandiera.png">';
            campoMinato.appoggio[r][c] = 1;
        } else {
            document.getElementsByTagName('td')[idCasella].innerHTML = ' ';
            campoMinato.appoggio[r][c] = 0;
        }
    } else {
        campoMinato.scopriCasella(pos, r, c);

        if (campoMinato.matrice[r][c] == 0) {
            campoMinato.matrice[r][c] = 20;
            if (c != 0 && r != 0)
                campoMinato.scopri(pos - campoMinato.righe - 1);
            if (r != 0)
                campoMinato.scopri(pos - campoMinato.righe);
            if (r != 0 && c != maxR)
                campoMinato.scopri(pos - campoMinato.righe + 1);
            if (c != maxR)
                campoMinato.scopri(pos + 1);
            if (c != maxR && r != maxR)
                campoMinato.scopri(pos + campoMinato.righe + 1);
            if (r != maxR)
                campoMinato.scopri(pos + campoMinato.righe);
            if (r != maxR && c != 0)
                campoMinato.scopri(pos + campoMinato.righe - 1);
            if (c != 0)
                campoMinato.scopri(pos - 1);
        }
        campoMinato.isBombaTrovata();
        if (campoMinato.contCaselle == campoMinato.numeroMine && campoMinato.partitaTerminata == false) {
            vittoria();
            campoMinato.partitaTerminata = true;
        }
    }
}

campoMinato.scopriCasella = function(idCasella, r, c) {
    if (campoMinato.matrice[r][c] < 20 || campoMinato.matrice[r][c] == '*') {
        document.getElementById(idCasella).className = `${campoMinato.modalita} scoperto`;
        document.getElementById(idCasella).removeAttribute("onclick");

        if (campoMinato.matrice[r][c] != 0 && campoMinato.matrice[r][c] != '*')
            document.getElementsByTagName('td')[idCasella].innerHTML = campoMinato.matrice[r][c]; //scrivo il numero

        if (campoMinato.matrice[r][c] == '*') {
            if (campoMinato.contMosse != 0)
                campoMinato.bombaScoperta = true;
            campoMinato.contCaselle++; //se è la prima volta

            document.getElementsByTagName('td')[idCasella].innerHTML += '<img class="mina" src="immagini/bomba.png">';
        }

        campoMinato.contMosse++;
        campoMinato.contCaselle--;

        if (campoMinato.matrice[r][c] != 0)
            campoMinato.matrice[r][c] = 30;
        document.getElementById("box-3-caselleRimanenti").innerHTML = "<strong>Caselle rimanenti:</strong> " + (campoMinato.contCaselle - campoMinato.numeroMine);
    }
}


campoMinato.settings = function() {
    document.getElementById("box-3").style.visibility = "visible";
    document.getElementById("box-3-modalità").innerHTML = "<strong>Modalità:</strong> " + campoMinato.modalita;
    document.getElementById("box-3-numeroMine").innerHTML = "<strong>Numero mine:</strong> " + campoMinato.numeroMine;
    document.getElementById("box-3-caselleRimanenti").innerHTML = "<strong>Caselle rimanenti:</strong> " + (campoMinato.contCaselle - campoMinato.numeroMine);
    document.getElementById("box-3-sceltaBandiere").innerHTML = '<img class="bandiera" src="immagini/bandiera.png">';
}

campoMinato.attivaBandiere = function() {
    if (campoMinato.bandieraAttiva) {
        campoMinato.bandieraAttiva = false;
        document.getElementById("box-3-onOff").innerHTML = "OFF";
    } else {
        campoMinato.bandieraAttiva = true;
        document.getElementById("box-3-onOff").innerHTML = "ON";
    }
}

function gioca() {
    var strEasy = "facile";
    var strNormal = "normale";
    var strHard = "difficile";

    document.getElementsByTagName("div")[1].remove();

    document.getElementById("bottone-gioca").style.display = 'none';
    document.getElementById("bottone-gioca").style.visibility = "hidden";

    var str = '<div class="container alert alert-secondary" id="menù-container"><div class="row menu-scelta"><h2>Seleziona la modalità di gioco.</h2>' +
        '<div class="row menu-scelta"><button class="btn" id="bottone-facile" onclick="start(8,8,10,\'' + strEasy + '\')">FACILE</button>' +
        '<button class="btn" id="bottone-normale" onclick="start(10,10,15,\'' + strNormal + '\')">NORMALE</button>' +
        '<button class="btn" id="bottone-difficile" onclick="start(15,15,30,\'' + strHard + '\')">DIFFICILE</button></div>' +
        '</div>';
    document.getElementById("box-2").innerHTML += str;


}

function start(r, c, m, tdClass) {
    if (!campoMinato.rigioca) {
        document.getElementById("bottone-facile").style.display = 'none';
        document.getElementById("bottone-facile").style.visibility = "hidden";
        document.getElementById("bottone-normale").style.display = 'none';
        document.getElementById("bottone-normale").style.visibility = "hidden";
        document.getElementById("bottone-difficile").style.display = 'none';
        document.getElementById("bottone-difficile").style.visibility = "hidden";
        document.getElementById("menù-container").style.display = 'none';
        document.getElementById("menù-container").style.visibility = "hidden";
    }
    campoMinato.creaTabella(r, c, tdClass); //modalità base a 12 mine 10x10
    campoMinato.posizionaMine(m);
    campoMinato.riempiMatrice();
    campoMinato.stampaMine();
    campoMinato.settings();
    document.getElementById("box-1").innerHTML = '<div class="bottone-menù" onclick="tornaAlMenu()">' +
        '<button id="bottone-tornaAlMenù">TORNA AL MENU</button>' +
        '</div>';
}

function sconfitta() {
    document.getElementById("row-3").innerHTML = '<div class="alert alert-danger" id="vittoria-sconfitta">' +
        '<strong>Hai perso...</strong>' +
        '</div>';
    togliOnClick();
    creaTastoRigioca();
}

function vittoria() {
    document.getElementById("row-3").innerHTML = '<div class="alert alert-success" id="vittoria-sconfitta">' +
        '<strong>Hai vinto!</strong>' +
        '</div>';
    togliOnClick();
    creaTastoRigioca();
}

function togliOnClick() {
    var cont = 0;
    for (var i = 0; i < campoMinato.righe; i++)
        for (var k = 0; k < campoMinato.colonne; k++) {
            document.getElementById(cont).removeAttribute("onclick");
            cont++;
        }
}

function creaTastoRigioca() {
    document.getElementById("box-1").innerHTML += '<div class="bottone-menù" onclick="rigioca()">' +
        '<button id="bottone-rigioca">RIGIOCA</button>' +
        '</div>';
}

function tornaAlMenu() {
    document.getElementById("container").remove();
    crea();
}

function rigioca() {
    campoMinato.rigioca = true;
    document.getElementById("container").remove();
    creaScheletro();
    document.getElementById("bottone-gioca").style.display = 'none';
    document.getElementById("bottone-gioca").style.visibility = "hidden";
    if (campoMinato.righe == 8)
        start(8, 8, 10, "facile");
    else if (campoMinato.righe == 10)
        start(10, 10, 15, "normale");
    else start(15, 15, 30, "difficile");
}

function crea() {
    document.getElementsByTagName("body")[0].innerHTML += '<div class="container text-center my-5 titolo">' +
        '1 2 2 CAMPO 2 MINATO 2 2 9' +
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
        '</div>' +
        '<div class="col-3 alert alert-secondary" id="box-3">' +
        '<div id="box-3-modalità">' +
        '</div>' +
        '<div id="box-3-numeroMine">' +
        '</div>' +
        '<div id="box-3-caselleRimanenti">' +
        '</div>' +
        '<div id="containerBandiere">' +
        '<div id="box-3-sceltaBandiere">' +
        '</div>' +
        '<div id="box-3-onOff" onclick="campoMinato.attivaBandiere()">OFF' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="row" id="row-3">' +
        '</div>';
}