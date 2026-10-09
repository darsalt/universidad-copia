import { Link, router } from '@inertiajs/react';
import { useState } from 'react';

interface Materia {
    id: number;
    codigo: string;
    nombre: string;
}


interface Carrera {
    id: number;
    codigo: string;
    nombre: string;
    estado: boolean;
    materias: Materia[];
}
interface CarrerasPaginadas {
    data: Carrera[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    prev_page_url: string | null;
    next_page_url: string | null;
}

interface Props {
    //carreras: Carrera[];
    carreras: CarrerasPaginadas;
    materias: Materia[];
    filtros: Filtros;
    flash?: { success?: string; };
}

interface Filtros {
    buscar: string;
    materia: string;
    orden: string;
    direccion: string;
    por_pagina: number;    
}

export default function Index({
    carreras,
    materias,
    filtros,
    flash
}: Props) {
    const [buscar, setBuscar] = useState(filtros.buscar ?? '');
    const [materia, setMateria] = useState(filtros.materia ?? '');
    const [orden, setOrden] = useState(filtros.orden ?? 'nombre');
    const [direccion, setDireccion] = useState(
        filtros.direccion ?? 'asc'
    );
    const [porPagina, setPorPagina] = useState(
        filtros.por_pagina ?? 5
    );
    const aplicarFiltros = (e: React.FormEvent) => {
        e.preventDefault();

        router.get('/carreras', {
            buscar,
            materia,
            orden,
            direccion,
            por_pagina: porPagina,
        });
    };
    const ordenarPor = (campo: string) => {
        let nuevaDireccion = 'asc';

        if (orden === campo && direccion === 'asc') {
            nuevaDireccion = 'desc';
        }

        setOrden(campo);
        setDireccion(nuevaDireccion);

        router.get('/carreras', {
            buscar,
            materia,
            orden: campo,
            direccion: nuevaDireccion,
            por_pagina: porPagina,
        });
    };
    const indicadorOrden = (campo: string) => {
        if (orden !== campo) {
            return '';
        }

        return direccion === 'asc' ? ' ↑' : ' ↓';
    };
    const eliminar = (id: number) => { if (confirm('¿Está seguro de eliminar esta carrera?')) { router.delete(`/carreras/${id}`); } };
    return (
        <div>
            <h1>Carreras</h1>

            <Link href="/carreras/create">
                Nueva carrera
            </Link>
            {flash?.success && ( <div> {flash.success} </div> )}
            <form onSubmit={aplicarFiltros}>
            <input
                type="text"
                value={buscar}
                onChange={(e) => setBuscar(e.target.value)}
                placeholder="Buscar carrera..."
            />

            <select
                value={materia}
                onChange={(e) => setMateria(e.target.value)}
            >
                <option value="">Todas las materias</option>

                {materias.map((m) => (
                    <option key={m.id} value={m.id}>
                        {m.codigo} - {m.nombre}
                    </option>
                ))}
            </select>
            <label>
                Mostrar:

                <select
                    value={porPagina}
                    onChange={(e) => setPorPagina(Number(e.target.value))}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                </select>

                filas
            </label>
            <button type="submit">
                Buscar
            </button>
        </form>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => ordenarPor('codigo')}>
                            Código{indicadorOrden('codigo')}
                        </th>

                        <th onClick={() => ordenarPor('nombre')}>
                            Nombre{indicadorOrden('nombre')}
                        </th>

                        <th onClick={() => ordenarPor('estado')}>
                            Estado{indicadorOrden('estado')}
                        </th>
                        <th>Materias</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {carreras.data.map((carrera) => (
                        <tr key={carrera.id}>
                            <td>{carrera.codigo}</td>
                            <td>{carrera.nombre}</td>
                            <td>
                                {carrera.estado ? 'Activa' : 'Inactiva'}
                            </td>
                            <td>
                                {carrera.materias.map((materia) => materia.codigo).join(', ')}
                            </td>

                            <td> <Link href={`/carreras/${carrera.id}/edit`}> Editar </Link> {' | '} <button type="button" onClick={() => eliminar(carrera.id)} > Eliminar </button> {' | '}
                            <a
                                href={`/carreras/${carrera.id}/plan`}
                                title="Descargar plan de estudio"
                            >
                                Plan
                            </a>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p>
                Mostrando {carreras.from ?? 0} a {carreras.to ?? 0}
                {' '}de {carreras.total} carreras
            </p>
            <div>
                {carreras.prev_page_url && (
                    <button
                        type="button"
                        onClick={() =>
                            router.get(carreras.prev_page_url!)
                        }
                    >
                        Anterior
                    </button>
                )}

                <span>
                    Página {carreras.current_page} de {carreras.last_page}
                </span>

                {carreras.next_page_url && (
                    <button
                        type="button"
                        onClick={() =>
                            router.get(carreras.next_page_url!)
                        }
                    >
                        Siguiente
                    </button>
                )}
            </div>
        </div>
    );
}