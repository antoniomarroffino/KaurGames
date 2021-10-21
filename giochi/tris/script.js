var g1, g2;
var tris = new Object();
tris.creaTabella = function (classe) {
    tris.rigioca = false;
    tris.righe = 3;
    tris.colonne = 3;
    tris.modalita = classe;
    tris.segno = 'x';
    tris.giocatore1 = g1;
    tris.giocatore2 = g2;
    tris.finePartita = false;
    tris.iniziaGiocatore1 = Math.floor(Math.random() * 2);
    tris.mossa = 1;
    tris.matrice = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    if (tris.iniziaGiocatore1) {
        tris.segno = tris.giocatore2;
    } else
        tris.segno = tris.giocatore1;
    var cont = 0;
    var str = '<table align="center">';
    for (var r = 0; r < tris.righe; r++) {
        str += '<tr>';
        for (var c = 0; c < tris.colonne; c++) {
            str += '<td onclick="tris.assegna(this)" id =' + cont + '></td>';
            cont++;
        }
        str += '</tr>';
    }
    str += '</table>';
    document.getElementById('box-2').innerHTML += str;
}

tris.settings = function () {
    document.getElementById("box-3").style.visibility = "visible";
    document.getElementById("box-3-modalità").innerHTML = "<strong>Modalità:</strong> " + tris.modalita;
    if (tris.modalita == "1 VS 1") {
        if (tris.giocatore1 == 'x')
            document.getElementById("row-3").innerHTML = '<div class="row alert alert-dark">' +
                '<div class="testoAlCentro" class="col">' +
                'Giocatore 1:' +
                '<div style="padding:10px" class="opzione">' +
                '<img style="padding:2px; height:50px; width:50px" class="img" src="immagini/x.png""></img>' +
                '</div>' +
                '</div>' +
                '<div class="testoAlCentro" class="col">' +
                'Giocatore 2:' +
                '<div style="padding:10px" class="opzione">' +
                '<img style="padding:2px; height:50px; width:50px" class="img" src="immagini/o.png"></img>' +
                '</div>' +
                '</div>' +
                '</div>';
        else
            document.getElementById("row-3").innerHTML = '<div class="row alert alert-dark">' +
                '<div class="testoAlCentro" class="col">' +
                'Giocatore 1:' +
                '<div style="padding:10px" class="opzione">' +
                '<img style="padding:2px; height:50px; width:50px" class="img" src="immagini/o.png""></img>' +
                '</div>' +
                '</div>' +
                '<div class="testoAlCentro" class="col">' +
                'Giocatore 2:' +
                '<div style="padding:10px" class="opzione">' +
                '<img style="padding:2px; height:50px; width:50px" class="img" src="immagini/x.png"></img>' +
                '</div>' +
                '</div>' +
                '</div>';
    } else {
        if (tris.giocatore1 == 'x')
            document.getElementById("row-3").innerHTML = '<div class="row alert alert-dark">' +
                '<div class="testoAlCentro" class="col">' +
                'Tu:' +
                '<div style="padding:10px" class="opzione">' +
                '<img style="padding:2px; height:50px; width:50px" class="img" src="immagini/x.png""></img>' +
                '</div>' +
                '</div>' +
                '<div class="testoAlCentro" class="col">' +
                'CPU:' +
                '<div style="padding:10px" class="opzione">' +
                '<img style="padding:2px; height:50px; width:50px" class="img" src="immagini/o.png"></img>' +
                '</div>' +
                '</div>' +
                '</div>';
        else document.getElementById("row-3").innerHTML = '<div class="row alert alert-dark">' +
            '<div class="testoAlCentro" class="col">' +
            'Tu:' +
            '<div style="padding:10px" class="opzione">' +
            '<img style="padding:2px; height:50px; width:50px" class="img" src="immagini/o.png""></img>' +
            '</div>' +
            '</div>' +
            '<div class="testoAlCentro" class="col">' +
            'CPU:' +
            '<div style="padding:10px" class="opzione">' +
            '<img style="padding:2px; height:50px; width:50px" class="img" src="immagini/x.png"></img>' +
            '</div>' +
            '</div>' +
            '</div>';
    }
}

tris.assegna = function (casella) {
    var r = parseInt(casella.id / 3);
    var c = casella.id % 3;

    document.getElementById(casella.id).innerHTML += tris.segno;
    tris.matrice[r][c] = tris.segno;

    tris.cambiaSegno();

    document.getElementById(casella.id).removeAttribute("onclick");
    tris.vincitore = tris.controlla(); // x - o - 2=nessun vincitore
    if (tris.vincitore != 2)
        vittoria();

    tris.controllaMatricePiena();

    tris.mossa++;

    if (tris.modalita != "1 VS 1" && tris.finePartita == false) {
        tris.mossaCPU();
    }
}

