export const insertCSSStyleSheet = (
  stylesheet: string,
  parent: CSSStyleSheet
) => {
  parent.insertRule(stylesheet);
};
export const RemToPx = (number: number) => {
  const radio = Math.floor(window.screen.width / 19.2);
  return number * radio;
};
export function parseTime(time: Date | number, cFormat: string) {
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    if (("" + time).length === 10) time = parseInt("" + time) * 1000;
    date = new Date(time);
  }
  const formatObj: {
    [key: string]: number;
  } = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  return format.replace(
    /{(y|m|d|h|i|s|a)+}/g,
    (result: string, key: string) => {
      let value: string = formatObj[key] + "";
      if (key === "a")
        return ["一", "二", "三", "四", "五", "六", "日"][parseInt(value) - 1];
      if (result.length > 0 && parseInt(value) < 10) {
        value = "0" + value;
      }
      return value || 0 + "";
    }
  );
}
