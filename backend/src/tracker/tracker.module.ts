import { Module } from '@nestjs/common';
import { TrackerGateway } from 'src/tracker/tracker.gateway';

@Module({
    providers: [TrackerGateway],
})
export class TrackerModule {}