tris.controlla = function () { //controllo se qualcuno ha vinto
    if (tris.matrice[0][0] == 'x' && tris.matrice[0][1] == 'x' && tris.matrice[0][2] == 'x' || tris.matrice[0][0] == 'o' && tris.matrice[0][1] == 'o' && tris.matrice[0][2] == 'o') {
        if (tris.matrice[0][0] != 0) {
            tris.segnaVittoria(0, 0, 0, 1, 0, 2);
            if (tris.matrice[0][0] == 'x')
                return 'x';
            else
                return 'o';
        }

    } else if (tris.matrice[1][0] == 'x' && tris.matrice[1][1] == 'x' && tris.matrice[1][2] == 'x' || tris.matrice[1][0] == 'o' && tris.matrice[1][1] == 'o' && tris.matrice[1][2] == 'o') {
        if (tris.matrice[1][0] != 0) {
            tris.segnaVittoria(1, 0, 1, 1, 1, 2);
            if (tris.matrice[1][0] == 'x')
                return 'x';
            else
                return 'o';
        }

    } else if (tris.matrice[2][0] == 'x' && tris.matrice[2][1] == 'x' && tris.matrice[2][2] == 'x' || tris.matrice[2][0] == 'o' && tris.matrice[2][1] == 'o' && tris.matrice[2][2] == 'o') {
        if (tris.matrice[2][0] != 0) {
            tris.segnaVittoria(2, 0, 2, 1, 2, 2);
            if (tris.matrice[2][0] == 'x')
                return 'x';
            else
                return 'o';
        }

    } else if (tris.matrice[0][0] == 'x' && tris.matrice[1][0] == 'x' && tris.matrice[2][0] == 'x' || tris.matrice[0][0] == 'o' && tris.matrice[1][0] == 'o' && tris.matrice[2][0] == 'o') {
        if (tris.matrice[0][0] != 0) {
            tris.segnaVittoria(0, 0, 1, 0, 2, 0);
            if (tris.matrice[0][0] == 'x')
                return 'x';
            else
                return 'o';
        }

    } else if (tris.matrice[0][1] == 'x' && tris.matrice[1][1] == 'x' && tris.matrice[2][1] == 'x' || tris.matrice[0][1] == 'o' && tris.matrice[1][1] == 'o' && tris.matrice[2][1] == 'o') {
        if (tris.matrice[0][1] != 0) {
            tris.segnaVittoria(0, 1, 1, 1, 2, 1);
            if (tris.matrice[0][1] == 'x')
                return 'x';
            else
                return 'o';
        }

    } else if (tris.matrice[0][2] == 'x' && tris.matrice[1][2] == 'x' && tris.matrice[2][2] == 'x' || tris.matrice[0][2] == 'o' && tris.matrice[1][2] == 'o' && tris.matrice[2][2] == 'o') {
        if (tris.matrice[0][2] != 0) {
            tris.segnaVittoria(0, 2, 1, 2, 2, 2);
            if (tris.matrice[0][2] == 'x')
                return 'x';
            else
                return 'o';
        }

    } else if (tris.matrice[0][0] == 'x' && tris.matrice[1][1] == 'x' && tris.matrice[2][2] == 'x' || tris.matrice[0][0] == 'o' && tris.matrice[1][1] == 'o' && tris.matrice[2][2] == 'o') {
        if (tris.matrice[0][0] != 0) {
            tris.segnaVittoria(0, 0, 1, 1, 2, 2);
            if (tris.matrice[0][0] == 'x')
                return 'x';
            else
                return 'o';
        }

    } else if (tris.matrice[0][2] == 'x' && tris.matrice[1][1] == 'x' && tris.matrice[2][0] == 'x' || tris.matrice[0][2] == 'o' && tris.matrice[1][1] == 'o' && tris.matrice[2][0] == 'o') {
        if (tris.matrice[0][2] != 0) {
            tris.segnaVittoria(0, 2, 1, 1, 2, 0);
            if (tris.matrice[0][2] == 'x')
                return 'x';
            else
                return 'o';
        }
    }
    return 2;
}

tris.segnaVittoria = function (r1, c1, r2, c2, r3, c3) {
    document.getElementById(r1 * tris.righe + c1).style.backgroundColor = "red";
    document.getElementById(r2 * tris.righe + c2).style.backgroundColor = "red";
    document.getElementById(r3 * tris.righe + c3).style.backgroundColor = "red";
    tris.finePartita = true;
    togliOnClick();
}

