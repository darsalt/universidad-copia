<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Carrera;

class CarreraSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
                Carrera::create([
            'codigo' => 'LAS',
            'nombre' => 'Licenciatura en Análisis de Sistemas',
            'estado' => true,
        ]);

        Carrera::create([
            'codigo' => 'TUP',
            'nombre' => 'Tecnicatura Universitaria en Programación',
            'estado' => true,
        ]);
    }
}
