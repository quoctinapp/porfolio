document.addEventListener("DOMContentLoaded", () => {
    emailjs.init("9wGA0E6Y-IcIhWIRn");

    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (window.scrollY > 100) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    document.querySelector('form').addEventListener('submit', async function (e) {
        e.preventDefault();
        const formData = new FormData(this);

        try {
            const response = await emailjs.send("service_5l61jbu", "template_contact_form", {
                subject: formData.get('subject'),
                from_name: formData.get('name'),
                from_email: formData.get('email'),
                message: formData.get('message'),
            });

            console.log("Email send successfull!. Response: ", response);
            alert("Cảm ơn bạn đã liên hệ! Tin nhắn đã được gửi thành công.");
            this.reset();
        } catch (error) {
            console.log("Error while sending email. Error: ", (e));
            alert("Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau.");
            return;
        }
    });

    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    window.addEventListener('load', () => {
        setTimeout(() => {
            const heroTitle = document.querySelector('.hero h1');
            const heroSubtitle = document.querySelector('.hero p');

            if (heroTitle) {
                typeWriter(heroTitle, 'Lý Trần Quốc Tín', 150);
            }

            setTimeout(() => {
                if (heroSubtitle) {
                    typeWriter(heroSubtitle, 'Cựu học sinh Chuyên Tin học | Giảng viên Tin học | Nhà phát triển Website', 50);
                }
            }, 2000);
        }, 500);
    });

    document.querySelectorAll('.skill-card, .achievement-card, .service-card').forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease-in-out';

        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    function animateSkills() {
        const skillCards = document.querySelectorAll('.skill-card');

        skillCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'all 0.6s ease';

                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            }, index * 200);
        });
    }

    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        skillsObserver.observe(skillsSection);
    }

    function animateCounters() {
        const achievementCards = document.querySelectorAll('.achievement-card');

        achievementCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateX(-50px)';
                card.style.transition = 'all 0.6s ease';

                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateX(0)';
                }, 100);
            }, index * 150);
        });
    }

    const achievementsSection = document.querySelector('#achievements');
    if (achievementsSection) {
        const achievementsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    achievementsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        achievementsObserver.observe(achievementsSection);
    }

    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'transform 0.3s ease';
        });

        link.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });

        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                document.querySelector('.nav-links').style.display = 'none';
            }
        });
    });


    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');

        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);
    }

    document.querySelectorAll('.cta-button, .submit-btn').forEach(button => {
        button.addEventListener('click', createRipple);
    });

    const style = document.createElement('style');
    style.textContent = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                background-color: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
    document.head.appendChild(style);

    document.getElementById("responsive-icon").addEventListener("click", () => {
        const nav = document.querySelector(".nav-links");
        if (window.innerWidth <= 768) {
            nav.style.display = (nav.style.display === "flex") ? "none" : "flex";
        }
    });
})