tris.mossaCPU = function () {
    var r, c, caso, n;

    if (tris.mossa == 1) {
        r = Math.floor(Math.random() * tris.righe);
        c = Math.floor(Math.random() * tris.colonne);
    } else if (tris.mossa == 2) {
        if (tris.matrice[0][0] == tris.giocatore1 || tris.matrice[2][0] == tris.giocatore1 || tris.matrice[0][2] == tris.giocatore1 || tris.matrice[2][2] == tris.giocatore1) {
            if (Math.floor(Math.random() * 2)) {
                r = 1;
                c = 1;
            } else {
                do {
                    r = Math.floor(Math.random() * tris.righe);
                    c = Math.floor(Math.random() * tris.colonne);
                } while (tris.matrice[r][c] != 0);
            }
        } else if (tris.matrice[1][1] == tris.giocatore1) {
            if (tris.modalita == "difficile") {
                do {
                    n = Math.floor(Math.random() * 4);
                    if (n == 0) {
                        r = 0;
                        c = 0;
                    } else if (n == 1) {
                        r = 0;
                        c = 2;
                    } else if (n == 2) {
                        r = 2;
                        c = 0;
                    } else if (n == 3) {
                        r = 2;
                        c = 2;
                    }
                } while (tris.matrice[r][c] != 0);
            } else if (tris.modalita == "normale") {
                do {
                    r = Math.floor(Math.random() * tris.righe);
                    c = Math.floor(Math.random() * tris.colonne);
                } while (tris.matrice[r][c] != 0);
            } else {
                do {
                    n = Math.floor(Math.random() * 4);
                    if (n == 0) {
                        r = 0;
                        c = 1;
                    } else if (n == 1) {
                        r = 1;
                        c = 0;
                    } else if (n == 2) {
                        r = 1;
                        c = 2;
                    } else if (n == 3) {
                        r = 2;
                        c = 1;
                    }
                } while (tris.matrice[r][c] != 0);
            }
        } else if (tris.modalita == "facile") {
            do {
                n = Math.floor(Math.random() * 4);
                if (n == 0) {
                    r = 0;
                    c = 1;
                } else if (n == 1) {
                    r = 1;
                    c = 0;
                } else if (n == 2) {
                    r = 1;
                    c = 2;
                } else if (n == 3) {
                    r = 2;
                    c = 1;
                }
            } while (tris.matrice[r][c] != 0);
        } else {
            do {
                r = Math.floor(Math.random() * tris.righe);
                c = Math.floor(Math.random() * tris.colonne);
            } while (tris.matrice[r][c] != 0);
        }
    } else if (tris.mossa == 3) {
        if (tris.modalita == "difficile") {
            if (tris.matrice[0][0] == tris.giocatore1 || tris.matrice[2][0] == tris.giocatore1 || tris.matrice[0][2] == tris.giocatore1 || tris.matrice[2][2] == tris.giocatore1) {
                if (tris.matrice[1][1] == tris.giocatore2) {
                    if (Math.floor(Math.random() * 2)) {
                        if (tris.matrice[0][0] == tris.giocatore1) {
                            r = 2;
                            c = 2;
                        } else if (tris.matrice[2][0] == tris.giocatore1) {
                            r = 0;
                            c = 2;
                        } else if (tris.matrice[0][2] == tris.giocatore1) {
                            r = 2;
                            c = 0;
                        } else if (tris.matrice[2][2] == tris.giocatore1) {
                            r = 0;
                            c = 0;
                        }
                    } else {
                        do {
                            r = Math.floor(Math.random() * tris.righe);
                            c = Math.floor(Math.random() * tris.colonne);
                        } while (tris.matrice[r][c] != 0);
                    }
                } else {
                    r = 1;
                    c = 1;
                }
            } else if (tris.matrice[1][1] == tris.giocatore1) {
                do {
                    n = Math.floor(Math.random() * 4);
                    if (n == 0) {
                        r = 0;
                        c = 0;
                    } else if (n == 1) {
                        r = 0;
                        c = 2;
                    } else if (n == 2) {
                        r = 2;
                        c = 0;
                    } else if (n == 3) {
                        r = 2;
                        c = 2;
                    }
                } while (tris.matrice[r][c] != 0);
            } else {
                do {
                    var r = Math.floor(Math.random() * tris.righe);
                    var c = Math.floor(Math.random() * tris.colonne);
                } while (tris.matrice[r][c] != 0);
            }
        } else if (tris.matrice[0][1] == tris.giocatore2 || tris.matrice[1][0] == tris.giocatore2 || tris.matrice[1][2] == tris.giocatore2 || tris.matrice[2][1] == tris.giocatore2) {
            if (tris.matrice[1][1] == tris.giocatore1) {
                do {
                    n = Math.floor(Math.random() * 4);
                    if (n == 0) {
                        r = 0;
                        c = 0;
                    } else if (n == 1) {
                        r = 0;
                        c = 2;
                    } else if (n == 2) {
                        r = 2;
                        c = 0;
                    } else if (n == 3) {
                        r = 2;
                        c = 2;
                    }
                } while (tris.matrice[r][c] != 0);
            }
        } else {
            do {
                r = Math.floor(Math.random() * tris.righe);
                c = Math.floor(Math.random() * tris.colonne);
            } while (tris.matrice[r][c] != 0);
        }
    } else if (tris.mossa >= 4) {
        caso = 0;
        if (tris.matrice[0][0] == tris.giocatore2) {
            if (tris.matrice[0][1] == tris.giocatore2) {
                if (tris.matrice[0][2] == 0) {
                    r = 0;
                    c = 2;
                    caso++;
                }
            } else if (tris.matrice[0][2] == tris.giocatore2) {
                if (tris.matrice[0][1] == 0) {
                    r = 0;
                    c = 1;
                    caso++;
                }
            } else if (tris.matrice[1][0] == tris.giocatore2) {
                if (tris.matrice[2][0] == 0) {
                    r = 2;
                    c = 0;
                    caso++;
                }
            } else if (tris.matrice[2][0] == tris.giocatore2) {
                if (tris.matrice[1][0] == 0) {
                    r = 1;
                    c = 0;
                    caso++;
                }
            } else if (tris.matrice[1][1] == tris.giocatore2) {
                if (tris.matrice[2][2] == 0) {
                    r = 2;
                    c = 2;
                    caso++;
                }
            } else if (tris.matrice[2][2] == tris.giocatore2) {
                if (tris.matrice[1][1] == 0) {
                    r = 1;
                    c = 1;
                    caso++;
                }
            }
        } else if (tris.matrice[0][0] == tris.giocatore1) {
            if (tris.matrice[0][1] == tris.giocatore1) {
                if (tris.matrice[0][2] == 0) {
                    r = 0;
                    c = 2;
                    caso++;
                }
            } else if (tris.matrice[0][2] == tris.giocatore1) {
                if (tris.matrice[0][1] == 0) {
                    r = 0;
                    c = 1;
                    caso++;
                }
            } else if (tris.matrice[1][0] == tris.giocatore1) {
                if (tris.matrice[2][0] == 0) {
                    r = 2;
                    c = 0;
                    caso++;
                }
            } else if (tris.matrice[2][0] == tris.giocatore1) {
                if (tris.matrice[1][0] == 0) {
                    r = 1;
                    c = 0;
                    caso++;
                }
            } else if (tris.matrice[1][1] == tris.giocatore1) {
                if (tris.matrice[2][2] == 0) {
                    r = 2;
                    c = 2;
                    caso++;
                }
            } else if (tris.matrice[2][2] == tris.giocatore1) {
                if (tris.matrice[1][1] == 0) {
                    r = 1;
                    c = 1;
                    caso++;
                }
            }
        }
        if (tris.matrice[0][1] == tris.giocatore2) {
            if (tris.matrice[0][0] == tris.giocatore2) {
                if (tris.matrice[0][2] == 0) {
                    r = 0;
                    c = 2;
                    caso++;
                }
            } else if (tris.matrice[0][2] == tris.giocatore2) {
                if (tris.matrice[0][0] == 0) {
                    r = 0;
                    c = 0;
                    caso++;
                }
            } else if (tris.matrice[1][1] == tris.giocatore2) {
                if (tris.matrice[2][1] == 0) {
                    r = 2;
                    c = 1;
                    caso++;
                }
            } else if (tris.matrice[2][1] == tris.giocatore2) {
                if (tris.matrice[1][1] == 0) {
                    r = 1;
                    c = 1;
                    caso++;
                }
            }
        } else if (tris.matrice[0][1] == tris.giocatore1) {
            if (tris.matrice[0][0] == tris.giocatore1) {
                if (tris.matrice[0][2] == 0) {
                    r = 0;
                    c = 2;
                    caso++;
                }
            } else if (tris.matrice[0][2] == tris.giocatore1) {
                if (tris.matrice[0][0] == 0) {
                    r = 0;
                    c = 0;
                    caso++;
                }
            } else if (tris.matrice[1][1] == tris.giocatore1) {
                if (tris.matrice[2][1] == 0) {
                    r = 2;
                    c = 1;
                    caso++;
                }
            } else if (tris.matrice[2][1] == tris.giocatore1) {
                if (tris.matrice[1][1] == 0) {
                    r = 1;
                    c = 1;
                    caso++;
                }
            }
        }
        if (tris.matrice[0][2] == tris.giocatore2) {
            if (tris.matrice[0][0] == tris.giocatore2) {
                if (tris.matrice[0][1] == 0) {
                    r = 0;
                    c = 1;
                    caso++;
                }
            } else if (tris.matrice[0][1] == tris.giocatore2) {
                if (tris.matrice[0][0] == 0) {
                    r = 0;
                    c = 0;
                    caso++;
                }
            } else if (tris.matrice[1][2] == tris.giocatore2) {
                if (tris.matrice[2][2] == 0) {
                    r = 2;
                    c = 2;
                    caso++;
                }
            } else if (tris.matrice[2][2] == tris.giocatore2) {
                if (tris.matrice[1][2] == 0) {
                    r = 1;
                    c = 2;
                    caso++;
                }
            } else if (tris.matrice[1][1] == tris.giocatore2) {
                if (tris.matrice[2][0] == 0) {
                    r = 2;
                    c = 0;
                    caso++;
                }
            } else if (tris.matrice[2][0] == tris.giocatore2) {
                if (tris.matrice[1][1] == 0) {
                    r = 1;
                    c = 1;
                    caso++;
                }
            }
        } else if (tris.matrice[0][2] == tris.giocatore1) {
            if (tris.matrice[0][0] == tris.giocatore1) {
                if (tris.matrice[0][1] == 0) {
                    r = 0;
                    c = 1;
                    caso++;
                }
            } else if (tris.matrice[0][1] == tris.giocatore1) {
                if (tris.matrice[0][0] == 0) {
                    r = 0;
                    c = 0;
                    caso++;
                }
            } else if (tris.matrice[1][2] == tris.giocatore1) {
                if (tris.matrice[2][2] == 0) {
                    r = 2;
                    c = 2;
                    caso++;
                }
            } else if (tris.matrice[2][2] == tris.giocatore1) {
                if (tris.matrice[1][2] == 0) {
                    r = 1;
                    c = 2;
                    caso++;
                }
            } else if (tris.matrice[1][1] == tris.giocatore1) {
                if (tris.matrice[2][0] == 0) {
                    r = 2;
                    c = 0;
                    caso++;
                }
            } else if (tris.matrice[2][0] == tris.giocatore1) {
                if (tris.matrice[1][1] == 0) {
                    r = 1;
                    c = 1;
                    caso++;
                }
            }
        }
        if (tris.matrice[1][0] == tris.giocatore2) {
            if (tris.matrice[1][1] == tris.giocatore2) {
                if (tris.matrice[1][2] == 0) {
                    r = 1;
                    c = 2;
                    caso++;
                }
            } else if (tris.matrice[1][2] == tris.giocatore2) {
                if (tris.matrice[1][1] == 0) {
                    r = 1;
                    c = 1;
                    caso++;
                }
            } else if (tris.matrice[0][0] == tris.giocatore2) {
                if (tris.matrice[2][0] == 0) {
                    r = 2;
                    c = 0;
                    caso++;
                }
            } else if (tris.matrice[2][0] == tris.giocatore2) {
                if (tris.matrice[0][0] == 0) {
                    r = 0;
                    c = 0;
                    caso++;
                }
            }
        } else if (tris.matrice[1][0] == tris.giocatore1) {
            if (tris.matrice[1][1] == tris.giocatore1) {
                if (tris.matrice[1][2] == 0) {
                    r = 1;
                    c = 2;
                    caso++;
                }
            } else if (tris.matrice[1][2] == tris.giocatore1) {
                if (tris.matrice[1][1] == 0) {
                    r = 1;
                    c = 1;
                    caso++;
                }
            } else if (tris.matrice[0][0] == tris.giocatore1) {
                if (tris.matrice[2][0] == 0) {
                    r = 2;
                    c = 0;
                    caso++;
                }
            } else if (tris.matrice[2][0] == tris.giocatore1) {
                if (tris.matrice[0][0] == 0) {
                    r = 0;
                    c = 0;
                    caso++;
                }
            }
        }
        if (tris.matrice[1][1] == tris.giocatore2) {
            if (tris.matrice[1][0] == tris.giocatore2) {
                if (tris.matrice[1][2] == 0) {
                    r = 1;
                    c = 2;
                    caso++;
                }
            } else if (tris.matrice[1][2] == tris.giocatore2) {
                if (tris.matrice[1][0] == 0) {
                    r = 1;
                    c = 0;
                    caso++;
                }
            } else if (tris.matrice[0][0] == tris.giocatore2) {
                if (tris.matrice[2][2] == 0) {
                    r = 2;
                    c = 2;
                    caso++;
                }
            } else if (tris.matrice[2][2] == tris.giocatore2) {
                if (tris.matrice[0][0] == 0) {
                    r = 0;
                    c = 0;
                    caso++;
                }
            } else if (tris.matrice[0][2] == tris.giocatore2) {
                if (tris.matrice[2][0] == 0) {
                    r = 2;
                    c = 0;
                    caso++;
                }
            } else if (tris.matrice[2][0] == tris.giocatore2) {
                if (tris.matrice[0][2] == 0) {
                    r = 0;
                    c = 2;
                    caso++;
                }
            } else if (tris.matrice[0][1] == tris.giocatore2) {
                if (tris.matrice[2][1] == 0) {
                    r = 2;
                    c = 1;
                    caso++;
                }
            } else if (tris.matrice[2][1] == tris.giocatore2) {
                if (tris.matrice[0][1] == 0) {
                    r = 0;
                    c = 1;
                    caso++;
                }
            }
        } else if (tris.matrice[1][1] == tris.giocatore1) {
            if (tris.matrice[1][0] == tris.giocatore1) {
                if (tris.matrice[1][2] == 0) {
                    r = 1;
                    c = 2;
                    caso++;
                }
            } else if (tris.matrice[1][2] == tris.giocatore1) {
                if (tris.matrice[1][0] == 0) {
                    r = 1;
                    c = 0;
                    caso++;
                }
            } else if (tris.matrice[0][0] == tris.giocatore1) {
                if (tris.matrice[2][2] == 0) {
                    r = 2;
                    c = 2;
                    caso++;
                }
            } else if (tris.matrice[2][2] == tris.giocatore1) {
                if (tris.matrice[0][0] == 0) {
                    r = 0;
                    c = 0;
                    caso++;
                }
            } else if (tris.matrice[0][2] == tris.giocatore1) {
                if (tris.matrice[2][0] == 0) {
                    r = 2;
                    c = 0;
                    caso++;
                }
            } else if (tris.matrice[2][0] == tris.giocatore1) {
                if (tris.matrice[0][2] == 0) {
                    r = 0;
                    c = 2;
                    caso++;
                }
            } else if (tris.matrice[0][1] == tris.giocatore1) {
                if (tris.matrice[2][1] == 0) {
                    r = 2;
                    c = 1;
                    caso++;
                }
            } else if (tris.matrice[2][1] == tris.giocatore1) {
                if (tris.matrice[0][1] == 0) {
                    r = 0;
                    c = 1;
                    caso++;
                }
            }
        }
        if (tris.matrice[1][2] == tris.giocatore2) {
            if (tris.matrice[1][1] == tris.giocatore2) {
                if (tris.matrice[1][0] == 0) {
                    r = 1;
                    c = 0;
                    caso++;
                }
            } else if (tris.matrice[1][0] == tris.giocatore2) {
                if (tris.matrice[1][1] == 0) {
                    r = 1;
                    c = 1;
                    caso++;
                }
            } else if (tris.matrice[0][2] == tris.giocatore2) {
                if (tris.matrice[2][2] == 0) {
                    r = 2;
                    c = 2;
                    caso++;
                }
            } else if (tris.matrice[2][2] == tris.giocatore2) {
                if (tris.matrice[0][2] == 0) {
                    r = 0;
                    c = 2;
                    caso++;
                }
            }
        } else if (tris.matrice[1][2] == tris.giocatore1) {
            if (tris.matrice[1][1] == tris.giocatore1) {
                if (tris.matrice[1][0] == 0) {
                    r = 1;
                    c = 0;
                    caso++;
                }
            } else if (tris.matrice[1][0] == tris.giocatore1) {
                if (tris.matrice[1][1] == 0) {
                    r = 1;
                    c = 1;
                    caso++;
                }
            } else if (tris.matrice[0][2] == tris.giocatore1) {
                if (tris.matrice[2][2] == 0) {
                    r = 2;
                    c = 2;
                    caso++;
                }
            } else if (tris.matrice[2][2] == tris.giocatore1) {
                if (tris.matrice[0][2] == 0) {
                    r = 0;
                    c = 2;
                    caso++;
                }
            }
        }
        if (tris.matrice[2][0] == tris.giocatore2) {
            if (tris.matrice[2][1] == tris.giocatore2) {
                if (tris.matrice[2][2] == 0) {
                    r = 2;
                    c = 2;
                    caso++;
                }
            } else if (tris.matrice[2][2] == tris.giocatore2) {
                if (tris.matrice[2][1] == 0) {
                    r = 2;
                    c = 1;
                    caso++;
                }
            } else if (tris.matrice[1][1] == tris.giocatore2) {
                if (tris.matrice[0][2] == 0) {
                    r = 0;
                    c = 2;
                    caso++;
                }
            } else if (tris.matrice[0][2] == tris.giocatore2) {
                if (tris.matrice[1][1] == 0) {
                    r = 1;
                    c = 1;
                    caso++;
                }
            } else if (tris.matrice[0][0] == tris.giocatore2) {
                if (tris.matrice[1][0] == 0) {
                    r = 1;
                    c = 0;
                    caso++;
                }
            } else if (tris.matrice[1][0] == tris.giocatore2) {
                if (tris.matrice[0][0] == 0) {
                    r = 0;
                    c = 0;
                    caso++;
                }
            }
        } else if (tris.matrice[2][0] == tris.giocatore1) {
            if (tris.matrice[2][1] == tris.giocatore1) {
                if (tris.matrice[2][2] == 0) {
                    r = 2;
                    c = 2;
                    caso++;
                }
            } else if (tris.matrice[2][2] == tris.giocatore1) {
                if (tris.matrice[2][1] == 0) {
                    r = 2;
                    c = 1;
                    caso++;
                }
            } else if (tris.matrice[1][1] == tris.giocatore1) {
                if (tris.matrice[0][2] == 0) {
                    r = 0;
                    c = 2;
                    caso++;
                }
            } else if (tris.matrice[0][2] == tris.giocatore1) {
                if (tris.matrice[1][1] == 0) {
                    r = 1;
                    c = 1;
                    caso++;
                }
            } else if (tris.matrice[0][0] == tris.giocatore1) {
                if (tris.matrice[1][0] == 0) {
                    r = 1;
                    c = 0;
                    caso++;
                }
            } else if (tris.matrice[1][0] == tris.giocatore1) {
                if (tris.matrice[0][0] == 0) {
                    r = 0;
                    c = 0;
                    caso++;
                }
            }
        }
        if (tris.matrice[2][1] == tris.giocatore2) {
            if (tris.matrice[2][0] == tris.giocatore2) {
                if (tris.matrice[2][2] == 0) {
                    r = 2;
                    c = 2;
                    caso++;
                }
            } else if (tris.matrice[2][2] == tris.giocatore2) {
                if (tris.matrice[2][0] == 0) {
                    r = 2;
                    c = 0;
                    caso++;
                }
            } else if (tris.matrice[0][1] == tris.giocatore2) {
                if (tris.matrice[1][1] == 0) {
                    r = 1;
                    c = 1;
                    caso++;
                }
            } else if (tris.matrice[1][1] == tris.giocatore2) {
                if (tris.matrice[0][1] == 0) {
                    r = 0;
                    c = 1;
                    caso++;
                }
            }
        } else if (tris.matrice[2][1] == tris.giocatore1) {
            if (tris.matrice[2][0] == tris.giocatore1) {
                if (tris.matrice[2][2] == 0) {
                    r = 2;
                    c = 2;
                    caso++;
                }
            } else if (tris.matrice[2][2] == tris.giocatore1) {
                if (tris.matrice[2][0] == 0) {
                    r = 2;
                    c = 0;
                    caso++;
                }
            } else if (tris.matrice[0][1] == tris.giocatore1) {
                if (tris.matrice[1][1] == 0) {
                    r = 1;
                    c = 1;
                    caso++;
                }
            } else if (tris.matrice[1][1] == tris.giocatore1) {
                if (tris.matrice[0][1] == 0) {
                    r = 0;
                    c = 1;
                    caso++;
                }
            }
        }
        if (tris.matrice[2][2] == tris.giocatore2) {
            if (tris.matrice[2][1] == tris.giocatore2) {
                if (tris.matrice[2][0] == 0) {
                    r = 2;
                    c = 0;
                    caso++;
                }
            } else if (tris.matrice[2][0] == tris.giocatore2) {
                if (tris.matrice[2][1] == 0) {
                    r = 2;
                    c = 1;
                    caso++;
                }
            } else if (tris.matrice[1][1] == tris.giocatore2) {
                if (tris.matrice[0][0] == 0) {
                    r = 0;
                    c = 0;
                    caso++;
                }
            } else if (tris.matrice[0][0] == tris.giocatore2) {
                if (tris.matrice[1][1] == 0) {
                    r = 1;
                    c = 1;
                    caso++;
                }
            } else if (tris.matrice[0][2] == tris.giocatore2) {
                if (tris.matrice[1][2] == 0) {
                    r = 1;
                    c = 2;
                    caso++;
                }
            } else if (tris.matrice[1][2] == tris.giocatore2) {
                if (tris.matrice[0][2] == 0) {
                    r = 0;
                    c = 2;
                    caso++;
                }
            }
        } else if (tris.matrice[2][2] == tris.giocatore1) {
            if (tris.matrice[2][1] == tris.giocatore1) {
                if (tris.matrice[2][0] == 0) {
                    r = 2;
                    c = 0;
                    caso++;
                }
            } else if (tris.matrice[2][0] == tris.giocatore1) {
                if (tris.matrice[2][1] == 0) {
                    r = 2;
                    c = 1;
                    caso++;
                }
            } else if (tris.matrice[1][1] == tris.giocatore1) {
                if (tris.matrice[0][0] == 0) {
                    r = 0;
                    c = 0;
                    caso++;
                }
            } else if (tris.matrice[0][0] == tris.giocatore1) {
                if (tris.matrice[1][1] == 0) {
                    r = 1;
                    c = 1;
                    caso++;
                }
            } else if (tris.matrice[0][2] == tris.giocatore1) {
                if (tris.matrice[1][2] == 0) {
                    r = 1;
                    c = 2;
                    caso++;
                }
            } else if (tris.matrice[1][2] == tris.giocatore1) {
                if (tris.matrice[0][2] == 0) {
                    r = 0;
                    c = 2;
                    caso++;
                }
            }
        }
        if (caso == 0) {
            if (tris.mossa == 5) {
                if (tris.modalita == "difficile") {
                    if (!tris.iniziaGiocatore1) {
                        if (tris.matrice[1][1] == tris.giocatore2 && tris.matrice[0][0] == tris.giocatore2 && tris.matrice[0][1] == tris.giocatore1 && tris.matrice[2][2] == tris.giocatore1) {
                            if (Math.floor(Math.random() * 2)) {
                                r = 1;
                                c = 0;
                            } else {
                                r = 2;
                                c = 0;
                            }
                        } else if (tris.matrice[1][1] == tris.giocatore2 && tris.matrice[0][0] == tris.giocatore2 && tris.matrice[1][0] == tris.giocatore1 && tris.matrice[2][2] == tris.giocatore1) {
                            if (Math.floor(Math.random() * 2)) {
                                r = 0;
                                c = 1;
                            } else {
                                r = 0;
                                c = 2;
                            }
                        } else if (tris.matrice[1][1] == tris.giocatore2 && tris.matrice[0][2] == tris.giocatore2 && tris.matrice[0][1] == tris.giocatore1 && tris.matrice[2][0] == tris.giocatore1) {
                            if (Math.floor(Math.random() * 2)) {
                                r = 1;
                                c = 2;
                            } else {
                                r = 2;
                                c = 2;
                            }
                        } else if (tris.matrice[1][1] == tris.giocatore2 && tris.matrice[0][2] == tris.giocatore2 && tris.matrice[1][2] == tris.giocatore1 && tris.matrice[2][0] == tris.giocatore1) {
                            if (Math.floor(Math.random() * 2)) {
                                r = 0;
                                c = 0;
                            } else {
                                r = 0;
                                c = 1;
                            }
                        } else if (tris.matrice[1][1] == tris.giocatore2 && tris.matrice[2][2] == tris.giocatore2 && tris.matrice[0][0] == tris.giocatore1 && tris.matrice[1][2] == tris.giocatore1) {
                            if (Math.floor(Math.random() * 2)) {
                                r = 2;
                                c = 0;
                            } else {
                                r = 2;
                                c = 1;
                            }
                        } else if (tris.matrice[1][1] == tris.giocatore2 && tris.matrice[2][2] == tris.giocatore2 && tris.matrice[0][0] == tris.giocatore1 && tris.matrice[2][1] == tris.giocatore1) {
                            if (Math.floor(Math.random() * 2)) {
                                r = 0;
                                c = 2;
                            } else {
                                r = 1;
                                c = 2;
                            }
                        } else if (tris.matrice[1][1] == tris.giocatore2 && tris.matrice[2][0] == tris.giocatore2 && tris.matrice[0][2] == tris.giocatore1 && tris.matrice[1][0] == tris.giocatore1) {
                            if (Math.floor(Math.random() * 2)) {
                                r = 2;
                                c = 1;
                            } else {
                                r = 2;
                                c = 2;
                            }
                        } else if (tris.matrice[1][1] == tris.giocatore2 && tris.matrice[2][0] == tris.giocatore2 && tris.matrice[0][2] == tris.giocatore1 && tris.matrice[2][1] == tris.giocatore1) {
                            if (Math.floor(Math.random() * 2)) {
                                r = 0;
                                c = 0;
                            } else {
                                r = 1;
                                c = 0;
                            }
                        } else {
                            do {
                                var r = Math.floor(Math.random() * tris.righe);
                                var c = Math.floor(Math.random() * tris.colonne);
                            } while (tris.matrice[r][c] != 0);
                        }
                    } else {
                        if (tris.matrice[1][1] == tris.giocatore1 && tris.matrice[0][0] == tris.giocatore1 && tris.matrice[0][1] == tris.giocatore2 && tris.matrice[2][2] == tris.giocatore2) {
                            if (Math.floor(Math.random() * 2)) {
                                r = 1;
                                c = 0;
                            } else {
                                r = 2;
                                c = 0;
                            }
                        } else if (tris.matrice[1][1] == tris.giocatore1 && tris.matrice[0][0] == tris.giocatore1 && tris.matrice[1][0] == tris.giocatore2 && tris.matrice[2][2] == tris.giocatore2) {
                            if (Math.floor(Math.random() * 2)) {
                                r = 0;
                                c = 1;
                            } else {
                                r = 0;
                                c = 2;
                            }
                        } else if (tris.matrice[1][1] == tris.giocatore1 && tris.matrice[0][2] == tris.giocatore1 && tris.matrice[0][1] == tris.giocatore2 && tris.matrice[2][0] == tris.giocatore2) {
                            if (Math.floor(Math.random() * 2)) {
                                r = 1;
                                c = 2;
                            } else {
                                r = 2;
                                c = 2;
                            }
                        } else if (tris.matrice[1][1] == tris.giocatore1 && tris.matrice[0][2] == tris.giocatore1 && tris.matrice[1][2] == tris.giocatore2 && tris.matrice[2][0] == tris.giocatore2) {
                            if (Math.floor(Math.random() * 2)) {
                                r = 0;
                                c = 0;
                            } else {
                                r = 0;
                                c = 1;
                            }
                        } else if (tris.matrice[1][1] == tris.giocatore1 && tris.matrice[2][2] == tris.giocatore1 && tris.matrice[0][0] == tris.giocatore2 && tris.matrice[1][2] == tris.giocatore2) {
                            if (Math.floor(Math.random() * 2)) {
                                r = 2;
                                c = 0;
                            } else {
                                r = 2;
                                c = 1;
                            }
                        } else if (tris.matrice[1][1] == tris.giocatore1 && tris.matrice[2][2] == tris.giocatore1 && tris.matrice[0][0] == tris.giocatore2 && tris.matrice[2][1] == tris.giocatore2) {
                            if (Math.floor(Math.random() * 2)) {
                                r = 0;
                                c = 2;
                            } else {
                                r = 1;
                                c = 2;
                            }
                        } else if (tris.matrice[1][1] == tris.giocatore1 && tris.matrice[2][0] == tris.giocatore1 && tris.matrice[0][2] == tris.giocatore2 && tris.matrice[1][0] == tris.giocatore2) {
                            if (Math.floor(Math.random() * 2)) {
                                r = 2;
                                c = 1;
                            } else {
                                r = 2;
                                c = 2;
                            }
                        } else if (tris.matrice[1][1] == tris.giocatore1 && tris.matrice[2][0] == tris.giocatore1 && tris.matrice[0][2] == tris.giocatore2 && tris.matrice[2][1] == tris.giocatore2) {
                            if (Math.floor(Math.random() * 2)) {
                                r = 0;
                                c = 0;
                            } else {
                                r = 1;
                                c = 0;
                            }
                        } else {
                            do {
                                var r = Math.floor(Math.random() * tris.righe);
                                var c = Math.floor(Math.random() * tris.colonne);
                            } while (tris.matrice[r][c] != 0);
                        }
                    }
                } else {
                    do {
                        var r = Math.floor(Math.random() * tris.righe);
                        var c = Math.floor(Math.random() * tris.colonne);
                    } while (tris.matrice[r][c] != 0);
                }
            } else {
                do {
                    var r = Math.floor(Math.random() * tris.righe);
                    var c = Math.floor(Math.random() * tris.colonne);
                } while (tris.matrice[r][c] != 0);
            }
        }
    } else {
        do {
            var r = Math.floor(Math.random() * tris.righe);
            var c = Math.floor(Math.random() * tris.colonne);
        } while (tris.matrice[r][c] != 0);
    }

    tris.matrice[r][c] = tris.segno;
    document.getElementById(r * tris.righe + c).innerHTML += tris.segno;
    document.getElementById(r * tris.righe + c).removeAttribute("onclick");
    tris.cambiaSegno();

    tris.vincitore = tris.controlla();
    if (tris.vincitore != 2)
        vittoria();

    tris.controllaMatricePiena();

    tris.mossa++;
}

