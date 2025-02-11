// Select Elements
const hugButton = document.getElementById('hugButton');
const messageSection = document.getElementById('messageSection');
const hugPhotoContainer = document.getElementById('hugPhotoContainer');
const floatingHearts = document.querySelector('.floating-hearts');

// Click Event on Button
hugButton.addEventListener('click', () => {
  // Hide the message section and button
  messageSection.classList.add('hidden');
  hugButton.classList.add('hidden');

  // Show the hug photo container
  hugPhotoContainer.classList.remove('hidden');

  // Trigger confetti animation
  triggerConfetti();

  // Add floating hearts animation
  createFloatingHearts();
});

// Confetti Animation
function triggerConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confettiCount = 200;
  const confettis = [];

  class Confetti {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height - canvas.height;
      this.size = Math.random() * 5 + 2;
      this.speed = Math.random() * 3 + 1;
      this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }

    update() {
      this.y += this.speed;
      if (this.y > canvas.height) {
        this.y = -this.size;
        this.x = Math.random() * canvas.width;
      }
    }
  }

  for (let i = 0; i < confettiCount; i++) {
    confettis.push(new Confetti());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettis.forEach(confetti => {
      confetti.update();
      confetti.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}

// Floating Hearts Animation
function createFloatingHearts() {
  for (let i = 0; i < 50; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.animationDuration = `${Math.random() * 3 + 2}s`;
    heart.style.opacity = Math.random();
    floatingHearts.appendChild(heart);

    // Remove hearts after animation ends
    setTimeout(() => {
      heart.remove();
    }, 5000);
  }
}