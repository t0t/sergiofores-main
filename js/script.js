let prevScrollPos = window.scrollY;

window.onscroll = function() {
  let currentScrollPos = window.scrollY;
  if (prevScrollPos > currentScrollPos) {
    document.querySelector("header").classList.remove("hidden");
  } else {
    document.querySelector("header").classList.add("hidden");
  }
  prevScrollPos = currentScrollPos;
}

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
