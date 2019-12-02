# store-es

```js
 npm install store-es
```

## 对象式

### dater

#### checker

- @name 验证一个数据是否是合法的时间格式
- @param { date } [ any ]
- @msg 当 date 是 null true 1 等值时，可以得到合法的时间
- @return [ boolean ]
- @example console.log(checker(new Date())); // => true

#### formater

- @name 时间格式化
- @param {date} [date] 需要格式化的时间
- @param {fmt} [ string ] 格式化规则 yyyy-MM-dd HH:mm:ss
- @msg 当 date 是 null true 1 等值时，得到的是 1970 的数据
- @example console.log(formater(new Date(), "yyyy-MM-dd HH:mm:ss ")); => 2019-06-28 18:19:16

#### reverer

- @name 获取倒计时信息
- @param { createTime } [date] 创建时间
- @param { currentTime } [date] 当前时间
- @param { backTimeRange } [date] 倒计时范围
- @param { type = 'day'} [ 'day','hour','minute','second']
- @return { object }
- code 标识 -1/当前时间小于起始时间 | 0/正在倒计时中... 1/当前时间大于起始时间与倒计时之和
- memo 描述
- storage 当 code=0 时，倒计时详情

#### reverer.day

- @name 获取倒计时信息
- @msg 按天
- @param { createTime } [date] 创建时间
- @param { currentTime } [date] 当前时间
- @param { backTimeRange } [date] 倒计时范围
- @return { object }

#### reverer.hour

- @name 获取倒计时信息
- @msg 按小时
- @param { createTime } [date] 创建时间
- @param { currentTime } [date] 当前时间
- @param { backTimeRange } [date] 倒计时范围
- @return { object }

#### reverer.minute

- @name 获取倒计时信息
- @msg 按分钟
- @param { createTime } [date] 创建时间
- @param { currentTime } [date] 当前时间
- @param { backTimeRange } [date] 倒计时范围
- @return { object }

#### reverer.second

- @name 获取倒计时信息
- @msg 按秒
- @param { createTime } [date] 创建时间
- @param { currentTime } [date] 当前时间
- @param { backTimeRange } [date] 倒计时范围
- @return { object }

```js
let res = reverser.hour('2019-06-30 12:49:00', new Date(), 60 * 1000);
console.table(res['storage']);
```

#### zer

- @name 补 0
- @param {value} [number] 需要补 0 的数
- @return [ string ]

### domer

#### checker

- @name 判断元素类型
- @care
- console.log(document.**proto**); // HTMLDocument
- console.log(document.**proto**.**proto**); // Document
- console.log(document.**proto**.**proto**.**proto**); // Node
- console.log(document.**proto**.**proto**.**proto**.**proto**); // EventTarget
-
- console.log(window.**proto**); // Window
- console.log(window.**proto**.**proto**); // WindowProperties
- console.log(window.**proto**.**proto**.**proto**); // Node
- console.log(window.**proto**.**proto**.**proto**.**proto**); // EventTarget
-
- console.log(document.body.**proto**); // HTMLBodyElement
- console.log(document.body.**proto**.**proto**); // HTMLElement
- console.log(document.body.**proto**.**proto**.**proto**); // Element
- console.log(document.body.**proto**.**proto**.**proto**.**proto**); // Node
- console.log(document.body.**proto**.**proto**.**proto**.**proto**.**proto**); // EventTarget
-
- console.log(document.documentElement.**proto**); // HTMLHtmlElement
- console.log(document.documentElement.**proto**.**proto**); // HTMLElement
- console.log(document.documentElement.**proto**.**proto**.**proto**); // Element
- console.log(document.documentElement.**proto**.**proto**.**proto**.**proto**); // Node
- console.log(document.documentElement.**proto**.**proto**.**proto**.**proto**.**proto**); // EventTarget
- @param { elem } [ any<require> ]
- @param { type = 'dom'} [ 'dom','document','window']
- @return [ boolean ]

#### checker.dom

- @name 判断是否是 dom 节点
- @param { elem } [ any<require> ]
- @return [ boolean ]

#### checker.document

- @name 判断是否是 document
- @param { elem } [ any<require> ]
- @return [ boolean ]

#### checker.window

- @name 判断是否是 window
- @param { elem } [ any<require> ]
- @return [ boolean ]

#### classer

- @name 获取元素的 class 属性
- @param { elem } [ dom ] dom 元素
- @return [ array ]

#### classer.haser

- @name 获取元素的中是否存在指定的 class 属性名
- @param { elem } [ dom ] dom 元素
- @param { className } [ string ] 指定的 class 名
- @return [ boolean ]

#### classer.adder

- @name 添加指定的 class 属性名
- @param { elem } [ dom ] dom 元素
- @param { className } [ string ] 指定的 class 名
- @return [ elem ]

#### classer.remover

- @name 移除指定的 class 属性名
- @param { elem } [ dom ] dom 元素
- @param { className } [ string ] 指定的 class 名
- @return [ elem ]

#### listener

- @name 添加事件
- @param { elem } [ element ]
- @param { type } [ string ]
- @param { handler } [ function ]
- @return void

#### listener.closer

- @name 取消事件
- @param { elem } [ element ]
- @param { type } [ string ]
- @param { handler } [ function ]
- @return void

#### queryer

- @name 获取页面元素
- @param { selector } [ string ]
- @param { type ='class'} [ 'class','id','tag']
- @return [ element ]

#### queryer.id

- @name 通过 id 获取页面元素
- @param { selector } [ string ]

#### queryer.class

- @name 通过 class 名获取页面元素
- @param { selector } [ string ]

#### queryer.tag

- @name 通过 tag 名获取页面元素
- @param { selector } [ string ]

#### scroller

- @name 获取最近的祖先元素是滚动元素的
- @param { element } [ element ]
- @param { rootParent = window } [ element ]
- @return [ number ]

#### scroller.top

