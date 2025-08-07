import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/response.interceptors';
import { AllExceptionFilter } from './common/filters/all-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 5002;

  app.setGlobalPrefix('api/v1'); // Thiết lập tiền tố cho tất cả các route

  app.useGlobalPipes(
    new ValidationPipe({ 
      whitelist: true, // Xóa các field dư thừa trong payload(dto)
      forbidNonWhitelisted: true, // Báo lỗi dư thừa field không cần thiết trong payload
      transform: true, // Object -> chuyển payload thành instance của dto
      transformOptions: { enableImplicitConversion: true}, // transorm dữ liệu của field 
    }));
  
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AllExceptionFilter());


  // Swagger Setup
  const config = new DocumentBuilder()
    .setTitle('Fastfood Apis')
    .setDescription('Xây dựng APIs cho website bán đồ ăn nhanh')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, documentFactory());

  console.log(`Server starts on port ${port}`);
  await app.listen(port);
}
bootstrap();
