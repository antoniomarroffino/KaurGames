const MELA = 5;
const TESTA = 2;
const CORPO = 1;
const FRECCIA_SINISTRA = 37;
const FRECCIA_ALTO = 38;
const FRECCIA_DESTRA = 39;
const FRECCIA_BASSO = 40;

var snake = new Object();
snake.creaTabella = function(classe) {
    snake.serpente = new Array;
    snake.appoggio = new Array;
    snake.timing = 1000;
    snake.inMovimento;
    snake.rigioca = false;
    snake.righe = 13;
    snake.colonne = 13;
    snake.modalita = classe;
    snake.melaMangiata = false;
    snake.matrice = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    var cont = 0;
    var str = '<table align="center">';
    for (var r = 0; r < snake.righe; r++) {
        str += '<tr>';
        for (var c = 0; c < snake.colonne; c++) {
            if ((r * snake.righe + c) % 2)
                str += '<td id =' + cont + ' class="campo1" ></td>';
            else
                str += '<td id =' + cont + ' class="campo2" ></td>';
            cont++;
        }
        str += '</tr>';
    }
    str += '</table>';
    document.getElementById('box-2').innerHTML += str;
}


snake.settings = function() {
    document.getElementById("box-3").style.visibility = "visible";
    document.getElementById("box-3-modalità").innerHTML = "<strong>Modalità:</strong> " + snake.modalita;
}

snake.posizionaMela = function() {
    var n = Math.floor(Math.random() * 2);
    if (n)
        var img = "immagini/mela1.png";
    else
        var img = "immagini/mela2.png";

    do {
        var r = Math.floor(Math.random() * snake.righe);
        var c = Math.floor(Math.random() * snake.colonne);
    } while (snake.matrice[r][c] != 0);

    snake.matrice[r][c] = MELA;
    document.getElementById(r * snake.righe + c).innerHTML += '<img class="mela" src=' + img + '>';
}

snake.posizionaTesta = function() {
    var r = Math.floor(Math.random() * snake.righe);
    var c = Math.floor(Math.random() * snake.colonne);
    snake.matrice[r][c] = TESTA;
    document.getElementById(r * snake.righe + c).innerHTML = snake.matrice[r][c];
    snake.serpente[0] = r;
    snake.serpente[1] = c;
    snake.lunghezza = 1;
}

snake.spostamento = function() {
    var tasto;
    tasto = window.event.keyCode;
    if (tasto == FRECCIA_SINISTRA) {
        clearInterval(snake.inMovimento);
        snake.movimento("sinistra");
    } else if (tasto == FRECCIA_ALTO) {
        clearInterval(snake.inMovimento);
        snake.movimento("alto");
    } else if (tasto == FRECCIA_DESTRA) {
        clearInterval(snake.inMovimento);
        snake.movimento("destra");
    } else if (tasto == FRECCIA_BASSO) {
        clearInterval(snake.inMovimento);
        snake.movimento("basso");
    }

}

snake.movimento = function(direzione) {
    if (direzione == "sinistra")
        snake.inMovimento = setInterval(snake.spostaSx, snake.timing);
    else if (direzione == "alto")
        snake.inMovimento = setInterval(snake.spostaA, snake.timing);
    else if (direzione == "destra")
        snake.inMovimento = setInterval(snake.spostaDx, snake.timing);
    else if (direzione == "basso")
        snake.inMovimento = setInterval(snake.spostaB, snake.timing);
}

snake.spostaSx = function() {
    if (snake.lunghezza == 1) {
        for (var i = 0; i < snake.righe; i++)
            for (var k = 0; k < snake.colonne; k++)
                if (snake.matrice[i][k] == 2) {
                    var r = i;
                    var c = k;
                }

        document.getElementById(r * snake.righe + c).innerHTML = " ";
        snake.matrice[r][c] = 0; //azzero la testa

        if (c != 0)
            c--;
        else
            c = snake.colonne - 1;

        document.getElementById(r * snake.righe + c).innerHTML = snake.matrice[r][c];
    } else {
        if (c != 0)
            c--;
        else
            c = snake.colonne - 1;

        if (snake.matrice[r][c] == MELA) {
            snake.posizionaMela();
            snake.lunghezza++;
            snake.serpente[snake.lunghezza * 2 - 2] = tempR;
            snake.serpente[snake.lunghezza * 2 - 1] = tempC;
        }
        var tC = c,
            tR = r;
        for (var i = 0; i < snake.lunghezza; i++) {
            for (var k = 0; k < 2; k++) {
                if (k) {
                    tC = snake.serpente[i * 2 + k];
                    snake.serpente[i * 2 + k] = c;
                    c = tC;
                } else {
                    tR = snake.serpente[i * 2 + k];
                    snake.serpente[i * 2 + k] = r;
                    r = tR
                }
            }
        }
        for (var i = 0; i < snake.lunghezza; i++) {
            for (var k = 0; k < 2; k++) {
                if (k)
                    c = snake.serpente[i * 2 + k];
                else
                    r = snake.serpente[i * 2 + k];
            }
            document.getElementById(r * snake.righe + c).innerHTML = snake.matrice[r][c];
        }
    }
}

