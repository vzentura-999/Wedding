/* ==========================================================
   MEENAKSHI TEMPLE THEMED WEDDING INVITATION - INTERACTIVE SCRIPT
   Reference: @artfulinvites Instagram Reel
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------------
  // 1. LIVE MUHURTHAM COUNTDOWN
  // --------------------------------------------------------
  const muhurthamDate = new Date('2026-10-25T10:00:00+05:30').getTime();
  const cdDays = document.getElementById('cdDays');
  const cdHours = document.getElementById('cdHours');
  const cdMinutes = document.getElementById('cdMinutes');
  const cdSeconds = document.getElementById('cdSeconds');

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = muhurthamDate - now;

    if (distance <= 0) {
      if (cdDays) cdDays.textContent = '00';
      if (cdHours) cdHours.textContent = '00';
      if (cdMinutes) cdMinutes.textContent = '00';
      if (cdSeconds) cdSeconds.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (cdDays) cdDays.textContent = String(days).padStart(2, '0');
    if (cdHours) cdHours.textContent = String(hours).padStart(2, '0');
    if (cdMinutes) cdMinutes.textContent = String(minutes).padStart(2, '0');
    if (cdSeconds) cdSeconds.textContent = String(seconds).padStart(2, '0');
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // Calendar Links setup
  const addToGCalBtn = document.getElementById('addToGCalBtn');
  if (addToGCalBtn) {
    const title = encodeURIComponent("Aswathi & Vishnu's South Indian Temple Wedding");
    const details = encodeURIComponent("You are cordially invited for the Thalikkettu Muhurtham (10:00 AM - 10:30 AM) and traditional Kalyana Sadhya at Guruvayur Sree Krishna Temple.");
    const location = encodeURIComponent("Sree Krishna Temple Auditorium, East Nada, Guruvayur, Kerala");
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20261025T043000Z/20261025T093000Z&details=${details}&location=${location}`;
    addToGCalBtn.href = gCalUrl;
  }

  const downloadIcsBtn = document.getElementById('downloadIcsBtn');
  if (downloadIcsBtn) {
    downloadIcsBtn.addEventListener('click', () => {
      const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Aswathi & Vishnu Wedding//EN',
        'BEGIN:VEVENT',
        'UID:aswathi-vishnu-wedding-2026',
        'DTSTAMP:20260914T000000Z',
        'DTSTART:20261025T043000Z',
        'DTEND:20261025T093000Z',
        'SUMMARY:Aswathi weds Vishnu - Temple Wedding',
        'DESCRIPTION:Thalikkettu Muhurtham (10:00 AM - 10:30 AM) followed by Grand Kalyana Sadhya.',
        'LOCATION:Sree Krishna Temple Auditorium, East Nada, Guruvayur, Kerala',
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'Aswathi_Vishnu_Wedding.ics';
      link.click();
    });
  }

  // --------------------------------------------------------
  // 2. WEDDING SONG AUDIO PLAYER (YOUTUBE SHORT SOUNDTRACK)
  // Track: https://youtube.com/shorts/iI0ctlp9qzQ
  // --------------------------------------------------------
  const audioElement = document.getElementById('weddingAudio');
  const audioToggleBtn = document.getElementById('audioToggleBtn');
  const audioStatusText = document.getElementById('audioStatusText');
  let isMusicPlaying = false;
  let hasInteracted = false;

  if (audioElement) {
    audioElement.volume = 0.8;
  }

  function playWeddingMusic() {
    if (!audioElement) return;
    audioElement.play().then(() => {
      isMusicPlaying = true;
      if (audioToggleBtn) audioToggleBtn.classList.add('playing');
      if (audioStatusText) audioStatusText.textContent = 'Music Playing';
    }).catch(err => {
      console.log('Audio autoplay prevented by browser policy, waiting for user gesture:', err);
    });
  }

  function pauseWeddingMusic() {
    if (!audioElement) return;
    audioElement.pause();
    isMusicPlaying = false;
    if (audioToggleBtn) audioToggleBtn.classList.remove('playing');
    if (audioStatusText) audioStatusText.textContent = 'Play Song';
  }

  function toggleWeddingMusic() {
    if (!audioElement) return;
    if (audioElement.paused || !isMusicPlaying) {
      playWeddingMusic();
    } else {
      pauseWeddingMusic();
    }
  }

  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleWeddingMusic();
    });
  }

  // Attempt ambient playback on first natural user interaction (scroll or touch/click)
  function initAmbientAudioOnGesture() {
    if (hasInteracted) return;
    hasInteracted = true;
    playWeddingMusic();
    window.removeEventListener('click', initAmbientAudioOnGesture);
    window.removeEventListener('touchstart', initAmbientAudioOnGesture);
    window.removeEventListener('scroll', initAmbientAudioOnGesture);
  }

  window.addEventListener('click', initAmbientAudioOnGesture, { once: true });
  window.addEventListener('touchstart', initAmbientAudioOnGesture, { once: true });
  window.addEventListener('scroll', initAmbientAudioOnGesture, { once: true });

  // --------------------------------------------------------
  // 3. WHATSAPP DIRECT RSVP LINK
  // --------------------------------------------------------
  const shareWhatsappBtn = document.getElementById('shareWhatsappBtn');
  if (shareWhatsappBtn) {
    const defaultMsg = encodeURIComponent(
      "✨ Namaste! We are happy to confirm our attendance for the wedding of Aswathi & Vishnu at Guruvayur Sree Krishna Temple. Looking forward to joining you! ✨"
    );
    shareWhatsappBtn.href = `https://api.whatsapp.com/send?phone=919995190229&text=${defaultMsg}`;
    shareWhatsappBtn.target = "_blank";
  }

  // --------------------------------------------------------
  // 5. RSVP ATTENDANCE FORM & BLESSINGS WALL (PERSISTENCE)
  // --------------------------------------------------------
  const rsvpForm = document.getElementById('weddingRsvpForm');
  const rsvpSuccessMsg = document.getElementById('rsvpSuccessMsg');
  const blessingsList = document.getElementById('blessingsList');
  const blessingCountBadge = document.getElementById('blessingCountBadge');

  const savedBlessings = JSON.parse(localStorage.getItem('aswathi_vishnu_blessings') || '[]');

  function updateBlessingCount() {
    const total = 3 + savedBlessings.length;
    if (blessingCountBadge) {
      blessingCountBadge.textContent = `${total} Blessings`;
    }
  }

  function renderSavedBlessings() {
    savedBlessings.forEach(item => {
      const card = document.createElement('div');
      card.className = 'b-card';
      card.innerHTML = `
        <strong>${escapeHtml(item.name)}</strong>
        <p>"${escapeHtml(item.message)}"</p>
        <small>🌸 ${escapeHtml(item.attendance)}</small>
      `;
      if (blessingsList) {
        blessingsList.insertBefore(card, blessingsList.firstChild);
      }
    });
    updateBlessingCount();
  }

  function escapeHtml(string) {
    const div = document.createElement('div');
    div.textContent = string;
    return div.innerHTML;
  }

  renderSavedBlessings();

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('guestName').value.trim();
      const phone = document.getElementById('guestPhone').value.trim();
      const attendance = document.getElementById('guestAttendance').value;
      const message = document.getElementById('guestBlessing').value.trim();

      if (!name || !phone) return;

      const newBlessing = {
        name: name,
        attendance: attendance,
        message: message || "May the divine grace of the Lord bless Aswathi & Vishnu with eternal happiness!",
        date: new Date().toISOString()
      };

      savedBlessings.unshift(newBlessing);
      localStorage.setItem('aswathi_vishnu_blessings', JSON.stringify(savedBlessings));

      const card = document.createElement('div');
      card.className = 'b-card';
      card.innerHTML = `
        <strong>${escapeHtml(newBlessing.name)}</strong>
        <p>"${escapeHtml(newBlessing.message)}"</p>
        <small>🌸 ${escapeHtml(newBlessing.attendance)}</small>
      `;

      if (blessingsList) {
        blessingsList.insertBefore(card, blessingsList.firstChild);
      }

      updateBlessingCount();

      if (rsvpSuccessMsg) {
        rsvpSuccessMsg.classList.remove('hidden');
      }

      rsvpForm.reset();
    });
  }

  // --------------------------------------------------------
  // 6. AUSPICIOUS KERALA TEMPLE FLOWER SHOWER (SMALL PETALS FALLING)
  // Features: Jasmine (Mullappoo), Chethi/Marigold petals, Rose specks & Golden dust
  // --------------------------------------------------------
  const canvas = document.getElementById('petalsCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    let width = window.innerWidth;
    let height = window.innerHeight;

    function resizeCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle types: 'jasmine' (complete small 4-petal flower), 'marigold' (saffron petal), 'rose' (blush petal), 'sparkle'
    const particleTypes = ['jasmine', 'jasmine', 'marigold', 'marigold', 'rose', 'sparkle'];
    const particles = [];
    const count = 45;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height * 1.2 - height * 0.2,
        size: Math.random() * 4 + 5, // small size (5px - 9px)
        speedY: Math.random() * 0.9 + 0.6, // gentle fall speed
        speedX: Math.random() * 0.6 - 0.3,
        angle: Math.random() * Math.PI * 2,
        angularSpeed: Math.random() * 0.02 - 0.01,
        flip: Math.random() * Math.PI * 2,
        flipSpeed: Math.random() * 0.03 + 0.015,
        type: particleTypes[Math.floor(Math.random() * particleTypes.length)],
        opacity: Math.random() * 0.4 + 0.55,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.03 + 0.01
      });
    }

    function drawJasmine(p) {
      const s = p.size;
      // 4 tiny petals radiating around center
      for (let i = 0; i < 4; i++) {
        const petAngle = (Math.PI / 2) * i;
        ctx.save();
        ctx.rotate(petAngle);
        ctx.fillStyle = '#FFFDF7';
        ctx.beginPath();
        ctx.ellipse(s * 0.45, 0, s * 0.45, s * 0.26, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      // Golden yellow stamen center
      ctx.fillStyle = '#F59E0B';
      ctx.beginPath();
      ctx.arc(0, 0, s * 0.2, 0, Math.PI * 2);
      ctx.fill();
    }

    function drawMarigoldPetal(p) {
      const s = p.size * 1.1;
      ctx.fillStyle = '#F97316'; // Saffron orange
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.6);
      ctx.bezierCurveTo(s * 0.45, -s * 0.3, s * 0.4, s * 0.4, 0, s * 0.6);
      ctx.bezierCurveTo(-s * 0.4, s * 0.4, -s * 0.45, -s * 0.3, 0, -s * 0.6);
      ctx.fill();

      // Inner golden highlight
      ctx.fillStyle = '#FDE047';
      ctx.beginPath();
      ctx.arc(0, -s * 0.15, s * 0.18, 0, Math.PI * 2);
      ctx.fill();
    }

    function drawRosePetal(p) {
      const s = p.size * 0.95;
      ctx.fillStyle = '#E11D48'; // Rich rose crimson
      ctx.beginPath();
      ctx.ellipse(0, 0, s * 0.5, s * 0.35, Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
    }

    function drawSparkle(p) {
      const s = p.size * 0.35;
      ctx.fillStyle = '#FBBF24';
      ctx.beginPath();
      ctx.arc(0, 0, s, 0, Math.PI * 2);
      ctx.fill();
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.y += p.speedY;
        p.wobble += p.wobbleSpeed;
        p.x += Math.sin(p.wobble) * 0.75 + p.speedX;
        p.angle += p.angularSpeed;
        p.flip += p.flipSpeed;

        // Reset particle when it goes off screen
        if (p.y > height + 25) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -15;
        if (p.x < -20) p.x = width + 15;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.scale(1, Math.cos(p.flip)); // 3D tumbling flip effect
        ctx.globalAlpha = p.opacity;

        switch (p.type) {
          case 'jasmine':
            drawJasmine(p);
            break;
          case 'marigold':
            drawMarigoldPetal(p);
            break;
          case 'rose':
            drawRosePetal(p);
            break;
          case 'sparkle':
            drawSparkle(p);
            break;
        }

        ctx.restore();
      });

      requestAnimationFrame(animate);
    }

    animate();
  }

  // --------------------------------------------------------
  // 7. SMOOTH SCROLLING & SCROLL-TRIGGERED REVEAL TRANSITIONS
  // --------------------------------------------------------
  // Smooth scroll handler for all internal anchor links (#ceremonies, #rsvp, etc.)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const navOffset = 20;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Automatically register key sections and cards for smooth entrance transitions
  const revealSelectors = [
    '.formal-invite-section .invite-card-crimson',
    '.event-horizontal-card',
    '.mandap-artwork-card',
    '.golden-promise-card',
    '.pillar-card',
    '.temple-corridor-rsvp-card',
    '.blessings-wall-card',
    '.meenakshi-footer .footer-center'
  ];

  // Apply .scroll-reveal class and staggered delays
  revealSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, index) => {
      el.classList.add('scroll-reveal');
      // Apply staggered delays to grid siblings
      if (el.classList.contains('pillar-card') || el.classList.contains('event-horizontal-card')) {
        const staggerIndex = (index % 4) + 1;
        el.classList.add(`delay-${staggerIndex}`);
      }
    });
  });

  // IntersectionObserver to trigger transitions smoothly on scroll
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target); // Reveal once smoothly
        }
      });
    }, {
      root: null,
      threshold: 0.12, // triggers when 12% of element is in view
      rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.scroll-reveal').forEach(el => {
      revealObserver.observe(el);
    });
  } else {
    // Fallback for older browsers
    document.querySelectorAll('.scroll-reveal').forEach(el => {
      el.classList.add('is-revealed');
    });
  }

  // Subtle hero parallax on scroll for added visual depth
  const heroCenter = document.querySelector('.hero-center-box');
  if (heroCenter) {
    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset;
      if (scrollY < 700) {
        heroCenter.style.transform = `translateY(${scrollY * 0.22}px)`;
        heroCenter.style.opacity = `${1 - scrollY / 650}`;
      }
    }, { passive: true });
  }

});
