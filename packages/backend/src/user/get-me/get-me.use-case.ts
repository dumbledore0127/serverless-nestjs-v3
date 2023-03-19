import { Injectable, Controller, Get } from "@nestjs/common";
import { User } from "src/generated";

@Controller()
@Injectable()
export class GetMeUseCase {
  @Get("/me")
  async execute(): Promise<User> {
    return {
      userId: "XXXX",
    };
  }
}
