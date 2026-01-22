// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Language toggle functionality
  let currentLang = localStorage.getItem('lang') || 'pt';

  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);

    // Update document language
    document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';

    // Update title
    document.title = lang === 'en' ? 'Rodrigo Pacheco | Portfolio' : 'Rodrigo Pacheco | Portfólio';

    // Update all elements with data attributes
    const elements = document.querySelectorAll('[data-pt], [data-en]');
    elements.forEach(element => {
      const text = element.getAttribute(`data-${lang}`);
      if (text) {
        element.textContent = text;
        // Update data-text for glitch effect
        if (element.classList.contains('glitch')) {
          element.setAttribute('data-text', text);
        }
      }
    });

    // Update button text
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
      langBtn.textContent = lang === 'en' ? 'PT' : 'EN';
    }
  }

  // Initialize language on page load
  setLanguage(currentLang);

  // Language toggle button
  const langToggleBtn = document.getElementById('lang-toggle');
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      const newLang = currentLang === 'pt' ? 'en' : 'pt';
      setLanguage(newLang);
    });
  }

  // Boot screen and hero animation
  const bootElement = document.getElementById('boot');
  const heroElement = document.getElementById('hero');

  if (bootElement && heroElement) {
    setTimeout(() => {
      bootElement.style.display = 'none';
      heroElement.style.display = 'flex';
    }, 2200);
  }

  // Toggle details functionality for experience cards
  window.toggleDetails = function(button) {
    const card = button.closest('.card');
    const details = card.querySelector('.additional-details');
    if (!details) return;

    const isVisible = details.style.display !== 'none';

    if (isVisible) {
      details.style.display = 'none';
      button.textContent = button.getAttribute('data-pt') || 'Mais sobre';
    } else {
      details.style.display = 'block';
      button.textContent = button.getAttribute('data-pt') ? 'Menos sobre' : 'Less about';
    }

    // Update button text based on current language
    if (currentLang === 'en') {
      button.textContent = isVisible ? 'More about' : 'Less about';
    } else {
      button.textContent = isVisible ? 'Mais sobre' : 'Menos sobre';
    }
  };

  // Scroll reveal functionality
  const sections = document.querySelectorAll('section');
  const reveal = () => {
    sections.forEach(sec => {
      if (sec.getBoundingClientRect().top < window.innerHeight - 100) {
        sec.classList.add('visible');
      }
    });
  };

  window.addEventListener('scroll', reveal);
  reveal(); // Initial check
});
