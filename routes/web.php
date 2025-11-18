<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request; 
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Rutas Públicas... (mantener como está)
Route::get('login', function () {
    return Inertia::render('Login'); 
})->name('login'); 

Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'), 
        'canRegister' => Route::has('register'), 
    ]);
})->name('home');

Route::get('/contacto', function () {
    return Inertia::render('Contact');
})->name('contact');


// =========================================================================
// RUTAS PROTEGIDAS POR EL MIDDLEWARE 'auth.token' (Bloque Corregido)
// =========================================================================

Route::middleware(['auth.token'])->group(function () {
    
    // 1. FUNCIÓN DE PROPS (SE MANTIENE, SIN RUTAS DENTRO)
    $authProps = function (Request $request) {
        $user = $request->user();
        
        $userData = $user ? $user->only('id', 'name', 'email') : ['name' => 'invitado', 'email' => ''];

        if ($user) {
            // LÍNEA CRÍTICA
            $userData['role_names'] = $user->role_names; 
        }

        return [
            'auth' => [
                'user' => $userData,
            ],
        ];
    }; // <--- IMPORTANTE: La función $authProps debe cerrarse aquí.

    
    // 2. RUTA DEL DASHBOARD (CRÍTICA)
    Route::get('/dashboard', function (Request $request) use ($authProps) {
        return Inertia::render('Dashboard', $authProps($request));
    })->name('dashboard');


    // 3. RUTAS DEL SIDEBAR (TODAS BIEN COLOCADAS AHORA)

    // Rutas de Gestión Interna (Administrador)
    Route::get('/gestion-usuarios', fn () => Inertia::render('Users'))->name('users.index');
    Route::get('/configuracion', fn () => Inertia::render('GeneralConfig'))->name('config.general');
    
    // Rutas de Operaciones (Gestor, Administrativo, Admin)
    Route::get('/inventario', fn () => Inertia::render('Inventory'))->name('inventory.index');
    Route::get('/documentos', fn () => Inertia::render('LegalDocuments'))->name('documents.index');
    
    // Rutas de Comercial (Asesor, Admin)
    Route::get('/clientes', fn () => Inertia::render('Clients'))->name('clients.index');
    Route::get('/agenda', fn () => Inertia::render('AdvisorSchedule'))->name('schedule.index');

    
    // 4. Rutas de Cierre de Sesión (usando Inertia Post)
    Route::post('logout', function (Request $request) {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/login');
    })->name('logout');
});

// Nota: Elimina el bloque de ProfileController si no lo estás usando actualmente.