- @name 获取指定元素的滚动距离
- @msg 当元素是 window 时，window 并没有 scrollTop 属性值，pageYOffset 代表该值
- 当客户端为手机端时，得到的是 document.body 值，而 document.documentElement 值为 0 ，为电脑时，反之
- @param { element } [ element ]
- @param { top } [ number ]
- @return
- 当 top = null 时，则是获取值，否则是设置值

```js
// 使得某个元素滚动到底部
let scrollHeight = this.$refs['outer'].scrollHeight;
domer.scroller.top(this.$refs['outer'], scrollHeight);
```

### funer

#### beforer

- @name 方法执行前函数
- @msg 只支持同步函数
- @param { fn } [function] 执行的方法
- @param { beforefn } [function] 方法执行前需要执行的方法
- @param [ function ]

```js
let dod = beforer(
  function() {
    console.log('do something.');
  },
  function() {
    console.log('before.');
  }
);
dod();
```

#### binder

- @name 函数绑定执行上下文
- @param { fn } [function] 方法
- @param { context } [any] 执行的上下文
- @return [ function ]

```js
let bin = bind(
  function(age) {
    console.log(this, age);
  },
  { name: 'hjq' }
);

bin('1111');
```

#### curryer

- @name 函數柯里化
- @msg
- 只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数
- 可以任意传参，到达预期的时候触发函数执行返回值（可以是参数为空的时候）
- @param { fn } [ function ]
- @param { ..args }
- @return [ function ]

```js
let add = function(...args) {
  return args.reduce((prex, next) => prex + next);
};
let curryFn = curryer(add, 0);

console.log(curryFn(1, 2, 3)(4)(5, 6, 7, 8)(9, 10)());
```

#### debouncer

- @name 执行方法去抖动
- @msg 如果一个函数持续地触发，那么只在它结束后过一段时间只执行一次
- 使用闭包的作用，独立每个的 bounce，互相不影响
- @param { fn } [function] 执行的方法
- @param { delay } 等待多少时间触发
- @return [ function ]

#### delayer

- @name 延迟多少时间触发事件
- @param {fn} [function] 触发的方法
- @param { wait } 等待的时长
- @param { ..args} 方法的参数
- @return [ function ]

#### partialer

- @name 偏函數
- @msg
- 创建一个调用另一部分参数或变量已经预置的函数
- 可以先进行一些参数的设置
- @param { fn } [ function ]
- @param {...args }
- @return [ function ]

```js
let test = delayer(
  function(...args) {
    console.log(...args);
  },
  2000,
  'hjq',
  'hjsh'
);
test();
```

#### throttler

- @name 执行方法节流-定时器式
- @msg 就是指连续触发事件但是在 n 毫秒中只执行一次函数，
- @param { fn } [function]执行方法
- @param { delay } 间隔多少秒后执行方法
- @param { type } [ 'timeout','time']
- @return [ function ]

```js
methods: {
  hanlder: funer.throttler.timeout(function(e) {
    console.log(e);
  }, 2000);
}
```

#### throttler.timeout

#### throttler.time

#### uncurryer

- @name 传入一个现有函数，反柯里化会返回一个新的函数，该新函数接受的第一个实参将绑定为 fn 中的 this 的上下文，其他参数将传递给 fn 作为参数
- @msg 是对 js 内置的其他方法的借调，而不用自己去实现一遍
- @param { fn } 需要反柯里化的函数
- @return { function } 返回一个新的函数

```js
let split = uncurryer(String.prototype.split);
console.log(split('a,b,c', ','));
let push = uncurry(Array.prototype.push);
let arr = [1, 2, 3, 4];
push(arr, 1, 2, 3, 4);
console.log(arr);
```

### objecter

#### checker

- @name 验证一个数据是否是对象
- @param { object } [ any ]
- @return [ boolean ]
- @example checker({})=> true

#### checker.emptyer

- @name 验证一个对象地方是空对象
- @msg 没有自身属性
- @param { object } [ object ]
- @return [ boolean ]
- @example checker.emptyer({}) => true

#### checker.plainer

- @name 验证一个数据是否是纯对象
- @msg 该对象是通过 {} 和 new Object()方式创建
- @msg Object.getPrototypeOf 不能获取 [ undefined,null ]的原型，所以使用了 try catch
- @param { object } [ any ]
- @return [ boolean ]
- @example checker.plainer({}) => true
- @example checker.plainer(new Object()) => true
- @example checker.plainer("") => false

#### checker.freer

- @name 验证一个数据是否是纯对象或没有原型的对象，即常用的业务对象
- @msg 该对象是通过 {} 、new Object()、Object.create(null)方式创建的
- @param { object } [ any ]
- @return [ boolean ]
- @example
- checker.freer(Object.create(null)) => true
- checker.freer({}) => true
- checker.freer(new Object()) => true

### arrayer

#### delayer

- @name 树形结构数据转一维数组
- @param {array} [array]
- @returns [array]

#### flattener

- @name 扁平化数组
- @param { array } [ array ] 需要偏平化的数组
- @param { deepth } [ number ] 深度
- @returns [array]

#### shuffler

- @name 数组乱序
- @msg 使用 fisher-tayes 算法，目前最好的乱序方式，使得每个元素参与的概率一致
- @param { array } [ array ] 数组
- @return [ array ]

#### shuffler.sorter

- @name 数组乱序
- @msg 该方式乱序不完全，由于每个元素参与的次数不一致
- @param { array }
- @return:[ array ]

#### sorter

- @name 数组排序
- @msg 不支持对象类型元素,会改变原数组的顺序
- @param { array } [ array ]
- @param { isUp = true } [ boolean ] 是否是升序
- @return [ array ]

#### sorter.quicker

- @name 数组排序-快速
- @msg 不支持对象元素
- @param { array } [ array ]
- @param { isUp = true } [ boolean ] 是否是升序
- @return: [ array ]

#### sorter.quicker.with

