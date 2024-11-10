import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateProfileDto } from 'src/profiles/create-profile.dto';
import { EditProfileDto } from 'src/profiles/edit-profile.dto';

@Controller('profiles')
export class ProfilesController {
    @Get(':id')
    getProfileDetails(@Param('id') id: number) {
        return {};
    }

    @Post()
    create(@Body() createProfileDto: CreateProfileDto) {
        return {};
    }

    @Patch(':id')
    editProfile(@Body() editProfileDto: EditProfileDto) {
        return {};
    }
}
