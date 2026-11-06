# SAIR Consultores

Sitio y manual de marca de **SAIR Consultores** (Soluciones Académicas Innovadoras y Responsables),
preparados por [16 Ball Creations](https://16ballcreations.com).

- Manual de marca: `/marca/` — https://16ballcreations.github.io/sair-consultores/marca/ (v1.1, propuesta)
- Guía en texto: [`MARCA.md`](MARCA.md). **Manda sobre todo lo demás**
- Sitio: `/` — https://16ballcreations.github.io/sair-consultores/ (propuesta v1)

HTML y CSS sin frameworks, publicado con GitHub Pages desde la rama `main`.

## Estructura

| Ruta | Qué es |
|---|---|
| `MARCA.md` | La guía de marca en texto, para personas y agentes: esencia, logotipo, color, tipografía, tono, redes |
| `assets/css/sair.css` | **El sistema de marca**: colores, tipografía, espacios, formas, componentes base y los píxeles. Lo usan el manual y el sitio |
| `marca/` | El manual de marca, como página web con forma de documento |
| `guia/` | Redirección a `/marca/` (aquí estuvo la guía 1.0), para que no se rompan los enlaces compartidos |
| `assets/img/` | Logotipo, sello (`marca/sello.svg`) y fotos |
| `index.html`, `assets/css/sitio.css`, `assets/js/sitio.js` | La portada: servicios, historia, EDUCULTEC, aliados y el formulario de contacto |
| `servicios/` | Índice de servicios y una página por servicio (`servicios/<servicio>/`). Su botón lleva al formulario con el tema ya elegido (`?tema=…#contacto`) |
| `nosotros/` | Historia, línea de tiempo, misión, visión, valores y equipo |
| `educultec/`, `assets/js/educultec.js` | El podcast: de qué va, créditos, episodio más reciente y todos los episodios por temporada |
| `assets/data/educultec.json` | **Los episodios de EDUCULTEC.** Las cifras de la página (temporadas, episodios) salen de aquí |

## Cómo agregar un episodio de EDUCULTEC

En `assets/data/educultec.json`, al final de `episodios` de la temporada en curso:

```json
{"numero": 9, "fecha": "2026-11-12", "invitado": "Dra. Nombre Apellido", "titulo": "", "especial": false, "video": "CODIGO"}
```

`video` es lo que va después de `watch?v=` en YouTube. `titulo` solo se usa en los programas especiales.
Para una temporada nueva, se agrega un objeto en `temporadas` con su `numero`, `lema`, `lista` (la lista de
reproducción de YouTube, o la página de directos si aún no existe) y `episodios`.

## Reglas para trabajar en este repositorio

- Los valores de marca viven en `assets/css/sair.css`. Si cambias uno, actualiza `MARCA.md` y el manual.
- El tono, los nombres oficiales y los textos oficiales están en `MARCA.md`. Úsalos tal cual.
- Este repositorio es **público**: aquí no van auditorías ni notas internas. El único contacto publicado es el
  que SAIR eligió para el sitio (correo y WhatsApp de Ivonne Harvey).
  Esos documentos están fuera del repositorio, en la carpeta privada del cliente de 16 Ball Creations.

## Pendientes

- Formulario de contacto: llega a `ivonneharvey@gmail.com` por FormSubmit (formsubmit.co). El primer envío
  manda un correo de activación a esa dirección; hay que confirmarlo una vez para que empiecen a llegar.
- Lo que falta de SAIR (logotipo en vector, aprobación de propuestas, lista oficial de servicios, fotos,
  proyectos y clientes, entre otros): sección 11.2 del manual.
- Páginas internas (propuesta): validar con SAIR el detalle de cada servicio, la misión, la visión, los cargos
  del equipo y los créditos de EDUCULTEC. Faltan fotos del equipo (hoy, iniciales).
- EDUCULTEC: la temporada 7 tiene lista de reproducción incompleta en YouTube (6 de 10) y la 8 no tiene lista.