- @name 数组排序-快速
- @msg 支持对象元素的排序
- @param { array } [array]
- @param { callback } [ function ] 通过指定的函数，参数 (prev,next,array)
- @param { context } [ any ] 执行方法的执行上下文
- @return:[ array ]

#### sorter.subbinger

- @name 数组排序(冒泡)
- @msg 所有排序中速度最慢的
- 比较相邻的元素。如果第一个比第二个大，就交换他们两个。
- 对每一对相邻元素做同样的工作，从开始第一对到结尾的最后一对。在这一点，最后的元素应该会是最大的数。
- 针对所有的元素重复以上的步骤，除了最后一个。
- 持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较。
- 冒泡排序总的平均时间复杂度为 O(n^2)
- @param {arr} [ array] 数组
- @param { isUp = true } [ boolean] 是否是升序
- @return [array]

#### templater

- @name: 生成一个数组模板
- @param { start =0 } [ number<int>]开始值
- @param { len = 10 } [ number<int> ]长度
- @param { isUp = true } [ boolean ] 是否是向上递增，否则向下递减
- @return: array<number>

#### templater.stringer

- @name: 生成一个指定长度的数组，每个元素并由指定长度字符串组成
- @param { len = 10 } [ number<int> ] 指定长度数组
- @param { charLen = 4 } [ number<int> ] 指定长度的字符串元素
- @return: [ array<number>]

#### templater.ofer

- @name 填充相同值的元素的指定长度的数组
- @param { len = 10 } [ len ] 数组的指定长度
- @param { callback } [ function ] 指定函数
- @param { context = this } [ any ] 函数执行上下文
- @return:[ array ]

#### timeser

- @name 数组中元素出现的次数信息统计
- @msg 不支持对象类型[ objecy,array ]统计，支持 NaN
- @param { array = [] } [ array ]
- @return: [ array<'object'> ]

#### timeser.maxer

- @name 判断数组中出现最多次数的值
- @param { array = [] } [ array ]
- @return:[ array<'object'> ]

#### timeser.miner

- @name 判断数组中出现最少次数的值
- @param { array = [] } [ array ]
- @return:[ array<'object'> ]

#### transposer

- @name 数组置换
- @param {array} [array] 需要置换的数组
- @msg 目标数组必须是二维数组，并且每一个元素的长度一致
- @return [array]

#### treer

- @name 一维数组转树形结构数据
- @msg 利用 js 的引用对象实现，会修改原本的数组
- @param { array } [array]
- @param { pid } [ string ] 根的 pid 值
- @return [ array ]

#### uniquer

- @name 数组去重
- @msg 只支持 object 类型
- @param {array} [array]
- @return [array]

### stringer

#### check

- @name 验证字符串是否是有值
- @param { string } [ string ]
- @return [ boolean ]
- @example check("s") => true
- @example check("") => false
- @example check(0) => false
- @example check(" ") => true

#### check.contain

- @name 验证字符串是否是包含指定的字符串
- @param { string } [ string ]
- @return [ boolean ]
- @example check.contain("huang","hua") => true

#### check.continue

- @name 验证字符串是否是连续的
- @param { string } [ string ]
- @return [ boolean ]
- @example check.continue("123") => true
- @example check.continue("abc") => true

#### check.repeat

- @name 验证字符串是否是重复的-全部是由一个字符组成
- @param { string } [ string ]
- @return [ boolean ]
- @example check.repeat("aaa")=>true
- @example check.repeat("abc")=>false

#### check.center

- @name 验证字符串中部是否是指定的字符串
- @param { string } [ string ]
- @return [ boolean ]
- @example check.center("huang","a") => true

#### check.end

- @name 验证字符串尾部是否是指定的字符串
- @param { string } [ string ]
- @param { target } [ string ]
- @return [ boolean ]
- @example check.end("huang","ng") => true

#### check.start

- @name 验证字符串开头是否是指定的字符串
- @param { string } [ string ]
- @param { target } [ string ]
- @return [ boolean ]
- @example check.start("hjq", "hj") => true

#### check.plalin

- @name 验证字符串是否是回文字符串
- @param { string } [ string ]
- @return [ boolean ]
- @example check.plalin("121") => true

#### check.space

- @name 验证字符串是否存在空白字符
- @param { string } [ string ]
- @return [ boolean ]
- @example check.space("121 ") => true
- @example check.space(" ") => true

#### check.space.whole

- @name 验证字符串是否全部是空白字符组成
- @param { string } [ string ]
- @return [ boolean ]
- @example check.space.whole(" ") => true
- @example check.space.whole("") => false

#### connect

- @name 每隔几位添加指定的连接符-从末尾计数
- @param { string } [ string ]
- @param { connect = '-' } [ string ] 连接符
- @param { len = 4 } [ number ] 每隔多少位
- @param { type = start } [ string ] 计数位置
- @return [ string ]
- @example connect("13980464237"," ",4) => 139 8046 4237
- @msg exp1(?=exp2) 查找 exp2 前面的 exp1 || (?<=exp2)exp1 查找 exp2 后面的 exp1 || exp1(?!exp2) 查找后面不是 exp2 的 exp1 || (?<!=exp2)exp1 查找前面不是 exp2 的 exp1
- @notice
- new RegExp(`(?<=^([\\S\\s]{${len}})+)([\\s\\S])`, 'g') 在火狐下不能识别，所以不使用正则的方式
- new RegExp(`([\\s\\S])(?=([\\S\\s]{${len}})+$)`, 'g')

#### connect.start

#### connect.end

#### contains

- @name 获取一个字符串包含指定的字符串的所有角标
- @param { string } [ string ]
- @param { target } [ string ] 指定的字符串
- @return [ array ] 角标位置数组
- @example console.log(contains("insssinsssins", "s")); => [2,3,3,7,8,9,12]

#### contains.exec

- @name 获取一个字符串包含指定的字符串的所有角标
- @msg 循环方式
- @param { string } [ string ]
- @param { target } [ string ] 指定的字符串
- @return [ array ] 角标位置数组
- @example console.log(contains("insssinsssins", "s")); => [2,3,3,7,8,9,12]

