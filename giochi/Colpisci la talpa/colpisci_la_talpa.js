
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
        lunghezzaCampo = 700;
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
        document.getElementsByClassName("talpa")[0].className = "talpaColpita";
        punti++;
    }


}