snake.spostaA = function() {
    for (var i = 0; i < snake.righe; i++)
        for (var k = 0; k < snake.colonne; k++)
            if (snake.matrice[i][k] == 2) {
                var r = i;
                var c = k;
            }

    document.getElementById(r * snake.righe + c).innerHTML = " ";
    snake.matrice[r][c] = 0; //azzero la testa
    if (r != 0)
        r--;
    else
        r = snake.righe - 1;

    snake.matrice[r][c] = 2;
    document.getElementById(r * snake.righe + c).innerHTML = snake.matrice[r][c];
}

snake.spostaDx = function() {
    for (var i = 0; i < snake.righe; i++)
        for (var k = 0; k < snake.colonne; k++)
            if (snake.matrice[i][k] == 2) {
                var r = i;
                var c = k;
            }

    document.getElementById(r * snake.righe + c).innerHTML = " ";
    snake.matrice[r][c] = 0; //azzero la testa
    if (c != snake.colonne - 1)
        c++;
    else
        c = 0;

    snake.matrice[r][c] = 2;
    document.getElementById(r * snake.righe + c).innerHTML = snake.matrice[r][c];
}

snake.spostaB = function() {
    for (var i = 0; i < snake.righe; i++)
        for (var k = 0; k < snake.colonne; k++)
            if (snake.matrice[i][k] == 2) {
                var r = i;
                var c = k;
            }

    document.getElementById(r * snake.righe + c).innerHTML = " ";
    snake.matrice[r][c] = 0; //azzero la testa
    if (r != snake.righe - 1)
        r++;
    else
        r = 0;

    snake.matrice[r][c] = 2;
    document.getElementById(r * snake.righe + c).innerHTML = snake.matrice[r][c];
}
snake.trovaTesta = function() {
    for (var i = 0; i < snake.righe; i++)
        for (var k = 0; k < snake.colonne; k++)
            if (snake.matrice[i][k] == 2) {
                var r = i;
                var c = k;
            }
}

function gioca() {
    var strEasy = "facile";
    var strNormal = "normale";
    var strHard = "difficile";

    document.getElementsByTagName("div")[1].remove();

    document.getElementById("bottone-gioca").style.display = 'none';
    document.getElementById("bottone-gioca").style.visibility = "hidden";

    var str = '<div class="alert alert-secondary" id="menù-container">' +
        '<div class="row menù-scelta">' +
        '<h2>Seleziona la modalità di gioco.</h2>' +
        '<div class="row menù-scelta">' +
        '<button class="btn" id="bottone-facile" onclick="start(\'' + strEasy + '\')">FACILE</button>' +
        '<button class="btn" id="bottone-normale" onclick="start(\'' + strNormal + '\')">NORMALE</button>' +
        '<button class="btn" id="bottone-difficile" onclick="start(\'' + strHard + '\')">DIFFICILE</button>' +
        '</div>' +
        '</div>' +
        '</div>';
    document.getElementById("box-2").innerHTML += str;
}



function start(tdClass) {
    if (!snake.rigioca) {
        document.getElementById("bottone-facile").style.display = 'none';
        document.getElementById("bottone-facile").style.visibility = "hidden";
        document.getElementById("bottone-normale").style.display = 'none';
        document.getElementById("bottone-normale").style.visibility = "hidden";
        document.getElementById("bottone-difficile").style.display = 'none';
        document.getElementById("bottone-difficile").style.visibility = "hidden";
        document.getElementById("menù-container").style.display = 'none';
        document.getElementById("menù-container").style.visibility = "hidden";
    }
    snake.creaTabella(tdClass);
    snake.settings();
    snake.posizionaTesta();
    snake.posizionaMela();
    document.getElementsByTagName("body")[0].onkeydown = snake.spostamento;
    document.getElementById("box-1").innerHTML = '<div class="button bottone-menù" onclick="tornaAlMenu()">' +
        '<button id="bottone-tornaAlMenù">TORNA AL MENU</button>' +
        '</div>';
}

function sconfitta() {
    document.getElementById("row-3").innerHTML = '<div class="alert alert-danger" id="vittoria-sconfitta">' +
        '<strong>Hai perso contro la CPU...</strong>' +
        '</div>';
}

function vittoria() {
    if (tris.modalita != '1 VS 1')
        if (tris.vincitore == tris.giocatore1) {
            document.getElementById("row-3").innerHTML = '<div class="alert alert-success" id="vittoria-sconfitta">' +
                '<strong>Hai vinto contro la CPU!</strong>' +
                '</div>';
        } else
            sconfitta();
    else {
        if (tris.vincitore == tris.giocatore1) {
            document.getElementById("row-3").innerHTML = '<div class="alert alert-success" id="vittoria-sconfitta">' +
                '<strong>Ha vinto il giocatore 1!</strong>' +
                '</div>';
        } else {
            document.getElementById("row-3").innerHTML = '<div class="alert alert-success" id="vittoria-sconfitta">' +
                '<strong>Ha vinto il giocatore 2!</strong>' +
                '</div>';
        }
    }
    togliOnClick();
    creaTastoRigioca();
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
    var mod = tris.modalita;
    tris.rigioca = true;
    document.getElementById("container").remove();
    creaScheletro();
    document.getElementById("bottone-gioca").style.display = 'none';
    document.getElementById("bottone-gioca").style.visibility = "hidden";
    start(mod);
}

function crea() {
    document.getElementsByTagName("body")[0].innerHTML += '<div class="container text-center my-5 titolo">' +
        '1 2 2 2 2 2 SNAKE 2 2 2 2 2 9' +
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
        '<div id="box-3-scelta">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="row" id="row-3">' +
        '</div>' +
        '</div>';
}