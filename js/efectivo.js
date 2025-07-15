document.addEventListener('DOMContentLoaded', () => {
    const montoDeclarado = document.getElementById('montoDeclarado');
    const montoEncontrado = document.getElementById('montoEncontrado');
    const diferencia = document.getElementById('diferencia');
    
    const updateDifference = () => {
        const declarado = parseFloat(montoDeclarado.value) || 0;
        const encontrado = parseFloat(montoEncontrado.value) || 0;
        const diff = encontrado - declarado;
        
        diferencia.value = diff.toFixed(2);
        
        diferencia.classList.toggle('difference-positive', diff > 0);
        diferencia.classList.toggle('difference-negative', diff < 0);
    };

    if (montoDeclarado && montoEncontrado && diferencia) {
        [montoDeclarado, montoEncontrado].forEach(input => {
            input.addEventListener('input', updateDifference);
        });
    }
    
    const efectivoForm = document.getElementById('efectivoForm');
    
    if (efectivoForm) {
        efectivoForm.addEventListener('submit', e => {
            e.preventDefault();
            
            if (!efectivoForm.checkValidity()) {
                efectivoForm.reportValidity();
                return;
            }
            
            alert('Registro de efectivo guardado exitosamente');
            efectivoForm.reset();
            diferencia.value = '';
            diferencia.className = '';
        });
    }
    
    const editButtons = document.querySelectorAll('.btn-edit');
    
    editButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            const cells = row.querySelectorAll('td');
            const diffCell = cells[6];
            
            document.getElementById('viajeroNombre').value = cells[1].textContent;
            document.getElementById('viajeroPasaporte').value = cells[2].textContent;
            document.getElementById('moneda').value = cells[3].textContent.toLowerCase();
            
            document.getElementById('montoDeclarado').value = cells[4].textContent.replace(/[^0-9.-]/g, '');
            document.getElementById('montoEncontrado').value = cells[5].textContent.replace(/[^0-9.-]/g, '');
            
            const diferenciaElement = document.getElementById('diferencia');
            diferenciaElement.value = diffCell.textContent.replace(/[^0-9.-]/g, '');
            diferenciaElement.className = diffCell.className.includes('difference-') ? 
                diffCell.classList.contains('difference-positive') ? 'difference-positive' : 'difference-negative' : '';
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
    
    const exportarBtn = document.getElementById('exportarRegistros');
    exportarBtn?.addEventListener('click', () => alert('Registros de efectivo exportados exitosamente'));
});