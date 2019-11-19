import { Todo } from './../todo';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  NotFoundException,
  Logger,
} from '@nestjs/common';

@Controller('todos')
export class TodosController {
  private readonly logger = new Logger('TodosController');
  private readonly todos = new Map<number, Todo>();
  private nextId = 1;

  @Get()
  getAll(): Todo[] {
    this.logger.debug(`${this.todos.size} todos returned`);
    return Array.from(this.todos.values());
  }

  @Get(':id')
  get(@Param('id') id: string): Todo {
    const todo = this.todos.get(+id);
    if (!todo) {
      throw new NotFoundException();
    }

    return todo;
  }

  @Post()
  add(@Body() todo: Todo): Todo {
    todo.id = this.nextId++;
    this.todos.set(todo.id, todo);
    return todo;
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(@Param('id') id: string, @Body() todo: Todo): void {
    this.todos.set(+id, todo);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string): void {
    this.todos.delete(+id);
  }
}
