const MELA = 5;
const TESTA = 2;
const CODA = 3;
const CORPO = 1;
const FRECCIA_SINISTRA = 37;
const FRECCIA_ALTO = 38;
const FRECCIA_DESTRA = 39;
const FRECCIA_BASSO = 40;
const AUMENTO_VELOCITA_1 = 15;
const AUMENTO_VELOCITA_2 = 30;
const AUMENTO_VELOCITA_3 = 50;
const AUMENTO_VELOCITA_4 = 100;
const STOP_BANNER = 40;

var snake = new Object();
snake.creaTabella = function() {
    snake.serpenteR = new Array;
    snake.serpenteC = new Array;
    snake.appoggio = new Array;
    snake.contatore = 0;
    snake.timing = 300;
    snake.timingBanner = 200;
    snake.inMovimento;
    snake.banner;
    snake.rigioca = false;
    snake.righe = 13;
    snake.colonne = 13;
    snake.melaMangiata = false;
    snake.morto = false;
    snake.giocoFinito = false;
    snake.velocitaAumentata = false;
    snake.aumentiDiVelocita = new Array;
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

    snake.aumentiDiVelocita[0] = false;
    snake.aumentiDiVelocita[1] = false;
    snake.aumentiDiVelocita[2] = false;
    snake.aumentiDiVelocita[3] = false;
}


snake.settings = function() {
    document.getElementById("box-3").style.visibility = "visible";
    document.getElementById("box-3-punti").innerHTML = "<strong>Punti: 0</strong> ";
}

snake.posizionaMela = function() {
    var sovrapposto;
    var imgMela = "immagini/mela.png";
    do {
        sovrapposto = false;
        var r = Math.floor(Math.random() * snake.righe);
        var c = Math.floor(Math.random() * snake.colonne);
        for (var i = 0; i < snake.lunghezza; i++) {
            if (r == snake.serpenteR[i] && c == snake.serpenteC[i])
                sovrapposto = true;
        }
    } while (sovrapposto == true);

    snake.matrice[r][c] = MELA;
    document.getElementById(r * snake.righe + c).innerHTML += '<img class="mela" src=' + imgMela + '>';
}

snake.posizionaTesta = function() {
    var r = Math.floor(Math.random() * (snake.righe - 1)); //per piazzare la coda in basso
    var c = Math.floor(Math.random() * snake.colonne);
    snake.matrice[r][c] = TESTA;
    snake.matrice[r + 1][c] = CODA;
    var imgTesta = "immagini/testaA.png";
    document.getElementById(r * snake.righe + c).innerHTML += '<img class="serpente" src=' + imgTesta + '>';
    var imgCoda = "immagini/codaB.png";
    document.getElementById((r + 1) * snake.righe + c).innerHTML += '<img class="serpente" src=' + imgCoda + '>';
    snake.serpenteR[0] = r;
    snake.serpenteC[0] = c;
    snake.serpenteR[1] = r + 1;
    snake.serpenteC[1] = c;
    snake.lunghezza = 2;
}

snake.spostamento = function() {
    if (snake.giocoFinito == false) {
        var tasto;
        tasto = window.event.keyCode;
        if (tasto == FRECCIA_SINISTRA) {
            if (snake.tastoPremutoInPrecedenza != FRECCIA_DESTRA) {
                clearInterval(snake.inMovimento);
                snake.movimento("sinistra");
            }
        } else if (tasto == FRECCIA_ALTO) {
            if (snake.tastoPremutoInPrecedenza != FRECCIA_BASSO) {
                clearInterval(snake.inMovimento);
                snake.movimento("alto");
            }
        } else if (tasto == FRECCIA_DESTRA) {
            if (snake.tastoPremutoInPrecedenza != FRECCIA_SINISTRA) {
                clearInterval(snake.inMovimento);
                snake.movimento("destra");
            }
        } else if (tasto == FRECCIA_BASSO) {
            if (snake.tastoPremutoInPrecedenza != FRECCIA_ALTO) {
                clearInterval(snake.inMovimento);
                snake.movimento("basso");
            }
        }
    }
}

