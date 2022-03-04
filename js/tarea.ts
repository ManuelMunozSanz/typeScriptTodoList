
export class Tarea {
    private _nombre : string;
    private _descripcion : string;
    private _estado : number;
    private _prioridad : number;

    constructor(nombre : string, descripcion : string, estado : number,prioridad : number) {
      this._nombre = nombre;
      this._descripcion = descripcion;
      this._estado = estado;
      this._prioridad = prioridad;

    }

    get nombre():string{
      return this._nombre;
    }

    set nombre(nombre:string){ 
      this._nombre = nombre; 
    }

    get descripcion() { 
      return this._descripcion; 
    }
    set descripcion(descripcion) { 
      this._descripcion = descripcion; 
    }

    get estado() { 
      return this._estado; 
    }

    set estado(estado) { 
      this._estado = estado; 
    }

    get prioridad() { 
      return this._prioridad; 
    }
    set prioridad(prioridad) { 
      this._prioridad = prioridad; 
    }


}
