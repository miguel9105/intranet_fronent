<?php // ⬅️ CORRECCIÓN: Etiqueta PHP correcta

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class AuthenticateByApiToken
{
    public function handle(Request $request, Closure $next): Response
    {
        // 1. Obtener el token del header (enviado por Axios/React)
        $token = $request->bearerToken();

        if ($token) {
            // 2. Intentar autenticar al usuario usando el guard 'api'
            if (Auth::guard('api')->check()) {
                // El usuario ha sido autenticado por el guard 'api'
                return $next($request);
            }
        }
        
        // 3. Si no hay token válido o no se pudo autenticar, redirigir al login
        return redirect()->route('login'); 
    }
}