import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from '@authentication/authentication.module';
import { UserModule } from '@user/user.module';
import { ProductModule } from '@product/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'aligh1375??@',
      database: 'abac-test',
      entities: [`dist/**/*.entity{.ts,.js}`],
      autoLoadEntities: true,
      synchronize: true,
      logging: false,
    }),
    AuthenticationModule,
    UserModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
