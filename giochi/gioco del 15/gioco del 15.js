
function Gioco15() {
    let matriceCaselle = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 0]
    ];
    this.timeId;
    this.secondiTrascorsi;
    let dimensioneTabella = 4;
    this.mosseEffettuate;

    // this.schermataIniziale = function () {  // mostra la schermata iniziale prima di avviare la partita
    //     document.getElementById("titolo2").innerHTML = "Premi il bottone per iniziare una nuova partita";
    // }

    this.creaTabellaGioco = function () {   // crea la tabella html per il gioco
        let strTab = "<table>";
        for (let r = 0; r < dimensioneTabella; r++) {
            strTab += "<tr>";
            for (let c = 0; c < dimensioneTabella; c++) {
                strTab += "<td></td>";
            }
            strTab += "</tr>";
        }
        strTab += "</table>";
        document.getElementById("tabellaGioco").innerHTML += strTab;
        // document.getElementById("titolo2").innerHTML = "Premi su una casella vicina a quella vuota per spostarla";
        this.stileTabella();
        this.assegnaId();   // assegna l'id dalla matrice alle celle
        this.testoCellaDaId();               // inserisce nella tabella l'id come testo
        this.mischia();                      // mischia la matrice
    }

    this.stileTabella = function () {  // imposta gli stili della tabella
        // document.getElementById("tabellaGioco").align = "center";
        // document.getElementById("tabellaGioco").style.padding = "30px";
        // document.getElementById("tabellaGioco").style.font = "bold 22px arial,serif";

        let tabella = document.getElementById("tabellaGioco").getElementsByTagName("table")[0];
        // tabella.style.margin = "10px";
        // tabella.style.border = "10px solid rgb(88,88,88)";
        let elencoCelleTabella = document.getElementById("tabellaGioco").getElementsByTagName("td");
        for (let i = 0; i < dimensioneTabella ** 2; i++) {
            elencoCelleTabella[i].onclick = function () {
                gioco.controllaCellaScelta(this);
            }
        }
    }

    this.controllaCellaScelta = function (casella) {
        if (casella.id != "0") {    // controlla che non sia stata premuta la casella vuota
            if (this.casellaVicina(casella)) {
                this.spostaNellaCellaVuota(casella);
                this.assegnaId();
                this.testoCellaDaId();
            }
        }
    }

    this.mischia = function () {    // mischia la matrice
        var c1, c2, r1, r2, temp;
        for (let cont = 0; cont < 50; cont++) {
            r1 = Math.floor(Math.random() * dimensioneTabella);
            r2 = Math.floor(Math.random() * dimensioneTabella);
            c1 = Math.floor(Math.random() * dimensioneTabella);
            c2 = Math.floor(Math.random() * dimensioneTabella);
            temp = matriceCaselle[r1][c1];
            matriceCaselle[r1][c1] = matriceCaselle[r2][c2];
            matriceCaselle[r2][c2] = temp;
        }

        matriceCaselle = [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12],
            [13, 14, 0, 15]
        ];
        
        this.assegnaId();  // assegna l'id dalla matrice alle celle
        this.testoCellaDaId();   // inserisce nella tabella l'id come testo
        this.secondiTrascorsi = 0;   // resetta i valori per iniziare una nuova partita
        this.mosseEffettuate = 0;
        this.mostraTempoTrascorso();
        clearInterval(this.timeId);
        this.timeId = setInterval(this.mostraTempoTrascorso, 1000);
    }

    this.mostraTempoTrascorso = function () {
        document.getElementById("box-3-tempoTrascorso").innerHTML = `<strong>Tempo trascorso: </strong>${gioco.secondiTrascorsi} secondi`;
        gioco.secondiTrascorsi++;
    }

    this.controllaVincita = function () {   // controlla e mostra il messaggio di vincita
        let matriceCorretta = [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12],
            [13, 14, 15, 0]
        ];
        if (this.confrontaMatrici(matriceCorretta)) {
            document.getElementById("row-3").innerHTML = '<div class="alert alert-success" id="vittoria-sconfitta">' +
                `<strong>Complimenti! Hai completato il gioco in ${this.secondiTrascorsi} secondi e ${this.mosseEffettuate} mosse</strong>` +
                '</div>';
            clearInterval(this.timeId);
            this.togliOnClick();
            creaTastoRigioca();
        }
    }
    this.togliOnClick = function () {
        var cont = 0;
        let elencoCelleTabella = document.getElementById("tabellaGioco").getElementsByTagName("td");
        for (var i = 0; i < dimensioneTabella; i++)
            for (var k = 0; k < dimensioneTabella; k++) {
                // document.getElementById(cont).removeAttribute("onclick");
                elencoCelleTabella[cont].onclick = null;
                cont++;
            }
    }
    

    this.confrontaMatrici = function (matriceCorretta) {    // controlla se la matrice corrente corrisponda a quella della vincita
        for (let i = 0; i < dimensioneTabella; i++) {
            for (let j = 0; j < dimensioneTabella; j++) {
                if (matriceCorretta[i][j] != matriceCaselle[i][j])
                    return false;
            }
        }
        return true;
    }

    this.assegnaId = function () {  // inserisce nella tabella l'id come testo
        let elencoCelleTabella = document.getElementById("tabellaGioco").getElementsByTagName("td");
        let i = 0;
        for (let r = 0; r < dimensioneTabella; r++) {
            for (let c = 0; c < dimensioneTabella; c++) {
                elencoCelleTabella[i].id = matriceCaselle[r][c];
                i++;
            }
        }
    }

    this.spostaNellaCellaVuota = function (casella) {   // scambia l'elemento premuto con la cella vuota nella matrice
        var rCellaVuota, cCellaVuota, rCellaScelta, cCellaScelta;
        for (let r = 0; r < dimensioneTabella; r++) {
            for (let c = 0; c < dimensioneTabella; c++) {
                if (matriceCaselle[r][c] == 0) {    // trova la posizione della cella vuota nella matrice
                    rCellaVuota = r;
                    cCellaVuota = c;
                }
                if (matriceCaselle[r][c] == casella.id) {   // trova la posizione nella matrice della cella premuta
                    rCellaScelta = r;
                    cCellaScelta = c;
                }
            }
        }
        let temp = matriceCaselle[rCellaVuota][cCellaVuota];
        matriceCaselle[rCellaVuota][cCellaVuota] = matriceCaselle[rCellaScelta][cCellaScelta];
        matriceCaselle[rCellaScelta][cCellaScelta] = temp;
        this.mosseEffettuate++;
        document.getElementById("box-3-mosseEffettuate").innerHTML = `<strong>Mosse effettuate: </strong>${gioco.mosseEffettuate}`;
        this.controllaVincita(); // controlla se è stato completato correttamente
    }

    this.casellaVicina = function (casella) {       // controlla che la casella premuta sia vicina alla cella vuota
        var rCellaVuota, cCellaVuota, rCellaScelta, cCellaScelta;
        for (let r = 0; r < dimensioneTabella; r++) {
            for (let c = 0; c < dimensioneTabella; c++) {
                if (matriceCaselle[r][c] == 0) {
                    rCellaVuota = r;
                    cCellaVuota = c;
                }
                if (matriceCaselle[r][c] == casella.id) {
                    rCellaScelta = r;
                    cCellaScelta = c;
                }
            }
        }

        if (rCellaVuota == rCellaScelta) {      // se sono sulla stessa riga controlla la colonna
            let differenza = cCellaVuota - cCellaScelta;  // differenza tra cella scelta e cella vuota per trovare la distanza
            differenza = Math.abs(differenza);      // prende il valore assoluto
            if (differenza == 1) {      // se la distanza dalla cella vuota è 1 è una cella vicina
                return true;
            }
        }
        else if (cCellaVuota == cCellaScelta) {      // se sono sulla stessa colonna controlla la riga
            let differenza = rCellaVuota - rCellaScelta;  // differenza tra cella scelta e cella vuota per trovare la distanza
            differenza = Math.abs(differenza);      // prende il valore assoluto
            if (differenza == 1) {      // se la distanza dalla cella vuota è 1 è una cella vicina
                return true;
            }
        }
        return false;
    }

    this.testoCellaDaId = function () {                                     // scrive nella cella l'id (numero) della cella
        let elencoCelleTabella = document.getElementById("tabellaGioco").getElementsByTagName("td");    // elenco di tutti i td (celle) della tabella
        for (let i = 0; i < dimensioneTabella ** 2; i++) {
            idCella = elencoCelleTabella[i].id;                     // prende l'id della cella
            if (idCella != 0)
                elencoCelleTabella[i].innerHTML = idCella;          // mette l'id nella cella come testo
            else
                elencoCelleTabella[i].innerHTML = " ";              // lo zero è il blocco vuoto del gioco
        }
    }


}

