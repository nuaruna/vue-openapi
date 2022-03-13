import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateApiBlockDto, GetApiBlockDto } from './dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAll(): Promise<GetApiBlockDto[]> {
    return this.appService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<GetApiBlockDto> {
    return this.appService.getOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createOne(@Body() createDto: CreateApiBlockDto): Promise<GetApiBlockDto> {
    return this.appService.createOne(createDto);
  }
}
