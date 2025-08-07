import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private readonly userModel: typeof User,
        private readonly jwtService: JwtService,
    ) {}

    async findByEmail(email: string) {
        return this.userModel.findOne(
            { 
                where: {email},
                // raw: true
            }
        );
    }

    async register(createUserDto: CreateUserDto) {
        const user = await this.findByEmail(createUserDto.email);

        if(user) {
            throw new BadRequestException('Tài khoản đã tồn tại.');
        }

        const hashedPassword = bcrypt.hashSync(createUserDto.password, 10);
        const payload = {
            ...createUserDto,
            password: hashedPassword
        }

        await this.userModel.create(payload as any);

        return { message: 'Đăng ký thành công.'};
    }

    async validateUser(email: string, password: string) {
        const user = await this.findByEmail(email);

        if(!user) {
            throw new BadRequestException('Tài khoản chưa được đăng ký.');
        }

        const isCorrectPassword = user.comparePassword(password);
        if(!isCorrectPassword) {
            throw new BadRequestException('Mật khẩu không chính xác.');
        }
        const { password: _, ...rest} = user;

        
        return user;
    }
}
