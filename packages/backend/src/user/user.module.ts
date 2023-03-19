import { Module } from "@nestjs/common";
import { GetMeModule } from "./get-me";

@Module({
  imports: [GetMeModule],
})
export class UserModule {}
