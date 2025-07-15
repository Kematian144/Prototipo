document.addEventListener('DOMContentLoaded', function() {
    const generarReporteBtn = document.getElementById('generarReporte');
    
    if (generarReporteBtn) {
        generarReporteBtn.addEventListener('click', function() {
            const tipoReporte = document.getElementById('tipoReporte').value;
            const fechaInicio = document.getElementById('fechaInicio').value;
            const fechaFin = document.getElementById('fechaFin').value;
            const filtroUsuario = document.getElementById('filtroUsuario').value;
            const formatoReporte = document.getElementById('formatoReporte').value;
            
            if (!tipoReporte) {
                alert('Por favor seleccione un tipo de reporte');
                return;
            }
            
            alert(`Reporte de ${tipoReporte} generado para el período ${fechaInicio || 'sin fecha'} a ${fechaFin || 'sin fecha'} en formato ${formatoReporte}`);
        });
    }
    
    const downloadButtons = document.querySelectorAll('.btn-icon[title="Descargar"]');
    
    downloadButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            const cells = row.querySelectorAll('td');
            const idReporte = cells[0].textContent;
            const formato = cells[5].textContent.toLowerCase();
            
            alert(`Descargando reporte ${idReporte} en formato ${formato}`);
        });
    });
    
    const deleteButtons = document.querySelectorAll('.btn-icon[title="Eliminar"]');
    
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (confirm('¿Está seguro que desea eliminar este reporte?')) {
                const row = this.closest('tr');
                row.remove();
                alert('Reporte eliminado');
            }
        });
    });
    
    const actualizarBtn = document.getElementById('actualizarHistorial');
    
    if (actualizarBtn) {
        actualizarBtn.addEventListener('click', function() {
            alert('Historial de reportes actualizado');
        });
    }
});