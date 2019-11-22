import { TodosService } from './todos.service';
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
  Req,
} from '@nestjs/common';

@Controller('todos')
export class TodosController {
  private logger = new Logger('TodosController');

  constructor(private readonly todosService: TodosService) {
  }

  @Get()
  getAll(@Req() request): Todo[] {
    const todos = this.todosService.getAll(request.user.sub);
    this.logger.debug(`${todos.length} todos returned`);
    return todos;
  }

  @Get(':id')
  get(@Param('id') id: string, @Req() request): Todo {
    const todo = this.todosService.get(+id, request.user.sub);
    if (!todo) {
      throw new NotFoundException();
    }

    return todo;
  }

  @Post()
  add(@Body() todo: Todo, @Req() request): Todo {
    this.todosService.add(todo, request.user.sub);
    return todo;
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(@Param('id') id: string, @Body() todo: Todo, @Req() request): void {
    todo.id = +id;
    this.todosService.update(todo, request.user.sub);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string, @Req() request): void {
    this.todosService.delete(+id, request.user.sub);
  }
}
