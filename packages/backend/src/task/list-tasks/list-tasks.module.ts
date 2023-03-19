import { Module } from "@nestjs/common";
import { ListTasksUseCase } from "./list-tasks.use-case";

@Module({
  controllers: [ListTasksUseCase],
  providers: [ListTasksUseCase],
  exports: [ListTasksUseCase],
})
export class ListTasksModule {}
