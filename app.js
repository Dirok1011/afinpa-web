/* Web de AFINPA. Este archivo arma la página a partir de contenido.js.
   Para cambiar textos, fechas o fotos no hace falta tocar este archivo. */
(function () {
  "use strict";

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var root = $("#root");
  var D = window.CONTENIDO;

  if (!D) {
    root.innerHTML = '<div class="wrap sec"><h2>No se pudo cargar el contenido</h2><p class="sub">Revisa el último cambio en contenido.js: suele ser una coma o unas comillas que faltan.</p></div>';
    return;
  }

  var FILTER = "todas";
  var FOTOS = [["facultad", "Quiénes somos"], ["particulas", "Física de Partículas"], ["nuclear", "Física Nuclear"], ["medica", "Física Médica"], ["peru", "En el Perú"]];

  D.inicio = D.inicio || {};
  ["talleres", "eventos", "ponencias", "redes", "grupos", "recursos"].forEach(function (k) { if (!Array.isArray(D[k])) D[k] = []; });
  D.peru = D.peru || {};
  D.fotos = D.fotos || {};

  var e = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var u = function (s) { s = String(s || "").trim(); return /^(https?:\/\/|mailto:)/i.test(s) ? e(s) : ""; };
  var src = function (s) { s = String(s || "").trim(); return /^(img\/[\w.\-\/]+|https:\/\/[^"'\s<>]+)$/.test(s) ? e(s) : ""; };
  var svg = function (p) { return '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">' + p + "</svg>"; };
  var IC = { ne: svg('<path d="M7 17 17 7M9 7h8v8"/>'), menu: svg('<path d="M4 7h16M4 12h16M4 17h16"/>') };
  var T = { talleres: { one: "Taller", many: "Talleres" }, eventos: { one: "Evento", many: "Eventos" }, ponencias: { one: "Ponencia", many: "Ponencias" } };
  var K = ["talleres", "eventos", "ponencias"];
  var MES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  var MES3 = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "set", "oct", "nov", "dic"];
  var DIA = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

  function today() { var d = new Date(); return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }
  function parseFecha(s, t0) {
    var m = /(\d{1,2})\s+de\s+([a-záéíóú]+)(?:\s+(?:de|del)\s+(\d{4}))?/i.exec(String(s || ""));
    if (!m) return null;
    var mn = m[2].toLowerCase(); if (mn === "setiembre") mn = "septiembre";
    var mi = MES.indexOf(mn); if (mi < 0) return null;
    var y = m[3] ? +m[3] : t0.getFullYear();
    var d = new Date(y, mi, +m[1]);
    if (!m[3] && (t0 - d) / 864e5 > 183) d = new Date(y + 1, mi, +m[1]);
    return d;
  }
  function hora(s) { var m = /(\d{1,2}(?::\d{2})?\s*(?:a\.?\s?m\.?|p\.?\s?m\.?))/i.exec(String(s || "")); return m ? m[1] : ""; }
  function rel(n) { return n == null ? "" : n < 0 ? "Realizado" : n === 0 ? "Hoy" : n === 1 ? "Mañana" : "En " + n + " días"; }
  function items() {
    var t0 = today(), out = [];
    K.forEach(function (k) {
      D[k].forEach(function (it, i) {
        var dt = parseFecha(it.fecha, t0);
        out.push({ it: it, k: k, id: "act-" + k.charAt(0) + i, dt: dt, days: dt ? Math.round((dt - t0) / 864e5) : null, h: hora(it.fecha) });
      });
    });
    var up = out.filter(function (x) { return x.dt && x.days >= 0; }).sort(function (a, b) { return a.dt - b.dt; });
    var tbd = out.filter(function (x) { return !x.dt; });
    var past = out.filter(function (x) { return x.dt && x.days < 0; }).sort(function (a, b) { return b.dt - a.dt; });
    return { all: up.concat(tbd, past), up: up, next: up[0] || tbd[0] || null };
  }
  function ciclo() { var d = new Date(), m = d.getMonth(), y = d.getFullYear(); return m >= 7 ? "Ciclo " + y + "-2" : m >= 2 ? "Ciclo " + y + "-1" : "Verano " + y; }
  function foto(k) { return D.fotos[k] || {}; }
  function nw(s) { return e(s).replace(/([A-Za-z]+-\d+)/g, '<span style="white-space:nowrap">$1</span>'); }
  function grupoNombre(k) { var g = D.grupos.filter(function (x) { return x.clave === k; })[0]; return g ? g.titulo : ""; }
  function temasDe(g) { var t = g.temas; if (!Array.isArray(t)) t = String(t || "").split("\n"); return t.map(function (x) { return String(x).trim(); }).filter(Boolean); }
  function fechaLarga(x) { return x.dt ? (DIA[x.dt.getDay()] + " " + x.dt.getDate() + " de " + MES[x.dt.getMonth()] + (x.h ? ", " + x.h : "")) : (x.it.fecha || "Fecha por confirmar"); }

  function headerHTML() {
    var L = '<a href="#nosotros">Quiénes somos</a><a href="#grupos">Grupos</a><a href="#agenda">Agenda</a><a href="#enlaces">Enlaces</a><a href="#contacto">Contacto</a>';
    return '<div class="topbar"><div class="wrap"><span>Facultad de Ciencias<span class="long"> · Universidad Nacional de Ingeniería</span></span></div></div>' +
      '<header class="site"><div class="wrap"><a class="brand" href="#inicio"><img src="img/logo-color.webp" alt="" width="46" height="44"><span><b>AFINPA</b><small>Asociación Estudiantil de Física Nuclear, Partículas y Aplicaciones</small></span></a>' +
      '<nav class="mainnav" aria-label="Secciones">' + L + "</nav>" +
      '<button class="menu-btn" type="button" id="menu-btn" aria-expanded="false" aria-controls="menu">' + IC.menu + "Menú</button></div>" +
      '<nav class="menu" id="menu" aria-label="Secciones" hidden>' + L + "</nav></header>";
  }
  function heroHTML(nx) {
    var n = "";
    if (nx) n = '<a class="next" href="#' + nx.id + '"><small>Próxima actividad' + (nx.dt ? " · " + rel(nx.days).toLowerCase() : "") + "</small><b>" + e(nx.it.titulo) + "</b><span>" + e(fechaLarga(nx)) + (nx.it.lugar ? " · " + e(nx.it.lugar) : "") + "</span></a>";
    return '<section class="hero" id="inicio"><canvas id="chamber" aria-hidden="true"></canvas><div class="hero-veil"></div>' +
      '<div class="wrap hero-in"><div class="hero-text"><p class="kicker">Asociación estudiantil · <b>UNI</b></p><h1>' + e(D.inicio.lema) + "</h1>" +
      '<p class="hero-p">' + e(D.inicio.intro) + "</p>" +
      '<div class="btns"><a class="btn btn-y" href="#agenda">Ver la agenda</a><a class="btn btn-line" href="#grupos">Conoce los grupos</a></div>' + n + "</div>" +
      '<p class="hero-note">De fondo, una cámara de burbujas simulada: las trazas azules son cargas negativas, las rojas positivas y las amarillas protones. Haz clic en el fondo para provocar una colisión.</p></div></section>';
  }
  function figHTML(k) {
    var f = foto(k), s = src(f.src); if (!s) return "";
    return '<figure class="photo"><img src="' + s + '" alt="' + e(f.alt) + '" loading="lazy"><figcaption>' + e(f.alt) + (f.credito ? "<span>Foto: " + e(f.credito) + (f.licencia ? " (" + e(f.licencia) + ")" : "") + "</span>" : "") + "</figcaption></figure>";
  }
  function nosotrosHTML() {
    var gs = D.grupos.map(function (g) { return '<a href="#g-' + e(g.clave) + '">' + e(g.titulo) + "</a>"; });
    var lista = gs.length > 1 ? gs.slice(0, -1).join(", ") + " y " + gs[gs.length - 1] : gs.join("");
    return '<section class="sec" id="nosotros"><div class="wrap two"><div class="txt"><h2>Quiénes somos</h2><p class="lead">' + e(D.inicio.nosotros) + "</p>" +
      (lista ? "<p>Trabajamos en " + gs.length + " grupos: " + lista + ".</p>" : "") + "</div>" + figHTML("facultad") + "</div></section>";
  }
  function grupoHTML(g, up) {
    var temas = temasDe(g);
    var prox = up.filter(function (x) { return x.it.grupo === g.clave; })[0];
    return '<article class="grupo" id="g-' + e(g.clave) + '">' + figHTML(g.clave) + '<div class="g-txt"><h3>' + e(g.titulo) + "</h3><p>" + e(g.descripcion) + "</p>" +
      (temas.length ? '<h4>Temas</h4><ul class="temas">' + temas.map(function (t) { return "<li>" + e(t) + "</li>"; }).join("") + "</ul>" : "") +
      (g.proyecto ? '<div class="g-extra"><b>Proyecto en curso</b><span>' + e(g.proyecto) + "</span></div>" : "") +
      (g.coordinacion ? '<p><b style="color:var(--navy)">Coordinación:</b> ' + e(g.coordinacion) + "</p>" : "") +
      (prox ? '<a class="g-next" href="#' + prox.id + '">Próxima actividad: ' + e(prox.it.titulo) + ", " + prox.dt.getDate() + " de " + MES[prox.dt.getMonth()] + "</a>" : "") +
      "</div></article>";
  }
  function gruposHTML(up) {
    return '<section class="sec alt" id="grupos"><div class="wrap"><h2>Grupos de trabajo</h2><p class="sub">La asociación se organiza en tres grupos. Sus actividades también aparecen en la agenda, marcadas con el nombre del grupo.</p>' +
      '<div class="grupos">' + D.grupos.map(function (g) { return grupoHTML(g, up); }).join("") + "</div></div></section>";
  }
  function peruHTML() {
    var p = D.peru, h = u(p.enlace);
    if (!p.titulo) return "";
    return '<section class="sec" id="peru"><div class="wrap peru">' + figHTML("peru") + '<div class="txt"><p style="font-weight:600;color:var(--navy)">En el Perú</p><h2>' + nw(p.titulo) + "</h2><p>" + nw(p.texto) + "</p>" +
      (h ? '<p><a class="btn btn-n" href="' + h + '" target="_blank" rel="noopener">Conoce el IPEN ' + IC.ne + "</a></p>" : "") + "</div></div></section>";
  }
  function rowHTML(x) {
    var it = x.it, w;
    if (x.dt) w = '<span class="d">' + x.dt.getDate() + '</span><span class="m">' + MES3[x.dt.getMonth()] + " " + x.dt.getFullYear() + "</span>" + (x.h ? '<span class="h">' + e(x.h) + "</span>" : "");
    else w = '<span class="tbd">' + (it.fecha ? e(it.fecha) : "Por confirmar") + "</span>";
    var gn = grupoNombre(it.grupo);
    var go = u(it.enlace) ? '<a class="go" href="' + u(it.enlace) + '" target="_blank" rel="noopener">Más información ' + IC.ne + "</a>" : "";
    return '<li class="row' + (x.days < 0 ? " past" : "") + '" id="' + x.id + '"><div class="when">' + w + "</div>" +
      '<div class="what"><p class="meta"><span class="type">' + T[x.k].one + "</span><span>" + [gn, it.lugar].filter(Boolean).map(e).join(" · ") + "</span></p>" +
      "<h3>" + e(it.titulo || "Sin título") + "</h3>" + (it.persona ? '<p class="who">Ponente: ' + e(it.persona) + "</p>" : "") + (it.detalle ? '<p class="det">' + e(it.detalle) + "</p>" : "") + "</div>" +
      '<div class="act">' + (x.dt ? '<span class="rel">' + rel(x.days) + "</span>" : '<span class="rel tbd">Fecha por confirmar</span>') + go + "</div></li>";
  }
  function agendaHTML() {
    return '<section class="sec alt" id="agenda"><div class="wrap"><div class="ag-head"><div><h2>Agenda</h2><p class="sub">' + ciclo() + ". Para inscribirte, usa el enlace de cada actividad o escríbenos.</p></div></div>" +
      '<div class="tabs" role="group" aria-label="Filtrar actividades" id="tabs"></div><ol class="agenda" id="agenda-list"></ol></div></section>';
  }
  function renderAgenda() {
    var all = items().all, list = $("#agenda-list"), tabs = $("#tabs");
    var cnt = function (k) { return all.filter(function (x) { return k === "todas" || x.k === k; }).length; };
    tabs.innerHTML = ["todas"].concat(K).map(function (k) {
      return '<button type="button" data-filter="' + k + '" aria-pressed="' + (FILTER === k) + '">' + (k === "todas" ? "Todas" : T[k].many) + " <span>(" + cnt(k) + ")</span></button>";
    }).join("");
    var f = all.filter(function (x) { return FILTER === "todas" || x.k === FILTER; });
    list.innerHTML = f.length ? f.map(rowHTML).join("") : '<li class="empty">Pronto publicaremos novedades aquí.</li>';
  }
  function enlacesHTML() {
    return '<section class="sec" id="enlaces"><div class="wrap"><h2>Enlaces útiles</h2><p class="sub">Instituciones y portales que usamos para preparar nuestras actividades.</p><div class="links">' +
      D.recursos.map(function (r) {
        var h = u(r.enlace), inner = "<b>" + e(r.nombre) + (h ? IC.ne : "") + "</b><span>" + e(r.descripcion) + "</span>";
        return h ? '<a href="' + h + '" target="_blank" rel="noopener">' + inner + "</a>" : "<div>" + inner + "</div>";
      }).join("") + "</div></div></section>";
  }
  function contactoHTML() {
    return '<section class="sec alt" id="contacto"><div class="wrap contact"><div><h2>Contacto y redes</h2><p class="sub">Publicamos fechas, inscripciones y fotos de cada actividad en nuestras redes. También puedes escribirnos para unirte a un grupo.</p><div class="nets">' +
      D.redes.map(function (n) {
        var h = u(n.enlace), inner = "<b>" + e(n.nombre) + "</b><span>" + e(n.usuario || "Por añadir") + "</span>";
        return h ? '<a class="net" href="' + h + '" target="_blank" rel="noopener">' + inner + "</a>" : '<div class="net">' + inner + "</div>";
      }).join("") +
      '</div></div><figure class="fermi"><img src="img/fermi.webp" alt="Fermi, la mascota de AFINPA: un zorro con casco amarillo, lentes de seguridad y bata de laboratorio" width="410" height="530" loading="lazy"><figcaption>Fermi, nuestra mascota</figcaption></figure></div></section>';
  }
  function footHTML() {
    var cr = FOTOS.map(function (x) {
      var f = foto(x[0]); if (!src(f.src) || !f.credito) return "";
      var h = u(f.fuente);
      return "<li>" + e(f.alt) + ". " + e(f.credito) + (f.licencia ? ", " + e(f.licencia) : "") + (h ? '. <a href="' + h + '" target="_blank" rel="noopener">Ver fuente</a>' : "") + "</li>";
    }).join("");
    return '<footer class="foot"><div class="wrap"><div class="foot-cols"><div class="foot-id"><img src="img/logo-blanco.webp" alt="Logo de AFINPA" width="55" height="52">' +
      "<p><b>AFINPA</b><br>Asociación Estudiantil de Física Nuclear, Partículas y Aplicaciones<br>Facultad de Ciencias, Universidad Nacional de Ingeniería<br>Av. Túpac Amaru 210, Rímac, Lima</p></div>" +
      '<div><h2>Secciones</h2><nav aria-label="Pie"><a href="#nosotros">Quiénes somos</a><a href="#grupos">Grupos</a><a href="#agenda">Agenda</a><a href="#enlaces">Enlaces</a><a href="#contacto">Contacto</a></nav></div>' +
      (cr ? '<div class="cred"><h2>Créditos de las fotos</h2><ul>' + cr + "</ul></div>" : "") + "</div>" +
      '<p class="foot-bottom">© ' + new Date().getFullYear() + " AFINPA. Hecho por estudiantes de la Facultad de Ciencias.</p></div></footer>";
  }

  var r = items();
  root.innerHTML = headerHTML() + "<main>" + heroHTML(r.next) + nosotrosHTML() + gruposHTML(r.up) + peruHTML() + agendaHTML() + enlacesHTML() + contactoHTML() + "</main>" + footHTML();
  renderAgenda();

  root.addEventListener("click", function (ev) {
    var b = ev.target.closest("button,a"); if (!b) return;
    var menu = $("#menu"), mb = $("#menu-btn");
    if (b.id === "menu-btn") { var open = menu.hidden; menu.hidden = !open; b.setAttribute("aria-expanded", String(open)); return; }
    if (!menu.hidden && menu.contains(b)) { menu.hidden = true; mb.setAttribute("aria-expanded", "false"); }
    if (b.dataset.filter) { FILTER = b.dataset.filter; renderAgenda(); }
  });
  if (location.hash && /^#[\w-]+$/.test(location.hash)) {
    var tg = document.getElementById(location.hash.slice(1));
    if (tg) setTimeout(function () { tg.scrollIntoView(); }, 60);
  }

  /* ---------- Cámara de burbujas de la portada ---------- */
  var cv = $("#chamber"); if (!cv || !cv.getContext) return;
  var hero = cv.parentElement, ctx = cv.getContext("2d");
  var RM = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var cs = getComputedStyle(document.documentElement);
  var C = { neg: cs.getPropertyValue("--blue").trim(), pos: cs.getPropertyValue("--red").trim(), pro: cs.getPropertyValue("--yellow").trim(), beam: cs.getPropertyValue("--soft").trim() };
  var CH = { tracks: [], flashes: [], beams: [], W: 0, H: 0, vis: true, next: 0 };
  var DS = 2.2;
  var rnd = function (a, b) { return a + Math.random() * (b - a); };
  function lo() { return CH.W > 900 ? 0.42 : 0.08; }
  function path(x, y, a, R, q, loss, max) {
    var p = [x, y];
    for (var n = 0; n < max; n++) {
      a += q * DS / R; x += Math.cos(a) * DS; y += Math.sin(a) * DS; R *= 1 - loss; p.push(x, y);
      if (R < 3.5 || x < -60 || x > CH.W + 60 || y < -60 || y > CH.H + 60) break;
    }
    return p;
  }
  function add(t, x, y, a, R, q, loss, kind, delay) {
    var heavy = kind === "pro";
    CH.tracks.push({ p: path(x, y, a, R, q, loss, heavy ? 700 : 1000), c: C[kind], w: heavy ? 2.6 : 1.8, gap: heavy ? 2.3 : 3.4, t0: t + (delay || 0), rate: heavy ? 520 : 760, hold: rnd(2600, 4200), fade: 2400 });
  }
  function flash(t, x, y) { CH.flashes.push({ x: x, y: y, t0: t }); }
  function pair(t, x, y) {
    var a = rnd(0, Math.PI * 2), R = rnd(45, 150), l = rnd(0.0028, 0.0065);
    add(t, x, y, a - 0.035, R, -1, l, "neg"); add(t, x, y, a + 0.035, R * rnd(0.75, 1.3), 1, l * rnd(0.8, 1.2), "pos"); flash(t, x, y);
  }
  function hadron(t, x, y) {
    var n = 3 + Math.floor(Math.random() * 4);
    for (var i = 0; i < n; i++) {
      var a = rnd(-1.15, 1.15);
      if (Math.random() < 0.28) add(t, x, y, a, rnd(520, 1500), 1, 0.0005, "pro");
      else { var q = Math.random() < 0.5 ? -1 : 1; add(t, x, y, a, rnd(170, 720), q, 0.0011, q < 0 ? "neg" : "pos"); }
    }
    if (Math.random() < 0.6) add(t, x + rnd(30, 90), y + rnd(-14, 14), rnd(0, Math.PI * 2), rnd(12, 26), -1, 0.018, "neg", 220);
    flash(t, x, y);
  }
  function event(t, x, y) {
    if (x == null) {
      if (Math.random() < 0.55 && CH.beams.length) { var b = CH.beams[Math.floor(Math.random() * CH.beams.length)]; x = rnd(lo(), 0.9) * CH.W; y = b.y0 + (x / CH.W) * b.dy; hadron(t, x, y); }
      else pair(t, rnd(lo() + 0.04, 0.94) * CH.W, rnd(0.12, 0.88) * CH.H);
    } else (Math.random() < 0.5 ? hadron : pair)(t, x, y);
  }
  function beams() {
    CH.beams = []; var n = Math.max(4, Math.round(CH.H / 100));
    for (var i = 0; i < n; i++) CH.beams.push({ y0: CH.H * (0.12 + 0.76 * (i + rnd(0.1, 0.9)) / n), dy: rnd(-24, -8) });
  }
  function draw(t) {
    var W = CH.W, H = CH.H; ctx.clearRect(0, 0, W, H);
    ctx.lineCap = "round";
    ctx.strokeStyle = C.beam; ctx.globalAlpha = 0.12; ctx.lineWidth = 1; ctx.setLineDash([]);
    ctx.beginPath();
    for (var gx = 70; gx < W; gx += 140) for (var gy = 60; gy < H; gy += 140) { ctx.moveTo(gx - 5, gy); ctx.lineTo(gx + 5, gy); ctx.moveTo(gx, gy - 5); ctx.lineTo(gx, gy + 5); }
    ctx.stroke();
    ctx.globalAlpha = 0.22; ctx.lineWidth = 1.5; ctx.setLineDash([0.01, 4]);
    ctx.beginPath(); CH.beams.forEach(function (b) { ctx.moveTo(-10, b.y0); ctx.lineTo(W + 10, b.y0 + b.dy * (W + 10) / W); }); ctx.stroke();
    CH.tracks = CH.tracks.filter(function (k) {
      var len = k.p.length / 2, el = t - k.t0; if (el < 0) return true;
      var n = Math.min(len, Math.floor(el / 1000 * k.rate) + 1);
      var age = t - (k.t0 + len / k.rate * 1000);
      var al = RM ? 1 : age <= k.hold ? 1 : 1 - (age - k.hold) / k.fade;
      if (al <= 0) return false;
      if (n < 2) return true;
      ctx.globalAlpha = al * 0.95; ctx.strokeStyle = k.c; ctx.lineWidth = k.w; ctx.setLineDash([0.01, k.gap]);
      ctx.beginPath(); ctx.moveTo(k.p[0], k.p[1]); for (var j = 1; j < n; j++) ctx.lineTo(k.p[2 * j], k.p[2 * j + 1]); ctx.stroke();
      return true;
    });
    ctx.setLineDash([]);
    CH.flashes = CH.flashes.filter(function (f) {
      var a = (t - f.t0) / 650; if (a < 0) return true; if (a >= 1) return false;
      var r = 4 + 22 * a, g = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, r);
      g.addColorStop(0, C.pro); g.addColorStop(1, "rgba(255,210,31,0)");
      ctx.globalAlpha = (1 - a) * 0.85; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(f.x, f.y, r, 0, Math.PI * 2); ctx.fill(); return true;
    });
    ctx.globalAlpha = 1;
  }
  function seed(t) {
    CH.tracks = []; CH.flashes = [];
    for (var i = 0; i < (RM ? 6 : 4); i++) event(RM ? t - 1e6 : t - rnd(300, 2600));
    if (RM) CH.flashes = [];
  }
  function size() {
    var r = hero.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (!r.width || !r.height) return;
    var changed = Math.abs(r.width - CH.W) > 2 || Math.abs(r.height - CH.H) > 40;
    CH.W = r.width; CH.H = r.height; cv.width = Math.round(r.width * dpr); cv.height = Math.round(r.height * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (changed) { beams(); seed(performance.now()); }
    draw(performance.now());
  }
  size();
  if ("ResizeObserver" in window) new ResizeObserver(size).observe(hero); else window.addEventListener("resize", size);
  if ("IntersectionObserver" in window) new IntersectionObserver(function (es) { CH.vis = es[0].isIntersecting; }).observe(hero);
  hero.addEventListener("pointerdown", function (ev) {
    if (ev.target.closest("a,button")) return;
    var r = hero.getBoundingClientRect(); event(performance.now(), ev.clientX - r.left, ev.clientY - r.top);
    if (RM) draw(performance.now() + 1e6);
  });
  if (RM) return;
  CH.next = performance.now() + 900;
  (function loop(t) {
    requestAnimationFrame(loop);
    if (!CH.vis || document.hidden) return;
    if (t > CH.next) { event(t); CH.next = t + rnd(1000, 1800); }
    draw(t);
  })(performance.now());
})();
