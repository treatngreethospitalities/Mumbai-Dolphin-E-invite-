/* =========================================================
   1. EDIT YOUR DETAILS HERE
   ========================================================= */

// RSVP – fill ONE of these two (leave the other empty)
//   RSVP_WHATSAPP: number with country code, digits only, e.g. "919999999999"
//   RSVP_LINK:     any link, e.g. a Google Form
const RSVP_WHATSAPP = "";
const RSVP_LINK = "";

// Your deployed website address (used by the Share button). Leave "" to use the current page.
const SITE_URL = "";

// Event details
const LEAGUE_NAME = "Women's Pro Volleyball League";   // verified: it is a volleyball league
const EVENT_DATE_LABEL = "11 November 2026";
const EVENT_TIME_LABEL = "3:00 PM onwards";

// TODO: check these two against the District event page
const VENUE_NAME = "Ekana Indoor Stadium";
const VENUE_ADDRESS = "Ekana Sportz City, Sector 7, Gomti Nagar Extension, Amar Shaheed Path, Lucknow, Uttar Pradesh 226010";

// Calendar times (India time). End time is not published, so 3 hours is a placeholder – change it.
const START = "20261111T150000";   // 11 Nov 2026, 3:00 PM
const END   = "20261111T180000";   // 11 Nov 2026, 6:00 PM  (placeholder)

// For the countdown (+05:30 = India time)
const COUNTDOWN_TARGET = new Date("2026-11-11T15:00:00+05:30");


/* =========================================================
   2. SHOW VENUE + LEAGUE ON THE PAGE, AND BUILD THE MAP LINK
   ========================================================= */
const MAP_LINK = "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(VENUE_NAME + ", " + VENUE_ADDRESS);

document.getElementById("venueName").textContent = VENUE_NAME;
document.getElementById("venueAddress").textContent = VENUE_ADDRESS;
document.getElementById("viewVenueBtn").href = MAP_LINK;


/* =========================================================
   3. OPENING SCREEN  →  MAIN INVITATION
   ========================================================= */
const intro = document.getElementById("intro");
const main = document.getElementById("main");
const openBtn = document.getElementById("openBtn");

openBtn.addEventListener("click", function () {
  playMusic();                         // the tap is what lets the browser play sound
  main.classList.remove("hidden");     // show the invitation
  window.scrollTo(0, 0);
  intro.classList.add("leaving");      // fade the opening screen out

  setTimeout(function () {
    intro.style.display = "none";
    document.body.classList.remove("locked");   // allow scrolling again
    startScrollAnimation();
  }, 950);
});


/* =========================================================
   4. SCROLL ANIMATION (items with class "reveal" fade in)
   ========================================================= */
function startScrollAnimation() {
  const items = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("visible"); });
    return;
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(function (el) { observer.observe(el); });
}


/* =========================================================
   5. GUEST NAME  (optional)  –  open the site with ?guest=Mr. Sharma
   ========================================================= */
const guestName = (new URLSearchParams(window.location.search).get("guest") || "").trim().slice(0, 60);
if (guestName) {
  document.getElementById("guestLine").textContent = "Dear " + guestName + ",";
}


/* =========================================================
   6. COUNTDOWN
   ========================================================= */
function pad(n) { return String(n).padStart(2, "0"); }

function updateCountdown() {
  let diff = COUNTDOWN_TARGET - new Date();
  if (diff < 0) diff = 0;

  const days  = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins  = Math.floor((diff % 3600000) / 60000);
  const secs  = Math.floor((diff % 60000) / 1000);

  document.getElementById("cdDays").textContent  = pad(days);
  document.getElementById("cdHours").textContent = pad(hours);
  document.getElementById("cdMins").textContent  = pad(mins);
  document.getElementById("cdSecs").textContent  = pad(secs);
}
updateCountdown();
setInterval(updateCountdown, 1000);


/* =========================================================
   7. SMALL POP-UP MESSAGE
   ========================================================= */
const toast = document.getElementById("toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 3500);
}


/* =========================================================
   8. SAVE THE DATE  (downloads a calendar .ics file)
   ========================================================= */
