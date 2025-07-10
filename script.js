// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
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
});

// Testimonials slider functionality with enhanced animations
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
let testimonialInterval;

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.remove('active');
        if (i === index) {
            setTimeout(() => {
                testimonial.classList.add('active');
            }, 100);
        }
    });
}

function changeTestimonial(direction) {
    currentTestimonial += direction;
    
    if (currentTestimonial >= testimonials.length) {
        currentTestimonial = 0;
    } else if (currentTestimonial < 0) {
        currentTestimonial = testimonials.length - 1;
    }
    
    showTestimonial(currentTestimonial);
}

function startTestimonialAutoPlay() {
    testimonialInterval = setInterval(() => {
        changeTestimonial(1);
    }, 4000);
}

function stopTestimonialAutoPlay() {
    clearInterval(testimonialInterval);
}

// Auto-play testimonials with pause on hover
document.addEventListener('DOMContentLoaded', function() {
    const testimonialSlider = document.querySelector('.testimonials-slider');
    
    if (testimonialSlider) {
        startTestimonialAutoPlay();
        
        testimonialSlider.addEventListener('mouseenter', stopTestimonialAutoPlay);
        testimonialSlider.addEventListener('mouseleave', startTestimonialAutoPlay);
        
        // Add touch/swipe support for mobile
        let startX, startY, distX, distY;
        const threshold = 50;
        
        testimonialSlider.addEventListener('touchstart', function(e) {
            const touch = e.touches[0];
            startX = touch.clientX;
            startY = touch.clientY;
        });
        
        testimonialSlider.addEventListener('touchend', function(e) {
            if (!startX || !startY) return;
            
            const touch = e.changedTouches[0];
            distX = touch.clientX - startX;
            distY = touch.clientY - startY;
            
            if (Math.abs(distX) > Math.abs(distY) && Math.abs(distX) > threshold) {
                if (distX > 0) {
                    changeTestimonial(-1);
                } else {
                    changeTestimonial(1);
                }
            }
            
            startX = startY = 0;
        });
    }
});

// Contact form functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Validate form
            if (validateForm(formObject)) {
                // Show success message
                showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
                
                // Reset form
                this.reset();
                
                // Here you would typically send the data to your server
                console.log('Form submitted:', formObject);
            }
        });
    }
});

function validateForm(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Please enter a valid name');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!data.service) {
        errors.push('Please select a service');
    }
    
    if (!data.message || data.message.trim().length < 10) {
        errors.push('Please enter a message with at least 10 characters');
    }
    
    if (errors.length > 0) {
        showNotification(errors.join('<br>'), 'error');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Product card hover effects and animations
document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Enhanced product card interactions
document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.classList.add('ripple-effect');
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });

        // Add click animation
        card.addEventListener('click', function() {
            this.style.animation = 'pulse 0.6s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    });
});

// Scroll animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .product-card, .stat-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .product-card, .stat-item');
    animatedElements.forEach(el => el.classList.add('scroll-animation'));
    
    animateOnScroll();
});

// Statistics counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-item h4');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace('+', ''));
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + '+';
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + '+';
            }
        }, 20);
    });
}

// Trigger counter animation when stats section is visible
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.backgroundPosition = `center ${speed}px`;
    }
});

// Service card interaction
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add a subtle animation when clicked
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
});

// Image lazy loading
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loading');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
});

// Add some interactive features to the map
document.addEventListener('DOMContentLoaded', function() {
    const mapContainer = document.querySelector('.map-container');
    
    if (mapContainer) {
        mapContainer.addEventListener('click', function() {
            this.style.transform = 'scale(1.02)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    }
});

// Initialize typing effect (removed to prevent text scrambling)
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Simply ensure the title is visible with animation
        heroTitle.style.animation = 'slideInLeft 1s ease-out';
    }
});

// Add search functionality (for future enhancement)
function initializeSearch() {
    const searchInput = document.getElementById('search');
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            // Implementation for search functionality
            console.log('Searching for:', searchTerm);
        });
    }
}

// Performance optimization - debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    animateOnScroll();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add loading state for the entire page
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Hide any loading spinners
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
});

console.log('Surya Technologies website loaded successfully!');

// Particle effect for hero section
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        hero.appendChild(particle);
    }
}

