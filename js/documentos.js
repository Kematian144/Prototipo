document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    const fileInfo = document.getElementById('fileInfo');
    const fileUploadLabel = document.querySelector('.file-upload-label');
    
    fileInput.addEventListener('change', function() {
        if (this.files.length > 0) {
            const file = this.files[0];
            fileInfo.textContent = `${file.name} (${formatFileSize(file.size)})`;
            fileUploadLabel.classList.add('file-selected');
        } else {
            fileInfo.textContent = 'No se ha seleccionado ningún archivo';
            fileUploadLabel.classList.remove('file-selected');
        }
    });
    
    fileUploadLabel.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('drag-over');
    });
    
    fileUploadLabel.addEventListener('dragleave', function() {
        this.classList.remove('drag-over');
    });
    
    fileUploadLabel.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('drag-over');
        
        if (e.dataTransfer.files.length) {
            fileInput.files = e.dataTransfer.files;
            const event = new Event('change');
            fileInput.dispatchEvent(event);
        }
    });
    
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    const uploadForm = document.getElementById('uploadForm');
    
    uploadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!this.checkValidity()) {
            this.reportValidity();
            return;
        }
        
        const formData = new FormData(this);
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subiendo...';
        
        setTimeout(function() {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> ¡Subido!';
            alert('Documento subido exitosamente');
            uploadForm.reset();
            fileInfo.textContent = 'No se ha seleccionado ningún archivo';
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            addDocumentToTable({
                name: formData.get('fileInput').name,
                type: document.getElementById('documentType').options[document.getElementById('documentType').selectedIndex].text,
                size: formData.get('fileInput').size,
                date: new Date().toLocaleString(),
                status: 'Pendiente'
            });
        }, 2000);
    });
    
    function addDocumentToTable(doc) {
        const tbody = document.querySelector('#documentsTable tbody');
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${doc.name}</td>
            <td>${doc.type}</td>
            <td>${formatFileSize(doc.size)}</td>
            <td>${doc.date}</td>
            <td><span class="badge badge-warning">${doc.status}</span></td>
            <td>
                <button class="btn-icon btn-view" title="Ver">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn-icon btn-download" title="Descargar">
                    <i class="fas fa-download"></i>
                </button>
            </td>
        `;
        
        tbody.insertBefore(row, tbody.firstChild);
    }
    
    const viewButtons = document.querySelectorAll('.btn-view');
    const previewModal = document.getElementById('documentPreviewModal');
    const documentViewer = document.getElementById('documentViewer');
    
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            const fileName = row.cells[0].textContent;
            
            document.getElementById('previewTitle').textContent = `Vista Previa: ${fileName}`;
            
            documentViewer.srcdoc = `
                <html>
                <head><title>Vista Previa</title></head>
                <body style="display:flex; justify-content:center; align-items:center; height:100%; font-family:Arial;">
                    <div style="text-align:center;">
                        <h2>Vista previa de ${fileName}</h2>
                        <p>En un sistema real aquí se mostraría el documento</p>
                        <p><i class="fas fa-file-pdf" style="font-size:3rem; color:#e74c3c;"></i></p>
                    </div>
                </body>
                </html>
            `;
            
            previewModal.classList.add('active');
        });
    });
    
    const closePreviewButtons = [
        document.getElementById('closePreviewModal'),
        document.getElementById('closePreview')
    ];
    
    closePreviewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            previewModal.classList.remove('active');
        });
    });
    
    document.getElementById('downloadFromPreview').addEventListener('click', function() {
        alert('Iniciando descarga del documento...');
        previewModal.classList.remove('active');
    });
    
    document.getElementById('refreshDocuments').addEventListener('click', function() {
        alert('Lista de documentos actualizada');
    });
});
