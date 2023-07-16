import { describe, expect, test } from "vitest";

import {
  complementStatus,
  getJapaneseFiscalYear,
} from "@/models/transformer/transformMember";

describe("transformMember", () => {
  describe("complementStatus()", () => {
    test("2020年度入学で2024年度卒業で今が2021年度ならenrolled", () => {
      const result = complementStatus(2020, 2024, 2021);

      expect(result).toBe("enrolled");
    });

    test("2020年度入学で2024年度卒業で今が2030年度ならbachelor", () => {
      const result = complementStatus(2020, 2024, 2030);

      expect(result).toBe("bachelor");
    });

    test("2020年度入学で2026年度卒業で今が2030年度ならmaster", () => {
      const result = complementStatus(2020, 2026, 2030);

      expect(result).toBe("master");
    });

    test("2020年度入学で2029年度卒業で今が2030年度ならdoctor", () => {
      const result = complementStatus(2020, 2029, 2030);

      expect(result).toBe("doctor");
    });

    test("2020年度入学で2022年度卒業で今が2030年度ならwithdrawn", () => {
      const result = complementStatus(2020, 2022, 2030);

      expect(result).toBe("withdrawn");
    });
  });

  describe("getJapaneseFiscalYear()", () => {
    test("2019-03-31までは2018年度", () => {
      const date = new Date("2019-03-31");

      const result = getJapaneseFiscalYear(date);

      expect(result).toBe(2018);
    });

    test("2019-04-01からは2019年度", () => {
      const date = new Date("2019-04-01");

      const result = getJapaneseFiscalYear(date);

      expect(result).toBe(2019);
    });

    test("2023-12-31は2023年度", () => {
      const date = new Date("2023-12-31");

      const result = getJapaneseFiscalYear(date);

      expect(result).toBe(2023);
    });

    test("2024-01-01は2023年度", () => {
      const date = new Date("2024-01-01");

      const result = getJapaneseFiscalYear(date);

      expect(result).toBe(2023);
    });
  });
});
