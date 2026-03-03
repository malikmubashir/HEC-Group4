/* ===================================================
   GLOBAL APEX — Main JavaScript
   Version: 2.0
   =================================================== */

(function () {
  'use strict';

  /* ---- NAVBAR SCROLL BEHAVIOUR ---- */
  const navbar = document.querySelector('.navbar');
  const hero = document.querySelector('.hero');

  function handleNavScroll() {
    if (!navbar) return;
    if (hero) {
      if (window.scrollY > 60) {
        navbar.classList.remove('transparent');
        navbar.classList.add('solid');
      } else {
        navbar.classList.remove('solid');
        navbar.classList.add('transparent');
      }
    } else {
      navbar.classList.add('solid');
    }
  }

  if (hero) {
    navbar.classList.add('transparent');
  } else {
    navbar.classList.add('solid');
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  /* ---- MOBILE MENU ---- */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu when link clicked
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ---- SCROLL REVEAL ---- */
  if ('IntersectionObserver' in window) {
    const revealEls = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback for older browsers
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ---- ANIMATED COUNTERS ---- */
  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 2000;
    var start = 0;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window) {
    var counterEls = document.querySelectorAll('[data-counter]');
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counterEls.forEach(function (el) { counterObserver.observe(el); });
  }

  /* ---- FAQ ACCORDION ---- */
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq-question');
    var answer = item.querySelector('.faq-answer');
    if (!question || !answer) return;

    question.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      // Close all
      faqItems.forEach(function (i) {
        i.classList.remove('open');
        var a = i.querySelector('.faq-answer');
        if (a) a.style.maxHeight = null;
      });
      // Open clicked
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ---- CONTACT FORM ---- */
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    var submitBtn = contactForm.querySelector('.form-submit');
    var successPanel = document.querySelector('.form-success');
    var errorMsg = document.querySelector('.form-error-msg');

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var btn = submitBtn;
      btn.disabled = true;
      btn.textContent = 'Sending…';
      if (errorMsg) errorMsg.style.display = 'none';

      var formData = new FormData(contactForm);

      fetch('/contact-handler.php', {
        method: 'POST',
        body: formData
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (data.success) {
            contactForm.style.display = 'none';
            if (successPanel) successPanel.style.display = 'block';
          } else {
            if (errorMsg) {
              errorMsg.textContent = data.message || 'Something went wrong. Please try again.';
              errorMsg.style.display = 'block';
            }
            btn.disabled = false;
            btn.textContent = 'Send Message';
          }
        })
        .catch(function () {
          if (errorMsg) {
            errorMsg.textContent = 'Connection error. Please email us directly at contact@globalapex.net';
            errorMsg.style.display = 'block';
          }
          btn.disabled = false;
          btn.textContent = 'Send Message';
        });
    });
  }

  /* ---- ACTIVE NAV LINK ---- */
  var currentPath = window.location.pathname;
  document.querySelectorAll('.nav-menu a, .mobile-menu a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var linkPath = href.replace(/^https?:\/\/[^/]+/, '');
    if (
      (currentPath === '/' && linkPath === '/') ||
      (currentPath !== '/' && linkPath !== '/' && currentPath.startsWith(linkPath.replace('.html', '')))
    ) {
      link.classList.add('active');
    }
  });

  /* ---- SMOOTH SCROLL FOR ANCHOR LINKS ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = anchor.getAttribute('href').slice(1);
      var targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        var offset = 90;
        var top = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

})();
