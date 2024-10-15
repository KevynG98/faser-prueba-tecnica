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

  agregarTarea() {
    if (this.nuevaTarea.titulo && this.nuevaTarea.minutos) {
      this.tareas.push({ ...this.nuevaTarea, id: this.tareas.length + 1 });
      this.nuevaTarea.titulo = '';
      this.nuevaTarea.minutos = 0;
    }
  }
}
