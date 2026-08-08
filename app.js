// simple hash-based router

const page = document.getElementById("page");

function linkButton(href, upperText, lowerText) {
  const a = document.createElement("a");
  a.className = "link-button";
  a.href = href;
  a.target = "_blank";
  a.rel = "noreferrer";

  const icon = document.createElement("div");
  icon.className = "link-icon";
  icon.textContent = "\u25C6"; // placeholder diamond glyph
  a.appendChild(icon);

  const txt = document.createElement("div");
  txt.className = "link-text-container";
  const u = document.createElement("span");
  u.className = "link-text-upper";
  u.textContent = upperText;
  const l = document.createElement("span");
  l.className = "link-text-lower";
  l.textContent = lowerText;
  txt.appendChild(u);
  txt.appendChild(l);
  a.appendChild(txt);

  return a;
}

function makeContainer() {
  const d = document.createElement("div");
  d.className = "link-container";
  return d;
}

function h1(text, style) {
  const h = document.createElement("h1");
  h.textContent = text;
  if (style) for (const k in style) h.style[k] = style[k];
  return h;
}

function h2(text, style) {
  const h = document.createElement("h2");
  h.textContent = text;
  if (style) for (const k in style) h.style[k] = style[k];
  return h;
}

function h3(text) {
  const h = document.createElement("h3");
  h.textContent = text;
  return h;
}

function p(text, style) {
  const el = document.createElement("p");
  el.textContent = text;
  if (style) for (const k in style) el.style[k] = style[k];
  return el;
}

function spanAccent(text, gradient) {
  const s = document.createElement("span");
  s.className = gradient ? "accent-gradient" : "accent";
  s.textContent = text;
  return s;
}

function makeCentered() {
  const d = document.createElement("div");
  d.className = "centered";
  return d;
}

function homePage() {
  document.title = "jasperr.xyz";
  const root = makeCentered();

  const title = h1("", { fontSize: "2.5rem", marginBottom: "0" });
  title.appendChild(document.createTextNode("Hello, i'm "));
  title.appendChild(spanAccent("jasper", true));
  title.appendChild(document.createTextNode("."));
  root.appendChild(title);

  root.appendChild(p(
    "I am a self-taught software developer with experience in a wide range of programming languages and technologies. I learned most of my skills on my own through building projects, experimenting, and figuring things out as I go, I am pretty comfortable adapting to new tools and stacks quickly. I focus on writing solid, clean code and keep improving by just building things and learning from what breaks or works well."
  ));

  root.appendChild(h2("Where to contact me"));

  const contact = makeContainer();
  contact.appendChild(linkButton("mailto:hello@jasperr.xyz", "Email", "hello@jasperr.xyz"));
  contact.appendChild(linkButton("https://discord.gg/", "Discord", "@25starred"));
  root.appendChild(contact);

  root.appendChild(h2("Find my code"));
  const code = makeContainer();
  code.appendChild(linkButton("https://github.com/25starred", "Github", "25starred"));
  root.appendChild(code);

  return root;
}

function aboutPage() {
  document.title = "jasperr.xyz - about";
  const root = makeCentered();

  root.appendChild(h1("About me", { marginBottom: 0 }));

  const intro = p("");
  intro.appendChild(document.createTextNode("As you probably know, my name is Jasper, though I go by the username "));
  intro.appendChild(spanAccent("@25starred", true));
  intro.appendChild(document.createTextNode(". I've been interested in programming, computers, and pretty much anything tech-related for as long as I can remember. I also enjoy playing games and listening to music!"));
  root.appendChild(intro);

  root.appendChild(p(
    ""
  ));

  const note = document.createElement("div");
  note.className = "placeholder";
  note.textContent = "";
  root.appendChild(note);

  return root;
}

function projectsPage() {
  document.title = "jasperr.xyz - projects";
  const root = makeCentered();

  root.appendChild(h2("Projects"));

  const container = document.createElement("div");
  container.className = "project-container";
  const note = document.createElement("div");
  note.className = "placeholder";
  note.textContent = "";
  container.appendChild(note);
  root.appendChild(container);

  return root;
}

function notFoundPage() {
  document.title = "jasperr.xyz - 404";
  const root = makeCentered();
  root.appendChild(h1("404"));
  root.appendChild(p("This page does not exist."));
  return root;
}

const routes = {
  "/": homePage,
  "/about": aboutPage,
  "/projects": projectsPage,
};

function render() {
  const hash = location.hash.replace(/^#/, "") || "/";
  let path = hash;
  if (path === "" ) path = "/";

  const builder = routes[path] || notFoundPage;

  // restart transition animation
  page.classList.remove("page-transition");
  void page.offsetWidth; // reflow
  page.classList.add("page-transition");

  page.innerHTML = "";
  page.appendChild(builder());

  // update active nav link
  document.querySelectorAll(".navbar-link").forEach((a) => {
    const route = a.getAttribute("data-route");
    if (route === path) a.classList.add("navbar-link-active");
    else a.classList.remove("navbar-link-active");
  });
}

window.addEventListener("hashchange", render);
window.addEventListener("DOMContentLoaded", render);
