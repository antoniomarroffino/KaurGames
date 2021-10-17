function creaHeader(pagina) {
    let str;
    let percorsoLogoSito;
    let percorsoHomeSito;
    let percorsoPagineCollegamenti;
    let paginaDaEvidenziare = [
        "",
        "",
        "",
        "",
        ""
    ];
    if (pagina == "index") {
        percorsoLogoSito = "img/logo.png";
        percorsoHomeSito = "index.html";
        percorsoPagineCollegamenti = "collegamenti/";
        paginaDaEvidenziare[0] = "active";

    }
    else if (pagina == "chi siamo") {
        percorsoLogoSito = "../img/logo.png";
        percorsoHomeSito = "../index.html";
        percorsoPagineCollegamenti = "";
        paginaDaEvidenziare[1] = "active";
    }
    else if (pagina == "dove siamo") {
        percorsoLogoSito = "../img/logo.png";
        percorsoHomeSito = "../index.html";
        percorsoPagineCollegamenti = "";
        paginaDaEvidenziare[2] = "active";
    }
    else if (pagina == "contatti") {
        percorsoLogoSito = "../img/logo.png";
        percorsoHomeSito = "../index.html";
        percorsoPagineCollegamenti = "";
        paginaDaEvidenziare[4] = "active";
    }
    else if (pagina == "gioco") {
        percorsoLogoSito = "../../img/logo.png";
        percorsoHomeSito = "../../index.html";
        percorsoPagineCollegamenti = "../../collegamenti/";
    }

    str = '' +
        '<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">' +

        '<div class="container">' +
        '<div class="row">' +
        '<div class="col-2">' +
        `<img id="logoImg" class="img-fluid" href="${percorsoHomeSito}" src="${percorsoLogoSito}">` +
        '</div>' +
        '<div class="col-4 title">' +
        `<a class="navbar-brand" href="${percorsoHomeSito}">Kaur Games</a>` +
        '</div>' +
        '<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">' +
        '<span class="navbar-toggler-icon"></span>' +
        '</button>' +

        '</div>' +

        '</div>' +

        '<div class="collapse navbar-collapse col-md-6 offset-1" id="navbarResponsive">' +
        '<ul class="navbar-nav ml-auto">' +
        `<li class="nav-item ${paginaDaEvidenziare[0]} mx-4">` +
        `<a class="nav-link" href="${percorsoHomeSito}">Home</a>` +
        '</li>' +
        `<li class="nav-item ${paginaDaEvidenziare[1]} mx-4">` +
        `<a class="nav-link text-nowrap" href="${percorsoPagineCollegamenti}chi_siamo.html">Chi siamo</a>` +
        '</li>' +
        `<li class="nav-item ${paginaDaEvidenziare[2]} mx-4">` +
        `<a class="nav-link text-nowrap" href="${percorsoPagineCollegamenti}dove_siamo.html">Dove siamo</a>` +
        '</li>' +
        `<li class="nav-item ${paginaDaEvidenziare[3]} mx-4">` +
        '<a class="nav-link" href="#">Giochi</a>' +
        '</li>' +
        `<li class="nav-item ${paginaDaEvidenziare[4]} mx-4">` +
        `<a class="nav-link" href="${percorsoPagineCollegamenti}contatti.html">Contatti</a>` +
        '</li>' +
        '</ul>' +
        '</div>' +

        '</nav>';
    str += '' +
        '</div>' +
        '</nav>';

    document.getElementsByTagName("body")[0].innerHTML = str;
}

function creaFooter(pagina) {
    let percorsoLogoSito;
    let percorsoPagineCollegamenti;
    if (pagina == "index") {
        percorsoLogoSito = "img/logo.png";
        percorsoPagineCollegamenti = "collegamenti/";
    }
    else if (pagina == "chi siamo" || pagina == "dove siamo" || pagina == "contatti") {
        percorsoLogoSito = "../img/logo.png";
        percorsoPagineCollegamenti = "";
    }
    else if (pagina == "gioco") {
        percorsoLogoSito = "../../img/logo.png";
        percorsoPagineCollegamenti = "../../collegamenti/";
    }

    document.getElementsByTagName("footer")[0].innerHTML = '' +
        '<div class="container-fluid pt-5 bg-dark">' +
        '<div class="row">' +
        '<!--  Primo box Footer-->' +
        '<div class="col-sm-4 mb-4">' +
        `<img class=" img-fluid logoFooter" src="${percorsoLogoSito}">` +
        '</div>' +
        '<!-- /Primo box Footer-->' +

        '<!--  Secondo box Footer-->' +
        '<div class="col-sm-5 mb-4 text-white testoFooter">' +
        '<div>' +
        '<h3>' +
        'Contatti rapidi' +
        '</h3>' +
        '<p>' +
        'Kaur Games<br>' +
        '<!---->' +
        "Via C. Colombo snc, 22100 Località Lazzago, Como CO<br>" +
        '<!---->' +
        'Email: kaurgames@gmail.com<br>' +
        '<!---->' +
        'Telefono: 031 590585 | Fax: 031 590585 <br>' +
        '<!---->' +
        '</p>' +
        '</div>' +
        '</div>' +
        '<!-- /Secondo box Footer-->' +

        '<!--  Terzo box Footer-->' +
        '<div class="col-sm-3 mb-4">' +
        '<div>' +
        `<a class="btn btn-lg btn-secondary btn-block larghezzaTot my-2" href="${percorsoPagineCollegamenti}contatti.html">Contattaci</a>` +
        '</div>' +
        '</div>' +
        '<!-- /Terzo box Footer-->' +
        '</div>' +

        '<div class="row copyright pt-3">' +
        '<div class="col-sm">' +
        '<p class="text-center text-white">Copyright &copy; KaurGames 2021</p>' +
        '</div>' +
        '</div>' +

        '</div>';
}
