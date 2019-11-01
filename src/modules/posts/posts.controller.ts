import { Controller, Get, Req, Query, Headers, Param, Post, Body, HttpException, HttpStatus, ForbiddenException, UseFilters, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { CreatePostDto } from './post.dto';
import { DemoService } from './providers/demo/demo.service';
import { DemoFilter } from '../../core/filters/demo.filter';

@Controller('posts')
export class PostsController {
    constructor( private readonly demoService: DemoService) {
        this.demoService = demoService;
    }
    @Get()
    index() {
      return this.demoService.findAll();
    }
    @Get(':id')
    show(@Param('id',ParseIntPipe) id) {
      console.log(typeof id)
        return {
            title: `posts ${id}`
        }
    }
    @Post()
    // @UseFilters(DemoFilter)
    @UsePipes(ValidationPipe)
    store(@Body() post: CreatePostDto) {
      //  create exception
      //throw new HttpException("没有权限", HttpStatus.FORBIDDEN);
      //throw new ForbiddenException("没有权限");
      this.demoService.create(post);
    }
}
