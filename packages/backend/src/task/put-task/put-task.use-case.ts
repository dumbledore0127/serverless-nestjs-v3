import { Body, Controller, Injectable, Logger, Param } from "@nestjs/common";
import {
  PutTaskBody,
  PutTaskParam,
  PutTaskResponse,
  PutTaskRoute,
} from "src/generated/task";

@Controller()
@Injectable()
export class PutTaskUseCase {
  private readonly logger = new Logger(PutTaskUseCase.name);

  @PutTaskRoute()
  async execute(
    @Param() param: PutTaskParam,
    @Body() body: PutTaskBody
  ): Promise<PutTaskResponse> {
    this.logger.log({ param, body });

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
