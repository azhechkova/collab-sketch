import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Room } from './entities/room.entity';
import { Model, Types } from 'mongoose';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room.name) private readonly roomModel: Model<Room>,
  ) {}

  async create(createRoomDto?: CreateRoomDto) {
    const newRoom = new this.roomModel(createRoomDto);

    await newRoom.save();
    return newRoom;
  }

  async findAll() {
    return await this.roomModel.find();
  }

  async findOne(id: Types.ObjectId | string) {
    return await this.roomModel.findById(id);
  }

  async update(id: Types.ObjectId | string, updateRoomDto: UpdateRoomDto) {
    return await this.roomModel.findByIdAndUpdate(id, updateRoomDto, {
      new: true,
    });
  }

  async remove(id: Types.ObjectId | string) {
    return await this.roomModel.findByIdAndRemove(id);
  }
}
