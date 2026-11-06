/* SAIR Consultores · página de EDUCULTEC: lee assets/data/educultec.json y pinta las temporadas en pestañas
   (la más reciente abierta), el episodio más reciente y las cifras. Para agregar un episodio, se edita el JSON. */
(function(){
  "use strict";
  var MESES = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
  var ORD = ["","Primera","Segunda","Tercera","Cuarta","Quinta","Sexta","Séptima","Octava","Novena","Décima"];
  function fecha(f){ var p = f.split("-"); return (+p[2]) + " " + MESES[+p[1]-1] + " " + p[0]; }
  function esc(t){ return String(t || "").replace(/[&<>"]/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c]; }); }
  function cod(t, e){ return "T" + t + "-" + (e < 10 ? "0" : "") + e; }
  var tabs = document.getElementById("tabs"), panel = document.getElementById("temporada");

  fetch("../assets/data/educultec.json").then(function(r){ if(!r.ok){ throw 0; } return r.json(); }).then(function(d){
    var temps = d.temporadas.slice().sort(function(a, b){ return b.numero - a.numero; });
    var total = 0; temps.forEach(function(t){ total += t.episodios.length; });
    var c = document.querySelector('[data-cifra="temporadas"]'); if(c){ c.textContent = temps.length; }
    c = document.querySelector('[data-cifra="episodios"]'); if(c){ c.textContent = total; }

    /* el más reciente */
    var ult = temps[0].episodios[temps[0].episodios.length - 1];
    if(ult){
      document.getElementById("ultimo").href = "https://www.youtube.com/watch?v=" + ult.video;
      document.getElementById("ultimo-img").src = "https://i.ytimg.com/vi/" + ult.video + "/hqdefault.jpg";
      document.getElementById("ultimo-meta").textContent = cod(temps[0].numero, ult.numero) + " · " + fecha(ult.fecha);
      document.getElementById("ultimo-invitado").textContent = ult.invitado || ult.titulo;
      document.getElementById("ultimo-titulo").textContent = temps[0].lema;
    }

    function mostrar(i){
      var t = temps[i];
      [].forEach.call(tabs.children, function(b, k){ b.setAttribute("aria-selected", k === i); b.tabIndex = k === i ? 0 : -1; });
      var filas = t.episodios.map(function(e){
        var quien = e.invitado ? esc(e.invitado) : "";
        var tit = e.titulo ? '<span class="ep-titulo">' + esc(e.titulo) + "</span>" : "";
        return '<li><a href="https://www.youtube.com/watch?v=' + esc(e.video) + '" target="_blank" rel="noopener">' +
          '<span class="ep-cod">' + cod(t.numero, e.numero) + '</span>' +
          '<span class="ep-quien">' + quien + tit + (e.especial ? ' <em class="ep-especial">Programa especial</em>' : "") + '</span>' +
          '<span class="ep-fecha">' + fecha(e.fecha) + '</span><span class="ep-ver" aria-hidden="true">▶</span></a></li>';
      }).join("");
      panel.innerHTML = '<div class="temp-cabeza"><div><h3>' + ORD[t.numero] + ' temporada</h3><p>' + esc(t.lema) + ' · ' + t.episodios.length + ' episodios</p>' +
        (t.nota ? '<p class="temp-nota">' + esc(t.nota) + '</p>' : "") + '</div><a class="btn btn-borde" href="' + esc(t.lista) + '" target="_blank" rel="noopener">Ver la temporada en YouTube</a></div>' +
        '<ol class="episodios">' + filas + '</ol>';
    }
    tabs.innerHTML = temps.map(function(t, i){ return '<button type="button" role="tab" id="tab-' + t.numero + '" aria-controls="temporada" aria-selected="' + (i === 0) + '">T' + t.numero + '</button>'; }).join("");
    [].forEach.call(tabs.children, function(b, i){
      b.addEventListener("click", function(){ mostrar(i); });
      b.addEventListener("keydown", function(e){
        var n = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : null;
        if(n !== null && tabs.children[n]){ tabs.children[n].focus(); mostrar(n); }
      });
    });
    mostrar(0);
  }).catch(function(){});
})();