snake.movimento = function(direzione) {
    snake.direzione = direzione;
    if (direzione == "sinistra") {
        snake.inMovimento = setInterval(snake.spostaSx, snake.timing);
        snake.tastoPremutoInPrecedenza = FRECCIA_SINISTRA;
    } else if (direzione == "alto") {
        snake.inMovimento = setInterval(snake.spostaA, snake.timing);
        snake.tastoPremutoInPrecedenza = FRECCIA_ALTO;
    } else if (direzione == "destra") {
        snake.inMovimento = setInterval(snake.spostaDx, snake.timing);
        snake.tastoPremutoInPrecedenza = FRECCIA_DESTRA;
    } else if (direzione == "basso") {
        snake.inMovimento = setInterval(snake.spostaB, snake.timing);
        snake.tastoPremutoInPrecedenza = FRECCIA_BASSO;
    }
}

snake.cancellaSerpente = function() {
    for (var i = 0; i < snake.lunghezza; i++) {
        var r = snake.serpenteR[i];
        var c = snake.serpenteC[i];
        snake.matrice[r][c] = 0;
        document.getElementById(r * snake.righe + c).innerHTML = " ";
    }
}

snake.disegnaSerpente = function() {
    var img, imgTesta;
    var r, c, tempR, tempC;
    for (var i = 0; i < snake.lunghezza; i++) {
        r = snake.serpenteR[i];
        c = snake.serpenteC[i];
        if (i == 0) { //posiziono la testa nella direzione giusta
            snake.matrice[r][c] = TESTA;
            if (snake.direzione == "sinistra")
                imgTesta = "immagini/testaSx.png";
            else if (snake.direzione == "alto")
                imgTesta = "immagini/testaA.png";
            else if (snake.direzione == "destra")
                imgTesta = "immagini/testaDx.png";
            else if (snake.direzione == "basso")
                imgTesta = "immagini/testaB.png";
            document.getElementById(r * snake.righe + c).innerHTML += '<img class="serpente" src=' + imgTesta + '>';
        } else {
            if (i == snake.lunghezza - 1) { //metto la coda all'ultimo posto
                snake.matrice[r][c] = CODA;
                if (tempR == r) {
                    if (tempC == 0 && c == snake.colonne - 1)
                        img = "immagini/codaSx.png";
                    else if (tempC == snake.colonne - 1 && c == 0)
                        img = "immagini/codaDx.png";
                    else if (tempC < c)
                        img = "immagini/codaDx.png";
                    else
                        img = "immagini/codaSx.png";
                } else if (tempC == c) {
                    if (tempR == 0 && r == snake.righe - 1)
                        img = "immagini/codaA.png";
                    else if (tempR == snake.righe - 1 && r == 0)
                        img = "immagini/codaB.png";
                    else if (tempR < r)
                        img = "immagini/codaB.png";
                    else
                        img = "immagini/codaA.png";
                }


                document.getElementById(r * snake.righe + c).innerHTML += '<img class="serpente" src=' + img + '>';
            } else { //posiziono il corpo
                snake.matrice[r][c] = CORPO;
                if (r == tempR) {
                    img = "immagini/corpoOrizzontale.png";
                    if (c == 0 && tempC == snake.colonne - 1) { //da sopra a sotto arrivando dalla stessa riga
                        if (snake.serpenteC[i + 1] == c)
                            if (snake.serpenteR[i + 1] < r)
                                img = "immagini/angoloA-Sx.png";
                            else
                                img = "immagini/angoloB-Sx.png";
                    } else if (c == snake.colonne - 1 && tempC == 0) { //da sotto a sopra arrivando dalla stessa riga
                        if (snake.serpenteC[i + 1] == c)
                            if (snake.serpenteR[i + 1] < r)
                                img = "immagini/angoloA-Dx.png";
                            else
                                img = "immagini/angoloB-Dx.png";
                    } else if (snake.serpenteR[i + 1] == 0 && r == snake.righe - 1) { //da sopra a sotto
                        if (snake.serpenteC[i + 1] == c)
                            if (tempC < c)
                                img = "immagini/angoloB-Sx.png";
                            else
                                img = "immagini/angoloB-Dx.png";
                    } else if (snake.serpenteR[i + 1] == snake.righe - 1 && r == 0) { //da sotto a sopra
                        if (snake.serpenteC[i + 1] == c)
                            if (tempC < c)
                                img = "immagini/angoloA-Sx.png";
                            else
                                img = "immagini/angoloA-Dx.png";
                    } else if (tempC < c) { //vado a destra
                        if (snake.serpenteR[i + 1] != r)
                            if (snake.serpenteR[i + 1] < r)
                                img = "immagini/angoloA-Sx.png";
                            else
                                img = "immagini/angoloB-Sx.png";
                        else
                            img = "immagini/corpoOrizzontale.png";
                    } else { //vado a sinistra              
                        if (snake.serpenteR[i + 1] != r)
                            if (snake.serpenteR[i + 1] < r)
                                img = "immagini/angoloA-Dx.png";
                            else
                                img = "immagini/angoloB-Dx.png";
                        else
                            img = "immagini/corpoOrizzontale.png";
                    }
                } else if (c == tempC) {
                    img = "immagini/corpoVerticale.png";
                    if (snake.serpenteC[i + 1] == 0 && c == snake.colonne - 1) { //da Dx a Sx 
                        if (snake.serpenteR[i + 1] == r)
                            if (tempR < r)
                                img = "immagini/angoloA-Dx.png";
                            else
                                img = "immagini/angoloB-Dx.png";
                    } else if (snake.serpenteC[i + 1] == snake.colonne - 1 && c == 0) { //da Sx a Dx
                        if (snake.serpenteR[i + 1] == r)
                            if (tempR < r)
                                img = "immagini/angoloA-Sx.png";
                            else
                                img = "immagini/angoloB-Sx.png";
                    } else if (r == 0 && tempR == snake.righe - 1) { //da sopra a sotto arrivando dalla stessa riga
                        if (snake.serpenteR[i + 1] == r)
                            if (snake.serpenteC[i + 1] < c)
                                img = "immagini/angoloA-Sx.png";
                            else
                                img = "immagini/angoloA-Dx.png";

                    } else if (r == snake.righe - 1 && tempR == 0) { //da sotto a sopra arrivando dalla stessa riga
                        if (snake.serpenteR[i + 1] == r)
                            if (snake.serpenteC[i + 1] < c)
                                img = "immagini/angoloB-Sx.png";
                            else
                                img = "immagini/angoloB-Dx.png";
                    } else if (tempR < r) { //vado in basso
                        if (snake.serpenteC[i + 1] != c)
                            if (snake.serpenteC[i + 1] < c)
                                img = "immagini/angoloA-Sx.png";
                            else
                                img = "immagini/angoloA-Dx.png";
                        else
                            img = "immagini/corpoVerticale.png";
                    } else { //vado in alto
                        if (snake.serpenteC[i + 1] != c)
                            if (snake.serpenteC[i + 1] < c)
                                img = "immagini/angoloB-Sx.png";
                            else
                                img = "immagini/angoloB-Dx.png";
                        else
                            img = "immagini/corpoVerticale.png";
                    }
                }
                document.getElementById(r * snake.righe + c).innerHTML += '<img class="serpente" src=' + img + '>';
            }
        }
        tempR = r;
        tempC = c;
    }
    if (snake.morto) {
        document.getElementById(snake.serpenteR[0] * snake.righe + snake.serpenteC[0]).innerHTML = " ";
        document.getElementById(snake.serpenteR[0] * snake.righe + snake.serpenteC[0]).innerHTML += '<img class="serpente" src=' + imgTesta + '>';
    }

}

