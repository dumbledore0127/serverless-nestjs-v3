import { Controller, Get, Injectable, Logger, Param } from "@nestjs/common";
import { Task } from "src/generated";

@Controller()
@Injectable()
export class GetTaskUseCase {
  private readonly logger = new Logger(GetTaskUseCase.name);

  @Get("/tasks/:taskId")
  async execute(@Param("taskId") taskId: string): Promise<Task> {
    this.logger.log({ taskId });

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
