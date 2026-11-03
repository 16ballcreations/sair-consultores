/* SAIR Consultores · sitio: flechas de la fila de servicios y envío del formulario.
   El formulario se envía a SAIR por FormSubmit (formsubmit.co), que reenvía cada mensaje al correo
   de destino. El primer envío llega como correo de activación: hay que confirmarlo una vez.
   Si el servicio falla, se abre el correo del visitante con el mensaje ya escrito. */
(function(){
  "use strict";
  var DESTINO = "ivonneharvey@gmail.com";

  /* --- flechas de la fila de servicios --- */
  var fila = document.getElementById("fila");
  [].forEach.call(document.querySelectorAll(".flecha"), function(b){
    b.addEventListener("click", function(){
      var paso = fila.clientWidth * 0.8;
      fila.scrollBy({ left: b.classList.contains("izq") ? -paso : paso, behavior: "smooth" });
    });
  });

  /* --- formulario --- */
  var form = document.getElementById("formulario");
  var estado = document.getElementById("estado");
  function decir(t, tipo){ estado.textContent = t; estado.className = "estado" + (tipo ? " " + tipo : ""); }
  function valor(n){ var c = form.elements[n]; return c ? c.value.trim() : ""; }

  form.addEventListener("submit", function(e){
    e.preventDefault();
    if(valor("_honey")){ decir("¡Gracias! Le responderemos pronto.", "ok"); form.reset(); return; }
    if(!valor("nombre")){ form.elements.nombre.focus(); return decir("Falta su nombre.", "mal"); }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor("correo"))){ form.elements.correo.focus(); return decir("Revise su correo.", "mal"); }
    if(valor("mensaje").length < 10){ form.elements.mensaje.focus(); return decir("Cuéntenos un poco más en el mensaje.", "mal"); }

    var datos = {
      Nombre: valor("nombre"), Institución: valor("institucion") || "—", Correo: valor("correo"),
      Teléfono: valor("telefono") || "—", Tema: valor("tema"), Mensaje: valor("mensaje"),
      _subject: "Nuevo mensaje desde el sitio de SAIR: " + valor("tema"),
      _replyto: valor("correo"), _template: "table", _captcha: "false"
    };
    var boton = form.querySelector("button[type=submit]");
    boton.disabled = true; decir("Enviando…");

    fetch("https://formsubmit.co/ajax/" + DESTINO, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(datos)
    }).then(function(r){ return r.json().then(function(j){ if(!r.ok || String(j.success) !== "true"){ throw new Error(j.message || "error"); } }); })
      .then(function(){ decir("¡Gracias, " + valor("nombre").split(" ")[0] + "! Recibimos su mensaje y le responderemos pronto.", "ok"); form.reset(); })
      .catch(function(){
        decir("Abrimos su correo para enviarlo desde ahí.", "");
        var cuerpo = "Nombre: " + datos.Nombre + "\nInstitución: " + datos["Institución"] + "\nCorreo: " + datos.Correo +
          "\nTeléfono: " + datos["Teléfono"] + "\nTema: " + datos.Tema + "\n\n" + datos.Mensaje;
        location.href = "mailto:" + DESTINO + "?subject=" + encodeURIComponent(datos._subject) + "&body=" + encodeURIComponent(cuerpo);
      })
      .then(function(){ boton.disabled = false; });
  });
})();
