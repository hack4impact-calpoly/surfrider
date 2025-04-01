import { AvertModel } from "@/database/avert-model";
import { AppError } from "@/utils/errors";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { addAvertRecord, getAvertRecordByKey } from "../../src/services/avert-store";
import { MOCK_AVERT_RECORD } from "../mocks/avert-mocks";
import connectDB from "@/database/db";
import { mocked } from "jest-mock";

jest.mock("@/database/db");
const mockedConnectDB = mocked(connectDB);
mockedConnectDB.mockResolvedValue(undefined);

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterEach(async () => {
  await AvertModel.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("addAvertRecord", () => {
  it("saves a new record", async () => {
    await expect(addAvertRecord(MOCK_AVERT_RECORD)).resolves.toBeUndefined();

    const found = await AvertModel.findOne(MOCK_AVERT_RECORD);

    expect(found).toMatchObject(MOCK_AVERT_RECORD);
    expect(mockedConnectDB).toHaveBeenCalled();
  });

  it("replaces an existing record", async () => {
    const updatedRecord = { ...MOCK_AVERT_RECORD, avoidedCo2EmissionRateLbMwh: 200.0 };
    await AvertModel.create(MOCK_AVERT_RECORD);

    await expect(addAvertRecord(updatedRecord)).resolves.toBeUndefined();

    const found = await AvertModel.findOne(updatedRecord);

    expect(found).toMatchObject(updatedRecord);
  });

  it("rejects if error occurs", async () => {
    await mongoose.disconnect();
    await expect(addAvertRecord(MOCK_AVERT_RECORD)).rejects.toBeInstanceOf(AppError);
    await mongoose.connect(mongoServer.getUri());
  });
});

describe("getAvertRecordByKey", () => {
  it("returns a record if found", async () => {
    await AvertModel.create(MOCK_AVERT_RECORD);

    await expect(getAvertRecordByKey(2020, "US", "OnshoreWind")).resolves.toMatchObject(MOCK_AVERT_RECORD);
    expect(mockedConnectDB).toHaveBeenCalled();
  });

  it("rejects if no record is found", async () => {
    await expect(getAvertRecordByKey(2020, "US", "OnshoreWind")).rejects.toBeInstanceOf(AppError);
  });

  it("rejects if error occurs", async () => {
    await mongoose.disconnect();
    await expect(getAvertRecordByKey(2020, "US", "OnshoreWind")).rejects.toBeInstanceOf(AppError);
    await mongoose.connect(mongoServer.getUri());
  });
});
