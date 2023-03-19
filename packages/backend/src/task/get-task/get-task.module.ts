import { Module } from "@nestjs/common";
import { GetTaskUseCase } from "./get-task.use-case";

@Module({
  controllers: [GetTaskUseCase],
  providers: [GetTaskUseCase],
  exports: [GetTaskUseCase],
})
export class GetTaskModule {}
