import { Injectable } from '@nestjs/common';
import { Todo } from 'src/todo';

@Injectable()
export class TodosService {
    private readonly userTodos = new Map<string, Map<number, Todo>>();
    private nextId = 1;

    private getUserTodos(client: string): Map<number, Todo> {
        if (!this.userTodos.has(client)) {
            this.userTodos.set(client, new Map<number, Todo>());
        }
        return this.userTodos.get(client);
    }

    public add(todo: Todo, client: string) {
        todo.id = this.nextId++;
        this.update(todo, client);
    }

    public update(todo: Todo, client: string) {
        this.getUserTodos(client).set(todo.id, todo);
    }

    public delete(id: number, client: string): void {
        this.getUserTodos(client).delete(id);
    }

    public get(id: number, client: string): Todo {
        return this.getUserTodos(client).get(id);
    }

    public getAll(client: string): Todo[] {
        return Array.from(this.getUserTodos(client).values());
    }
}
