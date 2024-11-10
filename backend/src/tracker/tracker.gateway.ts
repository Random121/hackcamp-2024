import { Logger } from '@nestjs/common';
import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
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
    @SubscribeMessage('updateLocation')
    handleUpdateLocation(
        @ConnectedSocket() client: TrackerClientSocket,
        @MessageBody() location: UpdateLocationDto,
    ) {
        client.data.lattitude = location.lattitude;
        client.data.longitude = location.longitude;

        Logger.log(
            `${client.data.username}: ${location.lattitude} ${location.longitude}`,
        );

        return location;
    }
}