snake.controlloMela = function(tempR, tempC) {
    var r = snake.serpenteR[0];
    var c = snake.serpenteC[0];
    if (snake.matrice[r][c] == MELA) {
        snake.matrice[r][c] = 0;
        snake.serpenteR[snake.lunghezza] = tempR;
        snake.serpenteC[snake.lunghezza] = tempC;
        snake.lunghezza++;
        snake.posizionaMela();
        document.getElementById(r * snake.righe + c).innerHTML = " ";
        document.getElementById("box-3-punti").innerHTML = "<strong>Punti:  " + (snake.lunghezza - 2) + "</strong>";
    }
}

snake.controlloMorte = function() {
    if (snake.lunghezza > 1) {
        var r = snake.serpenteR[0];
        var c = snake.serpenteC[0];
        for (var i = 1; i < snake.lunghezza; i++) {
            var r2 = snake.serpenteR[i];
            var c2 = snake.serpenteC[i];
            if (r == r2 && c == c2) {
                snake.morto = true;
                sconfitta();
            }
        }
    }
}

snake.controlloVittoria = function() {
    if (snake.lunghezza == snake.righe * snake.colonne - 1)
        vittoria();
}

snake.aumentoVelocita = function(decremento) {
    snake.contatore = 0;
    snake.timing = snake.timing - decremento;
    snake.banner = setInterval(snake.mostraAumentoVelocita, snake.timingBanner);
    snake.velocitaAumentata = true;
    document.getElementById("box-3-aumento").style.visibility = "visible";
    document.getElementById("box-3-aumento").style.display = "block";
}