tris.probabilita = function () {
    var n = Math.floor(Math.random() * 100);
    if (tris.modalita == "difficile")
        if (n < 95)
            return true;
        else
            return false;
    else if (tris.modalita = "normale")
        if (n < 60)
            return true;
        else
            return false;
    else if (tris.modalita = "facile")
        if (n < 10)
            return true;
        else
            return false;
}

tris.controllaMatricePiena = function () {
    var cont = 0;
    for (var r = 0; r < tris.righe; r++) {
        for (var c = 0; c < tris.colonne; c++) {
            if (tris.matrice[r][c] != 0)
                cont++;
        }
    }
    if (cont == tris.righe * tris.colonne) {
        if (!tris.finePartita) {
            creaTastoRigioca();
            pareggio();
        }
        //se la matrice è piena finisce la partita
        tris.finePartita = true;
    }

}

tris.cambiaSegno = function () {
    if (tris.segno == "x")
        tris.segno = "o";
    else
        tris.segno = "x";
}

tris.chiDeveIniziare = function () {
    if (tris.iniziaGiocatore1) { //se 0 inizia g1   se 1 inizia cpu o avversario(g2)
        if (tris.modalita != "1 VS 1") {
            tris.mossaCPU(); //g1 o   g2(CPU) x
        }
    }
}

