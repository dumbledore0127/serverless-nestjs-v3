import { Controller, Injectable } from "@nestjs/common";
import { GetMeResponse, GetMeRoute } from "src/generated/user";

@Controller()
@Injectable()
export class GetMeUseCase {
  @GetMeRoute()
  async execute(): Promise<GetMeResponse> {
    return {
      userId: "XXXX",
    };
  }
}
