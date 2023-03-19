import { Module } from "@nestjs/common";
import { DeleteTaskModule } from "./delete-task";
import { GetTaskModule } from "./get-task";
import { ListTasksModule } from "./list-tasks";
import { PostTaskModule } from "./post-task";
import { PutTaskModule } from "./put-task";

@Module({
  imports: [
    DeleteTaskModule,
    GetTaskModule,
    ListTasksModule,
    PostTaskModule,
    PutTaskModule,
  ],
})
export class TaskModule {}