function crea() {
    document.getElementsByTagName("body")[0].innerHTML += '<div class="container text-center my-5 titolo">' +
        '1 2 2 GIOCO DEL QUINDICI 2 2 9' +
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
        '<div class="col-md-6" id="box-2"><div id="tabellaGioco"></div>' +
        // '<div class="col-md-6" id="tabellaGioco">' +
        '<button id="bottone-gioca" onclick="gioca()">GIOCA</button>' +
        '</div>' +
        '<div class="col-3 alert alert-secondary" id="box-3">' +
        // '<div id="box-3-modalità">' +
        // '</div>' +
        '<div id="box-3-tempoTrascorso">' +
        '</div>' +
        '<div id="box-3-mosseEffettuate">' +
        '</div>' +
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

    document.getElementById("box-3").style.visibility = "visible";
    gioco.mosseEffettuate = 0;
    document.getElementById("box-3-mosseEffettuate").innerHTML = `<strong>Mosse effettuate: </strong>${gioco.mosseEffettuate}`;

    gioco.creaTabellaGioco();
    document.getElementById("box-1").innerHTML = '<div class="bottone-menù" onclick="tornaAlMenu()">' +
        '<button id="bottone-tornaAlMenù">TORNA AL MENU</button>' +
        '</div>';
}

function tornaAlMenu() {
    document.getElementById("container").remove();
    clearInterval(gioco.timeId);
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