function gioca() {
    var strEasy = "facile";
    var strNormal = "normale";
    var strHard = "difficile";
    var str1vs1 = "1 VS 1";

    g1 = 'x';
    g2 = 'o';

    // document.getElementsByTagName("div")[1].remove();
    document.getElementById("titoloGiocoSchermataIniziale").remove();

    document.getElementById("bottone-gioca").style.display = 'none';
    document.getElementById("bottone-gioca").style.visibility = "hidden";

    var str = '<div class="alert alert-secondary" id="menù-container">' +
        '<div style="border-right:2px solid black" class="row menù-scelta">' +
        '<h2>Seleziona la modalità di gioco.</h2>' +
        '<div class="row menù-scelta">' +
        '<button class="btn" id="bottone-facile" onclick="start(\'' + strEasy + '\')">FACILE</button>' +
        '<button class="btn" id="bottone-normale" onclick="start(\'' + strNormal + '\')">NORMALE</button>' +
        '<button class="btn" id="bottone-difficile" onclick="start(\'' + strHard + '\')">DIFFICILE</button>' +
        '</div>' +
        '</div>' +
        '<div class="row menù-scelta">' +
        '<h2>Affronta un amico: </h2>' +
        '<div class="row menù-scelta">' +
        '<button class="btn" id="bottone-1vs1" onclick="start(\'' + str1vs1 + '\')">1 VS 1</button>' +
        '</div>' +
        '</div>' +
        '</div>';
    document.getElementById("box-2").innerHTML += str;
    document.getElementById("row-3").innerHTML += '<div class="row alert alert-dark">' +
        '<div class="testoAlCentro" class="col">' +
        'Seleziona il segno da usare:' +
        '<div style="padding:10px" class="opzione">' +
        '<img id="x" class="img evidenziato" src="immagini/x.png" onclick="evidenzia(this)"></img>' +
        '<img id="o" class="img" src="immagini/o.png" onclick="evidenzia(this)"></img>' +
        '</div>' +
        '</div>' +
        '<div class="testoAlCentro" class="col">' +
        'Giocatore 2 / CPU:' +
        '<div style="padding:10px" class="opzione">' +
        '<img class="img" src="immagini/o.png"></img>' +
        '</div>' +
        '</div>' +
        '</div>';
}