#### contains.with

- @name 返字符串中匹配正则表达式的值
- @msg replace 的 callback 函数的参数的个数由正则表达式决定的 1.第一个 ： 正则表达式结果;2.倒数第二个：角标;3.倒数第一个：字符串本身;4.剩余的：正则表达式匹配的结果
- @param { string } [ string ]
- @param { regexp } [ regexp ]
- @return [ array<'object'> ]

#### convert

- @name 字符串的转换
- @param {string} [ string ]
- @param { type='upper' } [ string ]
- upper | 全部大写
- lower | 全部小写
- upperStart | 首字母大写，其余全部小写
- lowerStart | 首字母小写，其余全部大写
- exchange | 大小写互转
- @return [ string ]
- @example
- convert("sSs",'upper') => 'SSS'
- convert.upper('assaSAS');
- convert.lower('assaSAS');
- convert.upperStart('assaSAS');
- convert.lowerStart('assaSAS');
- convert.exchange('assaSAS');

#### convert.upper

#### convert.lower

#### convert.upperStart

#### convert.lowerStart

#### convert.exchange

#### hump

- @name 驼峰字符串转链接字符串
- @param { string } [ string ]
- @return [ string ]
- @example hump('name-name') => nameName

#### hump.spread

- @name 驼峰字符串转链接字符串
- @param {string} [string]
- @return [string]
- @example hump.spread("asashAHjjasHsa") => asash-a-hjjas-hsa

#### insert

- @name 向字符串指定的角标后面插入指定字符串
- @param { string } [ string ] 目标字符串
- @param { index } [ number ] 角标值
- @param { target } [ string ] 插入的字符串
- @return [ string ]

#### insert.code

- @name 向字符串指定的字符串后面插入指定字符串
- @param { string } [ string ] 目标字符串
- @param { code } [ string ] 目标位置字符串
- @param { target } [ string ] 插入的字符串
- @return [ string ]

#### path

- @name 将字符串转成合法的对象的键
- @msg
- a.b.c 形式，获取对象属性的时候用'.'，获取数组的时候可以使用'.0'，也可以使用 a[0],
- []只能是数组的角标 0-9 组成的字符串，并且 [] 中不能再存在 []
- 不能以'.'开头，且不能有连续的'.'
- 对象的属性名需要满足 js 变量命名规则
- JS 标识符的命名规则，即变量的命名规则：
- 标识符只能由字母、数字、下划线和‘\$’组成
- 数字不可以作为标识符的首字符
- 对象属性的命名规则
- 通过[]操作符为对象添加属性时，属性名称可以是任何字符串（包括只包含空格的字符串和空字符串）；
- 通过.操作符为对象添加属性时，属性名称必须是合法的标识符名称；
- 如果属性名包含非法的标识符字符，则只能采用 obj[“propertyName”]的形式；
- 如果属性名是合法的标识符，读取时即可以采用 obj.propertyName,也可以采用 obj[“propertyName”]的形式；
- @param { string } [ string ]
- @return [ array ]
- @example path(".a[a].b[0.s..s].c[c].....") => ['a','0','b','0','c','c']

#### random

- @name 生成随机字符串
- @param { n } [ number ] 指定长度 ， 默认长度为 16
- @return [ string ]
- @example random(16) => n568c2cjdbdi3oop

#### random.color

- @name 随机生成颜色字符串
- @param { isOpacity } [ boolean ] 是否需要透明度
- @return [string]
- @example randomColor(true) => rgba(226,180,173,0.3421123393946621)
- @example randomColor() => rgba(226,180,173)

#### random.color.hex

- @name 随机生成颜色字符串-16 进制字符串
- @return [string]
- @example random.color.hex() => #3e7fce

#### reverse

- @name: 字符串反向
- @param { string } string
- @return: [string]

#### shousand

- @name 字符串转千分位
- @msg 判断字符串是否存在'.'，存在则使用 Number(value).toLocaleString()，否则正则替换
- @param { string } [ string,number ]
- @return [ string ]
- @example shousand(123456788) => 123,456,788
- @example shousand(123456788.11) => 123,456,788.11

#### transfer

- @name 字符串的转义
- @param {string} [ string ]
- @return [ string ]
- @example transfer("< >") => "&lt &nbsp &gt "

#### trim

- @name 字符串的空格去除-整体
- @msg String.prototype.trim 只能删除字符串开头的空白
- @param { string } [ string ] 字符串
- @param { type = 'whole'} [ string ] 类型
- start | 首部
- end | 尾部
- both | 两侧
- whole | 整体
- @return [ string ]
- @example
- trim(' dsdsds dsd ds dsds ds ' ,'whole');
- trim.both(' dsdsds dsd ds dsds ds ');
- trim.start(' dsdsds dsd ds dsds ds ');
- trim.end(' dsdsds dsd ds dsds ds ');
- trim.whole(' dsdsds dsd ds dsds ds ');

#### trim.both

#### trim.start

#### trim.end

#### trim.whole

### typer

#### browser

- @name 获取浏览器的类型
- @return [ string ]

#### ios

- @name 判断客户端是否是 ios
- @return [boolean]

#### is

- @name 获取数据类型
- @param { ...args } [ array<string> ]
- @return [ function ]
- @param { value } [ any ]
- @return [ boolean ]

#### orientation

- @name 判断手机的方向
- @return [ string ] 'horizontal' => 横屏 'vertical' => 竖屏 '' => 未知

#### type

- @name 获取数据类型
- @param { value } [ any ]
- @return [ string ]
- @example type('null') => string type(0) => number

### langer

#### cloner

