import { AvertRecord, AvertRecordData, AvertRecordKey } from "@/schema/avert";

export const MOCK_AVERT_RECORD_KEY: AvertRecordKey = {
  year: 2020,
  location: "US",
  powerPlantClass: "OnshoreWind",
};

export const MOCK_AVERT_RECORD_DATA: AvertRecordData = {
  avoidedCo2EmissionRateLbMwh: 100.5,
  avoidedNoxEmissionRateLbMwh: 10.2,
  avoidedSo2EmissionRateLbMwh: 5.1,
  avoidedPm2_5EmissionRateLbMwh: 2.3,
  avoidedVocEmissionRateLbMwh: 1.1,
  avoidedNh3EmissionRateLbMwh: 0.9,
  capacityFactorPercent: 80,
};

export const MOCK_AVERT_RECORD: AvertRecord = {
  ...MOCK_AVERT_RECORD_KEY,
  ...MOCK_AVERT_RECORD_DATA,
};
