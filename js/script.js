let lastScrollY = window.scrollY;

window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if (header) {
    const currentScrollY = window.scrollY;
    
    // Manejo de la clase 'scrolled'
    if (currentScrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Manejo de la clase 'hidden' según la dirección del scroll
    if (currentScrollY > lastScrollY) {
      // Se desplaza hacia abajo
      header.classList.add('hidden');
    } else {
      // Se desplaza hacia arriba
      header.classList.remove('hidden');
    }

    lastScrollY = currentScrollY;
  }
});

document.getElementById('whatsapp-button').addEventListener('click', function() {
  (async function() {
    try {
      const response = await fetch('/phone.txt');
      const phoneNumber = await response.text();
      const cleanedPhone = phoneNumber.trim();
      const url = 'https://wa.me/' + cleanedPhone;
      window.open(url, '_blank');
    } catch (err) {
      console.error('Error fetching phone number:', err);
    }
  })();
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    targetElement.scrollIntoView({ behavior: 'smooth' });
  });
});

const menuToggle = document.querySelector('.menu-toggle');

if (menuToggle) {
  menuToggle.addEventListener('click', function() {
    console.log('Menu toggle clicked');
    const nav = document.querySelector('header nav');
    if (nav) {
      nav.classList.toggle('active');
      menuToggle.classList.toggle('active');
      console.log('Navigation active:', nav.classList.contains('active'));
    } else {
      console.error('Navigation not found');
    }
  });
} else {
  console.error('Menu toggle button not found');
}
