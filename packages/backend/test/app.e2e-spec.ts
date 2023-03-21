import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";

describe("結合テスト", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe("全般", () => {
    it("Not Found", async () => {
      await request(app.getHttpServer()).get("/").expect(404).expect({
        message: "not found",
      });
    });
  });

  describe("GET /me", () => {
    it("正常系", async () => {
      await request(app.getHttpServer()).get("/me").expect(200).expect({
        userId: "XXXX",
      });
    });
  });

  describe("GET /tasks", () => {
    it("正常系", async () => {
      await request(app.getHttpServer())
        .get("/tasks")
        .expect(200)
        .expect({
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
        });
    });

    it("クエリパラメータが使用されるとき", async () => {
      await request(app.getHttpServer())
        .get("/tasks")
        .query({ limit: 10 })
        .expect(200);
    });

    it("クエリパラメータの形式が不正のとき", async () => {
      await request(app.getHttpServer())
        .get("/tasks")
        .query({ limit: "abc" })
        .expect(400)
        .expect({
          message: "request/query/limit must be integer",
        });
    });

    it("未知のクエリパラメーター", async () => {
      await request(app.getHttpServer())
        .get("/tasks")
        .query({ limit: 10, xxxx: "abc" })
        .expect(400)
        .expect({
          message: "Unknown query parameter 'xxxx'",
        });
    });
  });

  describe("POST /tasks", () => {
    it("正常系", async () => {
      await request(app.getHttpServer())
        .post("/tasks")
        .send({
          taskName: "XXXX",
          notification: true,
          taskStatus: "todo",
          estimatedTime: 120,
        })
        .expect(201)
        .expect({
          taskId: "XXXX",
          taskName: "XXXX",
          createdTime: "2022-03-17T00:00:00.000Z",
          notification: true,
          taskStatus: "todo",
          estimatedTime: 120,
        });
    });

    it("リクエストボディが空のとき", async () => {
      await request(app.getHttpServer()).post("/tasks").expect(415).expect({
        message: "unsupported media type undefined",
      });
    });

    it("リクエストボディの項目が不足のとき", async () => {
      await request(app.getHttpServer())
        .post("/tasks")
        .send({
          notification: true,
          taskStatus: "todo",
          estimatedTime: 120,
        })
        .expect(400)
        .expect({
          message: "request/body must have required property 'taskName'",
        });
    });

    it("リクエストボディの型が不足のとき", async () => {
      await request(app.getHttpServer())
        .post("/tasks")
        .send({
          taskName: 123,
          notification: true,
          taskStatus: "todo",
          estimatedTime: 120,
        })
        .expect(400)
        .expect({
          message: "request/body/taskName must be string",
        });
    });

    it("リクエストボディの値が不足のとき", async () => {
      await request(app.getHttpServer())
        .post("/tasks")
        .send({
          taskName:
            "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          notification: true,
          taskStatus: "todo",
          estimatedTime: 120,
        })
        .expect(400)
        .expect({
          message:
            "request/body/taskName must NOT have more than 256 characters",
        });
    });
  });

  describe("GET /tasks/:taskId", () => {
    it("正常系", async () => {
      await request(app.getHttpServer()).get("/tasks/XXXX").expect(200).expect({
        taskId: "XXXX",
        taskName: "XXXX",
        createdTime: "2022-03-17T00:00:00.000Z",
        notification: true,
        taskStatus: "todo",
        estimatedTime: 120,
      });
    });
  });

  describe("PUT /tasks/:taskId", () => {
    it("正常系", async () => {
      await request(app.getHttpServer())
        .put("/tasks/XXXX")
        .send({
          taskName: "XXXX",
          notification: true,
          taskStatus: "todo",
          estimatedTime: 120,
        })
        .expect(200)
        .expect({
          taskId: "XXXX",
          taskName: "XXXX",
          createdTime: "2022-03-17T00:00:00.000Z",
          notification: true,
          taskStatus: "todo",
          estimatedTime: 120,
        });
    });

    it("リクエストボディが不足のとき", async () => {
      await request(app.getHttpServer())
        .put("/tasks/XXXX")
        .send({
          notification: true,
          taskStatus: "todo",
          estimatedTime: 120,
        })
        .expect(400)
        .expect({
          message: "request/body must have required property 'taskName'",
        });
    });

    it("リクエストボディの型が不足のとき", async () => {
      await request(app.getHttpServer())
        .put("/tasks/XXXX")
        .send({
          taskName: 123,
          notification: true,
          taskStatus: "todo",
          estimatedTime: 120,
        })
        .expect(400)
        .expect({
          message: "request/body/taskName must be string",
        });
    });

    it("リクエストボディの値が不足のとき", async () => {
      await request(app.getHttpServer())
        .put("/tasks/XXXX")
        .send({
          taskName:
            "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          notification: true,
          taskStatus: "todo",
          estimatedTime: 120,
        })
        .expect(400)
        .expect({
          message:
            "request/body/taskName must NOT have more than 256 characters",
        });
    });
  });

  describe("DELETE /tasks/:taskId", () => {
    it("正常系", async () => {
      await request(app.getHttpServer()).delete("/tasks/XXXX").expect(200);
    });
  });
});
