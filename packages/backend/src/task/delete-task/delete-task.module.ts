import { Module } from "@nestjs/common";
import { DeleteTaskUseCase } from "./delete-task.use-case";

@Module({
  controllers: [DeleteTaskUseCase],
  providers: [DeleteTaskUseCase],
  exports: [DeleteTaskUseCase],
})
export class DeleteTaskModule {}
