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
  constructor(private readonly todosService: TodosService) {
  }

  @Get()
  getAll(@Req() request): Todo[] {
    return this.todosService.getAll(request.user.sub);
  }

  @Get(':id')
  get(@Param('id') id: string, @Req() request): Todo {
    const todo = this.todosService.get(request.user.sub, +id);
    if (!todo) {
      throw new NotFoundException();
    }

    return todo;
  }

  @Post()
  add(@Body() todo: Todo, @Req() request): Todo {
    this.todosService.add(request.user.sub, todo);
    return todo;
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(@Param('id') id: string, @Body() todo: Todo, @Req() request): void {
    todo.id = +id;
    this.todosService.update(request.user.sub, todo);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string, @Req() request): void {
    this.todosService.delete(request.user.sub, +id);
  }
}
