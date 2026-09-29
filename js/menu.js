const MENU = [
  {
    t: "Who we are",
    s: [
      {
        l: "About us",
        h: "#about",
        d: "A locally rooted Malawian NGO empowering vulnerable and marginalised communities to shape their own development.",
        m: "Read about us",
        sub: ["Strategic goal|#goal", "Core values|#values"],
        img: "imgs/nav/vasco.jpeg"
      },
      {
        l: "Our approach",
        h: "#approach",
        d: "Community-centred and participatory: we work alongside communities rather than imposing external solutions.",
        m: "Our approach",
        sub: ["Participation|#approach", "Partnership|#approach"],
                img: "imgs/nav/approach.jpeg"

      },
      {
        l: "Our team",
        h: "#team",
        d: "The people who make VASCO's work happen.",
        m: "Meet the team",
        sub: [],
                img: "imgs/nav/vasco.jpeg"

      },
    ],
  },
  {
    t: "What we do",
    s: [
      {
        l: "Livelihoods",
        h: "#goal",
        d: "Integrated programming that strengthens livelihoods and inclusive socio-economic development.",
        m: "Our strategic goal",
        sub: [],
                img: "imgs/nav/liveli.jpeg"

      },
      {
        l: "Environment",
        h: "#goal",
        d: "Environmental stewardship with communities for lasting benefits.",
        m: "Our strategic goal",
        sub: [],
                img: "imgs/nav/envt.jpeg"

      },
      {
        l: "Governance",
        h: "#goal",
        d: "Good governance built on participation, transparency and accountability.",
        m: "Our strategic goal",
        sub: [],
                img: "imgs/nav/govt.png"

      },
      {
        l: "Social justice",
        h: "#goal",
        d: "Equity and inclusion so no one is left behind.",
        m: "Our strategic goal",
        sub: ["Core values|#values"],
                img: "imgs/nav/social.png"

      },
    ],
  },
  {
    t: "Our work",
    s: [
      {
        l: "Work in pictures",
        h: "#work",
        d: "A look at communities, programmes and partnerships in action.",
        m: "See the gallery",
        sub: [],
                img: "imgs/nav/work.png"

      },
    ],
  },
  {
    t: "Get involved",
    s: [
      {
        l: "Partner with us",
        h: "#contact",
        d: "Work with VASCO to create resilient, prosperous and sustainable communities.",
        m: "Get in touch",
        sub: [],
                img: "imgs/nav/involved.png"

      },
      {
        l: "Contact us",
        h: "#contact",
        d: "Off M1 Lilongwe-Kasungu Road, Lumbadzi, Lilongwe, Malawi.",
        m: "Contact details",
        sub: [
          "info@vascomw.org|mailto:info@vascomw.org",
          "+265 999 365 380|tel:+265999365380",
        ],
                img: "imgs/nav/vasco.jpeg"

      },
    ],
  },
];
document.getElementById("yr").textContent = new Date().getFullYear();
const $ = (s) => document.querySelector(s),
  cv = '<svg class="chev" width="10" height="16"><use href="#cv"/></svg>';
const navL = $("#navL"),
  navR = $("#navR"),
  mega = $("#mega"),
  scrim = $("#scrim");
let cur = -1,
  sec = 0,
  tm;
