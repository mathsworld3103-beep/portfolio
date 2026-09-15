const themeToggle = document.getElementById('themeToggle');
const icon = themeToggle.querySelector('i');
const root = document.documentElement;

// Set icon to match the theme already applied by the head script
updateIcon(root.getAttribute('data-theme'));

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateIcon(next);
});

function updateIcon(theme) {
  icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
}

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');

//* mobile menu*//

const nav = document.getElementById('nav');
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll' , () => {
    nav.classList.toggle('scrolled' , window.scrollY > 40)
});

burger.addEventListener ('click' , () => {
    burger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
});

document.querySelectorAll ('.mobile-menu li a').forEach(link => {
    link.addEventListener('click' , () => {
        burger.classList.remove('open');
        mobileMenu.classList.remove('open');
    })
});


/*animation*/

const sections = document.querySelectorAll(".banner, .about, .skills");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }

    });
}, {
    threshold: 0.15
});

sections.forEach(section => {
    observer.observe(section);
});


const section = document.querySelectorAll("section, .banner, .about, .skills, .project, .contact");
const navLinks = document.querySelectorAll(".nav-link a");

window.addEventListener("scroll", () => {

    let current = "";

    section.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});



const skillIcons = document.querySelectorAll(".skill-icon");

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.2
});

skillIcons.forEach((icon, index) => {
    // Stagger delay
    icon.style.transitionDelay = `${index * 0.12}s`;

    skillObserver.observe(icon);
});

const projectSection = document.querySelector(".project");

const projectObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    },
    {
        threshold: 0.2
    }
);

projectObserver.observe(projectSection);


const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    formMessage.textContent = "Sending...";

    try {
        const response = await fetch("http://localhost:5000/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                subject,
                message
            })
        });

        const data = await response.json();

        if (response.ok) {
            formMessage.textContent = "Message sent successfully!";

            contactForm.reset();
        } else {
            formMessage.textContent = data.message || "Something went wrong.";
        }

    } catch (error) {
        console.error(error);
        formMessage.textContent = "Unable to send message.";
    }
});

