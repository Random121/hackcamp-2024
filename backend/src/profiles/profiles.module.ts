import { Module } from '@nestjs/common';
import { ProfilesController } from 'src/profiles/profiles.controller';

@Module({
    controllers: [ProfilesController],
})
export class ProfilesModule {}
