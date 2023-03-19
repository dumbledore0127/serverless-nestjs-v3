import { Controller, Delete, Injectable, Logger, Param } from "@nestjs/common";

@Controller()
@Injectable()
export class DeleteTaskUseCase {
  private readonly logger = new Logger(DeleteTaskUseCase.name);

  @Delete("/tasks/:taskId")
  async execute(@Param() taskId: string): Promise<void> {
    this.logger.log({ taskId });
  }
}