MENU.forEach((m, i) => {
  const li = document.createElement("li");
  li.innerHTML = `<button class="it" aria-expanded="false" aria-controls="mega" data-i="${i}">${m.t}</button>`;
  (i < 2 ? navL : navR).appendChild(li);
});
const items = [...document.querySelectorAll(".it")];
function paint() {
  const s = MENU[cur].s[sec];
  mega.innerHTML = `<div class="mwrap"><ul class="side">${MENU[cur].s.map((x, k) => `<li><button role="tab" aria-selected="${k === sec}" data-k="${k}">${x.l}</button></li>`).join("")}</ul>
 <div class="mc"><h2>${s.l}</h2><p>${s.d}</p><a class="more" href="${s.h}">${s.m} ${cv}</a>
 <div class="subl">${s.sub
   .map((x) => {
     const [a, b] = x.split("|");
     return `<a href="${b}">${a}</a>`;
   })
   .join("")}</div></div>
 <div class="art" style="background-image:url('${s.img}')" aria-hidden="true"><span>${MENU[cur].t}: ${s.l}</span></div></div>`;
  mega.querySelectorAll(".side button").forEach((b) => {
    const go = () => {
      sec = +b.dataset.k;
      paint();
      mega.querySelector(`.side [data-k="${sec}"]`).focus?.();
    };
    b.onmouseenter = () => {
      if (sec !== +b.dataset.k) {
        sec = +b.dataset.k;
        paint();
      }
    };
    b.onclick = go;
  });
}
function open(i) {
  clearTimeout(tm);
  if (cur !== i) {
    cur = i;
    sec = 0;
    paint();
  }
  items.forEach((b, k) => b.setAttribute("aria-expanded", k === i));
  mega.classList.add("on");
  scrim.classList.add("on");
}
function close() {
  clearTimeout(tm);
  tm = setTimeout(() => {
    cur = -1;
    items.forEach((b) => b.setAttribute("aria-expanded", "false"));
    mega.classList.remove("on");
    scrim.classList.remove("on");
  }, 120);
}
items.forEach((b) => {
  b.addEventListener("mouseenter", () => open(+b.dataset.i));
  b.addEventListener("focus", () => open(+b.dataset.i));
  b.addEventListener("click", () => open(+b.dataset.i));
});
$("#hd").addEventListener("mouseleave", close);
mega.addEventListener("click", (e) => {
  if (e.target.closest("a")) close();
});
mega.addEventListener("mouseenter", () => clearTimeout(tm));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    close();
    if (mob.classList.contains("on")) toggle(false);
  }
});
document.addEventListener("click", (e) => {
  if (!e.target.closest("#hd")) close();
});

/* mobile */
const mob = $("#mob"),
  l1 = $("#l1"),
  l2 = $("#l2"),
  bg = $("#burger");
l1.innerHTML = `<ul>${MENU.map((m, i) => `<li><button class="row" data-i="${i}">${m.t} ${cv}</button></li>`).join("")}</ul>
<div class="foot"><div class="lg"><svg width="26" height="26"><use href="#globe"/></svg><b>English</b><a href="#">Chichewa</a></div>
<a class="lg" href="#"><svg width="24" height="24"><use href="#globe"/></svg>Contact us</a></div>`;
l1.querySelectorAll(".row").forEach(
  (b) =>
    (b.onclick = () => {
      const m = MENU[+b.dataset.i];
      l2.innerHTML =
        `<button class="back"><svg width="30" height="16"><use href="#ar"/></svg><span>Back</span></button><h3>${m.t}</h3>` +
        m.s
          .map(
            (s) =>
              `<div class="grp"><a href="${s.h}">${s.l}</a>${s.sub
                .map((x) => {
                  const [a, b] = x.split("|");
                  return `<a class="s" href="${b}">${a}</a>`;
                })
                .join("")}</div>`,
          )
          .join("");
      l2.querySelector(".back").onclick = () => {
        l2.classList.remove("on");
        l1.classList.remove("off");
      };
      l2.scrollTop = 0;
      l2.classList.add("on");
      l1.classList.add("off");
      l2.querySelector(".back").focus();
    }),
);
function toggle(o) {
  mob.classList.toggle("on", o);
  document.body.classList.toggle("lock", o);
  bg.setAttribute("aria-expanded", o);
  bg.setAttribute("aria-label", o ? "Close menu" : "Open menu");
  $("#bi").innerHTML = o
    ? '<path d="M4 4l16 16M20 4L4 20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'
    : '<path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';
  if (!o) {
    l2.classList.remove("on");
    l1.classList.remove("off");
  }
}
mob.addEventListener("click", (e) => {
  if (e.target.closest('a[href^="#"]')) toggle(false);
});
bg.onclick = () => toggle(!mob.classList.contains("on"));
matchMedia("(min-width:961px)").addEventListener("change", (e) => {
  if (e.matches) toggle(false);
});
