<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request; //  IMPORTANTE: Necesitas importar Request

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
    
    // Función de ayuda para pasar los props de autenticación (auth) a Inertia
    $authProps = function (Request $request) {
        return [
            'auth' => [
                // Solo pasa los datos del usuario necesarios
                'user' => $request->user() ? $request->user()->only('id', 'name', 'email') : ['name' => 'invitado', 'email' => ''],
            ],
        ];
    };
    
    //  RUTA DEL DASHBOARD (AHORA PROTEGIDA CON TOKEN)
    Route::get('/dashboard', function (Request $request) use ($authProps) {
        return Inertia::render('Dashboard', $authProps($request)); // ⬅
    })->name('dashboard');

    // Inventario
    Route::get('/inventario', function (Request $request) use ($authProps) {
        return Inertia::render('Inventario/Index', $authProps($request)); // ⬅ Pasa la data aquí
    })->name('inventario');

    // Mesa de Ayuda
    Route::get('/mesa-de-ayuda', function (Request $request) use ($authProps) {
        return Inertia::render('MesaDeAyuda/Index', $authProps($request)); // ⬅Pasa la data aquí
    })->name('mesa-de-ayuda');

    // Documentos
    Route::get('/documentos', function (Request $request) use ($authProps) {
        return Inertia::render('Documentos/Index', $authProps($request)); // ⬅ Pasa la data aquí
    })->name('documentos');
    
});
// =========================================================================

// Incluye las rutas de logout 
require __DIR__.'/auth.php';