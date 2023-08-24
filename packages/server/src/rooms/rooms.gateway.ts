import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Types } from 'mongoose';

@WebSocketGateway({ namespace: 'rooms', cors: true, transports: ['websocket'] })
export class RoomsGateway {
  constructor(private readonly roomsService: RoomsService) {}

  private connectedClients: Socket[] = [];

  afterInit() {
    console.log('CONNECTION CONNECTED');
  }

  handleConnection(client: Socket) {
    this.connectedClients.push(client);
    client.emit('findAllRooms', this.roomsService.findAll());
  }

  handleDisconnect(client: Socket) {
    this.connectedClients = this.connectedClients.filter((c) => c !== client);
  }

  @SubscribeMessage('createRoom')
  create(@MessageBody() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @SubscribeMessage('findAllRooms')
  findAll() {
    return this.roomsService.findAll();
  }

  @SubscribeMessage('findOneRoom')
  findOne(@MessageBody() id: Types.ObjectId | string) {
    return this.roomsService.findOne(id);
  }

  @SubscribeMessage('updateRoom')
  async update(@MessageBody() updateRoomDto: UpdateRoomDto) {
    const updatedRoom = await this.roomsService.update(
      updateRoomDto._id,
      updateRoomDto,
    );
    this.connectedClients.forEach((client) => {
      client.emit('updateRoom', updatedRoom);
    });

    return updatedRoom;
  }

  @SubscribeMessage('removeRoom')
  remove(@MessageBody() id: Types.ObjectId | string) {
    return this.roomsService.remove(id);
  }
}
