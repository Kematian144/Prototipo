document.addEventListener('DOMContentLoaded', function() {
    const roleRows = document.querySelectorAll('#tablaRoles tbody tr');
    const rolNombre = document.getElementById('rolNombre');
    const rolDescripcion = document.getElementById('rolDescripcion');
    
    roleRows.forEach(row => {
        row.addEventListener('click', function() {
            roleRows.forEach(r => r.classList.remove('selected'));
            
            this.classList.add('selected');
            
            const cells = this.querySelectorAll('td');
            rolNombre.textContent = cells[0].textContent;
            rolDescripcion.value = cells[1].textContent;
        });
    });
    
    if (roleRows.length > 0) {
        roleRows[0].click();
    }
    
    const nuevoRolBtn = document.getElementById('nuevoRol');
    const rolModal = document.getElementById('rolModal');
    
    if (nuevoRolBtn && rolModal) {
        nuevoRolBtn.addEventListener('click', function() {
            document.getElementById('modalRolTitle').textContent = 'Nuevo Rol';
            document.getElementById('rolForm').reset();
            rolModal.classList.add('active');
        });
    }
    
    const guardarRolBtn = document.getElementById('guardarRol');
    
    if (guardarRolBtn) {
        guardarRolBtn.addEventListener('click', function() {
            const form = document.getElementById('rolForm');
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }
            
            alert('Rol guardado exitosamente');
        });
    }
    
    const permisosItems = document.querySelectorAll('.permiso-item input');
    
    permisosItems.forEach(item => {
        item.addEventListener('change', function() {
        });
    });
});