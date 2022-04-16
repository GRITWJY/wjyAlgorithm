/*
 存在n+1个房间，每个房间依次为房间1 2 3...i，每个房间都存在一个传送门，i房间的传送门可以把人传送到房间pi(1<=pi<=i),现在路人甲从房间1开始出发(当前房间1即第一次访问)，每次移动他有两种移动策略：
    A. 如果访问过当前房间 i 偶数次，那么下一次移动到房间i+1；
    B. 如果访问过当前房间 i 奇数次，那么移动到房间pi；
现在路人甲想知道移动到房间n+1一共需要多少次移动；

* */

//todo
/*
* let n = parseInt(readline().trim());
let roomArr = readline().trim().split(" ");
let mod = 1000000007
let dp = new Array(n+2);
dp[1] = 0
for(let i = 2;i<=n+1;i++){
    dp[i]=2*dp[i-1]+2-dp[roomArr[i-2]]
    if(dp[i]<0){
        dp[i] += mod;
    }else if (dp[i] >= mod){
        dp[i] %= mod;
    }
}
console.log(dp[n+1])
*
* */
