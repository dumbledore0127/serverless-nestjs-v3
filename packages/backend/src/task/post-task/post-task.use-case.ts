import { Body, Controller, Injectable, Logger } from "@nestjs/common";
import {
  PostTaskBody,
  PostTaskResponse,
  PostTaskRoute,
} from "src/generated/task";

@Controller()
@Injectable()
export class PostTaskUseCase {
  private readonly logger = new Logger(PostTaskUseCase.name);

  @PostTaskRoute()
  async execute(@Body() body: PostTaskBody): Promise<PostTaskResponse> {
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
