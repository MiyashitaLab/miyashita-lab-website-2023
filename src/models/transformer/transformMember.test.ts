import { describe, expect, test } from "vitest";

import {
  calcEnrolledSchoolYear,
  complementStatus,
  getJapaneseFiscalYear,
} from "@/models/transformer/transformMember";

describe("transformMember", () => {
  describe("calcEnrolledSchoolYear()", () => {
    test("2020年度入学で今が2020年度ならB1", () => {
      const result = calcEnrolledSchoolYear(2020, 2020);
      expect(result).toBe("B1");
    });

    test("2019年度入学で今が2020年度ならB2", () => {
      const result = calcEnrolledSchoolYear(2019, 2020);
      expect(result).toBe("B2");
    });

    test("2018年度入学で今が2020年度ならB3", () => {
      const result = calcEnrolledSchoolYear(2018, 2020);
      expect(result).toBe("B3");
    });

    test("2017年度入学で今が2020年度ならB4", () => {
      const result = calcEnrolledSchoolYear(2017, 2020);
      expect(result).toBe("B4");
    });

    test("2016年度入学で今が2020年度ならM1", () => {
      const result = calcEnrolledSchoolYear(2016, 2020);
      expect(result).toBe("M1");
    });

    test("2015年度入学で今が2020年度ならM2", () => {
      const result = calcEnrolledSchoolYear(2015, 2020);
      expect(result).toBe("M2");
    });

    test("2014年度入学で今が2020年度ならD1", () => {
      const result = calcEnrolledSchoolYear(2014, 2020);
      expect(result).toBe("D1");
    });

    test("2013年度入学で今が2020年度ならD2", () => {
      const result = calcEnrolledSchoolYear(2013, 2020);
      expect(result).toBe("D2");
    });

    test("2012年度入学で今が2020年度ならD3", () => {
      const result = calcEnrolledSchoolYear(2012, 2020);
      expect(result).toBe("D3");
    });

    test("2011年度入学で今が2020年度ならunknown", () => {
      const result = calcEnrolledSchoolYear(2011, 2020);
      expect(result).toBe("unknown");
    });

    test("2020年度入学で今が2019年度ならunknown", () => {
      const result = calcEnrolledSchoolYear(2020, 2019);
      expect(result).toBe("unknown");
    });
  });

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
