(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Refração do vidro: só em navegadores Chromium ---------- */
  var brands = (navigator.userAgentData && navigator.userAgentData.brands) || [];
  var isChromium = brands.some(function (b) { return /Chromium/.test(b.brand); });
  if (isChromium) root.classList.add("has-refraction");

  /* ---------- Ano do rodapé ---------- */
  var ano = document.querySelector("[data-ano]");
  if (ano) ano.textContent = String(new Date().getFullYear());

  /* ---------- Planos (data/planos.js) ---------- */
  function formatarPreco(valor) {
    return new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 }).format(valor);
  }

  function criar(tag, classe, texto) {
    var el = document.createElement(tag);
    if (classe) el.className = classe;
    if (texto) el.textContent = texto;
    return el;
  }

  function icone(id, classe) {
    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns, "svg");
    svg.setAttribute("aria-hidden", "true");
    if (classe) svg.setAttribute("class", classe);
    var use = document.createElementNS(ns, "use");
    use.setAttribute("href", "#" + id);
    svg.appendChild(use);
    return svg;
  }

  function renderPlanos() {
    var lista = document.getElementById("lista-planos");
    var planos = window.NIOBIO_PLANOS;
    if (!lista || !Array.isArray(planos)) return;
    var whatsapp = window.NIOBIO_WHATSAPP || "5514998001784";

    lista.textContent = "";
    planos.forEach(function (plano, i) {
      var li = criar("li", "plan glass reveal" + (plano.destaque ? " plan--featured" : ""));
      li.style.setProperty("--i", String(i));

      if (plano.destaque) li.appendChild(criar("span", "plan__badge", "Recomendado"));

      var titulo = criar("h3", "plan__name", plano.nome);
      var tituloId = "plano-" + (plano.id || i);
      titulo.id = tituloId;
      li.setAttribute("aria-labelledby", tituloId);
      li.appendChild(titulo);

      var preco = criar("p", "plan__price");
      preco.appendChild(criar("span", "plan__currency", "R$"));
      preco.appendChild(criar("span", "plan__value", formatarPreco(plano.preco)));
      preco.appendChild(criar("span", "plan__period", "/mês"));
      li.appendChild(preco);

      var itens = criar("ul", "plan__items");
      (plano.itens || []).forEach(function (texto) {
        var base = /^Tudo do plano/i.test(texto);
        var item = criar("li", base ? "plan__base" : null);
        item.appendChild(icone(base ? "i-plus" : "i-check"));
        item.appendChild(criar("span", null, texto));
        itens.appendChild(item);
      });
      li.appendChild(itens);

      var mensagem = "Olá! Quero saber mais sobre o " + plano.nome + " de SEO da Niobio.";
      var botao = criar("a", "btn" + (plano.destaque ? " btn--solid" : " glass"));
      botao.href = "https://wa.me/" + whatsapp + "?text=" + encodeURIComponent(mensagem);
      botao.target = "_blank";
      botao.rel = "noopener noreferrer";
      botao.appendChild(document.createTextNode("Conversar sobre este plano"));
      var sr = criar("span", "sr-only", " (" + plano.nome + ", abre o WhatsApp em nova aba)");
      botao.appendChild(sr);
      var iconeBotao = criar("span", "btn__icon");
      iconeBotao.setAttribute("aria-hidden", "true");
      iconeBotao.appendChild(icone("i-arrow"));
      botao.appendChild(iconeBotao);
      li.appendChild(botao);

      lista.appendChild(li);
    });
  }
  renderPlanos();

  /* ---------- Navegação móvel ---------- */
  var nav = document.querySelector(".nav");
  var toggle = nav && nav.querySelector(".nav__toggle");
  var panel = nav && document.getElementById("menu-movel");

  function setMenu(open) {
    if (!nav || !toggle || !panel) return;
    toggle.setAttribute("aria-expanded", String(open));
    if (open) {
      panel.hidden = false;
      requestAnimationFrame(function () { nav.setAttribute("data-open", "true"); });
    } else {
      nav.setAttribute("data-open", "false");
      panel.hidden = true;
    }
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    panel.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        toggle.focus();
      }
    });
    document.addEventListener("click", function (e) {
      if (toggle.getAttribute("aria-expanded") === "true" && !nav.contains(e.target)) setMenu(false);
    });
  }

  /* ---------- Troca de fundo: claro no hero, azul fixo depois ---------- */
  var hero = document.getElementById("inicio");
  if (hero && "IntersectionObserver" in window) {
    var fundoObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var passouDoHero = entry.intersectionRatio < 0.45 && entry.boundingClientRect.top < 0;
        root.classList.toggle("is-deep", passouDoHero);
      });
    }, { threshold: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 1] });
    fundoObs.observe(hero);
  } else {
    root.classList.add("is-deep");
  }

  /* ---------- Animações contínuas só quando fazem sentido ---------- */
  window.addEventListener("load", function () {
    setTimeout(function () { root.classList.add("is-loaded"); }, 600);
  });
  var listaPlanos = document.getElementById("lista-planos");
  if (listaPlanos && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        listaPlanos.classList.toggle("is-visible", entry.isIntersecting);
      });
    }).observe(listaPlanos);
  }

  /* ---------- Revelação ao rolar ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          revealObs.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { revealObs.observe(el); });
  }
})();
