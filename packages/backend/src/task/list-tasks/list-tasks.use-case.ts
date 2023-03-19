import { Controller, Get, Injectable, Logger, Query } from "@nestjs/common";
import { ListTasks200, ListTasksParams } from "src/generated";

@Controller()
@Injectable()
export class ListTasksUseCase {
  private readonly logger = new Logger(ListTasksUseCase.name);

  @Get("/tasks")
  async execute(@Query() query: ListTasksParams): Promise<ListTasks200> {
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
