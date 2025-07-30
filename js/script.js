/*
   Summaiya Farhan Portfolio Website
   Main JavaScript File
*/

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initPortfolioFilters();
    initLightbox();
    initScrollEffects();
    initThemeToggle();
    initContactForm();
    initChatbot(); // Initialize the chatbot
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header');
    const navItems = document.querySelectorAll('.nav-links a');
    
    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when a nav item is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            
            // Set active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Set active nav item based on scroll position
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });
}

// Portfolio filtering functionality
function initPortfolioFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Set active filter button
            filterBtns.forEach(filterBtn => filterBtn.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter portfolio items
            const filterValue = btn.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Lightbox functionality
function initLightbox() {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-image');
    const closeLightbox = document.querySelector('.close-lightbox');
    const viewBtns = document.querySelectorAll('.view-project');
    
    // Open lightbox
    viewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const imgSrc = btn.getAttribute('href');
            lightboxImg.src = imgSrc;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close lightbox
    closeLightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close lightbox with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Scroll effects
function initScrollEffects() {
    const backToTop = document.querySelector('.back-to-top');
    const floatingMascot = document.querySelector('.floating-mascot');
    
    // Back to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Floating mascot
    window.addEventListener('scroll', () => {
        if (window.scrollY > 600) {
            floatingMascot.classList.add('visible');
        } else {
            floatingMascot.classList.remove('visible');
        }
    });
    
    // Mascot interaction
    floatingMascot.addEventListener('click', () => {
        floatingMascot.style.transform = 'scale(1.2)';
        setTimeout(() => {
            floatingMascot.style.transform = '';
        }, 300);
    });
    
    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.section-header, .about-content, .skills-container, .portfolio-item, .resume-content, .contact-content');
    
    function revealOnScroll() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state for reveal elements
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Call on load and scroll
    window.addEventListener('load', revealOnScroll);
    window.addEventListener('scroll', revealOnScroll);
}

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    // Toggle theme
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Update icon
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Basic form validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Form submission using Web3Forms
            formStatus.textContent = 'Sending...';
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            
            // Prepare form data
            const formData = new FormData(contactForm);
            
            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                
                if (result.success) {
                    formStatus.style.color = 'green';
                    formStatus.textContent = 'Thank you! Your message has been sent.';
                    contactForm.reset();
                } else {
                    formStatus.style.color = 'red';
                    formStatus.textContent = 'Oops! Something went wrong. Please try again.';
                }
            } catch (error) {
                formStatus.style.color = 'red';
                formStatus.textContent = 'Network error. Please try again later.';
                console.error('Contact form error:', error);
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    }
} 

// Chatbot functionality
function initChatbot() {
    const chatbot = document.getElementById('chatbot');
    const openChatBtn = document.getElementById('openChat');
    const closeChatBtn = document.getElementById('closeChat');
    const settingsBtn = document.getElementById('settingsButton');
    const settingsModal = document.getElementById('settingsModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const apiKeyInput = document.getElementById('apiKey');
    const saveApiKeyBtn = document.getElementById('saveApiKey');
    const clearChatBtn = document.getElementById('clearChat');
    const chatMessages = document.getElementById('chatMessages');
    const userMessageInput = document.getElementById('userMessage');
    const sendMessageBtn = document.getElementById('sendMessage');

    // Load saved API key and chat history on page load
    let apiKey = localStorage.getItem('groqApiKey') || '';
    let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];

    // Pre-fill API key if it exists
    if (apiKey) {
        apiKeyInput.value = apiKey;
        // Show a masked version for security
        const maskedKey = '*'.repeat(apiKey.length - 4) + apiKey.slice(-4);
        apiKeyInput.setAttribute('placeholder', maskedKey);
    }

    // Load chat history
    function loadChatHistory() {
        chatMessages.innerHTML = '';
        chatHistory.forEach(message => {
            appendMessage(message.sender, message.text);
        });
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Append a message to the chat
    function appendMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message', sender === 'bot' ? 'bot-message' : 'user-message');
        messageDiv.innerHTML = `
            <div class="message-content">
                ${text}
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Save to chat history
        if (!messageDiv.classList.contains('typing')) {
            chatHistory.push({ sender, text });
            localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
        }
    }

    // Send message to Groq API
    async function sendToGroq(message) {
        if (!apiKey) {
            appendMessage('bot', 'Please set your Groq API key in the settings.');
            settingsModal.style.display = 'block';
            return;
        }

        appendMessage('user', message);
        
        // Show typing indicator
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('chat-message', 'bot-message', 'typing');
        typingDiv.innerHTML = '<div class="message-content">Typing...</div>';
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        try {
            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'llama3-8b-8192',
                    messages: [
                        {
                            role: 'system',
                            content: 'You are a helpful panda assistant for a craft portfolio website. You help with questions about crochet, knitting, and creative projects.'
                        },
                        {
                            role: 'user',
                            content: message
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 800
                })
            });

            // Remove typing indicator
            chatMessages.removeChild(typingDiv);

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();
            const botReply = data.choices[0].message.content;
            appendMessage('bot', botReply);
        } catch (error) {
            // Remove typing indicator
            chatMessages.removeChild(typingDiv);
            appendMessage('bot', 'Sorry, there was an error communicating with the AI. Please check your API key and try again.');
            console.error('Error:', error);
        }
    }

    // Event Listeners
    if (openChatBtn) {
        openChatBtn.addEventListener('click', function() {
            chatbot.classList.add('active');
            loadChatHistory();
        });
    }

    if (closeChatBtn) {
        closeChatBtn.addEventListener('click', function() {
            chatbot.classList.remove('active');
        });
    }

    if (settingsBtn) {
        settingsBtn.addEventListener('click', function() {
            settingsModal.style.display = 'block';
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            settingsModal.style.display = 'none';
        });
    }

    if (saveApiKeyBtn) {
        saveApiKeyBtn.addEventListener('click', function() {
            apiKey = apiKeyInput.value.trim();
            if (apiKey) {
                localStorage.setItem('groqApiKey', apiKey);
                alert('API key saved successfully!');
                settingsModal.style.display = 'none';
            } else {
                alert('Please enter a valid API key');
            }
        });
    }

    if (clearChatBtn) {
        clearChatBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to clear your chat history?')) {
                chatHistory = [];
                localStorage.removeItem('chatHistory');
                chatMessages.innerHTML = '';
                alert('Chat history cleared');
            }
        });
    }

    if (sendMessageBtn) {
        sendMessageBtn.addEventListener('click', function() {
            const message = userMessageInput.value.trim();
            if (message) {
                sendToGroq(message);
                userMessageInput.value = '';
            }
        });
    }

    if (userMessageInput) {
        userMessageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const message = userMessageInput.value.trim();
                if (message) {
                    sendToGroq(message);
                    userMessageInput.value = '';
                }
            }
        });
    }

    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === settingsModal) {
            settingsModal.style.display = 'none';
        }
    });

    // Add welcome message if this is the first time
    if (chatHistory.length === 0) {
        appendMessage('bot', 'Hello! I\'m your Panda Assistant. How can I help with your crafting project today?');
    }
} 