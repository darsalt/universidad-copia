<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Carrera extends Model
{
    use HasFactory;

    protected $fillable = [
        'codigo',
        'nombre',
        'estado',
    ];

    public function materias()
    {
        return $this->belongsToMany(Materia::class, 'carrera_materia')
            ->withTimestamps();
    }

}
