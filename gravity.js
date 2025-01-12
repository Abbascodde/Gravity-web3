// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Prevent event propagation to avoid immediate closing
    mobileMenu.addEventListener('click', (event) => {
      event.stopPropagation();
    });
  
    mobileMenuToggle.addEventListener('click', (event) => {
      event.stopPropagation();
      // Toggle mobile menu visibility
      mobileMenu.classList.toggle('-translate-x-full');
      
      // Change toggle icon
      const isMenuOpen = !mobileMenu.classList.contains('-translate-x-full');
      mobileMenuToggle.innerHTML = isMenuOpen 
        ? `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
           </svg>` 
        : `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
           </svg>`;
    });
  
    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
      if (!mobileMenu.classList.contains('-translate-x-full') && 
          !mobileMenuToggle.contains(event.target) && 
          !mobileMenu.contains(event.target)) {
        mobileMenu.classList.add('-translate-x-full');
        mobileMenuToggle.innerHTML = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>`;
      }
    });
  });