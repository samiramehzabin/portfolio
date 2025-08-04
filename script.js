// Smooth scroll with manual offset to account for navbar height
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const sectionId = this.getAttribute('href').substring(1);
    const section = document.getElementById(sectionId);

    const yOffset = -80; // Adjust for fixed navbar height
    const yPosition = section.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({
      top: yPosition,
      behavior: 'smooth'
    });
  });
});

// Dynamic nav-link active state based on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

const observerOptions = {
  threshold: 0.6 // Trigger when 60% of the section is in view
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// Contact form  submission
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent default form submission

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const status = document.getElementById('form-status');

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  // Strict email validation requiring domain like .com, .net, .org etc.
  const emailRegex = /^[^\s@]+@[^\s@]+\.(com|net|org|edu|gov|io|co|in|bd)$/i;

  if (name.length < 3) {
    status.textContent = "Name must be at least 3 characters.";
    status.style.color = "#c0392b";
    nameInput.focus();
    return;
  }

  if (!emailRegex.test(email)) {
    status.textContent = "Please enter a valid email ending in .com, .net, etc.";
    status.style.color = "#c0392b";
    emailInput.focus();
    return;
  }

  if (message.length === 0) {
    status.textContent = "Message cannot be empty.";
    status.style.color = "#c0392b";
    messageInput.focus();
    return;
  }

  // All validations passed
  status.textContent = `Thank you for your message, ${name}! I'll get back to you soon.`;
  status.style.color = "#ff8c42";

  // Clear fields
  nameInput.value = "";
  emailInput.value = "";
  messageInput.value = "";

  // Remove focus
  nameInput.blur();
  emailInput.blur();
  messageInput.blur();

  // Clear status after 3 seconds
  setTimeout(() => {
    status.textContent = "";
  }, 3000);
});



// Scroll reveal animation
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => {
  section.classList.add('section-hidden');
  revealObserver.observe(section);
});

// Scroll to top button
const scrollBtn = document.getElementById("scrollToTopBtn");

window.onscroll = function () {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
};

scrollBtn.onclick = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

