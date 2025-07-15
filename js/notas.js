document.addEventListener('DOMContentLoaded', function() {
    const noteItems = document.querySelectorAll('.note-item');
    const noteTitle = document.getElementById('noteTitle');
    const noteContent = document.getElementById('noteContent');
    
    noteItems.forEach(item => {
        item.addEventListener('click', function() {
            noteItems.forEach(note => note.classList.remove('active'));
            
            this.classList.add('active');
            
            const title = this.querySelector('h3').textContent;
            noteTitle.textContent = title;
            
            let content = '';
            if (title.includes('Revisión')) {
                content = `
                    <h3>Actualización de protocolos</h3>
                    <p>Se ha detectado que algunos agentes no están siguiendo el procedimiento completo para la verificación de equipajes en la terminal aérea. Es necesario revisar y actualizar los protocolos actuales.</p>
                    
                    <h3>Acciones requeridas:</h3>
                    <ul>
                        <li>Revisar el checklist actual de verificación de equipajes</li>
                        <li>Capacitar al personal en los nuevos procedimientos</li>
                        <li>Implementar un sistema de seguimiento para verificar el cumplimiento</li>
                        <li>Establecer medidas correctivas para los casos de incumplimiento</li>
                    </ul>
                    
                    <h3>Plazos:</h3>
                    <p>Se espera tener los nuevos protocolos implementados antes del 30/06/2023.</p>
                `;
            } else if (title.includes('Incidente')) {
                content = `
                    <h3>Reporte de Incidente</h3>
                    <p>El día 12/06/2023 a las 14:30 horas, en el puesto de control 3 de la terminal aérea, se detectó un viajero intentando ingresar sin declarar mercancías por un valor superior al permitido.</p>
                    
                    <h3>Detalles:</h3>
                    <ul>
                        <li>Nombre del viajero: Juan Pérez</li>
                        <li>Pasaporte: AB123456</li>
                        <li>Mercancía no declarada: 2 teléfonos móviles nuevos</li>
                        <li>Valor aproximado: $1,200 USD</li>
                    </ul>
                    
                    <h3>Acciones tomadas:</h3>
                    <ul>
                        <li>Retención de las mercancías</li>
                        <li>Elaboración de acta correspondiente</li>
                        <li>Derivación a fiscalía</li>
                    </ul>
                `;
            } else {
                content = `
                    <h3>Capacitación Nueva Normativa</h3>
                    <p>El próximo mes entrarán en vigor cambios en la normativa aduanera que afectan los procedimientos de control de mercancías. Es necesario capacitar a todo el personal.</p>
                    
                    <h3>Detalles de la Capacitación:</h3>
                    <ul>
                        <li>Fecha propuesta: 25/06/2023</li>
                        <li>Horario: 09:00 a 13:00 horas</li>
                        <li>Lugar: Sala de Capacitación - Edificio Administrativo</li>
                        <li>Capacitador: Departamento de Normativas</li>
                        <li>Asistentes: Todo el personal de turno</li>
                    </ul>
                    
                    <h3>Temas a cubrir:</h3>
                    <ul>
                        <li>Cambios en los límites de valor para mercancías</li>
                        <li>Nuevos procedimientos de verificación</li>
                        <li>Actualización del sistema de registro</li>
                    </ul>
                `;
            }
            
            noteContent.innerHTML = content;
        });
    });
    
    if (noteItems.length > 0) {
        noteItems[0].click();
    }
    
    const nuevaNotaBtn = document.getElementById('nuevaNota');
    const notaModal = document.getElementById('notaModal');
    
    if (nuevaNotaBtn && notaModal) {
        nuevaNotaBtn.addEventListener('click', function() {
            document.getElementById('modalNotaTitle').textContent = 'Nueva Nota';
            document.getElementById('notaForm').reset();
            notaModal.classList.add('active');
        });
    }
    
    const guardarNotaBtn = document.getElementById('guardarNota');
    
    if (guardarNotaBtn) {
        guardarNotaBtn.addEventListener('click', function() {
            const form = document.getElementById('notaForm');
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }
            
            alert('Nota guardada exitosamente');
            notaModal.classList.remove('active');
        });
    }
    
    const cancelarNotaBtn = document.getElementById('cancelarNota');
    
    if (cancelarNotaBtn) {
        cancelarNotaBtn.addEventListener('click', function() {
            notaModal.classList.remove('active');
        });
    }
});