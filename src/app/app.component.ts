import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Tarea } from './tarea';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	tareas: Tarea[];

	constructor(
        public service: AppService,
	) { }

	ngOnInit() {
		this.obtenerTareas();
	}

	async obtenerTareas() {
		this.tareas = await this.service.obtenerTareas();
	}

  nuevaTarea = {
    titulo: '',
    minutos: 0
  }

  //metodo para agregar una tarea
  agregarTarea() {
    if (this.nuevaTarea.titulo && this.nuevaTarea.minutos) {
      this.tareas.push({ ...this.nuevaTarea, id: this.tareas.length + 1, seleccionado: false });
      this.nuevaTarea.titulo = '';
      this.nuevaTarea.minutos = 0;
    }
  }

  //metodo para manejar elementos seleccionados
  eliminarTarea() {
    const seleccionados = this.tareas.filter(elemento => elemento.seleccionado);
    seleccionados.forEach(elemento => {
      this.tareas.splice(this.tareas.indexOf(elemento), 1);
    });
  }

  //metodo para ordenar
  sortBy: string = '';
  ascending: boolean = true;
  ordenarTareas(campo: string): void {
    if (this.sortBy === campo) {
      this.ascending = !this.ascending;
    } else {
      this.sortBy = campo;
      this.ascending = true;
    }
    this.tareas = this.tareas.sort((a, b) => {
      if (a[campo] > b[campo]) {
        return this.ascending ? 1 : -1;
      }
      if (a[campo] < b[campo]) {
        return this.ascending ? -1 : 1;
      }
      return 0;
    });

  }
}
