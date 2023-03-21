import { Controller, Injectable, Logger, Param } from "@nestjs/common";
import { DeleteTaskRoute, DeleteTaskParam } from "src/generated/task";

@Controller()
@Injectable()
export class DeleteTaskUseCase {
  private readonly logger = new Logger(DeleteTaskUseCase.name);

  @DeleteTaskRoute()
  async execute(@Param() param: DeleteTaskParam): Promise<void> {
    this.logger.log({ param });
  }
}
