import { z } from "zod";

/**
 * Power plant classification
 */
export const PowerPlantClass = z.enum([
  "OnshoreWind",
  "OffshoreWind",
  "UtilityPV",
  "DistributedPV",
  "PortfolioEE",
  "UniformEE",
]);

export type PowerPlantClass = z.infer<typeof PowerPlantClass>;

/**
 * eGRID country, subregion, and state codes
 */
export const Location = z.enum([
  // Country
  "US",

  // Subregion
  "AKGD",
  "AKMS",
  "AZNM",
  "CAMX",
  "ERCT",
  "FRCC",
  "HIMS",
  "HIOA",
  "MROE",
  "MROW",
  "NEWE",
  "NWPP",
  "NYCW",
  "NYLI",
  "NYUP",
  "PRMS",
  "RFCE",
  "RFCM",
  "RFCW",
  "RMPA",
  "SPNO",
  "SPSO",
  "SRMV",
  "SRMW",
  "SRSO",
  "SRTV",
  "SRVC",

  // State
  "AK",
  "AL",
  "AR",
  "AZ",
  "CA",
  "CO",
  "CT",
  "DC",
  "DE",
  "FL",
  "GA",
  "HI",
  "IA",
  "ID",
  "IL",
  "IN",
  "KS",
  "KY",
  "LA",
  "MA",
  "MD",
  "ME",
  "MI",
  "MN",
  "MO",
  "MS",
  "MT",
  "NC",
  "ND",
  "NE",
  "NH",
  "NJ",
  "NM",
  "NV",
  "NY",
  "OH",
  "OK",
  "OR",
  "PA",
  "PR",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VA",
  "VT",
  "WA",
  "WI",
  "WV",
  "WY",
]);

export type Location = z.infer<typeof Location>;

/*
 * EgridRecord Schema
 */
export const EgridRecord = z.object({
  year: z.number().int().min(2000).max(2100), //years: 2000 - 2100
  location: Location,
});

export type EgridRecord = z.infer<typeof EgridRecord>;
