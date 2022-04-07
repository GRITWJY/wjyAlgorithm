/*
 * 算法求next数组模板
 *
 * 1、 最大回文前缀
 * 2、 从t中找到子串s。
 * */

function KMP_NEXT(str) {
  let next = new Array(str.length).fill(0);
  let len = 0;
  let i = 1;
  while (i < str.length) {
    if (str[i] === str[len]) {
      len++;
      next[i] = len;
      i++;
    } else {
      if (len === 0) {
        next[i] = 0;
        i++;
      } else {
        len = next[len - 1];
      }
    }
  }
  return next;
}

/**
 * 例题1：最短回文字符串
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
  const maxLen = next[str.length - 1];
  const add = s.substring(maxLen).split("").reverse().join("");
  return add + s;
};
// console.log(shortestPalindrome("abcd"));

/**
 * 例题2
 * 重复的子字符串
 * 这个也是一个KMP的题目，我们看下重复的字符串生成的前缀数组的情况,同上一题一样，只看最后一个数据
 * abab: 2 ab
 * ababab: 4 ababab
 * abababab: 6 ababab
 * 发现没有？如果我用字符串的长度 - 最后一个，最后剩下的都是那个重复的字符
 *
 *
 * */

var repeatedSubstringPattern = function (s) {
  const next = KMP_NEXT(s);
  let len = s.length;

  if (next[next.length - 1] !== 0 && len % (len - next[next.length - 1]) === 0)
    return true;
  return false;
};

// console.log(repeatedSubstringPattern("abab"));
