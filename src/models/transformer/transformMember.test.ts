import { describe, expect, test } from "vitest";

import { getJapaneseFiscalYear } from "@/models/transformer/transformMember";

describe("transformMember", () => {
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
