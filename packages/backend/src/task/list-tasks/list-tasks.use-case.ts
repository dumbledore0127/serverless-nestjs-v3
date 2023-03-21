import { Controller, Injectable, Logger, Query } from "@nestjs/common";
import {
  ListTasksQuery,
  ListTasksResponse,
  ListTasksRoute,
} from "src/generated/task";

@Controller()
@Injectable()
export class ListTasksUseCase {
  private readonly logger = new Logger(ListTasksUseCase.name);

  @ListTasksRoute()
  async execute(@Query() query: ListTasksQuery): Promise<ListTasksResponse> {
    this.logger.log({ query });

    return {
      items: [
        {
          taskId: "XXXX",
          taskName: "XXXX",
          createdTime: "2022-03-17T00:00:00.000Z",
          notification: true,
          taskStatus: "todo",
          estimatedTime: 120,
        },
      ],
    };
  }
}
