import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { ApiExceptionFilter } from "./core/api-exception-filter";
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
export class AppModule {}
