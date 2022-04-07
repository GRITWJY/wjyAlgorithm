/*
* 淘汰分数
*
* 链接：https://www.nowcoder.com/questionTerminal/9c4a4e879b4f49939dfaebea8948f976
来源：牛客网

某比赛已经进入了淘汰赛阶段,已知共有n名选手参与了此阶段比赛，他们的得分分别是a_1,a_2….a_n,小美作为比赛的裁判希望设定一个分数线m，使得所有分数大于m的选手晋级，其他人淘汰。

但是为了保护粉丝脆弱的心脏，小美希望晋级和淘汰的人数均在[x,y]之间。

显然这个m有可能是不存在的，也有可能存在多个m，如果不存在，请你输出-1，如果存在多个，请你输出符合条件的最低的分数线。

数据范围：1\le n \le 50000\1≤n≤50000 ，1 \le x \le y \le n\1≤x≤y≤n
进阶：时间复杂度O(nlogn)\O(nlogn) ，空间复杂度O(n)\O(n)

输入描述:
输入第一行仅包含三个正整数n,x,y，分别表示参赛的人数和晋级淘汰人数区间。(1<=n<=50000,1<=x,y<=n)

输入第二行包含n个整数，中间用空格隔开，表示从1号选手到n号选手的成绩。(1<=|a_i|<=1000)



输出描述:
输出仅包含一个整数，如果不存在这样的m，则输出-1，否则输出符合条件的最小的值。

示例1
输入
6 2 3
1 2 3 4 5 6
输出
3

*
* 此题主要的特点在排完序后怎么获取到对应下标的元素。
* 这里我们可以根据题目得知，如果2+3<6,那么必然是选3个元素的，所以就返回n-y-1的
* 但如果是x+y>=n，此时就说明可以取最少值，就直接返回x-1的下标元素
* */

/*
let [n,x,y] = readline().split(' ').map(item=>Number(item))

if(2*y<n) {
	print(-1)
} else {
	let arr = readline().split(' ').sort((a,b)=>{
		return Number(a) - Number(b)
	})
	if(x+y>=n){
		print(arr[x-1])
	} else {
		print(arr[n-y-1])
	}


}
*/

/*


链接：https://www.nowcoder.com/questionTerminal/0771ab500d424415af6b1aa4c13afcdd
来源：牛客网

我们称一个长度为n的序列为正则序列，当且仅当该序列是一个由1~n组成的排列，即该序列由n个正整数组成，取值在[1,n]范围，且不存在重复的数，同时正则序列不要求排序

有一天小团得到了一个长度为n的任意序列s，他需要在有限次操作内，将这个序列变成一个正则序列，每次操作他可以任选序列中的一个数字，并将该数字加一或者减一。

请问他最少用多少次操作可以把这个序列变成正则序列？
进阶：时间复杂度O(n) ，空间复杂度O(n)
输入描述:
输入第一行仅包含一个正整数n，表示任意序列的长度。(1<=n<=20000)
输入第二行包含n个整数，表示给出的序列，每个数的绝对值都小于10000。
输出描述:
输出仅包含一个整数，表示最少的操作数量。
示例1
输入
5
-1 2 3 10 100
输出
103

这一题，起始考察的事逻辑。主要目的就是把一组数组转成1~n的形式。
有人说用排序，排序后进行加减，但其实没必要，
排序相当于原来是要变成3，结果排序后它要变成5
但原来在5位置的数呢？如果它到3去了，不是相当于一个多加了2，一个多减了2，正好抵消了？


所以，这题的重点不在排序
我们只需要先把每个数到调到1~n内，这是必须要进行的，不管数在哪多大，最后绝对是在1~n内的。

然后在计算和与n*n+1/2的比较，就是剩下的次数了


let n = Number(readline())
let arr = readline().split(' ').map(item=>Number(item))


let sum = 0
let count = 0
for(let i=0;i<arr.length;i++){
	if(arr[i] < 1) {
		count += 1-arr[i]
		sum += 1
	} else if(arr[i]>n) {
		count += arr[i] - n
		sum += n
	} else {
		sum+=arr[i]
	}
}

print(count + Math.abs(sum - n*(n+1)/2))
*/

