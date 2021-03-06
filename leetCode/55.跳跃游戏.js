/*
 * @lc app=leetcode.cn id=55 lang=javascript
 *
 * [55] 跳跃游戏
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
// f(n) = f(i) || f(i-1) 动态规划
var canJump = function(nums) {
  let f = [true];
  for (let i = 1; i < nums.length; i++) {
    const num = nums[i];
    let flag = false;
    let j = i - 1;
    while (j >= 0) {
      if(nums[j] >= i - j && f[j]) {
        flag = true;
        break;
      }
      j--;
    }
    f[i] = flag;
  }
  return f[nums.length - 1];
};

// 计算最大跳跃长度
var canJump = function(nums) {
  let max = 1;
  for (let i = 0; i < nums.length && i < max; i++) {
    const num = nums[i];
    let len = num + i + 1
    if(max < len) {
      max = len;
    }
    if(max >= nums.length) {
      return true;
    }
  }
  return false;
}
// @lc code=end

