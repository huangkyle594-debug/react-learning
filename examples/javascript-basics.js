const printSection = (title) => {
  console.log(`\n=== ${title} ===`);
};

// 1. 变量：let 允许重新赋值，const 不允许重新绑定
let score = 80;
score += 10;

const courseName = 'JavaScript 基础';

printSection('变量');
console.log('courseName:', courseName);
console.log('score:', score);

// 2. 函数：默认参数、剩余参数、箭头函数
function greet(name = '同学') {
  return `你好，${name}！`;
}

const sum = (...numbers) => numbers.reduce((total, number) => total + number, 0);

printSection('函数');
console.log(greet('小明'));
console.log('sum(1, 2, 3, 4):', sum(1, 2, 3, 4));

// 3. 模板字符串
const userName = '小明';
const message = `${userName} 正在学习 ${courseName}。`;

printSection('模板字符串');
console.log(message);

// 4. 数组常用方法：map、filter、reduce
const numbers = [1, 2, 3, 4, 5, 6];
const doubled = numbers.map((number) => number * 2);
const evenNumbers = numbers.filter((number) => number % 2 === 0);
const total = numbers.reduce((sumValue, number) => sumValue + number, 0);

printSection('数组方法');
console.log('原数组:', numbers);
console.log('每个数乘 2:', doubled);
console.log('偶数:', evenNumbers);
console.log('总和:', total);

// 5. 对象：解构、剩余属性、展开运算符
const student = {
  name: '小明',
  age: 18,
  skills: ['HTML', 'CSS'],
  address: {
    city: '上海',
  },
};

const { name, skills: [firstSkill], ...otherInfo } = student;
const updatedStudent = {
  ...student,
  age: 19,
  skills: [...student.skills, 'React'],
};

printSection('对象');
console.log('解构 name:', name);
console.log('解构第一个技能:', firstSkill);
console.log('剩余属性:', otherInfo);
console.log('更新后的对象:', updatedStudent);

// 6. 可选链和空值合并运算符
const maybeStudent = null;
const city = student.address?.city;
const fallbackName = maybeStudent?.name ?? '未知学生';

printSection('可选链与空值合并');
console.log('city:', city);
console.log('fallbackName:', fallbackName);

// 7. class、私有字段、getter
class Counter {
  #count = 0;

  increment() {
    this.#count += 1;
    return this;
  }

  get value() {
    return this.#count;
  }
}

const counter = new Counter().increment().increment().increment();

printSection('class');
console.log('counter.value:', counter.value);

// 8. Set 和 Map
const skillSet = new Set(updatedStudent.skills);
const scoreMap = new Map([
  ['HTML', 90],
  ['CSS', 85],
  ['React', 80],
]);

printSection('Set 与 Map');
console.log('去重后的技能:', [...skillSet]);
console.log('React 分数:', scoreMap.get('React'));

// 9. async/await 和 Promise
const wait = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

const fetchLesson = async (lessonName) => {
  await wait(50);
  return `${lessonName} 学习完成`;
};

async function main() {
  const [jsResult, tsResult] = await Promise.all([
    fetchLesson('JavaScript'),
    fetchLesson('TypeScript'),
  ]);

  printSection('异步代码');
  console.log(jsResult);
  console.log(tsResult);

  // 10. 遍历
  printSection('遍历');
  for (const skill of updatedStudent.skills) {
    console.log('skill:', skill);
  }

  for (const [language, languageScore] of scoreMap) {
    console.log(`${language}: ${languageScore}`);
  }

  console.log('\nJavaScript 示例运行完成');
}

main().catch((error) => {
  console.error('JavaScript 示例运行失败:', error);
  process.exitCode = 1;
});
