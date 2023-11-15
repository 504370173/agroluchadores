import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from './database/database.config';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { SuppliesModule } from './supplies/supplies.module';
import { ToolsModule } from './tools/tools.module';
import { ClientsModule } from './clients/clients.module';
// import { SeasonsModule } from './seasons/seasons.module';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true, expandVariables: true,
  }),
  TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    ProductsModule,
    AuthModule,
    OrdersModule,
    ProductsModule,
    CategoriesModule,
    SuppliersModule,
    SuppliesModule,
    ToolsModule,
    ClientsModule
    // SeasonsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  static port: number;
  constructor(private readonly configService: ConfigService) {
    AppModule.port = +this.configService.get("PORT");
  }
}
