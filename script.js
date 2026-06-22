// =========================
// TEXTO INTRODUCTORIO
// =========================

const introText = `
Algunas noches, la naturaleza ofrece espectáculos hermosos imposibles de capturar con la lente de una cámara...


Miles de pequeñas luces parpadean entre los árboles
y transforman el bosque en una escena de cuento...


Y esas noches más brillantes
merecen una buena compañía.
`;

const typewriter = document.getElementById("typewriter");
const startScreen =
    document.getElementById("startScreen");
const music =
    document.getElementById("bgMusic");
let experienceStarted = false;
const questionContainer = document.getElementById("question-container");

let index = 0;
function startExperience(selectedFirefly){

    if(experienceStarted) return;

    experienceStarted = true;

    document.querySelectorAll(".starter-firefly").forEach(fly => {

        if (fly !== selectedFirefly) {
    
            fly.style.opacity = "0";
            fly.style.transform = "scale(.2)";
    
        }
    
    });

    const rect =
        selectedFirefly.getBoundingClientRect();

    selectedFirefly.classList.add(
        "selected-firefly"
    );

    selectedFirefly.style.left =
        rect.left + "px";

    selectedFirefly.style.top =
        rect.top + "px";

    setTimeout(() => {

        selectedFirefly.style.left =
            (window.innerWidth - 80) + "px";

        selectedFirefly.style.top =
            "120px";

    }, 100);

    if(music){

        music.volume = 0.5;

        music.play().catch(() => {});
    }

    setTimeout(() => {

        startScreen.style.opacity = "0";

    }, 1200);

    setTimeout(() => {

        startScreen.style.display = "none";

        writeText();

    }, 2200);
}
function writeText() {

    if (index < introText.length) {

        const char = introText.charAt(index);

        if(char === "\n"){
            typewriter.innerHTML += "<br>";
        }else{
            typewriter.innerHTML += char;
        }

        index++;

        setTimeout(writeText, 35);

    } else {

        setTimeout(() => {
            questionContainer.classList.remove("hidden");
        }, 1200);

    }
}


// =========================
// LUCIÉRNAGAS
// =========================

const firefliesContainer = document.getElementById("fireflies");

function createFirefly() {

    const firefly = document.createElement("div");
    firefly.classList.add("firefly");

    const size = Math.random() * 6 + 4;

    firefly.style.width = size + "px";
    firefly.style.height = size + "px";

    firefly.style.left = Math.random() * window.innerWidth + "px";
    firefly.style.top = Math.random() * window.innerHeight + "px";

    firefliesContainer.appendChild(firefly);

    animateFirefly(firefly);
}

function animateFirefly(firefly) {

    let x = parseFloat(firefly.style.left);
    let y = parseFloat(firefly.style.top);

    setInterval(() => {

        x += (Math.random() - 0.5) * 40;
        y += (Math.random() - 0.5) * 40;

        if (x < 0) x = 0;
        if (y < 0) y = 0;
        if (x > window.innerWidth) x = window.innerWidth;
        if (y > window.innerHeight) y = window.innerHeight;

        firefly.style.left = x + "px";
        firefly.style.top = y + "px";

    }, 1500);
}

for (let i = 0; i < 35; i++) {
    createFirefly();
}


// =========================
// BOTÓN NO
// =========================

const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");

const funnyMessage = document.getElementById("funnyMessage");

const messages = [
    "¡Ah! ¿No quieres? 🥺✨",
    "Vamos, el bosque está lindo 🌲🪰🌙",
    "Ándaleeee 😏✨",
    "¿Por qué quieres elegir que no? 🤔",
    "Vamooooooos 🌲✨",
    "Si dices que no, se apaga la luna y nos morimos todos 🌙💀😂",
    "Jajaja... ¿por qué no? 😂"
];

let yesScale = 1;

