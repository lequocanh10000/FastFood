import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { sequelizeConfig } from './config/sequelize.config';
import { UserModule } from './modules/user/user.module';
import { CategoryModule } from './modules/category/category.module';
import { StartTimingMiddleware } from './common/middlewares/start-timing.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { SeedModule } from './modules/seed/seed.module';
import { ProductModule } from './modules/product/product.module';

@Module( {
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    SequelizeModule.forRootAsync({ //custom
      inject: [ConfigService],
      useFactory: (configService: ConfigService): SequelizeModuleOptions =>
         sequelizeConfig(configService)
    }),
    UserModule,
    CategoryModule,
    AuthModule,
    JwtModule.registerAsync({
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
          },
        }),
        global: true,
    }),
    SeedModule,
    ProductModule,
  ],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
      consumer
      .apply(StartTimingMiddleware)
      .forRoutes({path: '*', method: RequestMethod.ALL});
  }
}
