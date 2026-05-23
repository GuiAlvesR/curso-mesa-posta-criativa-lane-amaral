const video = document.getElementById("offerVideo");
const progressBar = document.getElementById("progressBar");

const pauseOverlay = document.getElementById("pauseOverlay");
const continueBtn = document.getElementById("continueBtn");

function atualizarBarra() {
  const duracao = video.duration;
  const tempoAtual = video.currentTime;

  if (!duracao) return;

  let progressoVisual;

  if (tempoAtual <= 60) {
    progressoVisual = (tempoAtual / duracao) * 42;
  } else {

    const restanteVideo = duracao - 60;
    const restanteAssistido = tempoAtual - 60;

    const curva = 1 - Math.exp(-3 * (restanteAssistido / restanteVideo));

    progressoVisual = 42 + curva * 58;
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