- @name 数据的克隆
- @msg
- 只支持['string', 'number', 'boolean', 'array', 'null', 'undefined', 'object']类型的拷贝，并且当类型是对象时，必须是有{}、new Object()、Object.create(null)方式创建的
- 支持对[ object , array ] 的深拷贝，即和源数据之间不存在引用关系
- 暂不支持 function、symbol 、regex 等的拷贝
- @param { target } [ 'string', 'number', 'boolean', 'array', 'null', 'undefined', 'object' ] 目标数据
- @return [ any ]
- @example
- cloner({ name: ["", 2, 3, 5] }) => { name: ["", 2, 3, 5] }

#### cloner.nexter

- @name 数据深拷贝，向后
- @msg
- 只用于满足常用业务逻辑
- 只支持['string', 'number', 'boolean', 'array', 'null', 'undefined', 'object']类型的拷贝，并且当类型是对象时，必须是有{}、new Object()、Object.create(null)方式创建的
- 原始 + 原始 | 返回原始 next
- 引用 + 原始 | 返回原始 next
- 原始 + 引用 | 返回引用 next 的深拷贝
- 引用 + 引用 | 若类型不一致，则返回 next 的深拷贝，若类型一直，则判断 next 中属性在 prev 中的存在性，若存在，则替换，若不存在，则追加
- @param { prev } ['string', 'number', 'boolean', 'array', 'null', 'undefined', 'object']
- @param { next } ['string', 'number', 'boolean', 'array', 'null', 'undefined', 'object']
- @return [ any ]

#### cloner.prever

- @name 数据深拷贝，向前（替换）
- @msg
- 只用于满足常用业务逻辑
- 只支持['string', 'number', 'boolean', 'array', 'null', 'undefined', 'object']类型的拷贝，并且当类型是对象时，必须是有{}、new Object()、Object.create(null)方式创建的
- 原始 + 原始 | 返回原始 next
- 引用 + 原始 | 返回原始 next
- 原始 + 引用 | 返回引用 next 的深拷贝
- 引用 + 引用 | 若类型不一致，则返回 next 的深拷贝，若类型一直，则判断 next 中属性在 prev 中的存在性，若存在，则替换，若不存在，则忽略
- @param { prev } ['string', 'number', 'boolean', 'array', 'null', 'undefined', 'object']
- @param { next } ['string', 'number', 'boolean', 'array', 'null', 'undefined', 'object']
- @return [ any ]

#### equaler

- @name 判断两个数据的属性值是否相等
- @msg
- 只支持['string', 'number', 'boolean', 'array', 'null', 'undefined', 'object']类型的拷贝，并且当类型是对象时，必须是有{}、new Object()、Object.create(null)方式创建的
- @param { prev } [ number,string,boolean,null,undefined,array,object ]
- @param { next } [ number,string,boolean,null,undefined,array,object ]
- @return: [ boolean ]
- @example
- equal(NaN, NaN) => true
- equaler([NaN, { name: true }], [NaN, { name: true }]) => true

#### getter

- @name 按指定的路径获取值
- @msg
- 若未取值则返回默认
- 取到的值若对象类型，则与目标对象之间存在引用关系的
- @param { object } [ any ] 取值对象
- @param { path = []} [ array ] 路径
- @param { defaults } [ any ] 默认值
- @return [ any ]
- @example
- getter({ a: { b: { c: { d: { e: { f: { g: true } } } } } } }, ['a', 'b', 'c', 'd', 'e', 'f', 'g'], 0) => true

### imager

#### baser

- @name 判断字符串是否是 base64 格式图片文件
- @param { string } [ string ]
- @return [ boolean ]

#### baser.typer

- @name 获取 based64 图片文件的类型
- @param { base64 } [ string ] base64 格式的图片路径
- @return { string }

#### baser.sizer

- @name 获取 base64 图片文件的体积
- @msg 必须是 base64 格式图片地址
- @param { base64 } [ string ]
- @return [ number ] 字节大小

#### compressser.qualityer

- @name 图片压缩-按质量
- @param { src } [ string ]
- @param { quality } [number] 压缩后的质量
- @param { type = image/png } [ string ] 文件的类型，最好是先知道文件的类型，相同类型之间的压缩会更准确
- @return: [ promise ] => [ string<base64>]

#### compressser.widther

- @name 图片压缩-指定宽
- @param { src } [ string ]
- @param { width } [ number ]
- @param { type = image/png } [ string ]
- @return [ promise ] => [ string<base64>]

#### compressser.heighter

- @name 图片压缩-指定高度
- @param { src } [ string ]
- @param { height } [ number ]
- @param { type = image/png } [ string ]
- @return [ promise ] => [ string<base64>]

#### compressser.sizer

- @name 图片压缩=指定高和宽
- @param { src } [ string ]
- @param { width } [ number ]
- @param { height } [ number ]
- @param { type = image/png } [ string ]
- @return: [ promise ] => [ string<base64>]
- @msg 图片会被挤压

#### compressser.ratioer

- @name 图片压缩-指定比率
- @param { src } [ string ]
- @param { ratio = 1.0 } [ number ]
- @param { type = image/png } [ string ]
- @return [ promise ] => [ string<base64>]

#### compressser.valumer

- @name 图片压缩-指定体积的图片
- @msg Base64 编码要求把 3 个 8 位字节（3 _ 8=24）转化为 4 个 6 位的字节（4 _ 6=24），之后在 6 位的前面补两个 0，形成 8 位一个字节的形式。 如果剩下的字符不足 3 个字节，则用 0 填充，输出字符使用’=’，因此编码后输出的文本末尾可能会出现 1 或 2 个’=’
- @param { src } [ string ] 图片地址
- @param { size = 200 _ 1024 } [ number ] | 200 _ 1024 压缩到指定的大小 需要精确到 Bytes
- @param { range = 100 } [number ] | 10 \* 1024 容错范围即可 需要精确到 Bytes
- @param { type = image/png } [ string ]
- @return [ promise ] => [ string<base64>]

#### filer

- @name 获取本地文件资源的详细信息
- @param { file } [ file ]
- @return { object }
- bytes: 62661
- fileType: "jpg"
- lastUpdateDate: "2018-10-17 09:08:17"
- name: "zly (18)"
- size: 61
- sizeUnit: "KB"
- subType: "jpeg"
- type: "image"

