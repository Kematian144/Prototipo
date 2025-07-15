document.addEventListener('DOMContentLoaded', function() {
    const nuevaSolicitudBtn = document.getElementById('nuevaSolicitud');
    const solicitudModal = document.getElementById('solicitudModal');
    
    if (nuevaSolicitudBtn && solicitudModal) {
        nuevaSolicitudBtn.addEventListener('click', function() {
            document.getElementById('modalTitle').textContent = 'Nueva Solicitud de Viajero';
            document.getElementById('solicitudForm').reset();
            solicitudModal.classList.add('active');
        });
    }
    
    const editButtons = document.querySelectorAll('.btn-edit');
    
    editButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            const cells = row.querySelectorAll('td');
            
            document.getElementById('modalTitle').textContent = 'Editar Solicitud de Viajero';
            document.getElementById('nombreViajero').value = cells[1].textContent;
            document.getElementById('pasaporte').value = cells[2].textContent;
            
            document.getElementById('horaVisita').value = cells[3].textContent;
            document.getElementById('ubicacion').value = cells[4].textContent;
            
            const estadoBadge = cells[5].querySelector('.status-badge');
            if (estadoBadge.classList.contains('status-pending')) {
                document.getElementById('estado').value = 'pendiente';
            } else if (estadoBadge.classList.contains('status-completed')) {
                document.getElementById('estado').value = 'completado';
            } else {
                document.getElementById('estado').value = 'en-proceso';
            }
            
            solicitudModal.classList.add('active');
        });
    });
    
    const guardarSolicitudBtn = document.getElementById('guardarSolicitud');
    
    if (guardarSolicitudBtn) {
        guardarSolicitudBtn.addEventListener('click', function() {
            const form = document.getElementById('solicitudForm');
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }
            
            alert('Solicitud guardada exitosamente');
            solicitudModal.classList.remove('active');
        });
    }
    
    const cancelarSolicitudBtn = document.getElementById('cancelarSolicitud');
    
    if (cancelarSolicitudBtn) {
        cancelarSolicitudBtn.addEventListener('click', function() {
            solicitudModal.classList.remove('active');
        });
    }
    
    const exportarBtn = document.getElementById('exportarSolicitudes');
    
    if (exportarBtn) {
        exportarBtn.addEventListener('click', function() {
            alert('Datos exportados exitosamente');
        });
    }
});