snake.mostraAumentoVelocita = function() {
    snake.contatore++;
    if (snake.contatore % 2 == 0)
        document.getElementById("box-3-aumento").className = "scrittaRossa";
    else
        document.getElementById("box-3-aumento").className = "scrittaBianca";

    document.getElementById("box-3-aumento").innerHTML = "Velocità aumentata!";
}

snake.controlloAumentoVelocità = function() {
    if (snake.velocitaAumentata == false) {
        if (snake.lunghezza - 2 == AUMENTO_VELOCITA_1 && snake.aumentiDiVelocita[0] == false) {
            snake.aumentiDiVelocita[0] = true;
            snake.aumentoVelocita(100);
        } else if (snake.lunghezza - 2 == AUMENTO_VELOCITA_2 && snake.aumentiDiVelocita[1] == false) {
            snake.aumentiDiVelocita[1] = true;
            snake.aumentoVelocita(50);
        } else if (snake.lunghezza - 2 == AUMENTO_VELOCITA_3 && snake.aumentiDiVelocita[2] == false) {
            snake.aumentiDiVelocita[2] = true;
            snake.aumentoVelocita(50);
        } else if (snake.lunghezza - 2 == AUMENTO_VELOCITA_4 && snake.aumentiDiVelocita[3] == false) {
            snake.aumentiDiVelocita[3] = true;
            snake.aumentoVelocita(50);
        }
    } else if (snake.contatore >= STOP_BANNER) {
        snake.velocitaAumentata = false;
        clearInterval(snake.banner);
        document.getElementById("box-3-aumento").style.visibility = "hidden";
        document.getElementById("box-3-aumento").style.display = "none";
    }
}

snake.spostaSx = function() {
    var r, c, tempR, tempC;
    snake.cancellaSerpente();

    for (var i = 0; i < snake.lunghezza; i++) {
        r = snake.serpenteR[i];
        c = snake.serpenteC[i];
        if (i == 0) {
            snake.serpenteR[i] = r;
            if (c != 0)
                snake.serpenteC[i] = c - 1;
            else
                snake.serpenteC[i] = snake.colonne - 1;
        } else {
            snake.serpenteR[i] = tempR;
            snake.serpenteC[i] = tempC;
        }
        tempR = r;
        tempC = c;
    }
    snake.controlloMela(tempR, tempC);

    snake.controlloAumentoVelocità();

    snake.controlloMorte();

    snake.disegnaSerpente();

    snake.controlloVittoria();
}

snake.spostaA = function() {
    var r, c, tempR, tempC;
    snake.cancellaSerpente();

    for (var i = 0; i < snake.lunghezza; i++) {
        r = snake.serpenteR[i];
        c = snake.serpenteC[i];

        if (i == 0) {
            snake.serpenteC[i] = c;
            if (r != 0)
                snake.serpenteR[i] = r - 1;
            else
                snake.serpenteR[i] = snake.righe - 1;
        } else {
            snake.serpenteR[i] = tempR;
            snake.serpenteC[i] = tempC;
        }
        tempR = r;
        tempC = c;
    }
    snake.controlloMela(tempR, tempC);

    snake.controlloAumentoVelocità();

    snake.controlloMorte();

    snake.disegnaSerpente();

    snake.controlloVittoria();
}