function evidenzia(segno) {
    if (segno.id == 'x') {
        g1 = 'x';
        g2 = 'o';
        document.getElementById("row-3").innerHTML = '<div class="row alert alert-dark">' +
            '<div class="testoAlCentro" class="col">' +
            'Seleziona il segno da usare:' +
            '<div style="padding:10px" class="opzione">' +
            '<img id="x" class="img evidenziato" src="immagini/x.png" onclick="evidenzia(this)"></img>' +
            '<img id="o" class="img" src="immagini/o.png" onclick="evidenzia(this)"></img>' +
            '</div>' +
            '</div>' +
            '<div class="testoAlCentro" class="col">' +
            'Giocatore 2 / CPU:' +
            '<div style="padding:10px" class="opzione">' +
            '<img class="img" src="immagini/o.png"></img>' +
            '</div>' +
            '</div>' +
            '</div>';
    } else {
        g1 = 'o';
        g2 = 'x';
        document.getElementById("row-3").innerHTML = '<div class="row alert alert-dark">' +
            '<div class="testoAlCentro" class="col">' +
            'Seleziona il segno da usare:' +
            '<div style="padding:10px" class="opzione">' +
            '<img id="x" class="img" src="immagini/x.png" onclick="evidenzia(this)"></img>' +
            '<img id="o" class="img evidenziato" src="immagini/o.png" onclick="evidenzia(this)"></img>' +
            '</div>' +
            '</div>' +
            '<div class="testoAlCentro" class="col">' +
            'Giocatore 2 / CPU:' +
            '<div style="padding:10px" class="opzione">' +
            '<img class="img" src="immagini/x.png"></img>' +
            '</div>' +
            '</div>' +
            '</div>';
    }
}