// Enhanced scroll reveal animations
function revealOnScroll() {
    const reveals = document.querySelectorAll('.service-card, .product-card, .stat-item, .testimonial-content');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('animate');
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize enhanced animations
document.addEventListener('DOMContentLoaded', function() {
    // Set initial states for animations
    const animatedElements = document.querySelectorAll('.service-card, .product-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
    });
    
    // Create particles
    createParticles();
    
    // Initial scroll check
    revealOnScroll();
    
    // Enhanced typing effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        // Don't clear the text, just ensure it displays correctly
        heroTitle.style.opacity = '0';
        
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.animation = 'slideInLeft 1s ease-out';
        }, 500);
    }
});

// Enhanced counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-item h4');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace('+', ''));
        let current = 0;
        const increment = target / 60; // Slower animation
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + '+';
                clearInterval(timer);
                
                // Add completion animation
                counter.style.animation = 'pulse 0.5s ease';
                setTimeout(() => {
                    counter.style.animation = '';
                }, 500);
            } else {
                counter.textContent = Math.floor(current) + '+';
            }
        }, 50);
    });
}

// Enhanced scroll event with throttling
let scrollTimeout;
window.addEventListener('scroll', function() {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    
    scrollTimeout = setTimeout(() => {
        revealOnScroll();
    }, 10);
});

// Add ripple effect CSS dynamically
const style = document.createElement('style');
style.textContent = `
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        margin-left: -10px;
        margin-top: -10px;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes blink {
        0%, 50% { border-color: rgba(255,255,255,0.8); }
        51%, 100% { border-color: transparent; }
    }
    
    .particle {
        pointer-events: none;
        z-index: 1;
    }
`;
document.head.appendChild(style);

// Enhanced Google Maps Integration
let map, directionsService, directionsRenderer;
let shopLocation = { lat: 16.9891, lng: 82.2475 }; // Kakinada, Andhra Pradesh coordinates

// Initialize Enhanced Map
function initMap() {
    // Create map
    map = new google.maps.Map(document.getElementById('map'), {
        center: shopLocation,
        zoom: 15,
        styles: [
            {
                featureType: 'all',
                elementType: 'geometry.fill',
                stylers: [{ color: '#f5f5f5' }]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{ color: '#ffffff' }]
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{ color: '#a8e6cf' }]
            }
        ]
    });

    // Create directions service and renderer
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({
        draggable: true,
        panel: document.getElementById('directionsPanel')
    });
    directionsRenderer.setMap(map);

    // Add shop marker
    const shopMarker = new google.maps.Marker({
        position: shopLocation,
        map: map,
        title: 'Surya Technologies',
        animation: google.maps.Animation.BOUNCE,
        icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="18" fill="#667eea" stroke="#fff" stroke-width="2"/>
                    <text x="20" y="26" text-anchor="middle" fill="white" font-size="12" font-family="Arial">🏪</text>
                </svg>
            `),
            scaledSize: new google.maps.Size(40, 40),
            anchor: new google.maps.Point(20, 20)
        }
    });

    // Shop info window
    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div style="padding: 10px; text-align: center;">
                <h3 style="color: #667eea; margin-bottom: 10px;">Surya Technologies</h3>
                <p style="margin: 5px 0;">Computer Hardware & Repair Services</p>
                <p style="margin: 5px 0;"><strong>� 1st Floor, Nemani Complex</strong></p>
                <p style="margin: 5px 0;">Beside Bhanugudi Temple, Bhanugudi Centre</p>
                <p style="margin: 5px 0;">Bhanugudi Junction, Kakinada - 533003</p>
                <p style="margin: 5px 0;"><strong>�📞 +91 (XXX) XXX-XXXX</strong></p>
                <p style="margin: 5px 0;">📧 info@suryatechnologies.com</p>
                <div style="margin-top: 10px;">
                    <button onclick="getDirections()" style="background: #667eea; color: white; border: none; padding: 8px 16px; border-radius: 5px; cursor: pointer;">
                        Get Directions
                    </button>
                </div>
            </div>
        `
    });

    shopMarker.addListener('click', () => {
        infoWindow.open(map, shopMarker);
    });

    // Auto-open info window
    setTimeout(() => {
        infoWindow.open(map, shopMarker);
    }, 1000);
}

