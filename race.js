/*
力扣6035题


这里我一开始用的是递归，即查找所有子序列。但很显然会超时

后来看下别人代码后，麻了，恍然大悟


这里用6个变量 0， 1， 01， 10， 101， 010
分别记录各自出现的个数
当碰到0
  0++ ，即有多少个0
  10 += 1，  加上前面有多少个1可以与这个0匹配的，就是10的个数
  010 += 01，  加上前面有多少个01可以与这个0匹配的

1的话同理

* */

var numberOfWays = function (s) {
  // js计算101和010的个数，遇到1加前面的10，遇到0加前面的01
  let zero = 0,
    one = 0,
    zeroOne = 0,
    oneZero = 0,
    zeroOneZero = 0,
    oneZeroOne = 0;
  for (const char of s) {
    if (char === "0") {
      // 遇到0
      zeroOneZero += zeroOne; // 遇到0加前面的01
      oneZero += one; // 遇到0的时候前面有几个1，就增加几个 10
      zero++;
    } else {
      // 遇到1
      oneZeroOne += oneZero; // 遇到1加前面的10
      zeroOne += zero; // 遇到1的时候前面有几个0，就增加几个 01
      one++;
    }
  }
  const ans = zeroOneZero + oneZeroOne;
  return ans;
};
