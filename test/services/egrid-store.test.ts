import { EgridModel } from "@/database/egrid-model";
import { addEgridRecord, doesRecordExist, getEgridRecordByKey } from "@/services/egrid-store";
import { AppError } from "@/utils/errors";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { MOCK_EGRID_RECORD } from "../mocks/egrid-mocks";
import connectDB from "@/database/db";
import { mocked } from "jest-mock";
import { EgridLocation } from "@/schema/egrid";

jest.mock("@/database/db");
const mockedConnectDB = mocked(connectDB);
mockedConnectDB.mockResolvedValue(undefined);

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterEach(async () => {
  await EgridModel.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("addEgridRecord", () => {
  it("saves a new record", async () => {
    await expect(addEgridRecord(MOCK_EGRID_RECORD)).resolves.toBeUndefined();

    const found = await EgridModel.findOne(MOCK_EGRID_RECORD);

    expect(mockedConnectDB).toHaveBeenCalled();
    expect(found).toMatchObject(MOCK_EGRID_RECORD);
  });

  it("replaces an existing record", async () => {
    await EgridModel.create(MOCK_EGRID_RECORD);

    const updatedRecord = { ...MOCK_EGRID_RECORD, location: EgridLocation.enum.AKGD };
    await expect(addEgridRecord(updatedRecord)).resolves.toBeUndefined();

    const found = await EgridModel.findOne(updatedRecord);

    expect(found).toMatchObject(updatedRecord);
  });

  it("rejects if error occurs", async () => {
    await mongoose.disconnect();
    await expect(addEgridRecord(MOCK_EGRID_RECORD)).rejects.toBeInstanceOf(AppError);
    await mongoose.connect(mongoServer.getUri());
  });
});

describe("getEgridRecordByKey", () => {
  it("returns a record if found", async () => {
    await EgridModel.create(MOCK_EGRID_RECORD);

    await expect(getEgridRecordByKey(2022, "US")).resolves.toMatchObject(MOCK_EGRID_RECORD);
    expect(mockedConnectDB).toHaveBeenCalled();
  });

  it("rejects if no record is found", async () => {
    await expect(getEgridRecordByKey(2022, "US")).rejects.toBeInstanceOf(AppError);
  });

  it("rejects if error occurs", async () => {
    await mongoose.disconnect();
    await expect(getEgridRecordByKey(2022, "US")).rejects.toBeInstanceOf(AppError);
    await mongoose.connect(mongoServer.getUri());
  });
});

describe("doesRecordExist", () => {
  it("returns true if record exists", async () => {
    await EgridModel.create(MOCK_EGRID_RECORD);

    await expect(doesRecordExist(2022, "US")).resolves.toBe(true);
    expect(mockedConnectDB).toHaveBeenCalled();
  });

  it("returns false if no record is found", async () => {
    await expect(doesRecordExist(2022, "US")).resolves.toBe(false);
  });

  it("rejects if error occurs", async () => {
    await mongoose.disconnect();
    await expect(doesRecordExist(2022, "US")).rejects.toBeInstanceOf(AppError);
    await mongoose.connect(mongoServer.getUri());
  });
});
