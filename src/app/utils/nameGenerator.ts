// 平台初始昵称生成器
const emotions = [
  '困惑', '迷茫', '快乐', '幸福', '悠闲', '焦虑', '开心', 
  '忧郁', '兴奋', '安静', '活力', '温柔', '可爱'
];

const foods = [
  '冰激凌', '红豆冰', '绿豆沙', '红烧肉', '奶茶', '蛋糕',
  '布丁', '果冻', '巧克力', '棉花糖', '饼干', '甜甜圈',
  '珍珠奶茶', '抹茶', '提拉米苏', '芝士蛋糕'
];

export function generateRandomName(): string {
  const emotion = emotions[Math.floor(Math.random() * emotions.length)];
  const food = foods[Math.floor(Math.random() * foods.length)];
  return `${emotion}${food}`;
} 