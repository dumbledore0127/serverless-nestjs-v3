import { Module } from "@nestjs/common";
import { PutTaskUseCase } from "./put-task.use-case";

@Module({
  controllers: [PutTaskUseCase],
  providers: [PutTaskUseCase],
  exports: [PutTaskUseCase],
})
export class PutTaskModule {}
