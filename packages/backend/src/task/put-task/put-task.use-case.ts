import {
  Body,
  Controller,
  Injectable,
  Logger,
  Param,
  Put,
} from "@nestjs/common";
import { Task, TaskBody } from "src/generated";

@Controller()
@Injectable()
export class PutTaskUseCase {
  private readonly logger = new Logger(PutTaskUseCase.name);

  @Put("/tasks/:taskId")
  async execute(
    @Param() taskId: string,
    @Body() body: TaskBody
  ): Promise<Task> {
    this.logger.log({ taskId, body });

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
