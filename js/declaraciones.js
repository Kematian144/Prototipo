document.addEventListener('DOMContentLoaded', function() {
    const nuevaDeclaracionBtn = document.getElementById('nuevaDeclaracionBtn');
    const declaracionModal = document.getElementById('declaracionModal');
    const closeModalDeclaracion = document.getElementById('closeModalDeclaracion');
    const cancelarDeclaracionBtn = document.getElementById('cancelarDeclaracion');
    const guardarDeclaracionBtn = document.getElementById('guardarDeclaracion');
    const exportarDeclaracionesBtn = document.getElementById('exportarDeclaraciones');
    const filtrarDeclaracionesBtn = document.getElementById('filtrarDeclaraciones');
    const declaracionForm = document.getElementById('declaracionForm');

    if (nuevaDeclaracionBtn && declaracionModal) {
        nuevaDeclaracionBtn.addEventListener('click', function() {
            document.getElementById('modalTitleDeclaracion').textContent = 'Nueva Declaración Jurada';
            declaracionForm.reset();
            declaracionModal.classList.add('active');
        });
    }

    const editButtons = document.querySelectorAll('#tablaDeclaraciones .btn-edit');
    editButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            const cells = row.querySelectorAll('td');
            
            document.getElementById('modalTitleDeclaracion').textContent = 'Editar Declaración Jurada';
            document.getElementById('nombreDeclarante').value = cells[1].textContent;
            document.getElementById('documento').value = cells[2].textContent;
            
            const [fecha, hora] = cells[3].textContent.split(' ');
            document.getElementById('fechaDeclaracion').value = fecha.split('/').reverse().join('-');
            document.getElementById('horaDeclaracion').value = hora;
            
            document.getElementById('detalleDeclaracion').value = cells[4].textContent;
            
            const estadoBadge = cells[5].querySelector('.status-badge');
            if (estadoBadge.classList.contains('status-pending')) {
                document.getElementById('estadoDeclaracion').value = 'rechazado';
            } else if (estadoBadge.classList.contains('status-completed')) {
                document.getElementById('estadoDeclaracion').value = 'aprobada';
            } else {
                document.getElementById('estadoDeclaracion').value = 'en-proceso';
            }
            
            declaracionModal.classList.add('active');
        });
    });

    if (guardarDeclaracionBtn) {
        guardarDeclaracionBtn.addEventListener('click', function() {
            if (!declaracionForm.checkValidity()) {
                declaracionForm.reportValidity();
                return;
            }
            
            alert('Declaración guardada exitosamente');
            declaracionModal.classList.remove('active');
        });
    }

    if (cancelarDeclaracionBtn) {
        cancelarDeclaracionBtn.addEventListener('click', function() {
            declaracionModal.classList.remove('active');
        });
    }

    if (closeModalDeclaracion) {
        closeModalDeclaracion.addEventListener('click', function() {
            declaracionModal.classList.remove('active');
        });
    }

    if (exportarDeclaracionesBtn) {
        exportarDeclaracionesBtn.addEventListener('click', function() {
            alert('Exportando declaraciones...');
        });
    }

    if (filtrarDeclaracionesBtn) {
        filtrarDeclaracionesBtn.addEventListener('click', function() {
            const filtros = document.getElementById('filtrosDeclaracionesContainer');
            filtros.style.display = filtros.style.display === 'none' ? 'block' : 'none';
        });
    }

    window.addEventListener('click', function(event) {
        if (event.target === declaracionModal) {
            declaracionModal.classList.remove('active');
        }
    });
});