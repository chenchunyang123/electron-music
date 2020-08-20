/**
 * 小于10的数字在前面加0
 * @param {number | string} n 要转换的数
 * @return {string} 分钟数
 */
const addZero = (n: number | string): string => {
  return (+n < 10 ? '0' : '') + n;
};
/**
 * 将毫秒数转换为分钟数
 * @param {number} sec 毫秒数
 * @return {string} 分钟数
 */
export const formatSecToMin = (sec: number): string => {
  sec = Math.floor(sec);
  const remainder = sec % 60;
  return addZero(Math.floor(sec / 60)) + ' : ' + addZero(remainder);
};
