<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request; 
use Illuminate\Support\Facades\Auth; // Añadido para el logout

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Rutas Públicas
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
// RUTAS PROTEGIDAS POR EL MIDDLEWARE 'auth.token'
// =========================================================================

Route::middleware(['auth.token'])->group(function () {
    
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
};
    // RUTA DEL DASHBOARD (CRÍTICA)
    Route::get('/dashboard', function (Request $request) use ($authProps) {
        return Inertia::render('Dashboard', $authProps($request));
    })->name('dashboard');

    // Inventario
    Route::get('/inventario', function (Request $request) use ($authProps) {
        return Inertia::render('Inventario/Index', $authProps($request)); 
    })->name('inventario');

    // Mesa de Ayuda
    Route::get('/mesa-de-ayuda', function (Request $request) use ($authProps) {
        return Inertia::render('MesaDeAyuda/Index', $authProps($request));
    })->name('mesa-de-ayuda');

   // RUTA PARA EL MÓDULO DE DOCUMENTOS Y PROCESAMIENTO
   Route::get('/documentos', function (Request $request) use ($authProps) {
        // La ruta es más simple ya que los roles van incluidos en $authProps
        return Inertia::render('Documentos', $authProps($request)); 
    })->middleware('role:Administrador,Gestor')->name('documentos');

    // Rutas de Cierre de Sesión (usando Inertia Post)
    Route::post('logout', function (Request $request) {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/login');
    })->name('logout');
});