// 2089 Interactions: Particle Field + Magnetic Elements + Scroll Reveal
(function() {
  'use strict';

  // ===== Particle Canvas =====
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  
  const glyphs = ['{ }', '</>', '()', '[]', '=>', '...', '::', '&&', '||', '##', '--', '++', '**', '~~', '!=', ':=', '<>', '//', '/*', '*/', '++', '--'];
  
  function initParticles() {
    const particleCount = Math.min(40, Math.floor((width * height) / 18000));
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        glyph: glyphs[Math.floor(Math.random() * glyphs.length)],
        size: 10 + Math.floor(Math.random() * 16),
        opacity: 0.03 + Math.random() * 0.08
      });
    }
  }
  
  function drawParticles() {
    ctx.clearRect(0, 0, width, height);
    ctx.font = '14px "Space Grotesk", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
      
      ctx.fillStyle = `rgba(10, 10, 10, ${p.opacity})`;
      ctx.fillText(p.glyph, p.x, p.y);
    });
    
    requestAnimationFrame(drawParticles);
  }
  
  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    initParticles();
  }
  
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  drawParticles();

  // ===== Magnetic Effect =====
  const magneticElements = document.querySelectorAll('.magnetic');
  
  magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const strength = parseFloat(el.dataset.strength) || 0.2;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      
      el.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    });
    
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0, 0)';
    });
  });

  // ===== Scroll Reveal =====
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });
  
  revealElements.forEach(el => revealObserver.observe(el));
  
  // Reveal visible elements on load
  document.querySelectorAll('.scroll-reveal').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      el.classList.add('visible');
    }
  });

  // ===== Smooth Scroll =====
  document.querySelectorAll('.nav-link, a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // ===== Navbar scroll effect (subtle) =====
  const sidebar = document.querySelector('.sidebar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      sidebar.style.background = 'rgba(250, 250, 250, 0.92)';
    } else {
      sidebar.style.background = 'rgba(250, 250, 250, 0.85)';
    }
  });

})();
