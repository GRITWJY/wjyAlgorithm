#include <cstring>
#include <iostream>
#include <string>
using namespace std;

int nextArr[15];

void getNext(string &str) {
  memset(nextArr, 0, sizeof(nextArr));
  int k = 0, j = -1;
  nextArr[0] = -1;
  while (k != str.size()) {
    if (j == -1 || str[j] == str[k]) {
      nextArr[++k] = ++j;
    } else {
      j = nextArr[j];
    }
  }
}

// 模式串在待匹配串中出现的次数
int getCount(string &a, string &b) {
  int i = 0, j = 0, ans = 0;
  while (i < a.size()) {
    if (j == -1 || a[i] == b[j]) {
      ++i;
      ++j;
    } else {
      j = nextArr[j];
    }

    if (j == b.size()) {
      ++ans;
      j = nextArr[j];
    }
  }

  return ans;
}

// 不重叠子串个数。
int getCount2(string &a, string &b) {
  int i = 0, j = 0, ans = 0;
  while (i < a.size()) {
    if (j == -1 || a[i] == b[j]) {
      ++i;
      ++j;
    } else {
      j = nextArr[j];
    }

    if (j == b.size()) {
      ++ans;
      j = 0;
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

void loopStr(string &str) {
  int cir = str.size() - nextArr[str.size()];

  if (nextArr[str.size()] == 0)
    cout << str.size() << endl;
  else if (str.size() % cir == 0)
    cout << 0 << endl;
  else
    cout << cir - str.size() % cir << endl;
}

// 例题4： 给出一个字符串，输出其所有循环节数大于1 的循环子串的长度和循环节数量
/**
 这里我们求出next数组后遍历原数组即可。
 假设遍历到元素第  i 个位置，那么我们就可以把前i个当成一个新的字符串，如果i % (i
 - next[i]) ==0的话，就说明这个字符串里有循环。 子串长度就是i， 节数就是
 i/(i-next[i])
 */

void loopInStr(string &str) {
  for (int i = 2; i <= str.size(); i++) {
    if (nextArr[i] && i % (i - nextArr[i])) {
      cout << i << " " << i / (i - nextArr[i]) << endl;
    }
  }
}

// 例题5： 查找字符串中既是前缀又是后缀的子串长度
// 这个就很简单了，直接求出next数组，
// 然后next[len] 就是最长的相同前后缀
// 然后让j = next[len]。一直查找下去
void seekTheFame(string &str){
    int i=0, j = str.size();
    int ans[15];
    ans[i++]=str.size();
    while (nextArr[j]) {
        ans[i++] = nextArr[j];
        j=nextArr[j];
    }
    for(int k=i-1;k>=0;k--){
        cout<<ans[k]<<" ";
    }
}

// 例题6： 求一个字符串的最小周期
// kmp计算时，只需要判断是不是完全周期即可 即 len %(len - next[len]) ==0
void getPeriod(string &str){
    int len = str.size();
    if (len %(len-nextArr[len]) == 0) {
        cout<<len-nextArr[len]<<endl;
    } else {
        cout<<len<<endl;
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


string shortestPalindrome(string str){
    string rev = str;
    reverse(rev.begin(), rev.end());
    string new_s = str + "#" + rev;
    getNext(new_s);
    int maxLen = nextArr[new_s.length()];
    return rev.substr(0,str.length() - maxLen) + str;
    
}

int main() {

  string a = "aba";
  getNext(a);

  loopStr(a);

  return 0;
}
