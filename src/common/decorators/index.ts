import { applyDecorators } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean, Min, Max } from "class-validator";

export const StringRequired = (name: string) => applyDecorators(
    ApiProperty({
        description: 'Tên danh mục',
        example: 'Pizza',
        type: String,
        required: true
    }),
    IsString({message: `${name} phải là chuỗi`}),
    IsNotEmpty({message: `${name} không được bỏ trống`})
);

export const StringNotRequired = applyDecorators(
    ApiProperty({ required: false}),
    IsString(),
    IsOptional()
);

export const NumberNotRequired = applyDecorators(
    ApiProperty({ required: true}),
    IsNumber(),
    IsOptional()
);

export const NumberRequired = ({min = 0, max, name} : {min?: number; max?: number, name: string}) => applyDecorators(
    ApiProperty({ required: false}),
    IsNumber(),
    IsNotEmpty({message: `${name} không được bỏ trống`}),
    Min(min),
    ... (max ? [Max(max)] : [])
);

export const BooleanNotRequired = applyDecorators(
    ApiProperty({ required: false}),
    IsNumber(),
    IsBoolean()
);