type Role = 'student' | 'teacher';

interface User {
  id: number;
  name: string;
  role: Role;
  tags?: string[];
  readonly createdAt: Date;
}

const printSection = (title: string): void => {
  console.log(`\n=== ${title} ===`);
};

const users: User[] = [
  {
    id: 1,
    name: '小明',
    role: 'student',
    tags: ['JavaScript', 'React'],
    createdAt: new Date('2026-01-01T00:00:00Z'),
  },
  {
    id: 2,
    name: '王老师',
    role: 'teacher',
    createdAt: new Date('2026-01-02T00:00:00Z'),
  },
];

// 1. 显式标注常见类型
const courseName: string = 'TypeScript 基础';
const lessonCount: number = 10;
const isPublished: boolean = true;
const lessons: string[] = ['类型', '接口', '泛型'];
const point: readonly [number, number] = [100, 200];

printSection('基础类型');
console.log({ courseName, lessonCount, isPublished, lessons, point });

// 2. interface、联合类型、可选属性和只读属性
function formatUser(user: User): string {
  const tagText = user.tags?.length ? `，标签：${user.tags.join('、')}` : '';
  return `#${user.id} ${user.name}（${user.role}${tagText}）`;
}

printSection('interface');
console.log(users.map(formatUser).join('\n'));

// 下面这行如果取消注释，TypeScript 会报错，因为 id 是只读属性
// users[0].id = 100;

// 3. 函数类型、默认参数和函数重载
type Formatter = (value: number) => string;

const currencyFormatter: Formatter = (value) => `¥${value.toFixed(2)}`;

function padLeft(value: string, length: number, fill: string): string;
function padLeft(value: number, length: number, fill: string): string;
function padLeft(value: string | number, length: number, fill: string): string {
  return String(value).padEnd(length, fill);
}

printSection('函数类型');
console.log('currencyFormatter:', currencyFormatter(19.9));
console.log('padLeft:', padLeft('TS', 6, '-'));

// 4. 泛型与泛型约束
function getFirst<T>(items: readonly T[]): T | undefined {
  return items[0];
}

function findById<T extends { id: number }>(items: T[], id: number): T | undefined {
  return items.find((item) => item.id === id);
}

function getProperty<T, K extends keyof T>(object: T, key: K): T[K] {
  return object[key];
}

printSection('泛型');
console.log('第一项课程:', getFirst(lessons));
console.log('找到的用户:', findById(users, 2));
console.log('用户名称属性:', getProperty(users[0], 'name'));

// 5. 类、实现接口和访问修饰符
interface Course {
  title: string;
  teacher: User;
  addStudent(student: User): void;
  getStudentNames(): string[];
}

class OnlineCourse implements Course {
  private students: User[] = [];

  constructor(
    public title: string,
    public teacher: User,
  ) {}

  addStudent(student: User): void {
    this.students.push(student);
  }

  getStudentNames(): string[] {
    return this.students.map((student) => student.name);
  }

  get studentCount(): number {
    return this.students.length;
  }
}

const course = new OnlineCourse('React 入门', users[1]);
course.addStudent(users[0]);

printSection('class');
console.log('课程:', course.title);
console.log('老师:', course.teacher.name);
console.log('学生:', course.getStudentNames());
console.log('学生数量:', course.studentCount);

// 6. 类型收窄（type narrowing）
function describeValue(value: string | number | User): string {
  if (typeof value === 'string') {
    return `字符串：${value}`;
  }

  if (typeof value === 'number') {
    return `数字：${value}`;
  }

  return `用户：${value.name}`;
}

printSection('类型收窄');
console.log(describeValue('TS'));
console.log(describeValue(100));
console.log(describeValue(users[0]));

// 7. 可辨识联合（discriminated union）
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'rectangle'; width: number; height: number };

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2;
    case 'rectangle':
      return shape.width * shape.height;
  }
}

printSection('可辨识联合');
console.log('圆面积:', getArea({ kind: 'circle', radius: 2 }).toFixed(2));
console.log('矩形面积:', getArea({ kind: 'rectangle', width: 3, height: 4 }));

// 8. 常用工具类型：Partial、Pick、Record、Readonly
type UserDraft = Partial<User>;
type UserSummary = Pick<User, 'id' | 'name'>;
type RoleLabels = Record<Role, string>;

const userDraft: UserDraft = { name: '新用户' };
const userSummary: UserSummary = { id: 3, name: '小红' };
const roleLabels: RoleLabels = {
  student: '学生',
  teacher: '老师',
};
const readonlyUser: Readonly<User> = users[0];

printSection('工具类型');
console.log({ userDraft, userSummary, roleLabels });
console.log('readonlyUser.name:', readonlyUser.name);

// 9. as const 与 satisfies
const routes = {
  home: '/',
  examples: '/examples',
  about: '/about',
} as const;

type RoutePath = (typeof routes)[keyof typeof routes];

const courseLevels = ['入门', '进阶', '高级'] as const satisfies readonly string[];

printSection('as const 与 satisfies');
console.log('routes:', routes);
console.log('RoutePath 示例:', routes.examples satisfies RoutePath);
console.log('courseLevels:', courseLevels);

// 10. TypeScript 可以主动发现错误
// @ts-expect-error：number 不能赋值给 string
const wrongName: string = 42;

console.log('\nTypeScript 示例运行完成');
