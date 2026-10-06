const ID = "589455745972699146";
const barvy = {
  online: "#23a55a",
  idle: "#f0b232",
  dnd: "#f23f43",
  offline: "#80848e"
};

async function nactiStatus() {
  try {
    const res = await fetch(`https://api.lanyard.rest/v1/users/${ID}`);
    const json = await res.json();
    if (!json.success) return;

    const d = json.data;
    document.getElementById("status").style.background = barvy[d.discord_status];

    let text = "";
    if (d.listening_to_spotify) {
      text = `Poslouchá: ${d.spotify.song} – ${d.spotify.artist}`;
    } else {
      const hra = d.activities.find(a => a.type === 0);
      if (hra) text = `Hraje: ${hra.name}`;
    }
    document.getElementById("aktivita").textContent = text;
  } catch (e) {
    console.error("Lanyard nejede:", e);
  }
}
nactiStatus();
setInterval(nactiStatus, 30000);


var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

class Random {
    
    static generateBinary() {
        var random = Math.random();
        if (random > 0.5) {
            return 1;
        } else {
            return 0;
        }
    }
    
    static generate(min, max) {
        return Math.floor((Math.random() * max) + min);
    }
    
}

class Binary {
    constructor() {
        this.value = Random.generateBinary();
    }
    
    animate(ts, leftOffset, topOffset) {
        var div = document.createElement("div");
        $(div).css("font-size", ts + "px");
        $(div).css("top", topOffset * (ts / 2));
        $(div).css("left", leftOffset + "px");
        $(div).text(this.value);
        $(div).addClass("binary");
        $(div).hide();
        $("body").append(div);
        $(div).show().addClass("animated fadeIn").on(animationEnd, this.fadeInEnd);
        return $(div).offset().top;
    }
   
    fadeInEnd(event) {
        var $binary = $(event.currentTarget);
        $binary.removeClass("animated fadeIn");
        $binary.addClass("animated fadeOut").on(animationEnd, function() {
            $binary.remove();
        });
    }
}

class BinaryLine {
    constructor(lO, tS, dS) {
        this.leftOffset = lO;
        this.textSize = tS;
        this.documentSize = dS;
    }
    
    generate() {
        var iterator = 1;
        var size = this.length;
        var fontSize = this.textSize;
        var documentSize = this.documentSize;
        var currentOffset = 0;
        var leftOffset = this.leftOffset;
        var interval = setInterval(function() {
            if (currentOffset < documentSize) {
                var binary = new Binary();
                currentOffset = binary.animate(fontSize, leftOffset, iterator);
                iterator++;
            } else {
                clearInterval(interval);
            }
        }, 80);
    }
}

class BinaryAnimation {
    constructor() {}
    
    start() {
        setInterval(function() {
            new BinaryLine(Random.generate(0, $(document).width()), Random.generate($(document).width() * 0.002, $(document).width() * 0.008), $(document).height()).generate();
        }, 400);
        
        setInterval(function() {
            $(".binary").remove();
        }, 30000)
    }
}

new BinaryAnimation().start();


let bufferMiku = "";
let bufferStop = "";
let song = new Audio("whyMiku.webm");

document.addEventListener("keydown", function(e) {
    const letter = e.key.toLowerCase();

    bufferMiku += letter;
    bufferMiku = bufferMiku.slice(-4);

    bufferStop += letter;
    bufferStop = bufferStop.slice(-4);

    if (bufferMiku === "miku") {
        song.play();
    }

    if (bufferStop === "stop") {
        song.pause();
        song.currentTime = 0;
    }
});

const narozeni = new Date(2006, 10, 28, 11, 13, 0);

const el = {
  years: document.getElementById('years'),
  months: document.getElementById('months'),
  days: document.getElementById('days'),
  hours: document.getElementById('hours'),
  minutes: document.getElementById('minutes'),
  seconds: document.getElementById('seconds'),
};

function pad(n, width = 2) {
  return String(n).padStart(width, '0');
}

function tick() {
  const ted = new Date();

  let years = ted.getFullYear() - narozeni.getFullYear();
  let months = ted.getMonth() - narozeni.getMonth();
  let days = ted.getDate() - narozeni.getDate();

  if (days < 0) {
    months -= 1;
    const predchoziMesic = new Date(ted.getFullYear(), ted.getMonth(), 0);
    days += predchoziMesic.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const diffMs = ted - narozeni;
  const totalSeconds = Math.floor(diffMs / 1000);
  const daySeconds = totalSeconds % 86400;
  const hours = Math.floor(daySeconds / 3600);
  const minutes = Math.floor((daySeconds % 3600) / 60);
  const seconds = daySeconds % 60;

  el.years.textContent = years;
  el.months.textContent = months;
  el.days.textContent = days;
  el.hours.textContent = pad(hours);
  el.minutes.textContent = pad(minutes);
  el.seconds.textContent = pad(seconds);
}

tick();
setInterval(tick, 1000);