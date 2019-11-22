import { Injectable } from '@nestjs/common';
import { Todo } from 'src/todo';

@Injectable()
export class TodosService {
    private readonly todos = new Map<number, Todo>();
    private nextId = 1;

    public add(todo: Todo, client: string) {
        todo.id = this.nextId++;
        this.update(todo, client);
    }

    public update(todo: Todo, client: string) {
        this.todos.set(todo.id, todo);
    }

    public delete(id: number, client: string): void {
        this.todos.delete(id);
    }

    public get(id: number, client: string): Todo {
        return this.todos.get(id);
    }

    public getAll(client: string): Todo[] {
        return Array.from(this.todos.values());
    }
}
