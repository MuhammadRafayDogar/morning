const fontAwesome = document.createElement('link');
fontAwesome.rel = 'stylesheet';
fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
document.head.appendChild(fontAwesome);

const updateActiveStates = (slides, dots, currentIndex) => {
    slides.forEach(slide => slide.classList.remove('morning-slide-active'));
    dots.forEach(dot => dot.classList.remove('morning-dot-active'));
    
    slides[currentIndex].classList.add('morning-slide-active');
    dots[currentIndex].classList.add('morning-dot-active');
};

document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.querySelector('.morning-slides');
    const slides = document.querySelectorAll('.morning-slide');
    const dots = document.querySelectorAll('.morning-dot');
    const prevButtons = document.querySelectorAll('.morning-slide-prev');
    const nextButtons = document.querySelectorAll('.morning-slide-next');
    let currentIndex = 0;
    let autoplayInterval;

    updateActiveStates(slides, dots, currentIndex);

    const goToNextSlide = () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateActiveStates(slides, dots, currentIndex);
    };

    const goToPrevSlide = () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateActiveStates(slides, dots, currentIndex);
    };

    const goToSlide = (index) => {
        currentIndex = index;
        updateActiveStates(slides, dots, currentIndex);
    };

    const startAutoplay = () => {
        autoplayInterval = setInterval(goToNextSlide, 5000); 
    };

    const stopAutoplay = () => {
        clearInterval(autoplayInterval);
    };

    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            stopAutoplay();
            goToNextSlide();
            startAutoplay();
        });
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            stopAutoplay();
            goToPrevSlide();
            startAutoplay();
        });
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoplay();
            goToSlide(index);
            startAutoplay();
        });
    });

    sliderContainer.addEventListener('mouseenter', stopAutoplay);
    sliderContainer.addEventListener('mouseleave', startAutoplay);

    startAutoplay();
});

class AnnouncementBar {
    constructor(containerId, announcements) {
        this.container = document.getElementById(containerId);
        this.announcements = announcements;
        this.currentAnnouncement = 0;
        this.content = this.container.querySelector('.announcement-content');
        this.leftArrow = this.container.querySelector('.announcement-arrow.left');
        this.rightArrow = this.container.querySelector('.announcement-arrow.right');

        this.initializeAnnouncement();
    }

    initializeAnnouncement() {
        this.updateAnnouncement();

        this.leftArrow.addEventListener('click', () => {
            this.currentAnnouncement = (this.currentAnnouncement - 1 + this.announcements.length) % this.announcements.length;
            this.updateAnnouncement();
        });

        this.rightArrow.addEventListener('click', () => {
            this.currentAnnouncement = (this.currentAnnouncement + 1) % this.announcements.length;
            this.updateAnnouncement();
        });
    }

    updateAnnouncement() {
        this.content.textContent = this.announcements[this.currentAnnouncement];
    }
}

document.addEventListener('DOMContentLoaded', () => {

    const mainSlider = new Slider('main-slider');
    const productSlider = new Slider('product-slider');

    const announcements = [
        'Free shipping on orders over $200',
        'New collection arriving next week',
        'Get 10% off your first order',
        'Subscribe to our newsletter'
    ];
    const announcementBar = new AnnouncementBar('announcement-bar', announcements);

    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productImage = productCard.querySelector('.product-image');
            const productImageHover = productCard.querySelector('.product-image-hover');
            
        });
    });

    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        navbar.style.backgroundColor = window.scrollY > 50 ? 'white' : 'transparent';
    });
});

class CollectionSlider {
    constructor() {
        this.sliderContainer = document.querySelector('.collection-slider-container');
        this.slider = document.querySelector('.collection-slider');
        this.slides = document.querySelectorAll('.collection-slide');
        this.dots = document.querySelectorAll('.collection-slider-nav .collection-dot');
        this.leftArrow = document.querySelector('.collection-arrow-left');
        this.rightArrow = document.querySelector('.collection-arrow-right');
        
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;

        this.init();
    }

    init() {
        this.updateSliderPosition();

        this.leftArrow.addEventListener('click', () => this.prevSlide());
        this.rightArrow.addEventListener('click', () => this.nextSlide());

        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
    }

    updateSliderPosition() {
        const translateValue = -(this.currentSlide * 100);
        this.slider.style.transform = `translateX(${translateValue}%)`;

        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }

    nextSlide() {
        if (this.currentSlide < this.totalSlides - 1) {
            this.currentSlide++;
        } else {
            this.currentSlide = 0;
        }
        this.updateSliderPosition();
    }

