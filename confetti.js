/**
 * Lightweight confetti animation on canvas
 */
class ConfettiEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.running = false;
    this.resize();
    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticle() {
    const colors = [
      "#e63946",
      "#c0283a",
      "#ff6b81",
      "#ff4757",
      "#f8a5c2",
      "#f78fb3",
      "#ff9ff3",
      "#fd79a8",
      "#e84393",
      "#d63031",
      "#fab1a0",
      "#ff7675",
      "#ffd32a",
      "#ffdd59",
      "#ff6348",
      "#ff4d4d",
    ];

    return {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height - this.canvas.height,
      w: Math.random() * 10 + 5,
      h: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 8,
      velocityX: (Math.random() - 0.5) * 4,
      velocityY: Math.random() * 3 + 2,
      wobble: Math.random() * 10,
      wobbleSpeed: Math.random() * 0.1 + 0.05,
      opacity: 1,
      shape: Math.random() > 0.5 ? "rect" : "circle",
    };
  }

  burst(count = 150) {
    for (let i = 0; i < count; i++) {
      const p = this.createParticle();
      p.y = -20 - Math.random() * 200;
      p.velocityY = Math.random() * 2 + 1;
      this.particles.push(p);
    }

    if (!this.running) {
      this.running = true;
      this.animate();
    }
  }

  animate() {
    if (!this.running) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach((p, i) => {
      p.x += p.velocityX + Math.sin(p.wobble) * 0.5;
      p.y += p.velocityY;
      p.rotation += p.rotationSpeed;
      p.wobble += p.wobbleSpeed;
      p.velocityY += 0.02; // gravity

      // Fade out near bottom
      if (p.y > this.canvas.height * 0.8) {
        p.opacity -= 0.01;
      }

      if (p.opacity <= 0 || p.y > this.canvas.height + 50) {
        this.particles.splice(i, 1);
        return;
      }

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.globalAlpha = p.opacity;
      this.ctx.fillStyle = p.color;

      if (p.shape === "rect") {
        this.ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      } else {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.w / 3, 0, Math.PI * 2);
        this.ctx.fill();
      }

      this.ctx.restore();
    });

    if (this.particles.length > 0) {
      requestAnimationFrame(() => this.animate());
    } else {
      this.running = false;
    }
  }
}