function start(tdClass) {
    if (!tris.rigioca) {
        document.getElementById("bottone-facile").style.display = 'none';
        document.getElementById("bottone-facile").style.visibility = "hidden";
        document.getElementById("bottone-normale").style.display = 'none';
        document.getElementById("bottone-normale").style.visibility = "hidden";
        document.getElementById("bottone-difficile").style.display = 'none';
        document.getElementById("bottone-difficile").style.visibility = "hidden";
        document.getElementById("menù-container").style.display = 'none';
        document.getElementById("menù-container").style.visibility = "hidden";
    }
    tris.creaTabella(tdClass);
    tris.settings();
    tris.chiDeveIniziare();
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

function pareggio() {
    document.getElementById("row-3").innerHTML = '<div class="alert alert-secondary" id="vittoria-sconfitta">' +
        '<strong>Pareggio</strong>' +
        '</div>';
}

function togliOnClick() {
    var cont = 0;
    for (var i = 0; i < tris.righe; i++)
        for (var k = 0; k < tris.colonne; k++) {
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
    var mod = tris.modalita;
    tris.rigioca = true;
    document.getElementById("container").remove();
    creaScheletro();
    document.getElementById("bottone-gioca").style.display = 'none';
    document.getElementById("bottone-gioca").style.visibility = "hidden";
    start(mod);
}

function crea() {
    document.getElementById("areaCentralePagina").innerHTML = '<div id="titoloGiocoSchermataIniziale" class="container text-center my-5 titolo">' +
        '1 2 2 2 2 2 TRIS 2 2 2 2 2 9' +
        '</div>';
    creaScheletro();

}

function creaScheletro() {
    // document.getElementById("areaCentralePagina").innerHTML +=
    //     '<div class="container-fluid" id="container">' +
    //     '<div class="row" id="row-2">' +
    //     '<div class="col-md-3" id="box-1">' +
    //     '</div>' +
    //     '<div class="col-md-6" id="box-2">' +
    //     '<button id="bottone-gioca" onclick="gioca()">GIOCA</button>' +
    //     '</div>' +
    //     '<div class="col-3 alert alert-secondary" id="box-3">' +
    //     '<div id="box-3-modalità">' +
    //     '</div>' +
    //     '</div>' +
    //     '</div>' +
    //     '<div class="row" id="row-3">' +
    //     '</div>' +
    //     '</div>';
    document.getElementById("areaCentralePagina").innerHTML +=
        '<div class="container" id="container">' +


        '<div class="row text-center" id="row-3">' +
        '</div>' +


        '<div class="row justify-content-between" id="row-2">' +

        '<div class="col-lg-3 align-self-center order-1  d-flex justify-content-center flex-wrap" id="box-1">' +
        '</div>' +

        '<div class="col-lg-6 d-flex justify-content-center order-2" id="box-2">' +
        '<button id="bottone-gioca" onclick="gioca()">GIOCA</button>' +
        '</div>' +

        '<div class="col-lg-3 align-self-center order-3" id="box-3">' +
        '<div id="box-3-modalità">' +
        '</div>' +
        '</div>' +

        '</div>' +


        '</div>';
}