snake.spostaDx = function() {
    var r, c, tempR, tempC;
    snake.cancellaSerpente();

    for (var i = 0; i < snake.lunghezza; i++) {
        r = snake.serpenteR[i];
        c = snake.serpenteC[i];

        if (i == 0) { //cambio la posizione e la aggiorno secondo la direzione
            snake.serpenteR[i] = r;
            if (c != snake.colonne - 1)
                snake.serpenteC[i] = c + 1;
            else
                snake.serpenteC[i] = 0;
        } else { //posizioni precedenti
            snake.serpenteR[i] = tempR;
            snake.serpenteC[i] = tempC;
        }
        tempR = r;
        tempC = c;
    }

    snake.controlloMela(tempR, tempC);

    snake.controlloAumentoVelocità();

    snake.controlloMorte();

    snake.disegnaSerpente();

    snake.controlloVittoria();
}

snake.spostaB = function() {
    var r, c, tempR, tempC;
    snake.cancellaSerpente();

    for (var i = 0; i < snake.lunghezza; i++) {
        r = snake.serpenteR[i];
        c = snake.serpenteC[i];

        if (i == 0) {
            snake.serpenteC[i] = c;
            if (r != snake.righe - 1)
                snake.serpenteR[i] = r + 1;
            else
                snake.serpenteR[i] = 0;
        } else {
            snake.serpenteR[i] = tempR;
            snake.serpenteC[i] = tempC;
        }
        tempR = r;
        tempC = c;
    }

    snake.controlloMela(tempR, tempC);

    snake.controlloAumentoVelocità();

    snake.controlloMorte();

    snake.disegnaSerpente();

    snake.controlloVittoria();
}

function gioca() {
    // document.getElementsByTagName("div")[1].remove();
    document.getElementById("titoloGiocoSchermataIniziale").remove();
    document.getElementById("bottone-gioca").style.display = 'none';
    document.getElementById("bottone-gioca").style.visibility = "hidden";
    start();
}

function start() {
    snake.creaTabella();
    snake.settings();
    snake.posizionaTesta();
    snake.posizionaMela();
    document.getElementsByTagName("body")[0].onkeydown = snake.spostamento;
    document.getElementById("box-1").innerHTML = '<div class="button bottone-menù" onclick="tornaAlMenu()">' +
        '<button id="bottone-tornaAlMenù">TORNA AL MENU</button>' +
        '</div>';
}

function sconfitta() {
    document.getElementById("row-3").innerHTML = '<div class="alert alert-danger" id="sconfitta">' +
        '<strong>Hai perso...</strong>' +
        '</div>';
    clearInterval(snake.inMovimento);
    creaTastoRigioca();
    snake.giocoFinito = true;
}

function vittoria() {
    document.getElementById("row-3").innerHTML = '<div class="alert alert-success" id="vittoria">' +
        '<strong>Hai vinto!</strong>' +
        '</div>';
    clearInterval(snake.inMovimento);
    creaTastoRigioca();
    snake.giocoFinito = true;
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
    document.getElementById("container").remove();
    creaScheletro();
    document.getElementById("bottone-gioca").style.display = 'none';
    document.getElementById("bottone-gioca").style.visibility = "hidden";
    start();
}

function crea() {
    document.getElementById("areaCentralePagina").innerHTML = '<div id="titoloGiocoSchermataIniziale" class="container text-center my-5 titolo">' +
        '1 2 2 2 2 2 SNAKE 2 2 2 2 2 9' +
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
        '</div>' +
        '<div class="col-3 alert alert-secondary" id="box-3">' +
        '<div id="box-3-punti">' +
        '</div>' +
        '<div id="box-3-aumento">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="row" id="row-3">' +
        '</div>' +
        '</div>';
}