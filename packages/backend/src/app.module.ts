import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { ApiExceptionFilter } from "./core/api-exception-filter";
import { openApiValidatorMiddleware } from "./core/openapi-validator-middleware";
import { TaskModule } from "./task";
import { UserModule } from "./user";

@Module({
  imports: [TaskModule, UserModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ApiExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(...openApiValidatorMiddleware()).forRoutes("*");
  }
}