// Get user's current location
function getUserLocation() {
    const locationInput = document.getElementById('userLocation');
    const distanceInfo = document.getElementById('distance-info');
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;
                
                // Reverse geocoding to get address
                const geocoder = new google.maps.Geocoder();
                const latlng = { lat: userLat, lng: userLng };
                
                geocoder.geocode({ location: latlng }, (results, status) => {
                    if (status === 'OK' && results[0]) {
                        locationInput.value = results[0].formatted_address;
                        calculateDistance(userLat, userLng);
                        showNotification('Current location detected successfully!', 'success');
                    } else {
                        showNotification('Unable to get your address. Please enter manually.', 'error');
                    }
                });
            },
            (error) => {
                let errorMessage = 'Location access denied. ';
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage += 'Please enable location access and try again.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage += 'Location information unavailable.';
                        break;
                    case error.TIMEOUT:
                        errorMessage += 'Location request timed out.';
                        break;
                }
                showNotification(errorMessage, 'error');
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000
            }
        );
    } else {
        showNotification('Geolocation is not supported by this browser.', 'error');
    }
}

// Calculate distance between user and shop
function calculateDistance(userLat, userLng) {
    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
        origins: [{ lat: userLat, lng: userLng }],
        destinations: [shopLocation],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
    }, (response, status) => {
        if (status === 'OK') {
            const distance = response.rows[0].elements[0].distance.text;
            const duration = response.rows[0].elements[0].duration.text;
            
            const distanceInfo = document.getElementById('distance-info');
            distanceInfo.innerHTML = `
                <h5><i class="fas fa-route"></i> Route Information</h5>
                <p><strong>Distance:</strong> ${distance}</p>
                <p><strong>Estimated Time:</strong> ${duration}</p>
                <p><strong>Mode:</strong> By Car</p>
            `;
            distanceInfo.classList.add('show');
        }
    });
}

// Get directions from user location to shop
function getDirections() {
    const userLocation = document.getElementById('userLocation').value;
    
    if (!userLocation.trim()) {
        showNotification('Please enter your location first.', 'error');
        return;
    }
    
    if (!directionsService || !directionsRenderer) {
        showNotification('Map services are still loading. Please wait a moment.', 'error');
        return;
    }
    
    const request = {
        origin: userLocation,
        destination: shopLocation,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC
    };
    
    directionsService.route(request, (result, status) => {
        if (status === 'OK') {
            directionsRenderer.setDirections(result);
            
            // Show route details
            const route = result.routes[0].legs[0];
            const distanceInfo = document.getElementById('distance-info');
            distanceInfo.innerHTML = `
                <h5><i class="fas fa-route"></i> Directions to Surya Technologies</h5>
                <p><strong>Distance:</strong> ${route.distance.text}</p>
                <p><strong>Duration:</strong> ${route.duration.text}</p>
                <p><strong>Start:</strong> ${route.start_address}</p>
                <p><strong>End:</strong> ${route.end_address}</p>
                <div style="margin-top: 10px;">
                    <button onclick="openInGoogleMaps()" class="btn btn-primary" style="font-size: 0.9rem; padding: 8px 16px;">
                        <i class="fas fa-external-link-alt"></i> Open in Google Maps
                    </button>
                </div>
            `;
            distanceInfo.classList.add('show');
            
            showNotification('Directions loaded successfully!', 'success');
        } else {
            showNotification('Could not calculate directions. Please check your location.', 'error');
        }
    });
}

// Open directions in Google Maps app
function openInGoogleMaps() {
    const userLocation = document.getElementById('userLocation').value;
    const destination = `${shopLocation.lat},${shopLocation.lng}`;
    const url = `https://www.google.com/maps/dir/${encodeURIComponent(userLocation)}/${destination}`;
    window.open(url, '_blank');
}

// Open Google Maps with shop location
function openGoogleMapsLocation() {
    const address = "1st Floor, Nemani Complex, Beside Bhanugudi Temple, Bhanugudi Centre, Bhanugudi Junction, Kakinada-533003, Andhra Pradesh";
    const encodedAddress = encodeURIComponent(address);
    const url = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(url, '_blank');
}