    prevSlide() {
        if (this.currentSlide > 0) {
            this.currentSlide--;
        } else {
            this.currentSlide = this.totalSlides - 1;
        }
        this.updateSliderPosition();
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.updateSliderPosition();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new CollectionSlider();
});

function updateTimer() {
    const countDownDate = new Date().getTime() + (10 * 60 * 1000); 

    const x = setInterval(function() {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById("hours").innerHTML = hours.toString().padStart(2, '0');
      document.getElementById("minutes").innerHTML = minutes.toString().padStart(2, '0');
      document.getElementById("seconds").innerHTML = seconds.toString().padStart(2, '0');

      if (distance < 0) {
        clearInterval(x);
        document.getElementById("hours").innerHTML = "00";
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("seconds").innerHTML = "00";
      }
    }, 1000);
  }

  updateTimer();

  document.addEventListener('DOMContentLoaded', function() {
    let slideIndex = 1;
    const slides = document.getElementsByClassName("social-testimonial-slide");
    const dots = document.getElementsByClassName("social-testimonial-dot");
    
    document.querySelector('.social-testimonial-prev').addEventListener('click', () => {
        showSlides(slideIndex -= 1);
    });
    
    document.querySelector('.social-testimonial-next').addEventListener('click', () => {
        showSlides(slideIndex += 1);
    });
    
    for(let i = 0; i < dots.length; i++) {
        dots[i].addEventListener('click', () => {
            showSlides(slideIndex = i + 1);
        });
    }
    
    function showSlides(n) {
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        
        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove('active');
            dots[i].classList.remove('active');
        }
        
        slides[slideIndex-1].classList.add('active');
        dots[slideIndex-1].classList.add('active');
    }
    
    setInterval(() => {
        showSlides(slideIndex += 1);
    }, 5000);
});document.addEventListener('DOMContentLoaded', function() {
    let slideIndex = 1;
    const slides = document.getElementsByClassName("social-testimonial-slide");
    const dots = document.getElementsByClassName("social-testimonial-dot");
    
    document.querySelector('.social-testimonial-prev').addEventListener('click', () => {
        showSlides(slideIndex -= 1);
    });
    
    document.querySelector('.social-testimonial-next').addEventListener('click', () => {
        showSlides(slideIndex += 1);
    });
    
    for(let i = 0; i < dots.length; i++) {
        dots[i].addEventListener('click', () => {
            showSlides(slideIndex = i + 1);
        });
    }
    
    function showSlides(n) {
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        
        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove('active');
            dots[i].classList.remove('active');
        }
        
        slides[slideIndex-1].classList.add('active');
        dots[slideIndex-1].classList.add('active');
    }
    
    setInterval(() => {
        showSlides(slideIndex += 1);
    }, 5000);
});

document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.cg-slide');
    const dots = document.querySelectorAll('.cg-dot');
    let currentSlide = 0;

    function showSlide(n) {
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      slides[n].classList.add('active');
      dots[n].classList.add('active');
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }

    function previousSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    }

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
      });
    });

    setInterval(nextSlide, 5000);
  });

  const featureBoxes = document.querySelectorAll('.feature-box');
        
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

featureBoxes.forEach(box => {
    box.style.opacity = '0';
    box.style.transform = 'translateY(20px)';
    box.style.transition = 'all 0.5s ease-out';
    observer.observe(box);
});


document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.gift-marquee-container');
    const content = document.querySelector('.gift-marquee-item');
    
    for (let i = 0; i < 3; i++) {
        container.appendChild(content.cloneNode(true));
    }
});

document.getElementById("subscribe-button").addEventListener("click", function() {
    const emailInput = document.getElementById("email-input").value;
    if (emailInput) {
        alert("Thank you for subscribing!");

    } else {
        alert("Please enter a valid email address.");
    }
});

document.querySelector('.footer-currency select').addEventListener('change', function() {
    alert("Currency changed to " + this.value);
});

document.addEventListener('DOMContentLoaded', function() {
    const loginModal = document.getElementById('loginModal');
    const accountLink = document.querySelector('.account');
    const closeModal = document.querySelector('.close-modal');

    // Open modal when clicking account icon
    accountLink.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.style.display = 'flex';
    });

    // Close modal when clicking X
    closeModal.addEventListener('click', function() {
        loginModal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });

    // Handle login form submission
    const loginForm = document.querySelector('.login-form');
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your login logic here
        console.log('Login submitted');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const currencyOptions = document.querySelectorAll('.currency-option');
    const currencyToggle = document.querySelector('.currency-toggle');

    currencyOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const country = this.querySelector('.country').textContent;
            const currency = this.querySelector('.currency').textContent;
            currencyToggle.textContent = `${country} ${currency}`;
            
            console.log(`Currency changed to: ${country} ${currency}`);
        });
    });
});