export const validateEventName = (value: string): string => {
    if (value.trim() === "") {
      return "모임명을 입력해 주세요.";
    } else if (value.length > 50) {
      return "50글자 이내로 작성해주세요.";
    }
    return "";
  };
  