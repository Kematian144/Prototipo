document.addEventListener('DOMContentLoaded', function() {
    const calcularBtn = document.getElementById('calcularImpuesto');
    
    if (calcularBtn) {
        calcularBtn.addEventListener('click', function() {
            const tipoProducto = document.getElementById('tipoProducto').value;
            const valorProducto = parseFloat(document.getElementById('valorProducto').value) || 0;
            const cantidad = parseInt(document.getElementById('cantidad').value) || 1;
            
            if (!tipoProducto || valorProducto <= 0) {
                alert('Por favor complete todos los campos requeridos');
                return;
            }
            
            const valorTotal = valorProducto * cantidad;
            let tasaImpuesto = 0;
            
            switch(tipoProducto) {
                case 'electronico':
                    tasaImpuesto = 0.20;
                    break;
                case 'ropa':
                    tasaImpuesto = 0.15;
                    break;
                case 'alcohol':
                    tasaImpuesto = 0.30;
                    break;
                case 'cosmeticos':
                    tasaImpuesto = 0.25;
                    break;
                case 'alimentos':
                    tasaImpuesto = 0.10;
                    break;
                default:
                    tasaImpuesto = 0.10;
            }
            
            const impuestoAduanero = valorTotal * tasaImpuesto;
            const iva = valorTotal * 0.19;
            const totalPagar = valorTotal + impuestoAduanero + iva;
            
            document.getElementById('valorTotal').textContent = `$${valorTotal.toFixed(2)}`;
            document.getElementById('impuestoAduanero').textContent = `$${impuestoAduanero.toFixed(2)}`;
            document.getElementById('iva').textContent = `$${iva.toFixed(2)}`;
            document.getElementById('totalPagar').textContent = `$${totalPagar.toFixed(2)}`;
            
            document.getElementById('limpiarCalculo').disabled = false;
            document.getElementById('guardarCalculo').disabled = false;
        });
    }
    
    const limpiarBtn = document.getElementById('limpiarCalculo');
    
    if (limpiarBtn) {
        limpiarBtn.addEventListener('click', function() {
            document.getElementById('tipoProducto').value = '';
            document.getElementById('descripcion').value = '';
            document.getElementById('valorProducto').value = '';
            document.getElementById('cantidad').value = '1';
            document.getElementById('paisOrigen').value = '';
            
            document.getElementById('valorTotal').textContent = '$0.00';
            document.getElementById('impuestoAduanero').textContent = '$0.00';
            document.getElementById('iva').textContent = '$0.00';
            document.getElementById('totalPagar').textContent = '$0.00';
            
            this.disabled = true;
            document.getElementById('guardarCalculo').disabled = true;
        });
    }
    
    const guardarBtn = document.getElementById('guardarCalculo');
    
    if (guardarBtn) {
        guardarBtn.addEventListener('click', function() {
            alert('Cálculo guardado en el historial');
        });
    }
    
    const exportarBtn = document.getElementById('exportarCalculos');
    
    if (exportarBtn) {
        exportarBtn.addEventListener('click', function() {
            alert('Historial de cálculos exportado');
        });
    }
});