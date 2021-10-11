
function GiochiPiuGiocati(idContenitore) {
    let istanza = this;
    let immagini = [
        "2048.png",
        "g3.png",
        "g7.png",
        "g5.png"
    ];
    let nomiGiochi = [
        "2048",
        "Campo minato",
        "Snake",
        "Dama"
    ];
    let linkPagineGiochi = [
        "giochi/2048/2048.html",
        "giochi/campo minato/campominato.html",
        "giochi/snake/snake.html",
        "giochi/dama/damakaur.html"
    ];
    let posImgCorrente = 0;
    let timeId;
    let nomeOggetto = idContenitore;
    let divContenitore = document.getElementById(nomeOggetto);

    this.mostraVisualizzatore = function () {
        let strVis = `<div id="${nomeOggetto}">`;
        // strVis += `<div class="divImmagine"><img class="immagine" src="" ></div>
        // <div style="padding: 20px;">
        //     <button class="bottoneIndietro" onclick="${nomeOggetto}.immaginePrecedente();">Indietro</button>
        //     <button class="bottonePresentazione" onclick="${nomeOggetto}.avviaPresentazione();">Avvia presentazione</button>
        //     <button class="bottoneAvanti" onclick="${nomeOggetto}.immagineSuccessiva();">Avanti</button>
        // </div>`;
        strVis += `<div class="titoloPiuGiocati">I più giocati</div>`;
        strVis += `<div class="divImmagine">
        <img class="immagine" src="" >`;
        strVis += `<div class="nomeGioco"><div>${nomiGiochi[posImgCorrente]}</div>
        <div><form action="${linkPagineGiochi[posImgCorrente]}"><button type="submit"
        class="btn btn-primary">Gioca Subito!</button></form></div>
        </div>
        </div>`;
        strVis += `<div class="bottoniAvantiIndietro btn-group"><button class="bottoneIndietro btn btn-secondary" onclick="${nomeOggetto}.immaginePrecedente();">Precedente</button>`;
        strVis += `<button class="bottoneAvanti btn btn-secondary" onclick="${nomeOggetto}.immagineSuccessiva();">Successivo</button></div>`;
        strVis += "</div>";

        document.getElementById("cont").innerHTML += strVis;
        divContenitore = document.getElementById(nomeOggetto);
        istanza.inserisciImmagine();
        this.avviaPresentazione();
    }


    this.inserisciImmagine = function () {
        divContenitore = document.getElementById(nomeOggetto);
        divContenitore.getElementsByClassName("divImmagine")[0].innerHTML = `<img class="immagine" src="" ><div class="nomeGioco">
        <div>${nomiGiochi[posImgCorrente]}</div>
        <div><form action="${linkPagineGiochi[posImgCorrente]}"><button type="submit"
        class="btn btn-primary">Gioca Subito!</button></form></div>
        </div>`;
        divContenitore.getElementsByClassName("immagine")[0].src = "img/" + immagini[posImgCorrente];
    }

    //---------------------------------------------------------
    this.immagineSuccessiva = function () {
        if (posImgCorrente + 1 < immagini.length)
            posImgCorrente++;
        else
            posImgCorrente = 0;
        istanza.inserisciImmagine();
    }

    this.immaginePrecedente = function () {
        if (posImgCorrente != 0)
            posImgCorrente--;
        else
            posImgCorrente = immagini.length - 1;
        istanza.inserisciImmagine();
    }

    //---------------------------------------------------------
    this.avviaPresentazione = function () {
        clearInterval(timeId);
        timeId = setInterval(istanza.immagineSuccessiva, 2000);
        // divContenitore = document.getElementById(nomeOggetto);
    //     divContenitore.getElementsByClassName("bottonePresentazione")[0].innerHTML = "Ferma presentazione";
    //     divContenitore.getElementsByClassName("bottonePresentazione")[0].onclick = function () { istanza.fermaPresentazione(); };
    }

    // this.fermaPresentazione = function () {
    //     clearInterval(timeId);
    //     divContenitore = document.getElementById(nomeOggetto);
    //     divContenitore.getElementsByClassName("bottonePresentazione")[0].innerHTML = "Avvia presentazione";
    //     divContenitore.getElementsByClassName("bottonePresentazione")[0].onclick = function () { istanza.avviaPresentazione(); };
    // }

}


