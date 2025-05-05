document.addEventListener('DOMContentLoaded', function() {
    // Add to Cart Functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h4').textContent;
            const productPrice = productCard.querySelector('.price').textContent;
            
            // Create notification
            const notification = document.createElement('div');
            notification.className = 'alert alert-success position-fixed top-0 end-0 m-3';
            notification.style.zIndex = '1000';
            notification.innerHTML = `
                <i class="fas fa-check-circle me-2"></i>
                Added ${productName} (${productPrice}) to cart
            `;
            
            document.body.appendChild(notification);
            
            // Remove notification after 3 seconds
            setTimeout(() => {
                notification.remove();
            }, 3000);
        });
    });

    // Wishlist Functionality
    const wishlistButtons = document.querySelectorAll('.wishlist');
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h4').textContent;
            
            // Create notification
            const notification = document.createElement('div');
            notification.className = 'alert alert-info position-fixed top-0 end-0 m-3';
            notification.style.zIndex = '1000';
            notification.innerHTML = `
                <i class="fas fa-heart me-2"></i>
                Added ${productName} to wishlist
            `;
            
            document.body.appendChild(notification);
            
            // Remove notification after 3 seconds
            setTimeout(() => {
                notification.remove();
            }, 3000);
        });
    });

    // Product Details Page Functionality
    if (document.querySelector('.product-details')) {
        // Thumbnail Gallery
        const thumbnails = document.querySelectorAll('.thumbnail');
        const mainImage = document.querySelector('.product-gallery img');
        
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                mainImage.src = this.src;
                thumbnails.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Size Selector
        const sizeSelect = document.querySelector('.size-selector select');
        sizeSelect.addEventListener('change', function() {
            if (this.value === '') {
                this.classList.add('is-invalid');
            } else {
                this.classList.remove('is-invalid');
            }
        });

        // Quantity Selector
        const quantityInput = document.querySelector('.quantity-selector input');
        const minusButton = document.querySelector('.quantity-selector .btn-outline-secondary:first-child');
        const plusButton = document.querySelector('.quantity-selector .btn-outline-secondary:last-child');
        
        minusButton.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            if (value > 1) {
                quantityInput.value = value - 1;
            }
        });
        
        plusButton.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            quantityInput.value = value + 1;
        });

        // Add to Cart on Product Details Page
        const addToCartButton = document.querySelector('.add-to-cart');
        if (addToCartButton) {
            addToCartButton.addEventListener('click', function() {
                const productName = document.querySelector('.product-info h1').textContent;
                const productPrice = document.querySelector('.price').textContent;
                const size = sizeSelect.value;
                const quantity = quantityInput.value;
                
                if (!size) {
                    sizeSelect.classList.add('is-invalid');
                    return;
                }
                
                // Create notification
                const notification = document.createElement('div');
                notification.className = 'alert alert-success position-fixed top-0 end-0 m-3';
                notification.style.zIndex = '1000';
                notification.innerHTML = `
                    <i class="fas fa-check-circle me-2"></i>
                    Added ${quantity} ${productName} (${productPrice}) in size ${size} to cart
                `;
                
                document.body.appendChild(notification);
                
                // Remove notification after 3 seconds
                setTimeout(() => {
                    notification.remove();
                }, 3000);
            });
        }
    }

    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Create notification
            const notification = document.createElement('div');
            notification.className = 'alert alert-success position-fixed top-0 end-0 m-3';
            notification.style.zIndex = '1000';
            notification.innerHTML = `
                <i class="fas fa-check-circle me-2"></i>
                Thank you for subscribing to our newsletter!
            `;
            
            document.body.appendChild(notification);
            
            // Remove notification after 3 seconds
            setTimeout(() => {
                notification.remove();
            }, 3000);
            
            // Reset form
            this.reset();
        });
    }

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation for Elements in View
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.category-card, .product-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial styles for animation
    document.querySelectorAll('.category-card, .product-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Run animation check on scroll
    window.addEventListener('scroll', animateOnScroll);
    // Run once on page load
    animateOnScroll();
}); 