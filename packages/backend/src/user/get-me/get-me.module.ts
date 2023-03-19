import { Module } from "@nestjs/common";
import { GetMeUseCase } from "./get-me.use-case";

@Module({
  controllers: [GetMeUseCase],
  providers: [GetMeUseCase],
  exports: [GetMeUseCase],
})
export class GetMeModule {}
