import { applyDecorators } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean, Min, Max, IsEnum, ValidateNested, IsArray } from "class-validator";

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

export const NumberRequired = (name: string, min: number = 0, max?: number) => applyDecorators(
    ApiProperty({ required: false}),
    IsNumber(),
    IsNotEmpty({message: `${name} không được bỏ trống`}),
    Min(min),
    ... (max ? [Max(max)] : [])
);

export const BooleanNotRequired = applyDecorators(
    ApiProperty({ required: false}),
    IsOptional(),
    IsBoolean()
);

export const EnumRequired = (enumType: any, name: string) => applyDecorators(
    ApiProperty({required: true}),
    IsEnum(enumType),
    IsNotEmpty({message: `${name} không được bỏ trống`}),
)

export const ArrayNotRequired = (type: any) => applyDecorators (
    ApiProperty({required: false}),
    IsOptional(),
    IsArray(),
    ValidateNested({each: true}),
    Type(() => type),
)