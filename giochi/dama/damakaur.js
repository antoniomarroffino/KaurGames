function GiocoDama() {
	let turno;
	let toccoEffettuato;
	// let rtocco1;
	// let ctocco1;
	// let rtocco2;
	// let ctocco2;
	let rTocco;
	let cTocco;
	let lato = 8;
	let matrice =
		[[1, 0, 1, 0, 1, 0, 1, 0],
		[0, 1, 0, 1, 0, 1, 0, 1],
		[1, 0, 1, 0, 1, 0, 1, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 2, 0, 2, 0, 2, 0, 2],
		[2, 0, 2, 0, 2, 0, 2, 0],
		[0, 2, 0, 2, 0, 2, 0, 2]];
	this.creastruttura = function () {
		matrice =
			[[1, 0, 1, 0, 1, 0, 1, 0],
			[0, 1, 0, 1, 0, 1, 0, 1],
			[1, 0, 1, 0, 1, 0, 1, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 2, 0, 2, 0, 2, 0, 2],
			[2, 0, 2, 0, 2, 0, 2, 0],
			[0, 2, 0, 2, 0, 2, 0, 2]];
		toccoEffettuato = 0;
		let colore;
		let j = 0;
		let cont = 0;
		let strTab = "<table>";
		for (let c = 0; c < lato; c++) {
			j++;
			strTab += "<tr>"
			for (let i = 0; i < lato; i++) {
				if (j % 2 == 0) {
					colore = "white";
				}
				else {
					colore = "brown";
				}
				strTab += "<td id='" + cont + "' onclick='giocodama.muovi(this.id)' style='background-color:" + colore + "' </td>";
				j++;
				cont++;
			}
			strTab += "</tr>"
		}
		strTab += "</tr></table>";
		document.getElementById("giocodama").innerHTML = strTab;
		turno = 1;
		this.posiziona();
	}

	this.posiziona = function () {
		let elencocelle = document.getElementsByTagName("td");
		let colore;
		let colcella;
		let j = 0;
		let k = 0;
		for (let i = 0; i < lato; i++) {
			k++;
			for (let c = 0; c < lato; c++) {
				if (k % 2 == 0) {
					colcella = "white";
				}
				else {
					colcella = "brown";
				}
				document.getElementById(j).style = `background-color:${colcella}`;

				if (matrice[i][c] == 0) {
					elencocelle[j].innerHTML = "";
				}
				else {
					if (matrice[i][c] == 1) {
						colore = "white";
					}
					else if (matrice[i][c] == 2) {
						colore = "black";
					}
					elencocelle[j].innerHTML = `<div class="pedina${colore}"> </div>`;
				}
				j++;
				k++;
			}
		}
	}

	this.muovi = function (cellaid) {
		let r = parseInt(cellaid / lato);
		let c = cellaid % lato;
		if (toccoEffettuato == 0) {
			rTocco = r;
			cTocco = c;
			if (matrice[r][c] == turno) {
				toccoEffettuato = 1;
			}
		}
		else {
			if (turno == 1) {
				spostaPedina(r, c, 1, rTocco, cTocco);
			}
			else if (turno == 2) {
				spostaPedina(r, c, 2, rTocco, cTocco);
			}
		}

		if (toccoEffettuato == 1) {
			this.posiziona();
			evidenzia(r, c);
		}
		vittoria();
	}

	let spostaPedina = function (r, c, giocatore, rPrec, cPrec) {
		if (matrice[r][c] == 0) {
			if (vicino(r, c, giocatore)) {
				let temp = matrice[r][c];
				matrice[r][c] = matrice[rPrec][cPrec];
				matrice[rPrec][cPrec] = temp;
				cambiaGiocatore();
			}
			else {
				if (giocatore == 1) {
					mangia1(r, c, rTocco, cTocco);
				}
				else if (giocatore == 2) {
					mangia2(r, c, rTocco, cTocco);
				}
			}
		}
		else if (matrice[r][c] == giocatore) {
			rTocco = r;
			cTocco = c;
		}
	}


	let cambiaGiocatore = function () {
		toccoEffettuato = 0;
		if (turno == 1) {
			turno = 2;
		}
		else if (turno == 2) {
			turno = 1;
		}
		giocodama.posiziona();
	}

	let vicino = function (r, c, giocatore) {
		if (giocatore == 1) {
			if (Math.abs(cTocco - c) == 1 && r - rTocco == 1) {
				return true;
			}
		}
		else if (giocatore == 2) {
			if (Math.abs(cTocco - c) == 1 && rTocco - r == 1) {
				return true;
			}
		}
		return false;
	}

	let mangia1 = function (r, c, rPrec, cPrec) {
		if (Math.abs(cPrec - c) == 2 && r - rPrec == 2) {
			if (c > cPrec) {
				if (matrice[r - 1][c - 1] == 2) {
					let temp = matrice[r][c];
					matrice[r][c] = matrice[rPrec][cPrec];
					matrice[rPrec][cPrec] = temp;
					matrice[r - 1][c - 1] = 0;
					cambiaGiocatore();
				}
			}
			else {
				if (matrice[r - 1][c + 1] == 2) {
					let temp = matrice[r][c];
					matrice[r][c] = matrice[rPrec][cPrec];
					matrice[rPrec][cPrec] = temp;
					matrice[r - 1][c + 1] = 0;
					cambiaGiocatore();
				}
			}
		}
	}

	let mangia2 = function (r, c, rPrec, cPrec) {
		if (Math.abs(cPrec - c) == 2 && rPrec - r == 2) {
			if (c > cPrec) {
				if (matrice[r + 1][c - 1] == 1) {
					let temp = matrice[r][c];
					matrice[r][c] = matrice[rPrec][cPrec];
					matrice[rPrec][cPrec] = temp;
					matrice[r + 1][c - 1] = 0;
					cambiaGiocatore();
				}
			}
			else {
				if (matrice[r + 1][c + 1] == 1) {
					let temp = matrice[r][c];
					matrice[r][c] = matrice[rPrec][cPrec];
					matrice[rPrec][cPrec] = temp;
					matrice[r + 1][c + 1] = 0;
					cambiaGiocatore();
				}
			}
		}
	}

	let evidenzia = function (r, c) {		// evidenzia la cella della pedina cliccata
		let id;
		if (toccoEffettuato == 1) {
			if (turno == 1) {
				id = (r * lato) + c;
				document.getElementById(id).style = "background-color:red";
			}
			else if (turno == 2) {
				id = (r * lato) + c;
				document.getElementById(id).style = "background-color:red";
			}
			evidenziaMossePossibili(r, c, turno);	// evidenzia le mosse che è possibile effettuare
		}
	}

	let controlla = function (tipo) {
		for (let r = 0; r < lato; r++) {
			for (let c = 0; c < lato; c++) {
				if (matrice[r][c] == tipo) {
					return false;
				}
			}
		}
		return true;
	}

	let vittoria = function () {			// controlla possibili vittorie
		if (controlla(1)) {
			console.log("ha vinto il giocatore 2");
		}
		else if (controlla(2)) {
			console.log("ha vinto il giocatore 1");
		}
	}


	let evidenziaMossePossibili = function (r, c, giocatore) {
		let id;
		if (giocatore == 1) {
			if (matrice[r + 1][c + 1] == 0) {
				id = ((r + 1) * lato) + c + 1;
				document.getElementById(id).style = "background-color:green";
			}
			else if (matrice[r + 1][c + 1] == 2 && matrice[r + 2][c + 2] == 0) {
				id = ((r + 2) * lato) + c + 2;
				document.getElementById(id).style = "background-color:green";
			}
			if (matrice[r + 1][c - 1] == 0) {
				id = ((r + 1) * lato) + c - 1;
				document.getElementById(id).style = "background-color:green";
			}
			else if (matrice[r + 1][c - 1] == 2 && matrice[r + 2][c - 2] == 0) {
				id = ((r + 2) * lato) + c - 2;
				document.getElementById(id).style = "background-color:green";
			}
		}
		else if (giocatore == 2) {
			if (matrice[r - 1][c + 1] == 0) {
				id = ((r - 1) * lato) + c + 1;
				document.getElementById(id).style = "background-color:green";
			}
			else if (matrice[r - 1][c + 1] == 1 && matrice[r - 2][c + 2] == 0) {
				id = ((r - 2) * lato) + c + 2;
				document.getElementById(id).style = "background-color:green";
			}
			if (matrice[r - 1][c - 1] == 0) {
				id = ((r - 1) * lato) + c - 1;
				document.getElementById(id).style = "background-color:green";
			}
			else if (matrice[r - 1][c - 1] == 1 && matrice[r - 2][c - 2] == 0) {
				id = ((r - 2) * lato) + c - 2;
				document.getElementById(id).style = "background-color:green";
			}
		}
	}


}





function crea() {
	document.getElementsByTagName("body")[0].innerHTML += '<div class="container text-center my-5 titolo">' +
		'1 2 2 2 DAMA 2 2 2 9' +
		'</div>';
	creaScheletro();
}

function creaScheletro() {
	document.getElementsByTagName("body")[0].innerHTML +=
		'<div class="container-fluid" id="container">' +
		'<div class="row" id="row-2">' +
		'<div class="col-md-3" id="box-1">' +
		'</div>' +
		'<div class="col-md-6" id="box-2"><div id="giocodama"></div>' +
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
		'<div id="box-3-secondaChance">' +
		'</div>' +
		'</div>';
}

function gioca() {
	document.getElementsByTagName("div")[1].remove();

	document.getElementById("bottone-gioca").style.display = 'none';
	document.getElementById("bottone-gioca").style.visibility = "hidden";

	start();
}

function start(r, c, m, tdClass) {
	giocodama.creastruttura();
	document.getElementById("box-1").innerHTML = '<div class="bottone-menù" onclick="tornaAlMenu()">' +
		'<button id="bottone-tornaAlMenù">TORNA AL MENU</button>' +
		'</div>';
}

function tornaAlMenu() {
	document.getElementById("container").remove();
	crea();
}
