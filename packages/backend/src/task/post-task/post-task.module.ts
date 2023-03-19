import { Module } from "@nestjs/common";
import { PostTaskUseCase } from "./post-task.use-case";

@Module({
  controllers: [PostTaskUseCase],
  providers: [PostTaskUseCase],
  exports: [PostTaskUseCase],
})
export class PostTaskModule {}
