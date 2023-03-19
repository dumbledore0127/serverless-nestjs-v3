import { Body, Controller, Injectable, Logger, Post } from "@nestjs/common";
import { Task, TaskBody } from "src/generated";

@Controller()
@Injectable()
export class PostTaskUseCase {
  private readonly logger = new Logger(PostTaskUseCase.name);

  @Post("/tasks")
  async execute(@Body() body: TaskBody): Promise<Task> {
    this.logger.log({ body });

    return {
      taskId: "XXXX",
      taskName: "XXXX",
      createdTime: "2022-03-17T00:00:00.000Z",
      notification: true,
      taskStatus: "todo",
      estimatedTime: 120,
    };
  }
}
