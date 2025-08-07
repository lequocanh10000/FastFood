import { StringRequired } from "src/common/decorators";

export class CreateUserDto {
    @StringRequired('Tên người dùng')
    name: string;

    @StringRequired('Email')
    email: string;

    @StringRequired('Mật khẩu')
    password: string;
}