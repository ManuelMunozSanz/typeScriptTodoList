
export class Tarea {
    _nombre;
    _descripcion;
    _estado;
    _prioridad;
    constructor(nombre, descripcion,estado,prioridad) {
      this._nombre = nombre;
      this._descripcion = descripcion;
      this._estado = estado;
      this._prioridad = prioridad;

    }

    get nombre() { return this._nombre; }
    set nombre(nombre) { this._nombre = nombre; }

    get descripcion() { return this._descripcion; }
    set descripcion(descripcion) { this._descripcion = descripcion; }

    get estado() { return this._estado; }
    set estado(estado) { this._estado = estado; }

    get prioridad() { return this._prioridad; }
    set prioridad(prioridad) { this._prioridad = prioridad; }


}