#### filer.blober

- @name 获取本地资源文件的二进制流
- @msg : 可以获取图片的二进制流直接用于页面显示
- @param { file } [ file ]
- @return [ promise ] => [ string ]

#### filer.baser

- @name 获取本地资源文件的 base64 数据
- @param { file } [ file ]
- @return [ promise ] => [ string ]

#### formater

- @name 尺寸格式化
- @param { size } [ number ]
- @return [ object ]
- value 值
- unit 单位

#### sizer

- @name 获取图片的高宽
- @param { src } [ string ] 图片地址 [ 访问路径式，based4 式，二进制式]
- @return [ promise ] => [ number ]
- @param { type} ["height-width", "height", "width", "volume"] volume(体积)
- @example sizer("http://img5.imgtn.bdimg.com/it/u=1128579105,2742690848&fm=26&gp=0.jpg").then(res => console.log(res));

#### sizer.height

- @name 获取图片的宽度
- @param { src } [ string ] 图片地址 [ 访问路径式，based4 式，二进制式]
- @return [ promise ] => [ number ]

#### sizer.width

- @name 获取图片的高度
- @param { src } [ string ] 图片地址 [ 访问路径式，based4 式，二进制式]
- @return [ promise ] => [ number ]

#### sizer.volume

- @name 获取图片的体积
- @param { src } [ string ] 图片地址 [ 访问路径式，based4 式，二进制式]
- @return [ promise ] => [ number ]

#### transformer

- @name 图片格式转换
- @param { src } [ string ]
- @param { type } ["base64", "blob"]
- @return [ promise ]

```js
transformer('http://img5.imgtn.bdimg.com/it/u=1128579105,2742690848&fm=26&gp=0.jpg', 'blob').then(res => console.log(res)); //image/jpeg
transformer.blob('http://img5.imgtn.bdimg.com/it/u=1128579105,2742690848&fm=26&gp=0.jpg').then(res => console.log(res)); //image/jpeg
transformer.base64('http://img5.imgtn.bdimg.com/it/u=1128579105,2742690848&fm=26&gp=0.jpg').then(res => console.log(res)); //image/jpeg
```

#### transformer.base64

- @name 图片格式转 base64
- @param { src } [ string ]
- @return [ promise ]

#### transformer.blob

- @name 图片格式转 blob
- @param { src } [ string ]
- @return [ promise ]

#### typer

- @name 获取图片资源的类型
- @msg 通过再次请求该图片，获取该请求下的一些信息
- @param { src } [ string ] 图片路径
- @return [ promise ]

## 类式（需要实例化）

### Calcer

- @Descripttion: 数学计算
- @version: 0.0.1
- @Author: huangjunquan
- @Date: 2019-06-11 18:07:02
- @LastEditors: Please set LastEditors
- @LastEditTime: 2019-07-16 10:39:03
- @msg
- 小数与整数的积也不能得到期望值，1.2334567 \* 1000 = 1233.4567000000002
- 两数乘积可能会超安全数范围
- 有些特殊的数字会自动转为科学计数，当数值为整数时，后面有 21 个 0 时， 9000000000000000000000 => 9e+21 ； 当数值为浮点数时，一个不为 0 的数前面有 7 个 0 时，0.0000001 => 1e-7

* number 类型
* 数字必须大于等于 0
* 将科学计数方式的数字转为可用的数字，小数点后面位数加整数部分的长度为 16 位，才能正确获取数字
* string 类型
* 是合法的数字即可，整数部分和小数部分均是任意长度
* 以'0'开头，若后面没有有小数点，则'0'本身；若后面有小数点，则小数点后面有至少一位的数字
* 不以'0'开头，后面跟任意位的数字，若有小数点，后面至少需要一位以上的数字

#### adder

- @name 加法运算
- @param { prev } [ number | string ]
- @param { next } [ number | string ]
- @return [string]
- @example console.log(calcer.adder("1.123", "0.877")); // => 2
- @example console.log(calcer.adder("0.1", "0.2")); // 0.3
- @example console.log(calcer.adder("0.1", "1.23")); // => 1.33
- @example console.log(calcer.adder("1000", "0.0001")); //=>1000.0001
- @example console.log(calcer.adder("00001", "1")); // => 2
- @example console.log(calcer.adder("99999999999999999", "1")); //=> 1000000000000000

#### muler

- @name 乘法运算
- @param { prev } [ number | string ]
- @param { next } [ number | string ]
- @return [ string ]
- @example console.log(calcer.muler("0.1", "0.7")); => '0.07'
- @example console.log(calcer.muler("123456", "0.123456")); => '15241.383936'

### Storager([local=true])

- 参数[ local ]是否是本地永久存储信息
- 只能存储 除 undefined function symbol 类型之外的数据
- 异步方式

#### setter

- @name 获取存储信息
- @param { key } [ string ] 关键字
- @return [ promise ]

#### getter

- @name 存储信息
- @param { key }
- @param { value }
- @return [ promise ]

#### remover

- @name 移除指定关键字存储信息
- @param { key } [ string ]
- @return [ promise ]

#### clear

- @name 清除存储信息

```js
let storage = new Storager(true);

storage.setter('message', { name: 'web-app' });
storage.getter('message').then(res => {
  console.log(res);
});
storage.clear();
```

### Queryer

- 互转之后，数字和布尔均会变成字符串

#### encode

- @name 编码
- @param { string } [ string ]
- @return [ string ]

#### decode

- @name 解码
- @param { string } [ string ]
- @return [ string ]

#### stringify

- @name 对象转字符串
- @param { obj } [ object ]
- @return [ string ]

#### parse

- @name 字符串转对象
- @param { query } [ string ]
- @return [ object ]

### Checker

- 链式调用，每个方法均返回当前实例
- 一个数据验证失败则后续的数据不进行验证

#### set

