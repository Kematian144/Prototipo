document.addEventListener('DOMContentLoaded', function() {
    const validUsers = [
        'admin@aduana.cl',
        'agente@aduana.cl',
        'agentePDI@aduana.cl',
        'agenteSAG@aduana.cl'
    ];
    const validPassword = '1234';
    
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('loginError');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            
            if (validUsers.includes(username) && password === validPassword) {
                sessionStorage.setItem('currentUser', username);
                window.location.href = 'dashboard.html';
            } else {
                errorMessage.textContent = 'Usuario o contraseña incorrectos. Use usuario@aduana.cl y contraseña 1234';
                errorMessage.style.display = 'block';
            }
        });
    }
    
    const currentUser = sessionStorage.getItem('currentUser');
    const userAvatar = document.querySelector('.user-avatar');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (currentUser && userAvatar) {
        const username = currentUser.split('@')[0];
        userAvatar.textContent = username.charAt(0).toUpperCase();
        document.querySelector('.user-name').textContent = username;
    } else if (!currentUser && !window.location.pathname.includes('index.html')) {
        window.location.href = 'index.html';
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            sessionStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        });
    }
    
    const navItems = document.querySelectorAll('.nav-item');
    const currentPage = window.location.pathname.split('/').pop();
    
    navItems.forEach(item => {
        const link = item.getAttribute('data-page');
        if (link === currentPage) {
            item.classList.add('active');
        }
        
        item.addEventListener('click', function(e) {
            if (!this.getAttribute('href')) {
                e.preventDefault();
                window.location.href = this.getAttribute('data-page');
            }
        });
    });
    
    const modals = document.querySelectorAll('.modal');
    
    modals.forEach(modal => {
        const closeBtn = modal.querySelector('.btn-close');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                modal.classList.remove('active');
            });
        }
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
    
    const filterButtons = document.querySelectorAll('[id$="filtrar"]');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const filterContainer = document.getElementById(this.id.replace('filtrar', 'filtros') + 'Container');
            if (filterContainer) {
                filterContainer.style.display = filterContainer.style.display === 'none' ? 'block' : 'none';
            }
        });
    });
});