/* ==========================================================================
   GlowTrotter Premium Theme JS Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. Header Scroll Effect (Scrolled BG and Hide on Scroll Down, Show on Scroll Up)
  const header = document.querySelector('.header');
  let lastScrollTop = 0;

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Background highlight threshold
    if (scrollTop > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Hide/reveal based on direction
    if (scrollTop <= 50) {
      // Always show near the top of the page
      header.classList.remove('header-hidden');
    } else if (scrollTop > lastScrollTop) {
      // Scrolling down -> hide navbar
      header.classList.add('header-hidden');
    } else if (scrollTop < lastScrollTop) {
      // Scrolling up -> show navbar
      header.classList.remove('header-hidden');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For mobile or negative scroll offsets
  });

  // 3. Mobile Navigation Drawer
  const menuToggle = document.querySelector('.menu-toggle');
  const closeMenu = document.querySelector('.close-menu');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
  });

  const hideMobileMenu = () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  };

  closeMenu.addEventListener('click', hideMobileMenu);
  
  mobileLinks.forEach(link => {
    link.addEventListener('click', hideMobileMenu);
  });

  // 4. Category Filter Logic for Destination Cards
  const filterButtons = document.querySelectorAll('.filter-btn');
  const destinationCards = document.querySelectorAll('.destination-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Toggle active classes on tabs
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      destinationCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        // Hide card first with fade-out
        card.style.opacity = '0';
        card.style.transform = 'translateY(15px)';
        
        setTimeout(() => {
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'block';
            // Force reflow
            card.offsetHeight;
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          } else {
            card.style.display = 'none';
          }
        }, 300);
      });
    });
  });

  // 5. FAQ Accordion Logic
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const content = item.querySelector('.accordion-content');
      const isActive = item.classList.contains('active');

      // Close all other accordion items
      document.querySelectorAll('.accordion-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.accordion-content').style.maxHeight = '0';
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        content.style.maxHeight = '0';
      } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // 6. Interactive Booking Search Submission & Highlight Results
  const bookingForm = document.getElementById('bookingForm');
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const destinationValue = document.getElementById('destinationSelect').value;
    const dateValue = document.getElementById('dateInput').value;
    const guestsValue = document.getElementById('travelersInput').value;

    if (!destinationValue || !dateValue || !guestsValue) return;

    // 1. Create a Toast Notification
    showToast(`Searching trips to ${capitalize(destinationValue)} starting ${dateValue}...`);

    // 2. Find matching destination card and scroll to it
    const matchingCard = document.querySelector(`.destination-card[data-id="${destinationValue}"]`);
    
    if (matchingCard) {
      setTimeout(() => {
        // Scroll to destinations section
        const destSection = document.getElementById('destinations');
        destSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Highlight card
        setTimeout(() => {
          // Temporarily activate "All" filter to ensure card is visible
          const allFilterBtn = document.querySelector('.filter-btn[data-filter="all"]');
          if (allFilterBtn) allFilterBtn.click();

          setTimeout(() => {
            // Apply neon highlight animation
            matchingCard.style.boxShadow = '0 0 35px #8B5CF6, 0 0 15px #EC4899';
            matchingCard.style.borderColor = '#EC4899';
            matchingCard.style.transform = 'scale(1.04) translateY(-8px)';
            
            showToast(`Found! Premium package for ${capitalize(destinationValue)} is highlighted below.`, 'success');

            // Reset custom highlights after 4 seconds
            setTimeout(() => {
              matchingCard.style.boxShadow = '';
              matchingCard.style.borderColor = '';
              matchingCard.style.transform = '';
            }, 4000);
          }, 400);
        }, 800);
      }, 1000);
    }
  });

  // 7. Newsletter Subscription Form
  const newsletterForm = document.getElementById('newsletterForm');
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('input');
    const userEmail = emailInput.value;

    if (userEmail) {
      showToast(`Thank you for subscribing! Glowing deals sent to: ${userEmail}`, 'success');
      emailInput.value = '';
    }
  });

  // Helper function to capitalize strings
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Toast System
  function showToast(message, type = 'info') {
    // Remove existing toast if any
    const existingToast = document.querySelector('.custom-toast');
    if (existingToast) {
      existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = `custom-toast ${type}`;
    toast.innerHTML = `
      <div class="toast-content">
        <i data-lucide="${type === 'success' ? 'check-circle' : 'info'}"></i>
        <span>${message}</span>
      </div>
    `;
    
    // Style toast programmatically to keep styles clean
    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      background: 'rgba(10, 15, 29, 0.95)',
      backdropFilter: 'blur(12px)',
      border: `1px solid ${type === 'success' ? '#10B981' : '#8B5CF6'}`,
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35)',
      color: '#fff',
      padding: '16px 24px',
      borderRadius: '12px',
      zIndex: '1000',
      transition: 'opacity 0.3s ease, transform 0.3s ease',
      transform: 'translateY(20px)',
      opacity: '0',
      fontFamily: 'Outfit, sans-serif',
      fontSize: '0.95rem'
    });

    document.body.appendChild(toast);
    
    // Initialize icons inside toast
    lucide.createIcons();

    // Fade In
    setTimeout(() => {
      toast.style.transform = 'translateY(0)';
      toast.style.opacity = '1';
    }, 50);

    // Auto-remove after 4 seconds
    setTimeout(() => {
      toast.style.transform = 'translateY(20px)';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // 8. Intersection Observer for Scroll Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.12
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Unobserve once revealed to keep layout simple
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const elementsToReveal = document.querySelectorAll('.reveal-fade');
  elementsToReveal.forEach(el => {
    revealObserver.observe(el);
  });
});