// 小根堆

/*
* 链接：https://www.nowcoder.com/questionTerminal/601815bea5544f389bcd20fb5ebca6a8
来源：牛客网

小美和小团所在公司的食堂有N张餐桌，从左到右摆成一排，每张餐桌有2张餐椅供至多2人用餐，公司职员排队进入食堂用餐。小美发现职员用餐的一个规律并告诉小团：当男职员进入食堂时，他会优先选择已经坐有1人的餐桌用餐，只有当每张餐桌要么空着要么坐满2人时，他才会考虑空着的餐桌；

当女职员进入食堂时，她会优先选择未坐人的餐桌用餐，只有当每张餐桌都坐有至少1人时，她才会考虑已经坐有1人的餐桌；

无论男女，当有多张餐桌供职员选择时，他会选择最靠左的餐桌用餐。现在食堂内已有若干人在用餐，另外M个人正排队进入食堂，小团会根据小美告诉他的规律预测排队的每个人分别会坐哪张餐桌。

进阶：时间复杂度O(nlogn)\O(nlogn) ,空间复杂度O(n)\O(n)

输入描述:
第一行输入一个整数T（1<=T<=10），表示数据组数。

每组数据占四行，第一行输入一个整数N（1<=N<=500000）；

第二行输入一个长度为N且仅包含数字0、1、2的字符串，第i个数字表示左起第i张餐桌已坐有的用餐人数；

第三行输入一个整数M（1<=M<=2N且保证排队的每个人进入食堂时都有可供选择的餐桌）；

第四行输入一个长度为M且仅包含字母M、F的字符串，若第i个字母为M，则排在第i的人为男性，否则其为女性。



输出描述:
每组数据输出占M行，第i行输出一个整数j（1<=j<=N），表示排在第i的人将选择左起第j张餐桌用餐。

示例1
输入
1
5
01102
6
MFMMFF
输出
2
1
1
3
4
4
*
*
* */

class PriorityQueue {
  constructor() {
    this.tree = [];
  }

  insert(val) {
    this.tree.push(val);
    this._up(this.tree.length - 1);
  }

  remove() {
    let last = this.tree.pop();
    if (this.tree.length > 0) {
      this.tree[0] = last;
      this._down(0);
    }
  }

  _down(index) {
    let tree = this.tree;
    let last_no_leaf = ~~((tree.length - 2) / 2);
    if (index > last_no_leaf) return;
    while (index <= last_no_leaf) {
      let l = tree[index * 2 + 1];
      let r = tree[index * 2 + 2] || tree[index * 2 + 1];
      let min = l <= r ? l : r;
      let minIndex = l <= r ? index * 2 + 1 : index * 2 + 2;
      if (tree[index] > min) {
        [tree[index], tree[minIndex]] = [tree[minIndex], tree[index]];
        index = minIndex;
      } else {
        return;
      }
    }
  }

  _up(index) {
    let tree = this.tree;
    while (index !== 0) {
      let p = ~~((index - 1) / 2);
      if (tree[index] < tree[p]) {
        [tree[index], tree[p]] = [tree[p], tree[index]];
        index = p;
      } else {
        return;
      }
    }
  }
}

readline();
let result = "";
while ((line = readline())) {
  const n = ~~line;
  let ts = readline().split("");
  const m = ~~readline(),
    ga = readline();

  let t0 = [],
    t1 = new PriorityQueue();
  ts.forEach((e, i) => {
    if (e == "0") {
      t0.push(i + 1);
    } else if (e == "1") {
      t1.tree.push(i + 1);
    }
  });

  let index0 = 0;
  for (let i = 0; i < m; i++) {
    if (
      (ga[i] == "M" && t1.tree.length > 0) ||
      (ga[i] == "F" && index0 >= t0.length)
    ) {
      result += t1.tree[0] + "\n";
      t1.remove();
    } else {
      result += t0[index0] + "\n";
      t1.insert(t0[index0]);
      index0++;
    }
  }
}
console.log(result);
