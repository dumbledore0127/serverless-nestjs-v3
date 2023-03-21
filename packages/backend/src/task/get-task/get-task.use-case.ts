import { Controller, Injectable, Logger, Param } from "@nestjs/common";
import {
  GetTaskParam,
  GetTaskResponse,
  GetTaskRoute,
} from "src/generated/task";

@Controller()
@Injectable()
export class GetTaskUseCase {
  private readonly logger = new Logger(GetTaskUseCase.name);

  @GetTaskRoute()
  async execute(@Param() param: GetTaskParam): Promise<GetTaskResponse> {
    this.logger.log({ param });

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
