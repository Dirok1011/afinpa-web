# Web de AFINPA

Página web de la Asociación Estudiantil de Física Nuclear, Partículas y Aplicaciones (AFINPA), de la Facultad de Ciencias de la Universidad Nacional de Ingeniería.

Es una página estática: HTML, CSS y JavaScript, sin servidor ni base de datos. Se puede publicar gratis con GitHub Pages.

## Qué hay en el repositorio

| Archivo | Para qué sirve |
|---|---|
| `contenido.js` | **Todo el texto de la página**: portada, grupos, agenda, enlaces, redes y fotos. Es el único archivo que hay que tocar para actualizar la web. |
| `img/` | Logos, Fermi y fotos. |
| `index.html` | La página. Carga las fuentes, los estilos y los scripts. |
| `estilos.css` | Colores, tipografía y diseño. Usa solo la paleta institucional de AFINPA. |
| `app.js` | Arma la página a partir de `contenido.js` y dibuja la cámara de burbujas de la portada. |

## Publicar la web con GitHub Pages

1. Entra a GitHub y crea un repositorio nuevo, por ejemplo `afinpa-web`. Déjalo **público** (GitHub Pages gratis solo funciona con repositorios públicos).
2. En el repositorio vacío, pulsa **uploading an existing file**, arrastra todos los archivos y la carpeta `img` de este proyecto, y pulsa **Commit changes**.
3. Ve a **Settings → Pages**. En **Branch** elige `main` y la carpeta `/ (root)`, y pulsa **Save**.
4. Espera uno o dos minutos. La web queda en `https://TU-USUARIO.github.io/afinpa-web/`.

Si prefieres la terminal:

```bash
git init
git add .
git commit -m "Web de AFINPA"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/afinpa-web.git
git push -u origin main
```

## Dejar que otros miembros editen

1. En el repositorio, ve a **Settings → Collaborators** y pulsa **Add people**.
2. Escribe el usuario de GitHub de cada miembro. Les llega una invitación por correo.
3. Una vez que aceptan, pueden editar `contenido.js` desde el navegador y sus cambios se publican solos.

Si la asociación crece, también pueden crear una **organización** en GitHub (gratis), mover el repositorio ahí y la web quedaría en `https://NOMBRE-ORG.github.io/afinpa-web/`.

## Cómo cambiar el contenido

1. Abre `contenido.js` en GitHub y pulsa el ícono del lápiz (**Edit this file**).
2. Cambia el texto que necesites. Las reglas están al inicio del archivo:
   - Cada texto va entre comillas dobles, y entre un elemento y el siguiente va una coma.
   - Las fechas se escriben así: `"24 de octubre, 3:00 pm"`. Con ese formato la agenda se ordena sola y la portada muestra la próxima actividad. Si aún no hay fecha, `"Por confirmar"`.
   - El campo `"grupo"` de cada actividad es `"particulas"`, `"nuclear"`, `"medica"` o `""` si es de toda la asociación.
3. Pulsa **Commit changes**. En uno o dos minutos la web muestra el cambio.

Para añadir una actividad, copia un bloque `{ ... }` de la lista de talleres, eventos o ponencias, pégalo después del último (con una coma entre ambos) y cambia sus datos.

Si después de un cambio la página aparece vacía con el mensaje "No se pudo cargar el contenido", casi siempre falta o sobra una coma o unas comillas. En GitHub puedes ver el cambio anterior en **History** y comparar.

## Cambiar una foto

1. Sube la foto nueva a la carpeta `img/` (**Add file → Upload files**). Usa un nombre sin espacios ni tildes, por ejemplo `facultad-ciencias.jpg`, y que pese menos de 300 KB si se puede.
2. En `contenido.js`, dentro de `"fotos"`, cambia el `"src"` de la foto por `"img/facultad-ciencias.jpg"`.
3. Si la foto es de AFINPA, pon `"credito": "AFINPA"` y deja `"licencia"` y `"fuente"` vacíos.

## Ver la web en tu computadora

Abre `index.html` con doble clic. Funciona sin instalar nada; las fuentes se cargan de Google Fonts si tienes internet.

## Créditos de las fotos

Las fotos de referencia tienen licencia libre o son de dominio público. Al reutilizarlas hay que mantener el crédito.

- `img/facultad.webp`: Pabellón Central de la UNI. Guillermo Arévalo, CC BY-SA 4.0. [Fuente](https://commons.wikimedia.org/wiki/File:UNI_Pabell%C3%B3n_Central_2017.jpg)
- `img/particulas.webp`: detector CMS, CERN. SimonWaldherr, CC BY-SA 4.0, recortada. [Fuente](https://commons.wikimedia.org/wiki/File:CERN_LHC_CMS_11.jpg)
- `img/nuclear.webp`: radiación Cherenkov en el Advanced Test Reactor. U.S. Nuclear Regulatory Commission, dominio público, recortada. [Fuente](https://commons.wikimedia.org/wiki/File:The_Advanced_Test_Reactor_at_Idaho_National_Laboratory_(14676550274).jpg)
- `img/medica.webp`: equipo PET-CT. Partynia, CC BY-SA 4.0, recortada. [Fuente](https://commons.wikimedia.org/wiki/File:PET-CT-Philips.jpg)
- `img/peru.webp`: Centro Nuclear RACSO del IPEN, Huarangal. Diana Vera 0212, CC BY-SA 4.0. [Fuente](https://commons.wikimedia.org/wiki/File:REACTOR_NUCLEAR_DE_INVESTIGACI%C3%93N_IPEN.jpg)

El logo de AFINPA y la mascota Fermi pertenecen a la asociación.