document.getElementById("saveDateBtn")?.addEventListener("click", function () {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Mumbai Dolphins//VVIP Invitation//EN",
    "BEGIN:VEVENT",
    "UID:opening-ceremony-20261111@mumbai-dolphins",
    "DTSTAMP:" + new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z",
    "DTSTART;TZID=Asia/Kolkata:" + START,
    "DTEND;TZID=Asia/Kolkata:" + END,
    "SUMMARY:" + LEAGUE_NAME + " - Opening Ceremony (Mumbai Dolphins)",
    "LOCATION:" + (VENUE_NAME + ", " + VENUE_ADDRESS).replace(/,/g, "\\,"),
    "DESCRIPTION:VVIP invitation - Inauguration ceremony from 3:00 PM onwards.",
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    "DESCRIPTION:Opening Ceremony tomorrow",
    "TRIGGER:-P1D",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR"
  ];

  const file = new Blob([lines.join("\r\n")], { type: "text/calendar" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(file);
  link.download = "Mumbai-Dolphins-Opening-Ceremony.ics";
  document.body.appendChild(link);
  link.click();
  link.remove();

  showToast("Calendar file downloaded - open it to save the date.");
});


/* =========================================================
   9. RSVP
   ========================================================= */
document.getElementById("rsvpBtn")?.addEventListener("click", function () {
  if (RSVP_LINK) {
    window.open(RSVP_LINK, "_blank");
  } else if (RSVP_WHATSAPP) {
    const who = guestName ? " (" + guestName + ")" : "";
    const text = "Hello Mumbai Dolphins team, I am pleased to confirm my attendance" + who +
      " at the Opening Ceremony of the " + LEAGUE_NAME + " on " + EVENT_DATE_LABEL +
      ", " + EVENT_TIME_LABEL + ", " + VENUE_NAME + ".";
    window.open("https://wa.me/" + RSVP_WHATSAPP + "?text=" + encodeURIComponent(text), "_blank");
  } else {
    showToast("RSVP is not set up yet. Add your WhatsApp number in script.js");
  }
});


/* =========================================================
   10. SHARE  (phone share sheet, or copies the link)
   ========================================================= */
document.getElementById("shareBtn")?.addEventListener("click", async function () {
  const url = SITE_URL || (window.location.origin + window.location.pathname);

  if (navigator.share) {
    try {
      await navigator.share({
        title: "Mumbai Dolphins - Opening Ceremony",
        text: "You're invited to the Opening Ceremony of the " + LEAGUE_NAME + ", " + EVENT_DATE_LABEL + ".",
        url: url
      });
      return;
    } catch (err) {
      if (err.name === "AbortError") return;   // person closed the share sheet
    }
  }

  try {
    await navigator.clipboard.writeText(url);
    showToast("Invitation link copied.");
  } catch (err) {
    showToast("Could not copy. Please copy the page link manually.");
  }
});


/* =========================================================
   11. BACKGROUND MUSIC  ("Mumbai Ki Lehar")
   Starts when the guest taps "Open Invitation" (browsers block sound before a tap).
   The round button at the top-right mutes / unmutes it.
   To change the volume, edit MUSIC_VOLUME (0 = silent, 1 = full).
   ========================================================= */
const MUSIC_VOLUME = 0.7;
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
let musicWanted = true;      // false once the guest mutes it themselves
let fadeTimer;

function fadeMusicIn() {
  clearInterval(fadeTimer);
  music.volume = 0;
  fadeTimer = setInterval(function () {
    music.volume = Math.min(MUSIC_VOLUME, music.volume + 0.05);
    if (music.volume >= MUSIC_VOLUME) clearInterval(fadeTimer);
  }, 120);
}

function setMusicUI(playing) {
  musicBtn.classList.toggle("playing", playing);
  musicBtn.classList.toggle("muted", !playing);
  musicBtn.setAttribute("aria-pressed", playing ? "false" : "true");
  musicBtn.setAttribute("aria-label", playing ? "Mute music" : "Play music");
}

function playMusic() {
  musicBtn.classList.add("show");
  musicWanted = true;
  fadeMusicIn();
  const p = music.play();
  if (p && p.catch) {
    p.then(function () { setMusicUI(true); })
     .catch(function () { setMusicUI(false); });   // blocked: guest can tap the button
  } else {
    setMusicUI(true);
  }
}

musicBtn.addEventListener("click", function () {
  if (music.paused) {
    musicWanted = true;
    fadeMusicIn();
    music.play().then(function () { setMusicUI(true); }).catch(function () {});
  } else {
    musicWanted = false;
    clearInterval(fadeTimer);
    music.pause();
    setMusicUI(false);
  }
});

// pause when the guest switches app / tab, resume when they come back
document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    music.pause();
  } else if (musicWanted && musicBtn.classList.contains("show")) {
    music.play().catch(function () { setMusicUI(false); });
  }
});
