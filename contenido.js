/*
  CONTENIDO DE LA WEB DE AFINPA
  -----------------------------
  Aquí está todo el texto de la página. Para cambiar algo, edita este archivo
  (en GitHub: abre el archivo y pulsa el lápiz) y guarda con "Commit changes".
  La página se actualiza sola en uno o dos minutos.

  Reglas para no romper nada:
  - Cada texto va entre comillas dobles: "así". Si necesitas comillas dentro, usa « ».
  - Entre un elemento y el siguiente va una coma. Después del último, no.
  - Fechas así: "24 de octubre, 3:00 pm". Si no hay fecha: "Por confirmar".
    Con ese formato la agenda se ordena sola y la portada muestra la próxima actividad.
  - "grupo" en cada actividad: "particulas", "nuclear", "medica", o "" si es de toda la asociación.
  - "enlace": una dirección que empiece con https:// (o "" si no hay).
  - Fotos: sube la imagen a la carpeta img/ y escribe aquí su nombre, por ejemplo "img/taller-detectores.jpg".
*/
window.CONTENIDO = {
  "inicio": {
    "lema": "Física nuclear, de partículas y sus aplicaciones",
    "intro": "Talleres, eventos y ponencias hechos por estudiantes de la Facultad de Ciencias de la UNI.",
    "nosotros": "Somos la Asociación Estudiantil de Física Nuclear, Partículas y Aplicaciones (AFINPA) de la Facultad de Ciencias de la Universidad Nacional de Ingeniería. Fermi, nuestra mascota, nos acompaña en cada actividad."
  },
  "grupos": [
    {
      "clave": "particulas",
      "titulo": "Física de Partículas",
      "descripcion": "Estudia los componentes más pequeños de la materia, como quarks, leptones y bosones, y las fuerzas con que interactúan. Para observarlos se usan aceleradores que hacen chocar partículas a muy alta energía y detectores enormes, como CMS en el CERN, que reconstruyen lo que pasa en cada colisión.",
      "temas": [
        "Modelo estándar",
        "Aceleradores y detectores",
        "Análisis de datos de colisiones",
        "Neutrinos y rayos cósmicos"
      ],
      "proyecto": "Maqueta de un acelerador de partículas para divulgación: una esfera metálica recorre un anillo transparente impulsada por bobinas electromagnéticas controladas con Arduino, con sensores infrarrojos que miden su velocidad.",
      "coordinacion": ""
    },
    {
      "clave": "nuclear",
      "titulo": "Física Nuclear",
      "descripcion": "Estudia el núcleo atómico: qué lo mantiene unido, por qué algunos núcleos son radiactivos y qué ocurre en la fisión y la fusión. Es la base de los reactores de investigación y de las técnicas para detectar y medir radiación. El brillo azul de la foto es radiación Cherenkov, la luz que emiten partículas cargadas cuando viajan en el agua más rápido que la luz en ese medio.",
      "temas": [
        "Radiactividad y decaimientos",
        "Detección y medición de radiación",
        "Reactores de investigación",
        "Fisión y fusión"
      ],
      "proyecto": "",
      "coordinacion": ""
    },
    {
      "clave": "medica",
      "titulo": "Física Médica",
      "descripcion": "Lleva la física de las radiaciones al hospital: imágenes como los rayos X, la tomografía y el PET, tratamientos de radioterapia y la medicina nuclear con radiofármacos. También se encarga de que pacientes y personal reciban solo la dosis de radiación necesaria.",
      "temas": [
        "Imágenes médicas",
        "Radioterapia",
        "Medicina nuclear y radiofármacos",
        "Protección radiológica"
      ],
      "proyecto": "",
      "coordinacion": ""
    }
  ],
  "talleres": [
    {
      "titulo": "Cómo se detecta lo invisible",
      "grupo": "nuclear",
      "fecha": "24 de octubre, 3:00 pm",
      "lugar": "Laboratorio de la Facultad de Ciencias",
      "detalle": "Principios de los detectores de radiación, con demostración en vivo. Cupos limitados.",
      "enlace": ""
    },
    {
      "titulo": "Análisis de datos con Python",
      "grupo": "particulas",
      "fecha": "5 de diciembre, 3:00 pm",
      "lugar": "Sala de cómputo",
      "detalle": "Trabajamos con datos reales de un experimento de partículas. Trae tu laptop.",
      "enlace": ""
    }
  ],
  "eventos": [
    {
      "titulo": "Semana de la Física",
      "grupo": "",
      "fecha": "Por confirmar",
      "lugar": "Facultad de Ciencias, UNI",
      "detalle": "Charlas, ferias y actividades abiertas para toda la comunidad.",
      "enlace": ""
    },
    {
      "titulo": "Visita a un laboratorio",
      "grupo": "",
      "fecha": "Por confirmar",
      "lugar": "Por confirmar",
      "detalle": "Salida para conocer de cerca equipos de medición y detección.",
      "enlace": ""
    }
  ],
  "ponencias": [
    {
      "titulo": "La radiación en la medicina",
      "grupo": "medica",
      "persona": "Por confirmar",
      "fecha": "21 de noviembre, 4:00 pm",
      "lugar": "Auditorio de la Facultad",
      "detalle": "Cómo se usa la radiación en diagnóstico y tratamiento. Entrada libre.",
      "enlace": ""
    }
  ],
  "peru": {
    "titulo": "El reactor RP-10 de Huarangal",
    "texto": "El Instituto Peruano de Energía Nuclear (IPEN) opera el reactor de investigación RP-10 en el Centro Nuclear RACSO, en Huarangal (Lima). Desde su repotenciación a fines de 2025 trabaja a 10 MW y produce radioisótopos para medicina, como el lutecio-177, además de servicios de análisis por activación neutrónica.",
    "enlace": "https://www.gob.pe/institucion/ipen"
  },
  "recursos": [
    {
      "nombre": "Sección de Física del OIEA",
      "descripcion": "Aceleradores, reactores de investigación, instrumentación nuclear y fusión.",
      "enlace": "https://www.iaea.org/es/el-oiea/seccion-de-fisica"
    },
    {
      "nombre": "Instituto Peruano de Energía Nuclear (IPEN)",
      "descripcion": "La institución que opera los reactores nucleares del Perú.",
      "enlace": "https://www.gob.pe/institucion/ipen"
    },
    {
      "nombre": "Facultad de Ciencias de la UNI",
      "descripcion": "Nuestra facultad: escuelas, laboratorios y noticias.",
      "enlace": "https://fc.uni.edu.pe/"
    },
    {
      "nombre": "CERN",
      "descripcion": "El laboratorio de física de partículas más grande del mundo.",
      "enlace": "https://home.cern/"
    },
    {
      "nombre": "Base de datos de reactores de investigación (OIEA)",
      "descripcion": "Reactores de investigación de todo el mundo, en inglés.",
      "enlace": "https://nucleus.iaea.org/rrdb/"
    }
  ],
  "redes": [
    {
      "nombre": "Facebook",
      "usuario": "Por añadir",
      "enlace": ""
    },
    {
      "nombre": "Instagram",
      "usuario": "Por añadir",
      "enlace": ""
    },
    {
      "nombre": "WhatsApp",
      "usuario": "Por añadir",
      "enlace": ""
    },
    {
      "nombre": "Correo",
      "usuario": "Por añadir",
      "enlace": ""
    }
  ],
  "fotos": {
    "facultad": {
      "alt": "Pabellón Central de la Universidad Nacional de Ingeniería, en el Rímac",
      "credito": "Guillermo Arévalo",
      "licencia": "CC BY-SA 4.0",
      "fuente": "https://commons.wikimedia.org/wiki/File:UNI_Pabell%C3%B3n_Central_2017.jpg",
      "src": "img/facultad.webp"
    },
    "particulas": {
      "alt": "Detector CMS del Gran Colisionador de Hadrones, CERN",
      "credito": "SimonWaldherr",
      "licencia": "CC BY-SA 4.0, recortada",
      "fuente": "https://commons.wikimedia.org/wiki/File:CERN_LHC_CMS_11.jpg",
      "src": "img/particulas.webp"
    },
    "nuclear": {
      "alt": "Radiación Cherenkov en el núcleo del Advanced Test Reactor, Idaho National Laboratory",
      "credito": "U.S. Nuclear Regulatory Commission",
      "licencia": "dominio público, recortada",
      "fuente": "https://commons.wikimedia.org/wiki/File:The_Advanced_Test_Reactor_at_Idaho_National_Laboratory_(14676550274).jpg",
      "src": "img/nuclear.webp"
    },
    "medica": {
      "alt": "Equipo PET-CT en un servicio de medicina nuclear",
      "credito": "Partynia",
      "licencia": "CC BY-SA 4.0, recortada",
      "fuente": "https://commons.wikimedia.org/wiki/File:PET-CT-Philips.jpg",
      "src": "img/medica.webp"
    },
    "peru": {
      "alt": "Centro Nuclear RACSO del IPEN, en Huarangal",
      "credito": "Diana Vera 0212",
      "licencia": "CC BY-SA 4.0",
      "fuente": "https://commons.wikimedia.org/wiki/File:REACTOR_NUCLEAR_DE_INVESTIGACI%C3%93N_IPEN.jpg",
      "src": "img/peru.webp"
    }
  }
};
