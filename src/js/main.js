const video = document.getElementById("offerVideo");
const progressBar = document.getElementById("progressBar");

const pauseOverlay = document.getElementById("pauseOverlay");
const continueBtn = document.getElementById("continueBtn");

function atualizarBarra() {
  const duracao = video.duration;
  const tempoAtual = video.currentTime;

  if (!duracao) return;

  const progressoReal = tempoAtual / duracao;
  let progressoVisual;

  if (progressoReal <= 0.5) {
    progressoVisual = progressoReal * 156;
  } else {

    const metadeFinal = (progressoReal - 0.5) / 0.5;
    const curva = Math.pow(metadeFinal, 2.2);

    progressoVisual = 78 + curva * 22;
  }

  progressoVisual = Math.min(progressoVisual, 100);
  progressBar.style.width = progressoVisual + "%";
}

video.addEventListener("timeupdate", atualizarBarra);

video.addEventListener("pause", () => {
  if (video.currentTime < video.duration - 0.5) {
    pauseOverlay.classList.add("active");
  }
});

video.addEventListener("play", () => {
  pauseOverlay.classList.remove("active");
});

continueBtn.addEventListener("click", () => {
  video.play();
});

video.addEventListener("click", () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
});

const offerLocked = document.getElementById("offerLocked");
const offerUnlocked = document.getElementById("offerUnlocked");
const loadingBar = document.querySelector(".offer-loading-bar");

const tempoLiberacao = 300;

video.addEventListener("timeupdate", () => {
  if (!video.duration) return;

  const progresso = Math.min((video.currentTime / tempoLiberacao) * 100, 100);

  loadingBar.style.width = progresso + "%";

  if (video.currentTime >= tempoLiberacao) {
    offerLocked.classList.add("hide");

    setTimeout(() => {
      offerUnlocked.classList.add("active");
    }, 250);
  }
});
