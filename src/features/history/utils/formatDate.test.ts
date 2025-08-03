import { formatDate } from "./formatDate";

describe("formatDate", () => {
  it("하이픈을 점으로 변환해야 한다", () => {
    expect(formatDate("2025-03-04")).toBe("2025.03.04");
  });

  it("하이픈 없이 8자리 숫자일 경우 점을 추가한 날짜로 변환해야 한다", () => {
    expect(formatDate("20250304")).toBe("2025.03.04");
  });

  it("이미 점으로 포맷된 문자열은 그대로 반환해야 한다", () => {
    expect(formatDate("2025.03.04")).toBe("2025.03.04");
  });

  it("빈 문자열은 그대로 반환해야 한다", () => {
    expect(formatDate("")).toBe("");
  });

  it("잘못된 길이의 문자열은 그대로 반환해야 한다", () => {
    expect(formatDate("202503")).toBe("202503");
    expect(formatDate("abcd-ef-gh")).toBe("abcd.ef.gh");
  });
});
