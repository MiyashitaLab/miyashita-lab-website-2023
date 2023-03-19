import { describe, expect, test } from "vitest";

import { paginateWithFrame, sequenceNumber } from "./paginateWithFrame";

describe("/components/ui/paginationNav/paginateWithFrame", () => {
  describe("paginateWithFrame()", () => {
    test("省略が2つになるパターン", () => {
      expect(
        paginateWithFrame({
          firstPage: 1,
          lastPage: 10,
          currentPage: 5,
          halfFrameSize: 3,
        })
      ).toEqual([1, "...", 4, 5, 6, "...", 10]);

      expect(
        paginateWithFrame({
          firstPage: 3,
          lastPage: 27,
          currentPage: 14,
          halfFrameSize: 4,
        })
      ).toEqual([3, "...", 12, 13, 14, 15, 16, "...", 27]);

      expect(
        paginateWithFrame({
          firstPage: 3,
          lastPage: 27,
          currentPage: 14,
          halfFrameSize: 4,
        })
      ).toEqual([3, "...", 12, 13, 14, 15, 16, "...", 27]);
    });

    test("省略がfirst側1つになるパターン", () => {
      expect(
        paginateWithFrame({
          firstPage: 1,
          lastPage: 10,
          currentPage: 9,
          halfFrameSize: 3,
        })
      ).toEqual([1, "...", 6, 7, 8, 9, 10]);
    });

    test("省略がlast側1つになるパターン", () => {
      expect(
        paginateWithFrame({
          firstPage: 1,
          lastPage: 10,
          currentPage: 3,
          halfFrameSize: 3,
        })
      ).toEqual([1, 2, 3, 4, 5, "...", 10]);
    });

    test("全てのページが表示されるパターン", () => {
      expect(
        paginateWithFrame({
          firstPage: 1,
          lastPage: 9,
          currentPage: 5,
          halfFrameSize: 4,
        })
      ).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);

      expect(
        paginateWithFrame({
          firstPage: 1,
          lastPage: 5,
          currentPage: 2,
          halfFrameSize: 4,
        })
      ).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe("sequenceNumber()", () => {
    test("一般的な入力", () => {
      expect(sequenceNumber(1, 10)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });
  });
});