// Enhanced direction function for the specific location
function getDirectionsToShop() {
    const userLocation = document.getElementById('userLocation').value;
    const shopAddress = "1st Floor, Nemani Complex, Beside Bhanugudi Temple, Bhanugudi Centre, Bhanugudi Junction, Kakinada-533003, Andhra Pradesh";
    
    if (!userLocation.trim()) {
        showNotification('Please enter your location first.', 'error');
        return;
    }
    
    const directionsUrl = `https://www.google.com/maps/dir/${encodeURIComponent(userLocation)}/${encodeURIComponent(shopAddress)}`;
    window.open(directionsUrl, '_blank');
    
    showNotification('Opening directions in Google Maps...', 'success');
}

// Load Google Maps script
function loadGoogleMaps() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap&libraries=geometry,places`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
}

// Chatbot preparation (for future implementation)
function initChatbot() {
    const chatbotHtml = `
        <div class="chatbot-container">
            <div class="chatbot-trigger" onclick="toggleChatbot()">
                <i class="fas fa-comments"></i>
            </div>
            <div class="chatbot-window" id="chatbotWindow">
                <div class="chatbot-header">
                    <span>Surya Technologies Assistant</span>
                    <button onclick="toggleChatbot()" style="float: right; background: none; border: none; color: white; font-size: 1.2rem; cursor: pointer;">×</button>
                </div>
                <div class="chatbot-body">
                    <i class="fas fa-robot fa-3x" style="color: #667eea; margin-bottom: 1rem;"></i>
                    <p>Chatbot Coming Soon!</p>
                    <p style="font-size: 0.9rem; margin-top: 1rem; text-align: center;">
                        Our AI assistant will be available soon to help you with product inquiries and support.
                    </p>
                </div>
                <div class="chatbot-footer">
                    Powered by Surya Technologies
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', chatbotHtml);
}

function toggleChatbot() {
    const chatbotWindow = document.getElementById('chatbotWindow');
    if (chatbotWindow.style.display === 'flex') {
        chatbotWindow.style.display = 'none';
    } else {
        chatbotWindow.style.display = 'flex';
    }
}

// Initialize enhanced features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize chatbot placeholder
    initChatbot();
    
    // Initialize map when location section is visible
    const locationSection = document.getElementById('location');
    const mapObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // For now, show placeholder map
                const mapElement = document.getElementById('map');
                if (mapElement) {
                    mapElement.innerHTML = `
                        <i class="fas fa-map-marked-alt fa-3x"></i>
                        <p style="margin-top: 1rem;"><strong>Surya Technologies</strong></p>
                        <p style="font-size: 0.9rem; margin-top: 0.5rem;">1st Floor, Nemani Complex, Beside Bhanugudi Temple</p>
                        <p style="font-size: 0.9rem;">Bhanugudi Junction, Kakinada - 533003, Andhra Pradesh</p>
                        <p style="font-size: 0.8rem; margin-top: 1rem; opacity: 0.7;">
                            📍 Interactive Google Maps with live directions from your location coming soon!
                        </p>
                        <div style="margin-top: 1rem;">
                            <button onclick="openGoogleMapsLocation()" style="background: #667eea; color: white; border: none; padding: 8px 16px; border-radius: 5px; cursor: pointer; font-size: 0.9rem;">
                                <i class="fas fa-external-link-alt"></i> View on Google Maps
                            </button>
                        </div>
                    `;
                }
                mapObserver.unobserve(entry.target);
            }
        });
    });
    
    if (locationSection) {
        mapObserver.observe(locationSection);
    }
    
    // Add enter key support for location input
    const locationInput = document.getElementById('userLocation');
    if (locationInput) {
        locationInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                getDirections();
            }
        });
    }
});

// Image replacement function (for when you add real images)
function replaceImagePlaceholder(productType, imageSrc) {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        if (title.includes(productType.toLowerCase())) {
            const placeholder = card.querySelector('.image-placeholder');
            const productImage = card.querySelector('.product-image');
            
            if (placeholder && productImage) {
                const img = document.createElement('img');
                img.src = imageSrc;
                img.alt = productType;
                img.className = 'product-img';
                img.onload = function() {
                    placeholder.style.display = 'none';
                    productImage.insertBefore(img, placeholder);
                };
            }
        }
    });
}

// Example usage for future:
// replaceImagePlaceholder('laptop', 'assets/laptops.jpg');
// replaceImagePlaceholder('mouse', 'assets/gaming-mouse.jpg');

console.log('Enhanced features loaded: Moving backgrounds, location services, and chatbot preparation ready!');