function moveNoButton() {

    const maxX = window.innerWidth - 180;
    const maxY = window.innerHeight - 120;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    noBtn.style.position = "fixed";
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";

    yesScale += 0.08;

    yesBtn.style.transform = `scale(${yesScale})`;

    funnyMessage.textContent =
        messages[Math.floor(Math.random() * messages.length)];

    spawnEscapeFirefly(randomX, randomY);
}

function spawnEscapeFirefly(x, y) {

    const fly = document.createElement("div");

    fly.classList.add("firefly");

    fly.style.left = x + "px";
    fly.style.top = y + "px";

    document.body.appendChild(fly);

    let currentX = x;
    let currentY = y;

    const animation = setInterval(() => {

        currentX += 8;
        currentY -= 4;

        fly.style.left = currentX + "px";
        fly.style.top = currentY + "px";

    }, 20);

    setTimeout(() => {
        clearInterval(animation);
        fly.remove();
    }, 1500);
}

noBtn.addEventListener("mouseenter", moveNoButton);

// soporte móvil

noBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    moveNoButton();
});


// =========================
// ACEPTAR INVITACIÓN
// =========================

const successSection = document.getElementById("success-section");
const introSection = document.getElementById("intro-section");

yesBtn.addEventListener("click", () => {

    introSection.classList.add("hidden");

    successSection.classList.remove("hidden");

    launchCelebration();

    if (music) {

        music.volume = 0.6;

        music.play().catch(() => {
            console.log("Audio bloqueado por el navegador.");
        });
    }
});


// =========================
// CELEBRACIÓN
// =========================

function launchCelebration() {

    for (let i = 0; i < 80; i++) {

        setTimeout(() => {

            const fly = document.createElement("div");

            fly.classList.add("firefly");

            fly.style.left =
                window.innerWidth / 2 + "px";

            fly.style.top =
                window.innerHeight / 2 + "px";

            document.body.appendChild(fly);

            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 500;

            const targetX =
                Math.cos(angle) * distance;

            const targetY =
                Math.sin(angle) * distance;

            fly.animate(
                [
                    {
                        transform: "translate(0,0)",
                        opacity: 1
                    },
                    {
                        transform:
                            `translate(${targetX}px, ${targetY}px)`,
                        opacity: 0
                    }
                ],
                {
                    duration: 2500,
                    easing: "ease-out"
                }
            );

            setTimeout(() => {
                fly.remove();
            }, 2500);

        }, i * 30);
    }
}


// =========================
// CUENTA REGRESIVA
// =========================

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

// Fecha: 25 de julio del próximo año si ya pasó
let targetDate = new Date("2026-07-25T00:00:00");

function updateCountdown() {

    const now = new Date();

    const difference =
        targetDate.getTime() - now.getTime();

    if (difference <= 0) {

        daysEl.textContent = "00";
        hoursEl.textContent = "00";
        minutesEl.textContent = "00";
        secondsEl.textContent = "00";

        return;
    }

    const days =
        Math.floor(difference / (1000 * 60 * 60 * 24));

    const hours =
        Math.floor(
            (difference % (1000 * 60 * 60 * 24))
            / (1000 * 60 * 60)
        );

    const minutes =
        Math.floor(
            (difference % (1000 * 60 * 60))
            / (1000 * 60)
        );

    const seconds =
        Math.floor(
            (difference % (1000 * 60))
            / 1000
        );

    daysEl.textContent =
        String(days).padStart(2, "0");

    hoursEl.textContent =
        String(hours).padStart(2, "0");

    minutesEl.textContent =
        String(minutes).padStart(2, "0");

    secondsEl.textContent =
        String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);
document
    .querySelectorAll(".starter-firefly")
    .forEach(fly => {

        fly.addEventListener(
            "click",
            () => {
                console.log("Luciérnaga clickeada");
                startExperience(fly);
            }
        );

        fly.addEventListener(
            "touchstart",
            () => startExperience(fly)
        );
    });
