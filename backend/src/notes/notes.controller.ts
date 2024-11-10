import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Query,
} from '@nestjs/common';
import { CreateNoteDto } from 'src/notes/create-note.dto';

@Controller('notes')
export class NotesController {
    @Post()
    create(@Body() createNoteDto: CreateNoteDto) {
        console.log(createNoteDto);
        return '12';
    }

    @Get('/near')
    getAllNearLocation(
        @Query('lattitude', ParseIntPipe) lattitude: number,
        @Query('longitude', ParseIntPipe) longitude: number,
    ) {
        return {
            route: 'near',
            lattitude: lattitude,
            longitude: longitude,
        };
    }

    @Post(':id/comments')
    createComment(@Param('id') id: number) {
        return {};
    }
}
