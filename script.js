document.addEventListener('DOMContentLoaded', () => {
  const cameraViewport = document.getElementById('camera-viewport');
  const starsLayer = document.getElementById('stars-layer');
  const houseTarget = document.getElementById('house-target');
  const windowTarget = document.getElementById('window-target');
  
  const sceneExterior = document.getElementById('scene-exterior');
  const sceneInterior = document.getElementById('scene-interior');

  const envBedroom = document.getElementById('env-bedroom');
  const envMorning = document.getElementById('env-morning');
  const envDate = document.getElementById('env-date');

  const characterWrapper = document.getElementById('character-wrapper');
  const boyAvatar = document.getElementById('boy-avatar');
  const boyEyes = document.getElementById('boy-eyes');
  const boyMouth = document.getElementById('boy-mouth');
  const boyTorso = document.getElementById('boy-torso');

  const dialogueBox = document.getElementById('dialogue-box');
  const dialogueText = document.getElementById('dialogue-text');

  let isZooming = false;
  let storyStep = 0;

  for (let i = 0; i < 75; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 70}%`;
    const sz = Math.random() * 3 + 1;
    star.style.width = `${sz}px`;
    star.style.height = `${sz}px`;
    star.style.setProperty('--dur', `${Math.random() * 2 + 1}s`);
    starsLayer.appendChild(star);
  }

  setInterval(() => {
    const shootingStar = document.createElement('div');
    shootingStar.className = 'shooting-star';
    shootingStar.style.top = `${Math.random() * 40}%`;
    shootingStar.style.right = `-100px`;
    starsLayer.appendChild(shootingStar);

    setTimeout(() => { shootingStar.remove(); }, 2600);
  }, 4000);

  houseTarget.addEventListener('click', () => {
    if (isZooming || storyStep > 0) return;
    isZooming = true;

    const winRect = windowTarget.getBoundingClientRect();
    const winCenterX = winRect.left + winRect.width / 2;
    const winCenterY = winRect.top + winRect.height / 2;

    const viewCenterX = window.innerWidth / 2;
    const viewCenterY = window.innerHeight / 2;

    const panX = (viewCenterX - winCenterX) * 4;
    const panY = (viewCenterY - winCenterY) * 4;

    cameraViewport.style.transform = `translate(${panX}px, ${panY}px) scale(4.8)`;

    setTimeout(() => {
      sceneExterior.classList.remove('active');
      sceneInterior.classList.add('active');

      cameraViewport.style.transition = 'none';
      cameraViewport.style.transform = 'translate(0px, 0px) scale(1)';

      setTimeout(() => {
        cameraViewport.style.transition = 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
        isZooming = false;
      }, 50);
    }, 1100);
  });

  function transitionEnv(fromEnv, toEnv) {
    fromEnv.classList.add('slide-out');
    fromEnv.classList.remove('active');

    setTimeout(() => {
      fromEnv.classList.remove('slide-out');
    }, 900);

    toEnv.classList.add('active');
  }

  characterWrapper.addEventListener('click', () => {
    storyStep++;

    switch (storyStep) {
      case 1:
        // Get up from bed to stand & wave
        characterWrapper.className = 'pos-bedroom';
        boyAvatar.classList.add('waving');
        dialogueText.innerText = "Good morning baby, I hope you slept well.";
        dialogueBox.classList.add('show');
        break;

      case 2:
        boyAvatar.classList.remove('waving');
        boyAvatar.classList.add('scratching');
        dialogueText.innerText = "I Have been thinking about you a lot, like I always do and I miss you so much.";
        break;

      case 3:
        boyAvatar.classList.remove('scratching');
        transitionEnv(envBedroom, envMorning);
        characterWrapper.className = 'pos-center';

        dialogueText.innerText = "you know I started a job and I thought everything would get better, but it created a new fear for me.";
        break;

      case 4:
        boyAvatar.classList.add('hiding-face');
        boyEyes.classList.add('sad');
        boyMouth.classList.add('worried');

        dialogueText.innerText = "It felt like I wont be able to keep up with you and I wont be able to be by your side.";
        break;

      case 5:
        boyAvatar.classList.remove('hiding-face');
        boyEyes.classList.remove('sad');
        boyMouth.classList.remove('worried');
        boyTorso.classList.add('suit');

        transitionEnv(envMorning, envDate);

        dialogueText.innerText = "on the other hand I will be able to treat you better and I will be able to make you more happy with dates, gifts, flowers ( I hope  ).";
        break;

      case 6:
        dialogueText.innerText = "you deserve the best and I will make sure you have it all";
        break;

      case 7:
        boyTorso.classList.remove('suit');
        transitionEnv(envDate, envBedroom);
        characterWrapper.className = 'pos-bedroom';

        dialogueText.innerText = "I just want you to promise me one thing.";
        break;

      case 8:
        dialogueText.innerText = "I dont know what will happen in the future";
        break;

      case 9:
        dialogueText.innerText = "I dont know what I will do in the future";
        break;

      case 10:
        dialogueText.innerText = "but I know no matter what I will always love you and choose you.";
        break;

      case 11:
        dialogueText.innerText = "no matter what we will do or where we go";
        break;

      case 12:
        dialogueText.innerText = "we decide and do everything together, no matter what";
        break;

      case 13:
        dialogueText.innerText = "we choose each other no matter what";
        break;

      case 14:
        dialogueText.innerText = "Can you promise me that?";
        break;

      case 15:
        dialogueText.innerText = "I promise you that. I love you baby.";
        break;

      case 16:
        // Lies down back in bed (no text)
        characterWrapper.className = 'pos-bed-lying';
        dialogueBox.classList.remove('show');
        break;

      case 17:
        // RETURN BACK TO OUTSIDE NIGHT SCENE
        sceneInterior.classList.remove('active');
        sceneExterior.classList.add('active');

        setTimeout(() => {
          characterWrapper.className = 'pos-bed-lying';
          boyAvatar.className = 'boy-character';
          envBedroom.className = 'environment env-bedroom active';
          envMorning.className = 'environment env-morning';
          envDate.className = 'environment env-date';
          storyStep = 0;
        }, 1000);
        break;
    }
  });
});
