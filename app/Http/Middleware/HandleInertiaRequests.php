<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user(); // Obtiene el usuario autenticado

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $user ? [
                    'id'               => $user->id,
                    'name_user'        => $user->name_user,
                    'email'            => $user->email,
                    // *** CAMBIO CLAVE: Cargar el array de roles ***
                    'roles'            => $user->role_names, 
                    // Asegúrate de que el accessor 'role_names' exista y funcione en tu modelo User.php
                ] : null,
            ],
        ]);
    }
}