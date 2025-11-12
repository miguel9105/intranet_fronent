import React, { useState } from 'react';
import axios from 'axios'; 
import { Head, router } from '@inertiajs/react'; 
// Importamos los iconos para el estilo
import { CloudArrowUpIcon } from '@heroicons/react/24/outline'; 

function ReportProcessor({ userRole }) { 
  const [empresa, setEmpresa] = useState('');
  const [planoFile, setPlanoFile] = useState(null);
  const [correccionesFile, setCorreccionesFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // URL del Proxy de Laravel (ruta API definida en api.php)
  const LARAVEL_PROXY_URL = '/api/process-report'; 

  // Función para obtener el token de autenticación (si axios no lo maneja globalmente)
  // Nota: Si usas Sanctum CSRF/XHR, esto ya es automático, pero lo mantenemos por si acaso
  const getAuthToken = () => {
      // Si usas tokens Sanctum/JWT, puedes obtenerlo aquí.
      // Si solo usas Sanctum con CSRF (que es común en Inertia), Laravel lo maneja.
      return null; 
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!empresa || !planoFile || !correccionesFile) {
      setError("Por favor, complete el nombre de la empresa y suba ambos archivos.");
      return;
    }

    setLoading(true);
    
    const formData = new FormData();
    formData.append('empresa', empresa);
    formData.append('archivo_plano', planoFile);
    formData.append('archivo_correcciones', correccionesFile);

    try {
      const response = await axios.post(LARAVEL_PROXY_URL, formData, {
        responseType: 'blob', 
        headers: {
            'Authorization': getAuthToken() ? `Bearer ${getAuthToken()}` : undefined,
        },
      });

      // --- Manejo de la Descarga del Archivo ---
      const contentDisposition = response.headers['content-disposition'];
      let filename = 'reporte_procesado.xlsx';
      
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+?)"/i);
        if (match && match[1]) {
          filename = match[1].replace(/['"]/g, ''); 
        }
      }

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename); 
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url); 

      setSuccess(true);
      // Limpiar los inputs de archivos
      document.getElementById('plano_input').value = null;
      document.getElementById('correcciones_input').value = null;
      setPlanoFile(null);
      setCorreccionesFile(null);

    } catch (err) {
      console.error("Error en la solicitud:", err.response || err);
      
      let errorMsg = 'Error en la conexión o desconocido.';

      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          errorMsg = `Permiso denegado (${err.response.status}). Verifique su sesión y roles.`;
      } else if (err.response && err.response.data instanceof Blob) {
          // Leer el JSON de error dentro del Blob
          const reader = new FileReader();
          reader.onload = async () => {
              try {
                  const errorJson = JSON.parse(reader.result);
                  errorMsg = errorJson.message || 'Error en el procesamiento del reporte.';
                  if (errorJson.fastapi_error_detail) {
                      errorMsg += ` Detalle FastAPI: ${errorJson.fastapi_error_detail}`;
                  }
                  setError(errorMsg);
              } catch (e) {
                  setError('Error desconocido. Revise la consola y logs del servidor.');
              }
          };
          reader.readAsText(err.response.data);
          return; // Salir para esperar el resultado de FileReader
      } else if (err.response) {
          errorMsg = err.response.data.message || `Error del servidor: ${err.response.status}`;
      }
      
      setError(errorMsg);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md">
      <Head title="Procesamiento de Reporte" />
      <div className="flex items-center mb-6">
        <CloudArrowUpIcon className="w-8 h-8 text-indigo-500 mr-3"/>
        <h3 className="text-2xl font-bold text-gray-900">Procesador de Archivos</h3>
      </div>
      <p className="text-sm text-gray-600 mb-4">
          Suba los archivos plano y de correcciones para la empresa seleccionada. 
          Su rol ({userRole}) le permite acceder a esta funcionalidad.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Input Empresa */}
        <div>
          <label htmlFor="empresa" className="block text-sm font-medium text-gray-700">Nombre de la Empresa</label>
          <input
            id="empresa"
            type="text"
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Ej: Finansuemos S.A.S."
            required
            disabled={loading}
          />
        </div>

        {/* Input Archivo Plano */}
        <div>
          <label htmlFor="plano_input" className="block text-sm font-medium text-gray-700">Archivo Plano (DATA FS.TXT / CSV)</label>
          <input 
            type="file" 
            id="plano_input" 
            accept=".txt,.csv,.xlsx,.xls"
            onChange={(e) => setPlanoFile(e.target.files[0])} 
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            required 
            disabled={loading}
          />
        </div>

        {/* Input Archivo Correcciones */}
        <div>
          <label htmlFor="correcciones_input" className="block text-sm font-medium text-gray-700">Archivo de Correcciones (XLSX)</label>
          <input 
            type="file" 
            id="correcciones_input" 
            accept=".txt,.csv,.xlsx,.xls"
            onChange={(e) => setCorreccionesFile(e.target.files[0])} 
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            required 
            disabled={loading}
          />
        </div>
        
        {/* Botón de Envío */}
        <button 
          type="submit" 
          disabled={loading}
          className="w-full justify-center inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? 'Procesando, por favor espere...' : 'Procesar y Descargar Reporte'}
        </button>
      </form>

      {/* Mensajes de Estado */}
      {error && <p className="mt-4 p-3 bg-red-100 border border-red-400 rounded-md text-red-700">🚨 {error}</p>}
      {success && <p className="mt-4 p-3 bg-green-100 border border-green-400 rounded-md text-green-700">✅ Reporte descargado con éxito. Revise su carpeta de descargas.</p>}
    </div>
  );
}

export default ReportProcessor;