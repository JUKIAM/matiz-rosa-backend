import { Categoria } from "src/categorias/entities/categoria.entity";

export class Producto {
    id: number;
    nombre: string;
    descripcion: string;
    disponibilidad: boolean;
    precio: number;
    categoria: Categoria;
    fechaCreacion: Date;
}
