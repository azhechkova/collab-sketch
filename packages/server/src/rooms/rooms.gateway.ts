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
import { DrawReq } from 'types';

@WebSocketGateway({ namespace: 'rooms', cors: true, transports: ['websocket'] })
export class RoomsGateway {
  constructor(private readonly roomsService: RoomsService) {}

  private connectedClients: Socket[] = [];

  afterInit() {
    console.log('CONNECTION ESTABLISHED');
  }

  handleConnection(client: Socket) {
    this.connectedClients.push(client);
  }

  handleDisconnect(client: Socket) {
    this.connectedClients = this.connectedClients.filter((c) => c !== client);
  }

  @SubscribeMessage('createRoom')
  async create(@MessageBody() createRoomDto?: CreateRoomDto) {
    const newRoom = await this.roomsService.create(createRoomDto);
    this.connectedClients.forEach((client) => {
      client.emit('createRoom', newRoom);
    });
    return newRoom;
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
  @SubscribeMessage('draw')
  draw(@MessageBody() draqReq: DrawReq) {
    this.connectedClients.forEach((client) => {
      client.emit('draw', draqReq);
    });
    return draqReq;
  }

  @SubscribeMessage('removeRoom')
  remove(@MessageBody() id: Types.ObjectId | string) {
    this.connectedClients.forEach((client) => {
      client.emit('removeRoom', id);
    });
    return this.roomsService.remove(id);
  }
}
