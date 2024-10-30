import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  
  public tarefa = "";
  public items: { text: string; completed: boolean }[] = []; // Inicia vazio
  public editIndex: number | null = null; // Índice do item sendo editado
  public editingItem: string = ""; // Valor temporário do item sendo editado
  public showCompleted: boolean = false; // Variável para controlar a exibição das tarefas concluídas

  ngOnInit() {
    this.loadTarefas(); // Carrega as tarefas ao inicializar o componente
  }

  addTarefa() {
    if (this.tarefa.trim()) { // Verifica se a tarefa não está vazia ou com espaços em branco  
      this.items.push({ text: this.tarefa, completed: false });
      this.tarefa = '';  
      this.saveTarefas(); // Salva a lista atualizada no Local Storage
    }
  }

  removeTarefa(item: any) {
    const index = this.items.indexOf(item);  // Obtém o índice do item
    if (index > -1) { // Verifica se o item foi encontrado
      this.items.splice(index, 1); // Remove o item pelo índice
      this.saveTarefas(); // Salva a lista atualizada no Local Storage
    }
  }

  editTarefa(index: number) {
    this.editIndex = index;
    this.editingItem = this.items[index].text; // Copia o valor do item para a variável temporária
    this.saveTarefas(); // Salva a lista atualizada no Local Storage
  }

  saveTarefa(index: number) {
    if (this.editingItem.trim()) { // Verifica se o valor editado não está vazio
      this.items[index].text = this.editingItem; // Atualiza o valor no array original
      this.editIndex = null;  // Fecha o modo de edição
      this.saveTarefas(); // Salva a lista atualizada no Local Storage
    }
  }

    // Método para salvar tarefas no Local Storage
    saveTarefas() {
      localStorage.setItem('tarefas', JSON.stringify(this.items));
    }
  
    loadTarefas() {
      const savedTarefas = localStorage.getItem('tarefas');
      if (savedTarefas) {
        this.items = JSON.parse(savedTarefas);
      }
    }
    
  // Método para obter as tarefas filtradas
  get filteredItems() {
    return this.items.filter(item => !this.showCompleted || item.completed);
  }

  toggleCompleted(item: any) {
    item.completed = !item.completed;
    this.saveTarefas(); // Salva a lista atualizada no Local Storage
  }
}