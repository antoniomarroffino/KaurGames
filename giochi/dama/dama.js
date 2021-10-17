function GiocoDama() {
	let turno;
	let toccoEffettuato;
	let rTocco;
	let cTocco;
	let lato = 8;
	let timeId;
	let secondiTrascorsi = 0;
	let partitaInCorso;
	let mosseDisponibili;
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
		secondiTrascorsi = 0;
		partitaInCorso = true;
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
		clearInterval(timeId);
		timeId = setInterval(mostraTempoTrascorso, 1000);
		this.posiziona();
		stringaGiocatoreCorrente();
	}

	let mostraTempoTrascorso = function () {
		document.getElementById("box-3-tempoTrascorso").innerHTML = `<strong>Tempo trascorso: </strong>${secondiTrascorsi} secondi`;
		secondiTrascorsi++;
	}
	this.azzeraTimeId = function () {
		clearInterval(timeId);
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
					if (matrice[i][c] == 1 || matrice[i][c] == 3) {
						colore = "white";
					}
					else if (matrice[i][c] == 2 || matrice[i][c] == 4) {
						colore = "black";
					}
					if (matrice[i][c] == 1 || matrice[i][c] == 2) {
						elencocelle[j].innerHTML = `<div class="pedina${colore}"> </div>`;
					}
					else {
						elencocelle[j].innerHTML = `<div class="dama${colore}"> </div>`;
					}
				}
				j++;
				k++;
			}
		}
	}

	this.muovi = function (cellaid) {
		let r = parseInt(cellaid / lato);
		let c = cellaid % lato;

		if (partitaInCorso) {
			if (toccoEffettuato == 0) {
				rTocco = r;
				cTocco = c;
				if (matrice[r][c] == turno || matrice[r][c] == turno + 2) {
					toccoEffettuato = 1;
				}
			}
			else {
				if (turno == 1) {
					spostaPedina(r, c, matrice[rTocco][cTocco], rTocco, cTocco);
				}
				else if (turno == 2) {
					spostaPedina(r, c, matrice[rTocco][cTocco], rTocco, cTocco);
				}
			}

			if (toccoEffettuato == 1) {
				this.posiziona();
				evidenzia(rTocco, cTocco);
			}
			// controllaPossibileVittoria();
		}
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
				else if (giocatore == 3 || giocatore == 4) {
					mangia1(r, c, rTocco, cTocco);
					mangia2(r, c, rTocco, cTocco);
				}
			}
		}
		else if (matrice[r][c] == turno || matrice[r][c] == turno + 2) {
			rTocco = r;
			cTocco = c;
		}
	}


	let cambiaGiocatore = function () {				// cambia il turno del giocatore dopo la mossa
		mosseDisponibili = false;
		controllaDamaDoppia();
		toccoEffettuato = 0;
		if (turno == 1) {
			turno = 2;
		}
		else if (turno == 2) {
			turno = 1;
		}
		giocodama.posiziona();
		stringaGiocatoreCorrente();
		mosseDisponibili = controllaSePossibiliMosse(turno);
		if (mosseDisponibili == false) {
			console.log("non sono disponibili mosse");
			if (turno == 1) stampaStringaVittoria(2);
			else if (turno == 2) stampaStringaVittoria(1);
		}
	}
	// CONTROLLI PER VERIFICARE CHE SIANO DISPONIBILI ANCORA MOSSE PER IL GIOCATORE CORRENTE
	let controllaSePossibiliMosse = function (giocatore) {
		for (let r = 0; r < lato; r++) {
			for (let c = 0; c < lato; c++) {
				if (matrice[r][c] == giocatore) {
					if (giocatore == 1) {
						if (controllaSePossibiliMossePedinaGiocatore1(r, c, giocatore) == true) return true;
					}
					else if (giocatore == 2) {
						if (controllaSePossibiliMossePedinaGiocatore2(r, c, giocatore) == true) return true;
					}
				} else if (matrice[r][c] == giocatore + 2)
					if (controllaSePossibiliMosseDama(r, c, giocatore) == true) return true;
			}
		}
		return false;
	}
	let controllaSePossibiliMossePedinaGiocatore1 = function (r, c, giocatore) {
		let giocatoreAvversario;
		if (giocatore == 1)
			giocatoreAvversario = 2;
		else if (giocatore == 2)
			giocatoreAvversario = 1;

		if (r + 1 < lato) {
			if (c + 1 < lato) {
				if (matrice[r + 1][c + 1] == 0)
					return true;
				else if (c + 2 < lato && r + 2 < lato) {
					if ((matrice[r + 1][c + 1] == giocatoreAvversario || matrice[r + 1][c + 1] == giocatoreAvversario + 2) && matrice[r + 2][c + 2] == 0)
						return true;
				}
			}
			if (c - 1 >= 0) {
				if (matrice[r + 1][c - 1] == 0)
					return true;
				else if (c - 2 >= 0 && r + 2 < lato) {
					if ((matrice[r + 1][c - 1] == giocatoreAvversario || matrice[r + 1][c - 1] == giocatoreAvversario + 2) && matrice[r + 2][c - 2] == 0)
						return true;
				}
			}
		}
		return false;
	}
	let controllaSePossibiliMossePedinaGiocatore2 = function (r, c, giocatore) {
		let giocatoreAvversario;
		if (giocatore == 1)
			giocatoreAvversario = 2;
		else if (giocatore == 2)
			giocatoreAvversario = 1;

		if (r - 1 >= 0) {
			if (c + 1 < lato) {
				if (matrice[r - 1][c + 1] == 0) {
					return true;
				}
				else if (c + 2 < lato && r - 2 >= 0) {
					if ((matrice[r - 1][c + 1] == giocatoreAvversario || matrice[r - 1][c + 1] == giocatoreAvversario + 2) && matrice[r - 2][c + 2] == 0)
						return true;
				}
			}
			if (c - 1 >= 0) {
				if (matrice[r - 1][c - 1] == 0)
					return true;
				else if (c - 2 >= 0 && r - 2 >= 0) {
					if ((matrice[r - 1][c - 1] == giocatoreAvversario || matrice[r - 1][c - 1] == giocatoreAvversario + 2) && matrice[r - 2][c - 2] == 0)
						return true;
				}
			}
		}
		return false;
	}
	let controllaSePossibiliMosseDama = function (r, c, giocatore) {
		if (controllaSePossibiliMossePedinaGiocatore1(r, c, giocatore) == true) return true;
		if (controllaSePossibiliMossePedinaGiocatore2(r, c, giocatore) == true) return true;
		return false;
	}
	// -------------------------------------------------------------------------------------

	let stringaGiocatoreCorrente = function () {
		let colore;
		let coloreAvviso;
		if (turno == 1) {
			colore = "bianchi";
			coloreAvviso = "alert-light";
		}
		else {
			colore = "neri";
			coloreAvviso = "alert-dark";
		}
		document.getElementById("row-3").innerHTML = `<div class="alert ${coloreAvviso}" id="vittoria-sconfitta">` +
			`<strong>Turno del giocatore ${turno} (${colore})</strong>` +
			'</div>';
		document.getElementById("vittoria-sconfitta").style.fontSize = "2.2em";
	}

	let vicino = function (r, c, giocatore) {
		if (giocatore == 1) {						// pedine bianche solo in avanti
			if (Math.abs(cTocco - c) == 1 && r - rTocco == 1) {
				return true;
			}
		}
		else if (giocatore == 2) {					// pedine nere solo in avanti
			if (Math.abs(cTocco - c) == 1 && rTocco - r == 1) {
				return true;
			}
		}
		else if (giocatore == 3 || giocatore == 4) {						// dama sia in avanti che in dietro
			if (Math.abs(cTocco - c) == 1 && Math.abs(rTocco - r) == 1) {
				return true;
			}
		}
		return false;
	}

	let mangia1 = function (r, c, rPrec, cPrec) {
		let giocatoreAvversario;
		if (turno == 1) {
			giocatoreAvversario = 2;
		}
		else if (turno == 2) {
			giocatoreAvversario = 1;
		}
		if (Math.abs(cPrec - c) == 2 && r - rPrec == 2) {
			if (c > cPrec) {
				if (matrice[r - 1][c - 1] == giocatoreAvversario || matrice[r - 1][c - 1] == giocatoreAvversario + 2) {
					let temp = matrice[r][c];
					matrice[r][c] = matrice[rPrec][cPrec];
					matrice[rPrec][cPrec] = temp;
					matrice[r - 1][c - 1] = 0;
					cambiaGiocatore();
				}
			}
			else {
				if (matrice[r - 1][c + 1] == giocatoreAvversario || matrice[r - 1][c + 1] == giocatoreAvversario + 2) {
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
		let giocatoreAvversario;
		if (turno == 1) {
			giocatoreAvversario = 2;
		}
		else if (turno == 2) {
			giocatoreAvversario = 1;
		}
		if (Math.abs(cPrec - c) == 2 && rPrec - r == 2) {
			if (c > cPrec) {
				if (matrice[r + 1][c - 1] == giocatoreAvversario || matrice[r + 1][c - 1] == giocatoreAvversario + 2) {
					let temp = matrice[r][c];
					matrice[r][c] = matrice[rPrec][cPrec];
					matrice[rPrec][cPrec] = temp;
					matrice[r + 1][c - 1] = 0;
					cambiaGiocatore();
				}
			}
			else {
				if (matrice[r + 1][c + 1] == giocatoreAvversario || matrice[r + 1][c + 1] == giocatoreAvversario + 2) {
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

	// let controllaRimaste = function (tipo) {
	// 	for (let r = 0; r < lato; r++) {
	// 		for (let c = 0; c < lato; c++) {
	// 			if (matrice[r][c] == tipo || matrice[r][c] == tipo + 2) {
	// 				return false;
	// 			}
	// 		}
	// 	}
	// 	return true;
	// }
	// let controllaPossibileVittoria = function () {			// controlla possibili vittorie
	// 	if (controllaRimaste(1)) {
	// 		stampaStringaVittoria(1);
	// 	}
	// 	else if (controllaRimaste(2)) {
	// 		stampaStringaVittoria(2);
	// 	}
	// }
	let stampaStringaVittoria = function (giocatore) {
		let colore;
		if (giocatore == 1) {
			colore = "bianco";
		}
		else if (giocatore == 2) {
			colore = "nero";
		}
		document.getElementById("row-3").innerHTML = `<div class="alert alert-success" id="vittoria-sconfitta">` +
			`<strong>Ha vinto il giocatore ${giocatore}! (${colore})</strong>` +
			'</div>';
		document.getElementById("vittoria-sconfitta").style.fontSize = "3.0em";
		creaTastoRigioca();
		clearInterval(timeId);
		partitaInCorso = false;
	}


	// EVIDENZIA LE POSSE POSSIBILI AL CLICK DELLA PEDINA
	let evidenziaMossePossibili = function (r, c, giocatore) {
		if (matrice[r][c] == 1) {
			evidenziaMossePedinaGiocatore1(r, c, giocatore);
		}
		else if (matrice[r][c] == 2) {
			evidenziaMossePedinaGiocatore2(r, c, giocatore);
		}
		else if (matrice[r][c] == 3 || matrice[r][c] == 4) {
			evidenziaMosseDama(r, c, giocatore);
		}
	}
	let evidenziaMossePedinaGiocatore1 = function (r, c, giocatore) {
		let id;
		let giocatoreAvversario;
		if (giocatore == 1) {
			giocatoreAvversario = 2;
		}
		else if (giocatore == 2) {
			giocatoreAvversario = 1;
		}

		if (r + 1 < lato) {
			if (c + 1 < lato) {
				if (matrice[r + 1][c + 1] == 0) {
					id = ((r + 1) * lato) + c + 1;
					document.getElementById(id).style = "background-color:green";
				}
				else if (c + 2 < lato && r + 2 < lato) {
					if ((matrice[r + 1][c + 1] == giocatoreAvversario || matrice[r + 1][c + 1] == giocatoreAvversario + 2) && matrice[r + 2][c + 2] == 0) {
						id = ((r + 2) * lato) + c + 2;
						document.getElementById(id).style = "background-color:green";
					}
				}
			}
			if (c - 1 >= 0) {
				if (matrice[r + 1][c - 1] == 0) {
					id = ((r + 1) * lato) + c - 1;
					document.getElementById(id).style = "background-color:green";
				}
				else if (c - 2 >= 0 && r + 2 < lato) {
					if ((matrice[r + 1][c - 1] == giocatoreAvversario || matrice[r + 1][c - 1] == giocatoreAvversario + 2) && matrice[r + 2][c - 2] == 0) {
						id = ((r + 2) * lato) + c - 2;
						document.getElementById(id).style = "background-color:green";
					}
				}
			}
		}
	}
	let evidenziaMossePedinaGiocatore2 = function (r, c, giocatore) {
		let id;
		let giocatoreAvversario;
		if (giocatore == 1) {
			giocatoreAvversario = 2;
		}
		else if (giocatore == 2) {
			giocatoreAvversario = 1;
		}

		if (r - 1 >= 0) {
			if (c + 1 < lato) {
				if (matrice[r - 1][c + 1] == 0) {
					id = ((r - 1) * lato) + c + 1;
					document.getElementById(id).style = "background-color:green";
				}
				else if (c + 2 < lato && r - 2 >= 0) {
					if ((matrice[r - 1][c + 1] == giocatoreAvversario || matrice[r - 1][c + 1] == giocatoreAvversario + 2) && matrice[r - 2][c + 2] == 0) {
						id = ((r - 2) * lato) + c + 2;
						document.getElementById(id).style = "background-color:green";
					}
				}
			}
			if (c - 1 >= 0) {
				if (matrice[r - 1][c - 1] == 0) {
					id = ((r - 1) * lato) + c - 1;
					document.getElementById(id).style = "background-color:green";
				}
				else if (c - 2 >= 0 && r - 2 >= 0) {
					if ((matrice[r - 1][c - 1] == giocatoreAvversario || matrice[r - 1][c - 1] == giocatoreAvversario + 2) && matrice[r - 2][c - 2] == 0) {
						id = ((r - 2) * lato) + c - 2;
						document.getElementById(id).style = "background-color:green";
					}
				}
			}
		}
	}
	let evidenziaMosseDama = function (r, c, giocatore) {
		evidenziaMossePedinaGiocatore1(r, c, giocatore);
		evidenziaMossePedinaGiocatore2(r, c, giocatore);
	}
	// --------------------------------------------------

	let controllaDamaDoppia = function () {
		for (let i = 0; i < lato; i++) {
			if (matrice[0][i] == 2) {			// controlla se le pedine nere hanno raggiunto la base avversaria
				matrice[0][i] = 4;
			}
			if (matrice[lato - 1][i] == 1) {	// controlla se le pedine bianche hanno raggiunto la base avversaria
				matrice[lato - 1][i] = 3;
			}
		}
	}


}





function crea() {
	document.getElementById("areaCentralePagina").innerHTML = '<div id="titoloGiocoSchermataIniziale" class="container text-center my-5 titolo">' +
		'1 2 2 2 DAMA 2 2 2 9' +
		'</div>';
	creaScheletro();
}

function creaScheletro() {
	document.getElementById("areaCentralePagina").innerHTML +=
		'<div class="container-fluid" id="container">' +
		'<div class="row" id="row-2">' +
		'<div class="col-md-3" id="box-1">' +
		'</div>' +
		'<div class="col-md-6" id="box-2"><div id="giocodama"></div>' +
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
	// document.getElementsByTagName("div")[1].remove();
	document.getElementById("titoloGiocoSchermataIniziale").remove();

	document.getElementById("bottone-gioca").style.display = 'none';
	document.getElementById("bottone-gioca").style.visibility = "hidden";

	start();
}

function start() {
	document.getElementById("bottone-gioca").style.display = 'none';
	document.getElementById("bottone-gioca").style.visibility = "hidden";

	giocodama.creastruttura();

	document.getElementById("box-3").style.visibility = "visible";
	document.getElementById("box-3-tempoTrascorso").innerHTML = `<strong>Tempo trascorso: </strong>0 secondi`;

	document.getElementById("box-1").innerHTML = '<div class="bottone-menù" onclick="tornaAlMenu()">' +
		'<button id="bottone-tornaAlMenù">TORNA AL MENU</button>' +
		'</div>';
}

function tornaAlMenu() {
	giocodama.azzeraTimeId();
	document.getElementById("container").remove();
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
