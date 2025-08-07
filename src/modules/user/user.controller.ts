import { Body, Controller, Post,} from '@nestjs/common';
import { UserService } from './user.service';
import { register } from 'module';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register') 
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.userService.register(createUserDto);
  }
}