- @name 绑定当前验证的数据
- @param { data } [ string ] 验证数据
- @param { isRequire } [ boolean ] 是否是必填项
- @param { message } [ string ] 错误提示语
- @return [ object ] 当前实例

#### len

- @name 数据长度是否是指定长度
- @param { message } [ string ] 错误提示语
- @param { len } [ number ] 指定长度
- @return [ object ]

#### minLen

- @name 数据长度是否大于指定长度
- @param { message } [ string ] 错误提示语
- @param { min } [ number ] 最小长度
- @return [ object ]

#### maxLen

- @name 数据是否在最大长度范围值内
- @param { message } [ string ] 错误提示语
- @param { max } [ number ] 最大长度
- @return [ object ]

#### rangeLen

- @name 数据是否在指定的范围内
- @param { message } [ string ] 错误提示语
- @param { min } [ number ] 最小长度
- @param { max } [ number ] 最大长度
- @return [ object ]

#### regex

- @name 通过指定的正则表达式验证数据
- @param { message } [ string ] 错误提示语
- @param { type } [ string ] 指定的正则类型
- @return [ object ]

#### check

- @name 通过指定的函数验证数据
- @param { message } [ string ] 错误提示语
- @param { callback } [ function ] 指定的函数
- @return [ object ]

```js
let check = new Check()
  .set('', true, '该数据是必填项')
  .check('长度不少于4', function(value, regex) {
    return value.length >= 4;
  })
  .regex('格式错误', 'chinese')
  .set('1398046423')
  .regex('格式错误', 'mobile');

console.log(check);
console.log(check.pass, check.message);
```

### Hexer

#### escape

- @name 16 进制编码
- @msg 不支持中文编码，以及中文相关的标点符号等，适合单纯的数字和英文字母组成的字符串
- @param { string } [ string ]
- @return [ string ]

#### usescape

- @name 16 进制解码
- @msg 必须要要使用 encode 编码的字符串才能进行解
- @param { string } [ string ] 16 进制编码字符串
- @return [ string ]

#### encodeURI

- @name 字符串转 16 进制
- @msg 该方式是通过将每个字符串转成对应的 16 进制，并以指定的连接符连接
- 支持任何字符串
- @param { string } [ string ]
- @param { concat = ',' } [ string ]
- @return [ string ]

#### decodeURI

- @name 字符串转 16 进制
- @msg 必须要使用 encodeURI 编码的字符串
- @param { string } [ string ]
- @param { concat = ',' } [ string ]
- @return [ string ]

#### decodeComponent

- @name 16 进制转字符串
- @param { string }
- @return [ string]

#### readUTF

- @name 中文编码处理
- @param { arr }
- @return [ string ]

```js
let hex = new Hex();
console.log(hex.encode('!@#$%^&**())'));
console.log(hex.decode(hex.encode("ZAQXSWCDE<>?_+{}''[]【】，,+|")));
console.log(hex.encodeURI('!@#$%^%^'));

console.log(hex.decodeURI(hex.encodeURI('hjqhj 很少见三 化建设局啊')));
let str =
  '7B2262616E6B5265616C4E616D65223A22E9BB84E5869BE6B389222C22616C69706179223A223133393830343634323337222C22616C69706179436F646555726C223A22687474703A2F2F74726164652E627374636861696E2E636F6D2F75706C6F61642F38623364346337632D663735662D343636372D393161362D3430373330366436636563642E6A7067222C22666565223A2231303030222C226D6F62696C65223A223135393238343039323834222C22776563686174223A22222C2271725765436F646555726C223A22222C22616C697061795265616C4E616D65223A22E9BB84E5869BE6B389222C22616C6970617955726C223A2268747470733A2F2F71722E616C697061792E636F6D2F666B78303132393966686772617A62343970796C306462222C22636172644E6F223A2236323231383836353130303435373338363734222C2262616E6B223A22E4B8ADE59BBDE982AEE694BFE582A8E89384E993B6E8A18C222C227375624D656D4964223A223130222C2277656368617455726C223A22222C226D656D4964223A2233227D';
let decodeComponent = hex.decodeComponent(str);
```

### Urler

- @name 编码和解码
- @msg 通过对三个函数的分析，我们可以知道：escape()除了 ASCII 字母、数字和特定的符号外，对传进来的字符串全部进行转义编码，因此如果想对 URL 编码，最好不要使用此方法。
- 而 encodeURI() 用于编码整个 URI,因为 URI 中的合法字符都不会被编码转换。encodeURIComponent 方法在编码单个 URIComponent（指请求参 数）应当是最常用的，它可以将参数中的中文、特殊字符进行转义，而不会影响整个 URL。

#### escape

- @name 字符串编码
- @msg 该方法不会对 ASCII 字母和数字进行编码，也不会对下面这些 ASCII 标点符号进行编码： - \_ . ! ~ \* ' ( ) 。其他所有的字符都会被转义序列替换。
- @param { string } [ string ]
- @return [ string ]

#### unescape

- @name 字符串解码
- @msg 该方法和 escape 对应
- @param { string } [ string ]
- @return [ string ]

#### encodeURI

- @name 字符串编码
- @msg 该方法不会对 ASCII 字母和数字进行编码，也不会对这些 ASCII 标点符号进行编码： - \_ . ! ~ \* ' ( ) 。 该方法的目的是对 URI 进行完整的编码，因此对以下在 URI 中具有特殊含义的 ASCII 标点符号，encodeURI() 函数是不会进行转义的：;/?:@&=+\$,#
- @param { string } [ string ]
- @return [ string ]

#### decodeURI

- @name 字符串解码
- @msg 该方法和 encodeURI 对应
- @param { string } [ string ]
- @return [ string ]

#### encodeURIComponent

- @name 字符串编码
- @msg encodeURIComponent() 函数 与 encodeURI() 函数的区别之处，前者假定它的参数是 URI 的一部分（比如协议、主机名、路径或查询字符串）。因此 encodeURIComponent() 函数将转义用于分隔 URI 各个部分的标点符号
- @param { string } [ string ]
- @return [ string ]

