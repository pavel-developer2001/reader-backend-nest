import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}
  async create(registerUserDto: RegisterUserDto) {
    const findUser = await this.repository.findOne({
      where: { email: registerUserDto.email },
    });
    if (findUser) {
      throw new HttpException(
        'Пользователь с таким email уже создан',
        HttpStatus.FORBIDDEN,
      );
    }
    const hashPassword = await bcrypt.hash(registerUserDto.password, 5);
    const user = await this.repository.save({
      name: registerUserDto.name,
      email: registerUserDto.email,
      password: hashPassword,
    });
    const { password, ...userData } = user;
    return userData;
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    try {
      const user = await this.repository.findOne({
        where: { id },
      });
      if (!user) {
        throw new HttpException(
          'Пользователь с таким id не найден',
          HttpStatus.NOT_FOUND,
        );
      }

      return { name: user.name, email: user.email };
    } catch (error) {
      console.error(error);
    }
  }
  async findById(id: number) {
    try {
      const user = await this.repository.findOne(id);
      return user;
    } catch (error) {
      console.error(error);
    }
  }
  async findUser(loginUserDto: LoginUserDto) {
    const user = await this.repository.findOne({
      where: { email: loginUserDto.email },
    });
    if (!user) {
      throw new HttpException(
        'Пользователь с таким email не найден!',
        HttpStatus.NOT_FOUND,
      );
    }
    const isMatch = await bcrypt.compare(loginUserDto.password, user.password);
    if (!isMatch) {
      throw new HttpException('Неверный пароль', HttpStatus.FORBIDDEN);
    }
    return user;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  getUser(id: string) {
    return this.repository.findOne({ where: { id } });
  }
}
