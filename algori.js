/*
 * 求 a 和 b 相乘的值，a 和 b 可能是小数，需要注意结果的精度问题
 *
 * 先将小数用10的n次方转换成整数，乘完的结果在除以之前乘了多少个10
 * */

function multiply(a, b) {
  a = a.toString();
  b = b.toString();
  let aLen = a.substring(a.indexOf(".") + 1).length;
  let bLen = b.substring(b.indexOf(".") + 1).length;
  return (
    (a * Math.pow(10, aLen) * (b * Math.pow(10, bLen))) /
    Math.pow(10, aLen + bLen)
  );
}

console.log(multiply(0.0004, 0.004));
