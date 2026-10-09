<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Materia;

class MateriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Materia::create([
            'codigo' => 'AYED',
            'nombre' => 'Algoritmos y Estructuras de Datos',
            'anio' => 2,
            'cuatrimestre' => 1,
            'estado' => true,
        ]);

        Materia::create([
            'codigo' => 'PAW',
            'nombre' => 'Programación de Aplicaciones Web',
            'anio' => 3,
            'cuatrimestre' => 1,
            'estado' => true,
        ]);

        Materia::create([
            'codigo' => 'BD',
            'nombre' => 'Bases de Datos',
            'anio' => 2,
            'cuatrimestre' => 1,
            'estado' => true,
        ]);

        Materia::create([
            'codigo' => 'SO',
            'nombre' => 'Sistemas Operativos',
            'anio' => 2,
            'cuatrimestre' => 2,
            'estado' => true,
        ]);
    }
}