#### decodeURIComponent

- @name 字符串解码
- @msg 该方法和 encodeURIComponent 对应
- @param { string } [ string ]
- @return [ string ]

### EventEmeitter

发布、订阅模式

#### addListener

- @name: 监听名为 type 的事件
- @param { type } [ string ]
- @param { fn } [ function ]
- @return: 当前实例

#### emit

- @name 触发名为 type 的事件
- @param { type } [string]
- @param { ...args } [ any ]
- @return 当前实例

#### removeListener

- @name: 移除监听事件
- @param {type} 事件名
- @return: 当前实例

```js
let evt = new EventEmeitter();
evt
  .addListener('click', function(...params) {
    console.log(params.length);
  })
  .emit('click', ...[1, 2, 3, 4]);
evt.addListener('click', function(...params) {
  console.log(params[1]);
});
console.log(evt);
evt
  .addListener('click', function(...params) {
    console.log(params);
  })
  .emit('click', 'name');

evt.removeListener('click');
console.log(evt);
console.log(evt);
```

## 其他

### regexer

```js
export default [
  {
    type: 'special',
    rules: ['含特殊字符组成的非空字符串'],
    text: '是否含特殊字符',
    success: ['!@#$$%^&*())', '1!'],
    error: ['123456', 'qazxsw'],
    value: /[`~!@#$%^&*()_\-+=<>?:"{}|,.\\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im
  },
  {
    type: 'chinese',
    rules: ['只能由中文汉字组成的非空字符串'],
    text: '是否是中文',
    success: ['一二三'],
    error: ['123456', 'qazxsw'],
    value: /^[\u4E00-\u9FA5]+$/
  },
  {
    type: 'english',
    rules: ["只能由'a-z'|'A-Z'组成的非空字符串"],
    text: '是否是英文',
    success: ['qazxsw', 'QAZWSX', 'qazWSX'],
    error: ['123456', '123qaz'],
    value: /^[a-zA-Z]+$/
  },
  {
    type: 'english-upper',
    rules: ["只能由'A-Z'组成的非空字符串"],
    text: '是否是大写英文',
    success: ['QAZWSX'],
    error: ['qazwsx'],
    value: /^[A-Z]+$/
  },
  {
    type: 'english-lower',
    rules: ["只能由'a-z'组成的非空字符串"],
    text: '是否是小写英文',
    success: ['qazxsw'],
    error: ['QAZWSX'],
    value: /^[a-z]+$/
  },

  {
    type: 'number',
    rules: ['只能由0-9组成的非空字符串'],
    text: '是否是数字',
    success: ['13231', '093920'],
    error: ['dsdsdsdsds', '0.100102010201'],
    value: /^[0-9]+$/
  },
  {
    type: 'number-free',
    rules: ["只能由'0-9'|'.'|'-'组成的非空字符串", '小数点至多有一个，并且第一位不能是小数点', "以0打头，后面没有小数点，则0本身，且前面不能带'-'，否则，后面跟任意位的非全0的数字", '非0打头，后面没有小数点，则数值本身，否则后面跟任意位的任意数字'],
    text: '是否是合法的数字',
    success: ['1', '0', '10', '-1', '0.1', '0.01'],
    error: ['-0', '0.', '0.00', '.0', '01'],
    value: /(^(-)?0\.([0-9]*)?[1-9]+([0-9]*)?$)|(^[0]{1}$)|(^(-)?[1-9]([0-9]+)?(\.[0-9]+)?$)/
  },
  {
    type: 'number-integer',
    rules: ["只能由'0-9'|'-'组成的非空字符串", '以0打头，则0本身'],
    text: '是否是整数',
    success: ['1', '0', '10', '-1'],
    error: ['-0', '0.1', '0.00', '.0', '0.001', '01'],
    value: /(^(-)?([1-9][0-9]*)$)|(^[0]{1}$)/
  },
  {
    type: 'number-money',
    rules: ["只能由'0-9'|'.'组成的非空字符串", '小数点至多有一个，并且第一位不能是小数点', '以0打头，后面没有小数点，则0本身，否则后面跟不能全为0的至少一位数字', '非0打头，后面没有小数点，则数值本身，否则后面跟1-2位的任意数字'],
    success: ['0.01', '0.10', '0.1', '0', '1'],
    error: ['-0', '0.0', '0.00', '.0', '0.001', '-1', '01'],
    text: '是否是金钱格式',
    value: /(^[0]{1}$)|(^0\.[1-9]([0-9])?$)|(^0\.([0-9])?[1-9]$)|(^[1-9]([0-9]*)?(\.[0-9]{1,2})?$)/
  },
  {
    type: 'mobile',
    rules: ['只能由0-9组成的11位非空字符串', '首位一定是1'],
    text: '是否是手机号码',
    success: ['13980464237'],
    error: ['02334455555'],
    value: /^1[0-9]{10}$/
  },
  {
    type: 'tel',
    rules: ["只能由'0-9'|'-'组成的[7,8,11]位非空字符串"],
    text: '是否是座机号码',
    success: ['028-12345678', '0832-5231402', '12345678', '5231402'],
    error: ['02812345678'],
    value: /(^[0-9]{3}\-[0-9]{8}$)|(^[0-9]{4}\-[0-9]{7}$)|(^[0-9]{7,8}$)/
  },
  {
    type: 'id-card',
    memo: '该方法只是简单的验证，更复杂的需要判断生日，地区，校验等',
    rules: ['长度只能是15位或18位', '若15位，则全部是数字', '若18位，则前17位全部是数字，最后一位可能是数字或字符x'],
    text: '验证身份证号码',
    success: ['5110251992071806019', '511025199207180601x', '51102519920718'],
    error: ['511025199207180601o', '511025199'],
    value: /(^\d{15}$)|(^\d{17}(\d|X|x)$)/
  }
];
```
