import { Module } from "@nestjs/common";
import { TaskModule } from "./task";
import { UserModule } from "./user";

@Module({
  imports: [TaskModule, UserModule],
})
export class AppModule {}
