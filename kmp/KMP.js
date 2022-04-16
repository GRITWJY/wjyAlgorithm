/*
 * 算法求next数组模板
 * 第0项是-1
 * */

let next;

function getNext(str) {
  next = new Array(str.length + 1).fill(0);
  let k = 0,
    j = -1;
  next[0] = -1;

  while (k != str.length) {
    if (j == -1 || str[j] === str[k]) {
      next[++k] = ++j;
    } else {
      j = next[j];
    }
  }
}

/*
 * 例题1： 模式串在待匹配串中出现的次数
 */

function getCount(a, b) {
  let i = 0,
    j = 0,
    ans = 0;
  while (i < a.length) {
    if (j == -1 || a[i] == a[j]) {
      ++i;
      ++j;
    } else {
      j = next[j];
    }

    if (j == b.length) {
      ++ans;
      j = next[j];
    }
  }
  return ans;
}

/*
 * 例题2： 不重叠子串个数
 */
function getCount2(a, b) {
  let i = 0,
    j = 0,
    ans = 0;
  while (i < a.length) {
    if (j == -1 || a[i] == a[j]) {
      ++i;
      ++j;
    } else {
      j = next[j];
    }

    if (j == b.length) {
      ++ans;
      j = next[j];
    }
  }
  return ans;
}

// 例题3：
// 一个字符串，在末尾最少添加多少个字符，可以让这个字符串获得重复循环序列

/**
 aaa  ->  0
 abca ->  2 bc
 abcde -> 5 abcde


 next数组的应用
 1、 若next[len] = 0 表示，没有重复部分，直接输出原长
 2、 若len %(len - next[len]) ==0 字符串本省就循环，输出0
 3、 len - next[len] - len%(len - next[len])
 */
function loopStr(str) {
  let cir = str.length - next[str.length];
  if (next[str.length] === 0) {
    console.log(str.length);
  } else if (str.length % cir == 0) {
    console.log(0);
  } else {
    console.log(cir - (str.length % cir));
  }
}

/*
* 例题4： 给出一个字符串，输出其所有循环节数大于1 的循环子串的长度和循环节数量
*
*
*  这里我们求出next数组后遍历原数组即可。
 假设遍历到元素第  i 个位置，那么我们就可以把前i个当成一个新的字符串，如果i % (i
 - next[i]) ==0的话，就说明这个字符串里有循环。 子串长度就是i， 节数就是
 i/(i-next[i])
* */

function loopInStr(str) {
  for (let i = 2; i <= str.length; i++) {
    if (next[i] && i % (i - next[i])) {
      console.log(`${i}  ${i / (i - next[i])}`);
    }
  }
}

// 例题5： 查找字符串中既是前缀又是后缀的子串长度
// 这个就很简单了，直接求出next数组，
// 然后next[len] 就是最长的相同前后缀
// 然后让j = next[len]。一直查找下去
function seekFame(str) {
  let i = 0,
    j = str.length;
  let ans = [];
  ans[i++] = str.length;
  while (next[j]) {
    ans[i++] = next[j];
    j = next[j];
  }
  console.log(asn[k].join(" "));
}

// 例题6： 求一个字符串的最小周期
function getPeriod(str) {
  let len = str.length;
  if (len % (len - nextArr[len]) == 0) {
    console.log(len - nextArr[len]);
  } else {
    console.log(len);
  }
}

/**
 * 例题7：最短回文字符串
 * 要求：给abab 前面添加一个字符串，使其为回文，且最短
 *
 * 最简单的就是翻转过来 baba 然后放在开头  babaabab但这有个问题，就不是最短，有重复的，这样，我们开始删除重复的字符
 * 第一次 改为bab bababab 发现此时依然可以是回文
 * 第二次 改为ba baabab   此时不行
 * 第三次 改为 b babab 发现，竟然可以了
 * 然后我们研究 aba发现这是源字符串的最长回文前缀，因为第二个回文前缀是a。那么我们再找几个其他例子看看
 * abcd: 最长回文前缀为a 结果为 dcb a bcd
 * aacecaaa: 最长回文前缀为 aaceaa, 结果为 a aaceaa a
 *
 * 那么如何求这个最长回文前缀呢？最容易想到的回文的方法可能是这样
 * aaceaaa # aaaceaa
 * 然后这里就与kmp中求next数组方法类似。
 * 我们看下面的距离，KMP的next数组是获取前缀表，即一个字符串的子串的前缀表/长度
 * 那这样是不是很明了了？最后一个数就是我们需要的回文字符串长度
 *
 *
 * 举例：abab#baba
 * 最后求出的数组是 0 0 1 2 0 0 1 2 3分别对应
 * a                    0
 * a b                  0
 * a b a                1 a
 * a b a b              2 ab
 * a b a b #            0
 * a b a b # b          0
 * a b a b # b a        1 a
 * a b a b # b a b      2 ab
 * a b a b # b a b a    3 aba
 *
 * 这样就可以求出 abab的最长最长回文前缀的长度了
 *
 *
 *
 *
 * */

const shortestPalindrome = (s) => {
  const rev_s = s.split("").reverse().join("");
  const str = s + "#" + rev_s;
  const next = KMP_NEXT(str);
  // 获取最长回文前缀
  const maxLen = next[str.length];
  // 源字符串截取需要添加的部分
  const add = s.substring(maxLen).split("").reverse().join("");
  return add + s;
};

function main() {
  // 例题1： 模式串在待匹配串中出现的次数
  let s = "ABCDEABCDEABABABBAABAB";
  let t = "AB";
  getNext(t);
  console.log(getCount(s, t));
}

main();
