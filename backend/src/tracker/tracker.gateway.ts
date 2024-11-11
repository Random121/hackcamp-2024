import { Inject } from '@nestjs/common';
import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { NotesService } from 'src/notes/notes.service';
import { UpdateLocationDto } from 'src/tracker/update-location.dto';

interface TrackerClientData {
    username: string;
    lattitude: number;
    longitude: number;
}

class TrackerClientSocket extends Socket<
    unknown,
    unknown,
    unknown,
    TrackerClientData
> {}

@WebSocketGateway({ cors: { origin: '*' } })
export class TrackerGateway {
    constructor(@Inject() private notesService: NotesService) {}

    @SubscribeMessage('updateLocation')
    async handleUpdateLocation(
        @ConnectedSocket() client: TrackerClientSocket,
        @MessageBody() location: UpdateLocationDto,
    ) {
        client.data.lattitude = location.lattitude;
        client.data.longitude = location.longitude;

        return this.notesService.getAllNearLocation(
            location.longitude,
            location.lattitude,
        );
    }
}
