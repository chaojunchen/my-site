import Mock from "mockjs"
import { getURLParams, random } from "../utils/index.js"

import avatars from "./utils/avatars.js"
import person from "./utils/person.js"
import colors from "./utils/colors.js"

// 文章分类。
Mock.mock(/^\/api\/articleCategory(\?.+)?$/, 'get', function () {
    return Mock.mock({
        code: 0,
        msg: '',
        'data|8-20': [
            {
                'id|+1': 1,
                name: "分类@id",
                'articleCount|0-200': 0,
            }
        ]
    })

})

// 根据文章类型获取文章列表
// /api/blog?page=1...
// /api/blog

let max = 0;
Mock.mock(/^\/api\/article(\?.+)?$/, 'get', function (options) {
    const params = getURLParams(options.url) || {};
    // 文字最大数据量。
    /**
     * 总数据量为0，意味着这是第一次请求，
     * 
     * 
     */
    if (!params.total) {
        max = random(200, 4000)
    }
    if (params.page !== 1 && !params.total) {
        const num = params.page * params.limit;
        max = num + random(100, 200)
    }
    return Mock.mock({
        code: 0,
        msg: "",
        data: {
            'total': max,
            [`rows|${params.limit || 10}`]: [
                {
                    title: "@guid",
                    title: "@ctitle(6,50)",
                    description: "@cparagraph(1,8)",
                    'scanNumber|0-50000': 0,
                    "commentNumber|0-500": 0,
                    "thumb|1": [Mock.Random.image('300x300', Mock.Random.color(), '#E8A615', 'jpg', 'Game of Thrones'), null],
                    createTime: Mock.Random.date('yyyy-MM-dd'),
                    category: {
                        "id|1-15": 0,
                        name: "分类@id"
                    }
                }
            ]
        }
    })
})

// 文章详情
Mock.mock(/\/api\/articleDetail[^/]/, 'get', function () {
    return Mock.mock({
        code: 0,
        msg: "",
        data: {
            id: '@guid',
            title: "我的ES6+",
            category: {
                "id|1-10": 0,
                name: "分类@id",
            },
            description: "@cparagraph(1,10)",
            "scanCount|0-8000": 0,
            "commentCount|0-250": 0,
            createTime: Mock.Random.date('yyyy-MM-dd'),
            "thumb|1": [Mock.Random.image('300x300', '#008c8c', '#E8A615', 'png', 'Game of Thrones'), null],
            toc: [
                {
                    name: "二、块级绑定",
                    anchor: "anchor-title-1",
                },
                {
                    name: "三、字符串和正则表达式",
                    anchor: "anchor-title-2"
                },
                {
                    name: "四、函数",
                    anchor: "anchor-title-3"
                },

                {
                    name: "五、对象",
                    anchor: "anchor-title-4"
                },
                {
                    name: "六、解构",
                    anchor: "anchor-title-5"
                },

                {
                    name: "七、符号",
                    anchor: "anchor-title-6"
                },
                {
                    name: "八、异步处理",
                    anchor: "anchor-title-7"
                },
                {
                    name: "九、Fetch API",
                    anchor: "anchor-title-8"
                },
                {
                    name: "十、迭代器和生成器",
                    anchor: "anchor-title-9"
                },
                {
                    name: " 十一、更多的集合类型",
                    anchor: "anchor-title-10"
                },
                {
                    name: "十二、代理和反射",
                    anchor: "anchor-title-11"
                },
                {
                    name: "十三、增前的数组功能",
                    anchor: "anchor-title-12"
                },
                {
                    name: "十四、技术提升",
                    anchor: "anchor-title-13"
                },


            ],
            htmlContent: `
            <div class="mume markdown-preview  ">


    <h3 class="mume-header" id="anchor-title-1">二、跨级绑定</h3>
    <p><strong>2-2.let 声明变量</strong><br>1.*ES6 不仅引入了 let
        关键字用于解决变量声明的问题，同时引入了块级作用域的概念<br>*跨级作用域：代码执行时遇到花括号{}会创建一个块级作用域，花括号结束，销毁块级作用域。<br>例：if（）{ <br>这里就是一个块级作用域。在这里使用
        let 声明的变量阿波罗函数都不会有变量提升。并且声明的变量只会在这个{}里使用。外部不能访问，但是能访问外部变量。<br>}<br>2.使用 let 声明与 var 声明的区别与 let 声明。<br>1).var
        声明的变量会挂载到全局对象：全局对象造成污染问题<br>let 声明的变量不会挂载到全局对象<br>2).var 允许重复变量声明：导致数据被覆盖。<br>let
        声明的变量，不允许在当前作用域范围内重复声明。<br>3).var 生命的变量会提升。怪异的数据访问。闭包问题。<br> let 不会变量提升，因此，不能在声明之前使用变量会，会报错。<br>例：console.log(a)
        &nbsp; &nbsp;&nbsp;！报错 &nbsp; &nbsp;&nbsp;<br>let&nbsp; &nbsp;&nbsp;a =123;<br>底层实现上，let
        生命的变量实际上也会有提升，但是，提升后将其放入到“暂时性死区”，如果访问的变量位于暂时性死区，则会报错：‘cannot access 'a' before
        initialzation'。当代码运行到该变量声明的语句时，会将其从暂时性死区钟溢出。<br>3.在循环中使用 let
        声明的变量会特殊处理。每次进入循环体，都会开启新的作用域并且将循环变量绑定到该作用域（每次循环使用的是一个全新的循环遍量）。<br>例：for&nbsp;(let&nbsp;i&nbsp;=&nbsp;0;&nbsp;i&nbsp;&lt;&nbsp;10;&nbsp;i++)&nbsp;{
        在这个花括号里是一新的作用域。<br>// let i= i；可以理解为在这个块级作用域定义了一个新的 i<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;。。。。。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log(i);
        // 这个 i 就是在这个块级作用域里的
        i<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>4.在循环中使用
        let
        声明的遍量，循环结束后声明的变量会被销毁。<br>&nbsp;&nbsp;for&nbsp;(let&nbsp;i&nbsp;=&nbsp;0;&nbsp;i&nbsp;&lt;&nbsp;10;&nbsp;i++)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log(i);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;console.log(i);
        //会报错<br><strong>2-3.const 声明常量</strong><br>1.const 和 let 完全相同，不过用 const 声明的变量，必须声明时赋值。而且不能重新赋值（不可更改）。尽量使用 const
        声明变量。防止变量被随意篡改。<br>2 注意的细节<br> 1）常量不可变，是指常量的内存空间不可变（原始值，引用值），并不保证内存空间中的地址指向的其他空间不可变。<br>
        2）常量的命名<br>1.特殊的常量：该常量从字面意义上，一定是不可变的。比如：圆周率。在特殊常量的命名上，应该全部大写。多个单词用下划线分割<br>例：const PI = 3.14<br>const
        MOON_Earth_DISTANCE = 3245563424 月地距离<br>2.普通的常量：使用之前一样的命名即可---大驼峰<br>3.在 for 循环里不能使用 const&nbsp; &nbsp;&nbsp;
        因为循环的数会变化。for in 里可以使用，遍历对象的属性时，属性名是独一无二的。<br>
        <a name="UweKm" href="file:///C:\Users\Mr.Chen\Desktop"></a>
    </p>


    <h3 class="mume-header" id="anchor-title-2">三、字符串和正则表达式
    </h3>
    <p><strong>3.1 更好的 unicode 支持</strong><br>早期由于存储空间宝贵。unicode 使用 16 位二进制存储文字。一个 16 进制的二进制编码叫做一个码元。<br>后来，因为 Unicode
        进行编码扩展。将某些文字扩展到了 32 位。（占用两个码元）。并且，将某个文字对应的二进制数字叫做码点。<br>所以有的文字的码点占用了 2 个码元。有的文字的码点占一个码元。js
        长久没更新。就认为一个码点就是一个码元。在取字符串长度是就按照码元来取的。<br>例：const text = '吉' //占两个码元。长度就为
        2。正则也是按码元来匹配的。<br>提供方法：codePointAt()根据字符串码元的位置得到其码点。<br>正则解决办法/.$/u 添加一个 u 就会按照码点进行匹配<br><strong>3.2 更多的字符串
            api</strong><br>均为字符串的实例（原型）方法<br>includes[/ɪnˈkluːdz/ 包含，包括]（'val',index)判断字符串是否包含子字符串。index 可不写，默认从 0 开始查找
        &nbsp;<br>startsWith（'f'，ind）判断是否以该字符串开头。<br>endsWith（'f',ind）结尾。<br>repet（4）把当前字符串重复四次并返回一个新的字符串。<br><strong>3.5【扩展】模板字符串标记</strong><br>string.raw
        <code>\n</code>&nbsp; 这样就不会把转义字符有作用了。写啥打印啥。<br>
        <a name="fVncN" href="file:///C:\Users\Mr.Chen\Desktop"></a>
    </p>


    <h3 class="mume-header" id="anchor-title-3">四、函数</h3>
    <p><strong>4.1 函数默认值</strong><br>function add(a=1,b=2){ }就可以了。<br>在不是严格模式下的 arguments
        与形参列表是对应的。一个更改，那么另一个也会更改。在严格模式下是相分离的，形参的更改不会影响实参。实参不影响形参。<br>使用了函数默认值那么就会进入严格模式。</p>
    <p>形参和 ES6 中的 let 或 const 声明一样，具有作用域，并且根据参数的声明顺序，存在暂时性死区。let
        声明的变量名与形参相同时会报错。<br>例：&nbsp;function&nbsp;add(a&nbsp;=&nbsp;b,&nbsp;b)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//报错，因为
        a 虽然声明了，但是 b
        还在暂时性死区，在赋值时无效<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log(a,&nbsp;b);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;add(undefined,&nbsp;1);<br><strong>4.2
            剩余参数</strong><br>实参与形参匹配完成剩余的参数就是剩余参数<br>function sum(a, b, ...args){ 这里就是剩余的参数了<br>// a=1,b=1
        args=[3,4,5]<br>console.log(a, b, args)<br> }<br>sum(1, 2, 3, 4,
        5,)<br>使用细节：<br>1.一个函数只能出现一个剩余参数。<br>2.一个函数，如果有剩余参数，那么剩余参数必须时形参的最后一位。<br><strong>4.3
            展开运算符--浅拷贝</strong><br>1.对数组展开<br>let arr= [1,2,3]<br>let arr1=[...arr]<br>2.对对象展开<br>let obj = { name:'xxx'
        ,age = '12' }<br>let obj2 = { ...obj } ---&gt; obj2{ name : obj[ 'name' ] , age= obj[“age”] }<br><strong>4.5
            明确函数的双重用途</strong><br>new.target 用来区分该函数是否是使用的 new 操作符调用。<br>如果使用了 new 那么就返回 this（函数本身）没有则返回
        undefined。<br><strong>4.6 箭头函数--&gt;为了省略
            function</strong><br>1.箭头函数是一个函数表达式。理论上，任何使用函数表达式的场景都可以使用箭头函数。<br>2.长相：(参数 1，参数 2）=&gt;{ 函数体
        }<br>setInterval( ()=&gt;{ xxx },1000)<br> 3.如果参数只有一个，可以省略小括号 const = print =num=&gt;{ console.log(num) }<br>
        4.如果箭头函数只有一条返回语句，可以省略大括号和 return 关键字。<br>例：const&nbsp; &nbsp;isOdd&nbsp; = num=&gt; num % 2 !== 0<br> 判断是否也偶数 参数
        &nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; 返回语句 <br>返回语句是一个对象的话，得特殊处理。对象的{}
        会被当作函数体。会报错。使用（）让对象变成一个表达式解决。<br>注意细节：<br>&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;1）箭头函数的函数体中的
        this，取决于箭头函数定义的位置的 this 指向。与如何调用无关。如果一个普通函数里面有箭头函数那么箭头函数的 this，arguments，new.target 都是外层普通函数的
        this，arguments，new.target。<br>其实箭头函数例不存在 this，arguments，new.target 的<br>2）箭头函数没有原型。不能作为构造函数使用。<br>
        使用场景<br>1.临时性使用的函数，并不会刻意调用它。<br>如：事件处理函数 异步处理函数 临时性函数。<br>2.需要绑定外层的 this
        的函数。<br>3.数组中的回调函数。<br>4.对象的属性尽量不适用箭头函数。对象里 this 就指向了当前的对象，除了函数嵌套里的子函数。<br>
        <a name="ZrFCu" href="file:///C:\Users\Mr.Chen\Desktop"></a>
    </p>


    <h3 class="mume-header" id="anchor-title-4">五、对象</h3>
    <p><strong>5.1 新增对象字面量语法</strong><br>1.对象速写，当对象属性名与值一样时可以简写。方法（函数）一样可以<br>例：let a = 123;<br>let obj = { a } -- &gt;
        { a : a} --&gt;{a : 123}<br>2.方法速写-函数名就会被当做书属性名，函数体当做属性值。<br>对象字面量初始化时，可以省略 ：function。<br>const obj = { add :
        function(){ } }--&gt;obj{ add(){} )<br>3.计算属性名<br>let name = 'abc';<br>obj = { [ name ] : '789' } --&gt; { abc :
        '789' } <br><strong>5.2Object 的新增 api</strong><br><a href="http://Object.is">Object.is</a>
        判断两个对象是否相等。与严格相等（===）一样的。除了 NAN，+0 -0 <br><a href="http://Object.is">Object.is</a>(NaN,&nbsp;NaN) //
        ture<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; <a
            href="http://Object.is">Object.is</a>(+0,&nbsp;-0)&nbsp; &nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;//false<br>Object.assign(obj1,boj2) 合并两个对象。后面的覆盖前面的对象。但是前面的对象会被更改。原来的 obj1 === 合并后的
        obj。建议使用...obj<br>解决办法 Object.assign( {} ,obj1, obj2)
        后边覆盖前边，到{}时就是一个新地址。<br>Object.setPrototypeOf(obj1,boj2)。用于设置某个对象的隐士原型。<br>相当于：obj1.<strong>proto</strong>=obj2;<br>.*
        proto*&nbsp; 当前对象与原型的桥梁。当当前对象没有值的就会通过这个桥去原型里找值。<br><strong>5.3 面向对象简介</strong><br>面向对象：一种编程思想。<br>对比面向过程：
        面向过程：思考的切入点是功能的步骤。<br> 面向对象：思考的切入点是对象的划分。<br>例：大象装冰箱<br>面学过程
        ：按步骤写代码<br>1.打开冰箱门<br>2.装进大象<br>3.关闭冰箱门<br>面向对象：有一个冰箱，打开（函数）。关闭（函数）。放东（函数）。<br> 有一个对象，大象会叫（函数），会喝水（函数）&nbsp;
        &nbsp;&nbsp;<br>通过创建实例就能造出一个冰箱。冰箱里就有了很多的方法。按照需求调用方法就行。<br><strong>5.4
            类：构造函数的语法糖、</strong><br>传统的构造函数的问题<br>1.属性和原型定义是分开的，降低了可读性<br>2.原型上的东西可以遍历<br>3.默认情况下，构造函数仍然可以当作普通函数使用。<br>类的特点。<br>1.类声明不会被提升，与
        let 和 const
        存在暂时性死区。-在声明之前不能使用<br>2.类中的所有代码均在严格模式下执行。<br>3.类的所有方法都是不可枚举（遍历）的。<br>4.类的所有方法都无法被当作构造函数使用。<br>5.类的构造器必须使用 new
        来调用。<br><strong>5.5 类的其他书写方式</strong><br>1.getter 与 setter&nbsp; &nbsp;&nbsp; 不会在原型上。<br>如果在<br>用 get&nbsp;
        创建的属性，并给他加上 getter&nbsp;，读取属性时会运行 getter 函数。<br>用 set 创建的属性，并给他加上 setter，给属性赋值时（改变值）会允许 setter 函数。</p>
    <pre data-role="codeBlock" data-info="javascript" class="language-javascript"><span class="token keyword keyword-class">class</span> <span class="token class-name">Animal</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> age<span class="token punctuation">,</span> sex</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword keyword-this">this</span><span class="token punctuation">.</span><span class="token property-access">name</span> <span class="token operator">=</span> name<span class="token punctuation">;</span>
      <span class="token keyword keyword-this">this</span><span class="token punctuation">.</span><span class="token property-access">age</span> <span class="token operator">=</span> age<span class="token punctuation">;</span>
      <span class="token keyword keyword-this">this</span><span class="token punctuation">.</span><span class="token property-access">sex</span> <span class="token operator">=</span> sex<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword keyword-set">set</span> <span class="token function">age</span><span class="token punctuation">(</span><span class="token parameter">age</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token console class-name">console</span><span class="token punctuation">.</span><span class="token method function property-access">log</span><span class="token punctuation">(</span><span class="token string">'setAge'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword control-flow keyword-if">if</span> <span class="token punctuation">(</span>age <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword keyword-this">this</span><span class="token punctuation">.</span><span class="token property-access">_age</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword control-flow keyword-else">else</span> <span class="token keyword control-flow keyword-if">if</span> <span class="token punctuation">(</span>age <span class="token operator">&gt;</span> <span class="token number">1000</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword keyword-this">this</span><span class="token punctuation">.</span><span class="token property-access">_age</span> <span class="token operator">=</span> <span class="token number">1000</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword control-flow keyword-else">else</span> <span class="token punctuation">{</span>
          <span class="token keyword keyword-this">this</span><span class="token punctuation">.</span><span class="token property-access">_age</span> <span class="token operator">=</span> age<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword keyword-get">get</span> <span class="token function">age</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token console class-name">console</span><span class="token punctuation">.</span><span class="token method function property-access">log</span><span class="token punctuation">(</span><span class="token string">'getAge'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword control-flow keyword-return">return</span> <span class="token keyword keyword-this">this</span><span class="token punctuation">.</span><span class="token property-access">_age</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword keyword-const">const</span> animal <span class="token operator">=</span> <span class="token keyword keyword-new">new</span> <span class="token class-name">Animal</span><span class="token punctuation">(</span><span class="token string">'xiongda'</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">,</span> <span class="token string">'female'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token console class-name">console</span><span class="token punctuation">.</span><span class="token method function property-access">log</span><span class="token punctuation">(</span>animal<span class="token punctuation">.</span><span class="token property-access">age</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
animal<span class="token punctuation">.</span><span class="token property-access">age</span> <span class="token operator">=</span> <span class="token number">123</span><span class="token punctuation">;</span>
<span class="token console class-name">console</span><span class="token punctuation">.</span><span class="token method function property-access">log</span><span class="token punctuation">(</span>animal<span class="token punctuation">.</span><span class="token property-access">age</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</pre>
    <p>2.静态成员与实例成员<br>静态成员--类或者狗眼造函数身上的属性名。如 length ,<br><a href="http://Animal.xxx">Animal.xxx</a>。只能通过类本身调用的成员。如
        Promise.all<br> &nbsp; &nbsp;&nbsp; 静态成员使用场景：公共的属性。如象棋的宽高是固定的。<br> 在类里利用 static width&nbsp; = 10
        就能创建一个静态成员<br>实例成员--通过构造函数绑定的对象或属性。<a href="http://this.xxx">this.xxx</a> =
        xxx.<br>需要通过构造函数创建的实例才能访问的成员<br>3.自动初始化器。不变的属性<br>class Test{<br>PI = 3.14;&nbsp; &nbsp;&nbsp;&nbsp;
        //&nbsp;&nbsp; 与下面的写法并无区别。只是语法不同。<br>contructor(){ this.Pi = 3.14 }<br>}<br>注意：1）使用了 static
        的自动初始化器，添加的是静态成员。<br> 2.）没有使用 static 的才会添加到实例成员里。<br>例 ： static pi = 3.14 --》静态成员 在 Test.x 上<br> pi = 3.14
        --》实例成员，归创建的对象所有。<br> 3）箭头函数在字段初始化位置上。指向当前对象<br>class Test{ method()=&gt;{ 这里的 this 指向当前对象 } }<br>好处：绑定了
        this，无论怎么玩，this 始终指向当前对象<br>坏处：保存到其他变量时，会创建一个新的函数。额外增加内存空间。并且用箭头函数创建的函数是在对象里。并非在原型上<br>4.类表达式<br>const = A =
        class{ x : x }<br><strong>5.6 类得继承</strong><br>Dog extentds Animal Dog <br> Dog 继承了 Animal Dog 是 Animal
        的子类。<br>super（）直接当作函数调用，表示父类构造函数。super（xx,xx)<br>当作对象调用，则表示父类的原型。super.print()<br>ES6 要求，如果定义了
        constructor，并且该类是子类，则必须在 constructor 的第一行手动调用父类的构造函数。调用了才会继承父类。<br>如果子类不写
        constructor，则会有默认的构造器，该构造器需要的参数和父类一致，并且会自动调用。--把父类的构造器复制当前，可能造成参数对应错误。<br>
        <a name="MHNi2" href="file:///C:\Users\Mr.Chen\Desktop"></a>
    </p>



    <h3 class="mume-header" id="anchor-title-5">六、解构</h3>

    <p><strong>6.1 对象解构</strong><br>解构：ES6 的一种语法规则，将一个对象或数组的某个属性提取到某个变量中。解构不会队解构的目标造成影响。<br>let user = { name:'' ,age:''
        , sex:'' }<br>let name,age,sex,;<br>{ { name, age, sex,} = user} 这样就能把对象 user 的对应的值赋给 name，age，sex。<br>let
        {name, age ,sex ， abc} = user 与上面相同，先定义的 name，age，sex 然后才是去对象找值。没有的为 undefind。 abc = undefined；<br>在解构中使用默认值<br>
        let {name, age ,sex ， abc = 123} = user ，如果 user 里没有 abc 那么默认 123.有为 user 的 abc<br>结构的属性名与变量名不一样= { 属性名 ：变量名
        }<br> let name, age, gender, address.<br> let
        user={}<br>let&nbsp;{&nbsp;name,&nbsp;age,&nbsp;sex:&nbsp;gender&nbsp;=&nbsp;'male',&nbsp;address&nbsp;}&nbsp;=&nbsp;user;<br>先定义
        4 个变量：name、age、gender、address。<br>再从 user 中读取同名的属性赋值（gender 读取的是 sex 属性名），把属性为 sex 的值赋给 gender。没有值
        gender=male<br>深层解构<br>let user = { name : 'x' , address: { city : 'y'} }<br>let { name , address : { city } }
        定义了两个变量 name，city。再解构。address 只是对象的属性名。<br><strong>6.2 数组解构</strong><br>
        const&nbsp;numbers&nbsp;=&nbsp;['a',&nbsp;'b',&nbsp;'c',&nbsp;'d',&nbsp;'e'];<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;const&nbsp;{&nbsp;&nbsp;0:&nbsp;n1, 3:&nbsp;n2,&nbsp;}&nbsp;=&nbsp;numbers; 数组也是对象。属性名(下标)为 0 的赋给
        n1<br> const[n1,,,,,n4] = numbers &nbsp; &nbsp;&nbsp; 隔开赋值，多出的为 undefined<br>多层解构 let arr = [ 1, 2, [ 3 ,4 ,5 ]
        ] const [ , , [ , n , ] ]=arr n = 4；<br>剩余的值--展开运输符合在解构中起到收集作用，展开运输符只能出现一次，并 且是在末尾出现。-对象，数组通用<br>const [
        a,...arr1] ---&gt; a= 1; arr1 = [ 2, [3 ,4 ,5 ]];<br>交换值<br>let a = 1 ,b = 2;<br>[b ,a ] = [a , b] ; ---》[ b, a
        ] = [ 1, 2 ] &gt; [ 2 ,1]<br>
        <a name="CPJRN" href="file:///C:\Users\Mr.Chen\Desktop"></a>
    </p>


    <h3 class="mume-header" id="anchor-title-6">七、符号</h3>
    <p><strong>7.1 普通符号</strong><br>符号具有以下特点<br>1.没有字面量 --创建一个符号 Symbol（'这里是提示信息！'）<br>2.使用 typeof（）得到的是
        symbol<br>3.每次调用 symbol
        函数得到的符号永远不相等，无论符号是否相同<br>4.符号可以作为对象的属性名存在，这种属性称之为符号属性。<br>5.开发者可用通过精心设计，让这些属性无法通过常规方式被外界访问。<br>6.符号属性是不能枚举的，因此在
        for-in 循环中无法读取到符号属性，Object，keys 方法也无法读取到符号属性。Object.getOwnPropertyNames 也得不到。<br>7.ES6 新增
        Object.getOwnPropertySymbols 方法可以获取符号。<br>8.符号无法被隐士转换，因此不能被用于数学运算符，字符串拼接或其他隐士转换的场景。但符号可以显示的转换为字符型，通过 String
        构造函数进行转换即可，console.log(）之所有可以输出符号是因为它在内部进行了显示转换。String（symbol）<br><strong>7.2
            共享符号</strong><br><strong>symbol.for( '比较的信息，不写 undefined' )</strong><br><strong>7.3 知名符号</strong><br>
        <a name="6mztv" href="file:///C:\Users\Mr.Chen\Desktop"></a>
    </p>


    <h3 class="mume-header" id="anchor-title-7">八、异步处理</h3>
    <p><strong>8.0 回顾[ 事件循环 ]</strong><br>Es 语言与 javascript 的区别：es
        是一个标准一个规范，规定了方法改怎么写，for，数组，object……。浏览器为了把语言真正应用起来，就提供了一个环境，浏览器环境不仅仅是 包含了 Es 语言规范而且还新加入了一些 api（dom 操作）。 <br>JS
        运行的环境称之为宿主环境<br> 执行栈：call stack&nbsp; &nbsp;&nbsp;
        一个数据解构，用于存放各种函数的执行环境，每一个函数执行之前，它的相关信息会加入到执行栈。函数调用之前创建执行环境，然后加入到执行栈。函数调用完成之后销毁执行环境。</p>
    <p>JS 引擎执行的永远是执行栈的顶部函数。<br>异步函数：某些函不会立即执行，需要等到某个时间到达后才会执行的函数。</p>
    <p>浏览器宿主环境中包含 5 个线程。<br>1.JS 引擎：负责执行执行栈最顶部的代码<br>2.GUI 线程：负责渲染页面（js 引擎与 GUI
        是互斥的，一个执行，另一个必须是等待的）<br>3.事件监听线程：负责监听各种事件。点击事件，鼠标移入事件，键盘点击事件<br>4.计时线程：负责计时
        <br>5.网络线程：负责网络通信<br>当上面的线程发生了某些事情，如果该线程发现这件事情有处理程序，它会将改处理程序加入到事件队列的内存。当 js
        引擎发现执行栈中没有任何内容后，会将事件队列的第一个函数加入到执行栈中执行。
    </p>
    <p>JS 引擎对事件队列的取出执行方式以及与宿主环境的配合，称之为事件循环。</p>
    <p>事件队列在不同的宿主环境中有所差异，大部分宿主环境会将事件队列进行细分。在浏览器中，事件队列分为两种。<br>--宏任务（队列）：macrotask，计时器结束的回调，事件回调，http
        回调等大部分异步函数会进入宏队列。<br>--微队列：MutationObserver，Promise 产生的回调进入微队列。--微队列有 vip。JS 引擎会优先执行微队列。<br>当执行栈清空时，JS
        引擎首先会将微队列中的所有任务执行结束，如果没有为任务，则执行宏任务。</p>
    <pre data-role="codeBlock" data-info="javascript" class="language-javascript"><span class="token console class-name">console</span><span class="token punctuation">.</span><span class="token method function property-access">log</span><span class="token punctuation">(</span><span class="token string">'a'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token arrow operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token console class-name">console</span><span class="token punctuation">.</span><span class="token method function property-access">log</span><span class="token punctuation">(</span><span class="token string">'b'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword control-flow keyword-for">for</span> <span class="token punctuation">(</span><span class="token keyword keyword-let">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">1000</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token console class-name">console</span><span class="token punctuation">.</span><span class="token method function property-access">log</span><span class="token punctuation">(</span><span class="token string">'c'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">/*
      1.创建了一个全局上下文。【全局上下文】，继续执行。
      2.创建log上下文执行并销毁。【全局上下文，log上下文】---》【全局上下文】，输出‘a’继续执行。
      3.创建了一个异步的函数上下文并通知了计时线程。【全局上下文，setTimeout（）上下文】--》计时线程【0秒后执行异步函数】，计时线程再把函数放到事件队列中。
        异步函数js引擎不会等待，所以销毁上下文。【全局上下文】
      4.执行for循环---》。。。。【全局上下文】输出1000个‘a’完毕后发现执行队列已经空了，销毁全局上下文【】
      5.执行队列为空，那么执行事件队列中的任务--》settimeout函数执行---》输出b 【】
      */</span>
</pre>
    <p>** 8.1 事件和回调函数的缺陷**<br>1.事件：某个对象的属性是一个函数，当发生某一件事件时，运行该函数。例：注册点击 &nbsp; &nbsp;&nbsp;dom.onclick（）{ xxx
        }<br>2.回调：运行某个函数以实现某个功能的时候，传入一个函数作为参数，当发生某件事的时候，会运行该函数。例：dom.addEventListener( 'onclick', function ( ) { xxx
        })<br>本质上，事件和回调并没有本质的区别，只是函数仿制的位置不同而已。一直以来，改模式都运作良好。<br>后来前端边复杂了……久遇到了两个问题<br>1）回调地狱：某个异步操作需要等待之前的异步操作完成，无论用回调还是事件，都会陷入不断地嵌套<br>2）异步之间的练习：某个异步操作要等待多个异步操作的解构，对这种练习的处理会让代码的复杂度剧增。
    </p>
    <p><strong>8.2 异步处理的通用模型。</strong><br>1.ES6 将某一件可能发生异步操作的事情分为两个阶段：unsettled 和 settled
        [setld]<br>unsettled：未决阶段，表示事情还在进行前期的处理，并没有发生通向结果的那件事。<br>-邓哥向女神表白的阶段就是 unsettled 阶段。---unsettled<br>-dom
        点击：监听窗口的某个元素是否被点击---unsettled<br>settled：已决阶段，事情有了一个结果，不管这个结果是好是坏，整件事情无法逆转。<br>-得到了服务器的响应。<br>-女神给了邓哥回应，不该是否同意。---settled。<br>-dom
        点击：按钮已经被点击了。---settled<br>事情总是从未决阶段逐步发展到已决阶段。再未决阶段的时候可以把事情推向也决阶段。<br> 2.ES6 将事情划分为三种状态：pending[/ˈpendɪŋ/
        未决定的，将发生的]、fulfilled[/rɪˈzɑːlvd/解决，决定
        ]、rejected[/rɪˈdʒektɪd/拒绝，驳回，不同意，]<br>pending：挂起，处于未决阶段，则表示事情还在挂起（最终的结果还没出来）<br>-邓哥发出表白。<br>fulfilled：已处理。已决阶段的一种状态，表示整件事情已经出现结果，是一个可以按照正常逻辑进行下去的结果。<br>-邓哥收到了女神回应，不管是否同意。还能按照正常逻辑执行下取。<br>rejected：已拒绝。已决阶段的一种状态，表示整件事情已经出现结果，并不是一个可以按照正常逻辑进行下去的结果，通常用于有一个错误。<br>-邓哥短信没发出去或发错了，发到了兄弟哪里去了。
    </p>
    <p>3.当事情达到已决阶段后，通常需要进行后续处理，不同的已决阶段状态，决定了不同的后续处理<br>fufilled 状态：这是一个正常的已决状态，后续处理为 thenable[/ˈtenəbl/
        ]可维持的<br>rejected 状态：这是一个非正常的已决状态，后续处理为 catchable [/'kætʃəbl]可捉到的。<br>4.整件事称之为 promis<br><strong>8.3Promise
            的基本使用---Promise 并没有消除回调，只是让回调变得更可控了。</strong><br>pending --》 resolve ---》 fulfilled，<br>未决阶段的挂起状态---》调用
        resolve 推动状态----》fulfilled 已决状态，表示正常状态</p>
    <p>pending --》 reject ----》 rejected <br>未决阶段的挂起专题----》调用 reject 推同状态----》rejected 已决状态，表示非正常状态。</p>
    <p>** 注意细节**<br>1.未决阶段的处理函数时同步的，会立即执行。promise（(ful, re)=&gt;{ 这里的代码是同步的，但是可以在这里面写异步代码 }）&nbsp;<br>
        &nbsp;&nbsp;&nbsp;&nbsp;2.thenable 和 catchable 的函数是异步的（添加的 then
        为异步），就算是立即执行，也得等到同步代码执行完毕，因为加入了事件队列中等待执行。并且加入的是微队列。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.promise.then
        可以只添加 thenable 函数。pro.catch 方法可以单独得添加 catchable
        函数。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.再未决阶段得处理函数中，如果发生捕获的错误，会将状态推向 rejected，并会别 catchable
        捕获。<br>-出现了特殊符号或者语法错误。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5.一旦状态推向了已决阶段。那么就无法再对状态做任何更改。<br>
        --fulfill(3)&nbsp;&nbsp;reject(5)&nbsp; 为 fulfilled 状态。后面无效<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; throw&nbsp;new&nbsp;Error('asdf')&nbsp;&nbsp;&nbsp; 为
        rejected 状态，错误导致推进到 rejected 状态。<br> try{} catch{} 会捕捕获到错误。那么就是 fulfill 状态。<br>--Promise
        并没有消除回调，只是让回调变得更可控了。<br>**8.4promise 的串联 &nbsp;&nbsp;<strong><br>&nbsp;*&nbsp; 当后续的 Promise 需要用到之前的 Promise
            的处理结果时，需要 Promise 的串联。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;Promise 对象中，无论是 then
            方法还是 catch 方法都是有返回值的，返回的是一个全新的 Promise
            对象。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;&nbsp; 返回的 Promise
            对象满足以下规则：<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;&nbsp;1) 如果当前的 Promise
            时未决状态（pending），得到的新的 Promise
            也得是挂起状态（pending）。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;&nbsp;2) 如果当前的 Promise
            时已决阶段（settled），会运行后续的处理函数（thenable 或
            catchable），<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp; 并将处理（then,catch)的结果（返回值）作为 fulfilled 状态数据应用到新的 Promise
            中，如果后续处理函数中发<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp; 生了错误，则把返回值作为 rejected 状态数传入到新的 Promise
            中。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;&nbsp;&nbsp;&nbsp;-当前的 promise 的错误只对当前这个
            promise 的后续处理有影响对后后后再后的 promise
            没影响。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;&nbsp;3) *！*后边的 promise 一定会等到前面的
            Promise 有了后续处理结果后会变成已决状态,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 前面的没有处理结果，那么当前的一直为 pending
            状态，后边的得等前面的结果，前边的结果出来后，结果就会变成后边已决状态的数据。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;&nbsp;4)
            then 返回的 promise 对象第一次一定是挂起状态(pending)。因为 then
            是异步处理的。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;&nbsp;5) 如果前面的 promise 的后续处理返回的是一个
            Promise，返回新的 promise 状态和后续处理返回的 Promise 状态保持一致。<br></strong><br>finally：[ES2018] 注册一个后续的处理函数，当 promise
        变成已决（rejected | fulfilled）时执行该函数。<br>构造函数成员（静态成员）<br>resolve(数据）：返回一个为 fulfilled 状态的 promise，传递的数据作为状态数据。<br>
        &nbsp;new&nbsp;Promise((fulfil,&nbsp;reject)&nbsp;=&gt;&nbsp;{&nbsp;fulfil(120)&nbsp;}) =
        &nbsp;&nbsp;Promise.resolve(123);<br>reject（数据）：返回一个为 rejected 状态的
        promise，传递的数据作为状态数据。<br>all(iterable):这个方法返回一个新的 promise 对象，该 promise 对象等到 iterable 里所有的 promise
        对象都成功的时候才会触发成功（fulfilled）。iterable 有任何一个 promise 对象失败则立即触发该 promise 对象的失败（rejected）。这个新的 promise
        对象在触发成功状态以后，then 处理的状态数据是一个数组，数据顺序跟 iterable 的顺序保持一致。如果这个新的 promise 对象触发了失败状态，他会把 iterable 里的““第一个触发失败的 promise
        对象””的错误信息作为它的失败信息。promise.all 方法经常用于处理多个 promise 对象的状态集合。<br>--全部成功后续就走 then，状体数据为数组，数组得值与传入的一样。一个失败后续处理就走
        catch，状态数据为出了错误的那个 promise 对象的状态数据。<br>race（iterable）：当 iterable 参数里的任意一个子 promis 被成功或失败(rejected || fulfilled
        状态 )后，父 promise 马上也会用子 promise 的成功返回值或失败详情作为参数调用父 promise 绑定的响应句柄，并返回 promise
        对象。<br>--赛跑，第一个成功就为成功，第一个失败就为失败。<br>**8.7async 和 await**<br>总结：async 一定会返回一个 Promise。返回啥状态数据就是啥。<br> await 用于配合
        async。如果不是一个 promise 对象，就用 Promise.resolve（data）进行包装。是一个 Promise 的话就得到 fulfilled 的状态数据并赋值给 xxx。为 rejected 那么就用
        try{} catch（）捕获到错误。</p>
    <p><strong>8.8 手写 Promise</strong></p>
    <pre data-role="codeBlock" data-info="javascript" class="language-javascript"><span class="token keyword keyword-const">const</span> <span class="token constant">PENDING</span> <span class="token operator">=</span> <span class="token string">'pending'</span><span class="token punctuation">,</span>
  <span class="token constant">FULLFILLED</span> <span class="token operator">=</span> <span class="token string">'fullfilled'</span><span class="token punctuation">,</span>
  <span class="token constant">REJECTED</span> <span class="token operator">=</span> <span class="token string">'rejected'</span><span class="token punctuation">;</span>
<span class="token doc-comment comment">/**
* 把传入的函数压入微队列。
* <span class="token keyword keyword-@param">@param</span> <span class="token class-name"><span class="token punctuation">{</span>Function<span class="token punctuation">}</span></span> <span class="token parameter">callback</span> 要压入红队列的函数
*/</span>
<span class="token keyword keyword-function">function</span> <span class="token function">runAsyncTask</span><span class="token punctuation">(</span><span class="token parameter">callback</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword control-flow keyword-if">if</span> <span class="token punctuation">(</span><span class="token maybe-class-name">MutationObserver</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword keyword-const">const</span> div <span class="token operator">=</span> <span class="token dom variable">document</span><span class="token punctuation">.</span><span class="token method function property-access">createElement</span><span class="token punctuation">(</span><span class="token string">'div'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword keyword-const">const</span> obersever <span class="token operator">=</span> <span class="token keyword keyword-new">new</span> <span class="token class-name">MutationObserver</span><span class="token punctuation">(</span>callback<span class="token punctuation">)</span><span class="token punctuation">;</span>
      obersever<span class="token punctuation">.</span><span class="token method function property-access">observe</span><span class="token punctuation">(</span>div<span class="token punctuation">,</span> <span class="token punctuation">{</span>
          childList<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      div<span class="token punctuation">.</span><span class="token property-access">innerHTML</span> <span class="token operator">=</span> <span class="token string">'123'</span><span class="token punctuation">;</span>
      <span class="token keyword control-flow keyword-return">return</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword control-flow keyword-else">else</span> <span class="token keyword control-flow keyword-if">if</span> <span class="token punctuation">(</span>process <span class="token operator">&amp;&amp;</span> process<span class="token punctuation">.</span><span class="token property-access">nextTick</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      process<span class="token punctuation">.</span><span class="token method function property-access">nextTick</span><span class="token punctuation">(</span>callback<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword control-flow keyword-else">else</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span>callback<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword keyword-class">class</span> <span class="token class-name">MyPromise</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">executer</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 记录三种状态</span>
      <span class="token keyword keyword-this">this</span><span class="token punctuation">.</span><span class="token property-access">state</span> <span class="token operator">=</span> <span class="token constant">PENDING</span><span class="token punctuation">;</span>
      <span class="token comment">// 状态值</span>
      <span class="token keyword keyword-this">this</span><span class="token punctuation">.</span><span class="token property-access">value</span> <span class="token operator">=</span> <span class="token keyword nil keyword-undefined">undefined</span><span class="token punctuation">;</span>
      <span class="token comment">// 记录then添加的后续处理列表。</span>
      <span class="token keyword keyword-this">this</span><span class="token punctuation">.</span><span class="token property-access">handlers</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
      <span class="token comment">// 看执行期间是否有错误，如果有错误，那么直接推向rejected状态。</span>
      <span class="token keyword control-flow keyword-try">try</span> <span class="token punctuation">{</span>
          <span class="token comment">// 在严格模式下，resolve  reject的this指向undefined。</span>
          <span class="token function">executer</span><span class="token punctuation">(</span><span class="token keyword keyword-this">this</span><span class="token punctuation">.</span><span class="token method function property-access">resolve</span><span class="token punctuation">.</span><span class="token method function property-access">bind</span><span class="token punctuation">(</span><span class="token keyword keyword-this">this</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword keyword-this">this</span><span class="token punctuation">.</span><span class="token method function property-access">reject</span><span class="token punctuation">.</span><span class="token method function property-access">bind</span><span class="token punctuation">(</span><span class="token keyword keyword-this">this</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword control-flow keyword-catch">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword keyword-this">this</span><span class="token punctuation">.</span><span class="token method function property-access">changeState</span><span class="token punctuation">(</span><span class="token constant">REJECTED</span><span class="token punctuation">,</span> error<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token console class-name">console</span><span class="token punctuation">.</span><span class="token method function property-access">log</span><span class="token punctuation">(</span>
              error<span class="token punctuation">,</span>
              <span class="token string">'这是手写Promise时 try catch捕获到的错误，可无视'</span>
          <span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token doc-comment comment">/**
   * !推向fullfilled状态。
   * <span class="token keyword keyword-@param">@param</span> <span class="token class-name"><span class="token punctuation">{</span>所有类型<span class="token punctuation">}</span></span> <span class="token parameter">data</span> 状态数据
   */</span>
  <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword keyword-this">this</span><span class="token punctuation">.</span><span class="token method function property-access">changeState</span><span class="token punctuation">(</span><span class="token constant">FULLFILLED</span><span class="token punctuation">,</span> data<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token doc-comment comment">/**
   * !推向rejected状态。
   * <span class="token keyword keyword-@param">@param</span> <span class="token class-name"><span class="token punctuation">{</span>所有类型<span class="token punctuation">}</span></span> <span class="token parameter">data</span>  状态数据。
   */</span>
  <span class="token function">reject</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword keyword-this">this</span><span class="token punctuation">.</span><span class="token method function property-access">changeState</span><span class="token punctuation">(</span><span class="token constant">REJECTED</span><span class="token punctuation">,</span> data<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token doc-comment comment">/**
   * !promise then的后续处理。
   * <span class="token keyword keyword-@param">@param</span> <span class="token class-name"><span class="token punctuation">{</span>Function<span class="token punctuation">}</span></span> <span class="token parameter">onFullFilled</span>
   * <span class="token keyword keyword-@param">@param</span> <span class="token class-name"><span class="token punctuation">{</span>Function<span class="token punctuation">}</span></span> <span class="token parameter">onRejected</span>
   *  PromiseA+规范中规定then函数接收两个参数（为函数）。
   *  参数并不一定是两个。如果传入的并不是函数，那么会穿透，返回的promsie与当前promise的状态值一致
   *  then的函数处理是放入异步队列里的微队列中的
   *  放入微队列并不会立即执行，因为then可以链式调用，那么还得取决于上一个promise的状态，根据上一个promise的状态执行后续处理函数（成功之后执行？失败又执行？）。
   *  当链式注册then时，后续then的状态值取决于前一个then的return值。
   *  then可以链式调用。也可以单独添加多个任务，且每次都会返回返回一个新的promsie，。
   */</span>
  <span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">onFullFilled<span class="token punctuation">,</span> onRejected</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 递归返回一个新的promsie对象。</span>
      <span class="token keyword control-flow keyword-return">return</span> <span class="token keyword keyword-new">new</span> <span class="token class-name">MyPromise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token arrow operator">=&gt;</span> <span class="token punctuation">{</span>
          <span class="token comment">// !当前是递归的promise对象。当前传入的这个函数会立即执行（当前函数：看这段文字的作用域）。</span>

          <span class="token comment">// 此时是一个新的promise。当前新的promise会依赖上一个promise的状态（pending，fullfilled……）。</span>
          <span class="token comment">// 那么将then添加的任务放到上一个promise的任务队列里。</span>
          <span class="token keyword keyword-this">this</span><span class="token punctuation">.</span><span class="token method function property-access">pushHandler</span><span class="token punctuation">(</span>onFullFilled<span class="token punctuation">,</span> <span class="token constant">FULLFILLED</span><span class="token punctuation">,</span> resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token keyword keyword-this">this</span><span class="token punctuation">.</span><span class="token method function property-access">pushHandler</span><span class="token punctuation">(</span>onRejected<span class="token punctuation">,</span> <span class="token constant">REJECTED</span><span class="token punctuation">,</span> resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span><span class="token punctuation">;</span>

          <span class="token comment">// 当前这个新的promise(then返回的promise)并不知道上一个promise的状态的，后续处理都由下面函数处理.</span>
          <span class="token comment">// ，也可以不执行。在改变状态时会执行runhandlers。</span>

          <span class="token comment">// 执行上一个promise的所有后续任务</span>
          <span class="token keyword keyword-this">this</span><span class="token punctuation">.</span><span class="token method function property-access">runHandlers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token doc-comment comment">/**
   * !改变状态
   * <span class="token keyword keyword-@param">@param</span> <span class="token class-name"><span class="token punctuation">{</span>String<span class="token punctuation">}</span></span> <span class="token parameter">state</span> 状态
   * <span class="token keyword keyword-@param">@param</span> <span class="token class-name"><span class="token punctuation">{</span>所有类型<span class="token punctuation">}</span></span> <span class="token parameter">value</span> 值
   */</span>
  <span class="token function">changeState</span><span class="token punctuation">(</span><span class="token parameter">state<span class="token punctuation">,</span> value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 状态已不是pending。阻止执行，让其状态不可逆</span>
      <span class="token keyword control-flow keyword-if">if</span> <span class="token punctuation">(</span><span class="token keyword keyword-this">this</span><span class="token punctuation">.</span><span class="token property-access">state</span> <span class="token operator">!==</span> <span class="token constant">PENDING</span><span class="token punctuation">)</span> <span class="token keyword control-flow keyword-return">return</span><span class="token punctuation">;</span>
      <span class="token keyword keyword-this">this</span><span class="token punctuation">.</span><span class="token property-access">state</span> <span class="token operator">=</span> state<span class="token punctuation">;</span>
      <span class="token keyword keyword-this">this</span><span class="token punctuation">.</span><span class="token property-access">value</span> <span class="token operator">=</span> value<span class="token punctuation">;</span>

      <span class="token comment">//该函数执行意味着已经进入了rejected或者fullfilled状态,通常发生在new MyPromise执行时。那么执行后续then所添加的任务</span>
      <span class="token keyword keyword-this">this</span><span class="token punctuation">.</span><span class="token method function property-access">runHandlers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token doc-comment comment">/**
   * ! 添加then所注册的任务。
   * <span class="token keyword keyword-@param">@param</span> <span class="token class-name"><span class="token punctuation">{</span>Function<span class="token punctuation">}</span></span> <span class="token parameter">executer</span> then之后注册的处理函数。
   * <span class="token keyword keyword-@param">@param</span> <span class="token class-name"><span class="token punctuation">{</span>String<span class="token punctuation">}</span></span> <span class="token parameter">state</span>  什么情况下执行executer（成功？失败？）
   *  then会返回一个全新的promise对象。那么全新的promise得有默认处理函数。会根据前一个promise的状态决定执行那个函数。（resolve？reject？）
   * <span class="token keyword keyword-@param">@param</span> <span class="token class-name"><span class="token punctuation">{</span>Function<span class="token punctuation">}</span></span> <span class="token parameter">resolve</span>  then的链式调用。then之后会返回一个新的promise对象。该函数会将新的promise推向fullfiled状态。
   * <span class="token keyword keyword-@param">@param</span> <span class="token class-name"><span class="token punctuation">{</span>Function<span class="token punctuation">}</span></span> <span class="token parameter">reject</span>    then的链式调用。then之后会返回一个新的promise对象。该函数会将新的promise推向rejected状态。
   */</span>
  <span class="token function">pushHandler</span><span class="token punctuation">(</span><span class="token parameter">executer<span class="token punctuation">,</span> state<span class="token punctuation">,</span> resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword keyword-this">this</span><span class="token punctuation">.</span><span class="token property-access">handlers</span><span class="token punctuation">.</span><span class="token method function property-access">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
          state<span class="token punctuation">,</span>
          executer<span class="token punctuation">,</span>
          resolve<span class="token punctuation">,</span>
          reject<span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token doc-comment comment">/**
   * ! 挨个执行then注册的任务。
   */</span>
  <span class="token function">runHandlers</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 还是当前还是pending状态,那么不执行后续处理任务</span>
      <span class="token keyword control-flow keyword-if">if</span> <span class="token punctuation">(</span><span class="token keyword keyword-this">this</span><span class="token punctuation">.</span><span class="token property-access">state</span> <span class="token operator">===</span> <span class="token constant">PENDING</span><span class="token punctuation">)</span> <span class="token keyword control-flow keyword-return">return</span><span class="token punctuation">;</span>
      <span class="token keyword control-flow keyword-while">while</span> <span class="token punctuation">(</span><span class="token keyword keyword-this">this</span><span class="token punctuation">.</span><span class="token property-access">handlers</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword keyword-this">this</span><span class="token punctuation">.</span><span class="token method function property-access">runOneHandler</span><span class="token punctuation">(</span><span class="token keyword keyword-this">this</span><span class="token punctuation">.</span><span class="token property-access">handlers</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token comment">// 执行完毕后删除任务.</span>
          <span class="token keyword keyword-this">this</span><span class="token punctuation">.</span><span class="token property-access">handlers</span><span class="token punctuation">.</span><span class="token method function property-access">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token doc-comment comment">/**
   * !执行单个后续处理任务.
   * <span class="token keyword keyword-@param">@param</span> <span class="token class-name"><span class="token punctuation">{</span>Object<span class="token punctuation">}</span></span> <span class="token parameter">handle</span> then注册的任务对象
   */</span>
  <span class="token function">runOneHandler</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> executer<span class="token punctuation">,</span> state<span class="token punctuation">,</span> resolve<span class="token punctuation">,</span> reject <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 放到异步队列中的微队列。</span>
      <span class="token function">runAsyncTask</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token arrow operator">=&gt;</span> <span class="token punctuation">{</span>
          <span class="token comment">// 当前的状态与后续处理的状态不一致。</span>
          <span class="token comment">// 当前已经resolve了，那么应该执行为rosolve的处理函数。</span>
          <span class="token keyword control-flow keyword-if">if</span> <span class="token punctuation">(</span><span class="token keyword keyword-this">this</span><span class="token punctuation">.</span><span class="token property-access">state</span> <span class="token operator">!==</span> state<span class="token punctuation">)</span> <span class="token keyword control-flow keyword-return">return</span><span class="token punctuation">;</span>

          <span class="token comment">// 有执行then。但是没有添加处理函数</span>
          <span class="token comment">//那么会进行穿透，then返回的结果与当前的promise一致。</span>
          <span class="token keyword control-flow keyword-if">if</span> <span class="token punctuation">(</span><span class="token keyword keyword-typeof">typeof</span> executer <span class="token operator">!==</span> <span class="token string">'function'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token keyword keyword-this">this</span><span class="token punctuation">.</span><span class="token property-access">state</span> <span class="token operator">===</span> <span class="token constant">FULLFILLED</span>
                  <span class="token operator">?</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token keyword keyword-this">this</span><span class="token punctuation">.</span><span class="token property-access">value</span><span class="token punctuation">)</span>
                  <span class="token operator">:</span> <span class="token function">reject</span><span class="token punctuation">(</span><span class="token keyword keyword-this">this</span><span class="token punctuation">.</span><span class="token property-access">value</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span> <span class="token keyword control-flow keyword-else">else</span> <span class="token punctuation">{</span>
              <span class="token keyword control-flow keyword-try">try</span> <span class="token punctuation">{</span>
                  <span class="token comment">// 指向then注册的reject或resolve函数。</span>
                  <span class="token keyword keyword-const">const</span> result <span class="token operator">=</span> <span class="token function">executer</span><span class="token punctuation">(</span><span class="token keyword keyword-this">this</span><span class="token punctuation">.</span><span class="token property-access">value</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                  <span class="token comment">// 返回的是一个promise</span>
                  <span class="token keyword control-flow keyword-if">if</span> <span class="token punctuation">(</span>
                      <span class="token keyword keyword-typeof">typeof</span> result <span class="token operator">===</span> <span class="token string">'object'</span> <span class="token operator">&amp;&amp;</span>
                      <span class="token keyword keyword-typeof">typeof</span> result<span class="token punctuation">.</span><span class="token property-access">then</span> <span class="token operator">===</span> <span class="token string">'function'</span>
                  <span class="token punctuation">)</span> <span class="token punctuation">{</span>
                      <span class="token comment">// then执行返回的是一个promise。</span>
                      <span class="token comment">// 那么返回的promise对象的结果将作为下一个promise的值。</span>
                      <span class="token comment">// 解决：将当前promsie的后续处理函数添加到 返回的promise的then中。</span>
                      result<span class="token punctuation">.</span><span class="token method function property-access">then</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span><span class="token punctuation">;</span>
                  <span class="token punctuation">}</span> <span class="token keyword control-flow keyword-else">else</span> <span class="token punctuation">{</span>
                      <span class="token function">resolve</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
                  <span class="token punctuation">}</span>
              <span class="token punctuation">}</span> <span class="token keyword control-flow keyword-catch">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                  <span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>
                  <span class="token console class-name">console</span><span class="token punctuation">.</span><span class="token method function property-access">log</span><span class="token punctuation">(</span>
                      error<span class="token punctuation">,</span>
                      <span class="token string">'这是手写Promise时 try catch捕获到的错误，可无视'</span>
                  <span class="token punctuation">)</span><span class="token punctuation">;</span>
              <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 以下代码为promise的法 catch，race……</span>
  <span class="token doc-comment comment">/**
   * ! MyPromise.prototype.catch()
   * <span class="token keyword keyword-@param">@param</span> <span class="token class-name"><span class="token punctuation">{</span>Function<span class="token punctuation">}</span></span> <span class="token parameter">reason</span> rejected后的处理函数。
   * Promise.catch: 该方法只处理promise为rejected的后续任务。
   */</span>
  <span class="token keyword control-flow keyword-catch">catch</span><span class="token punctuation">(</span>reason<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword control-flow keyword-return">return</span> <span class="token keyword keyword-this">this</span><span class="token punctuation">.</span><span class="token method function property-access">then</span><span class="token punctuation">(</span><span class="token keyword null nil keyword-null">null</span><span class="token punctuation">,</span> reason<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token doc-comment comment">/**
   * ! MyPromise.prototype.finally()
   * finally() 方法返回一个Promise。在promise结束时
   * ，无论结果是fulfilled或者是rejected，都会执行指定的回调函数。
   * 这为在Promise是否成功完成后都需要执行的代码提供了一种方式。
   * 这避免了同样的语句需要在then()和catch()中各写一次的情况。
   *
   * 如果finally传入的函数执行过程中出现了错误，那么后续的then会进入rejected；
   * 它返回的promise的状态数据与之前的保持一致。与穿透一样。
   * <span class="token keyword keyword-@param">@param</span> <span class="token class-name"><span class="token punctuation">{</span>Function<span class="token punctuation">}</span></span> executer;
   */</span>
  <span class="token keyword control-flow keyword-finally">finally</span><span class="token punctuation">(</span>executer<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword control-flow keyword-return">return</span> <span class="token keyword keyword-this">this</span><span class="token punctuation">.</span><span class="token method function property-access">then</span><span class="token punctuation">(</span>
          <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token arrow operator">=&gt;</span> <span class="token punctuation">{</span>
              <span class="token function">executer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
              <span class="token keyword control-flow keyword-return">return</span> data<span class="token punctuation">;</span> <span class="token comment">//返回前一个promise的状态数据</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">(</span><span class="token parameter">reason</span><span class="token punctuation">)</span> <span class="token arrow operator">=&gt;</span> <span class="token punctuation">{</span>
              <span class="token function">executer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
              <span class="token console class-name">console</span><span class="token punctuation">.</span><span class="token method function property-access">log</span><span class="token punctuation">(</span>reason<span class="token punctuation">)</span><span class="token punctuation">;</span>
              <span class="token keyword control-flow keyword-throw">throw</span> reason<span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
      <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token doc-comment comment">/**
   * ! MyPromise.resolve()
   * <span class="token keyword keyword-@param">@param</span> <span class="token class-name"><span class="token punctuation">{</span>所有<span class="token punctuation">}</span></span> <span class="token parameter">data</span>
   * <span class="token keyword keyword-@returns">@returns</span>
   *  1、如果传入的是一个prosmie对象，那么直接返回该值
   *  2.如果不是那么返回一个全新的promise对象。
   *      但是如果传入的是一个满足Promise A+规范的得另处理。
   *     不是那么直接返回已完成得promsie。
   */</span>
  <span class="token keyword keyword-static">static</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 如果传入的是一个promise对象。</span>
      <span class="token keyword control-flow keyword-if">if</span> <span class="token punctuation">(</span>data <span class="token keyword keyword-instanceof">instanceof</span> <span class="token class-name">MyPromise</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword control-flow keyword-return">return</span> data<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword control-flow keyword-return">return</span> <span class="token keyword keyword-new">new</span> <span class="token class-name">MyPromise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token arrow operator">=&gt;</span> <span class="token punctuation">{</span>
          <span class="token comment">// 为其他的满足了promise A+规范得promsie。</span>
          <span class="token keyword control-flow keyword-if">if</span> <span class="token punctuation">(</span><span class="token keyword keyword-typeof">typeof</span> data <span class="token operator">===</span> <span class="token string">'object'</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword keyword-typeof">typeof</span> data<span class="token punctuation">.</span><span class="token property-access">then</span> <span class="token operator">===</span> <span class="token string">'function'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
              data<span class="token punctuation">.</span><span class="token method function property-access">then</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span> <span class="token keyword control-flow keyword-else">else</span> <span class="token punctuation">{</span>
              <span class="token function">resolve</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token doc-comment comment">/**
   * ! MyPromise.reject();
   * <span class="token keyword keyword-@param">@param</span> <span class="token class-name"><span class="token punctuation">{</span>any<span class="token punctuation">}</span></span> <span class="token parameter">data</span>
   * <span class="token keyword keyword-@returns">@returns</span>
   * 静态函数Promise.reject返回一个被拒绝的Promise对象。
   * 通过使用Error的实例获取错误原因reason对调试和选择性错误捕捉很有帮助。
   */</span>
  <span class="token keyword keyword-static">static</span> <span class="token function">reject</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword control-flow keyword-return">return</span> <span class="token keyword keyword-new">new</span> <span class="token class-name">MyPromise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">r<span class="token punctuation">,</span> j</span><span class="token punctuation">)</span> <span class="token arrow operator">=&gt;</span> <span class="token punctuation">{</span>
          <span class="token function">j</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token doc-comment comment">/**
   * !Promise.all()
   * Promise.all() 方法接收一个promise的iterable类型（注：Array，Map，
   * Set都属于ES6的iterable类型）的输入，并且只返回一个Promise实例，
   * 那个输入的所有promise的resolve回调的结果是一个数组。
   * 这个Promise的resolve回调执行是在所有输入的promise的resolve回调都结束，
   * 或者输入的iterable里没有promise了的时候。它的reject回调执行是，
   * 只要任何一个输入的promise的reject回调执行或者输入不合法的promise就会立即抛出错误，
   * 并且reject的是第一个抛出的错误信息。
   *
   * 支持迭代器得都可以使用for  of循环。并不一定支持for循环
   * )
   *
   * 传入值：支持可迭代的数据
   *        如果传入的是一个空数组，那么返回空数组
   *        如果是不支持迭代协议的，那么会进入rejected。
   *
   * 返回值：一个新的promise
   * then后续处理：
   *       fullfiled：返回一个数组，并且与传入的promise顺序对应。
   *
   *       rejected：值为第一个进入rejected的promise的值。
   *
   *
   * 其他细节描述：1多数时候传递的都是promise，但是如果不是，那么会将该数据使用一个新的promise包装。
   *                 ===》 [pro1, pro2, pro3, 123]--&gt; 123进行一下操作---》 Promise.resolve(123
   *             2如果执行过程中有一个promsie失败了，那么不再处理，意味着所有的都结束了。并会返回错误的数据。
   * <span class="token keyword keyword-@param">@param</span> <span class="token class-name"><span class="token punctuation">{</span>iterable<span class="token punctuation">}</span></span>  <span class="token parameter">iterable</span>
   */</span>
  <span class="token keyword keyword-static">static</span> <span class="token function">all</span><span class="token punctuation">(</span><span class="token parameter">iterable</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword control-flow keyword-return">return</span> <span class="token keyword keyword-new">new</span> <span class="token class-name">MyPromise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token arrow operator">=&gt;</span> <span class="token punctuation">{</span>
          <span class="token keyword control-flow keyword-try">try</span> <span class="token punctuation">{</span>
              <span class="token keyword keyword-const">const</span> result <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">//记录已完成的数据。</span>
              <span class="token keyword keyword-let">let</span> promCount <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">//下标，记录有多少个promise。</span>
              <span class="token keyword keyword-let">let</span> fullfilledProm <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">//记录已完成的promise个数。</span>
              <span class="token keyword control-flow keyword-for">for</span> <span class="token punctuation">(</span><span class="token keyword keyword-const">const</span> prom <span class="token keyword keyword-of">of</span> iterable<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                  <span class="token keyword keyword-const">const</span> selfIndex <span class="token operator">=</span> promCount<span class="token punctuation">;</span> <span class="token comment">//记录当前这个promise的专属下标。</span>
                  promCount<span class="token operator">++</span><span class="token punctuation">;</span> <span class="token comment">//promise数量加一。</span>
                  <span class="token comment">// 如果传入的不是promise。--》数字，字符串等。它们不具有then方法。会报错。</span>
                  <span class="token comment">// 把数据进行包装变为promise，那么都会具有then函数。</span>
                  <span class="token maybe-class-name">MyPromise</span><span class="token punctuation">.</span><span class="token method function property-access">resolve</span><span class="token punctuation">(</span>prom<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token method function property-access">then</span><span class="token punctuation">(</span>
                      <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token arrow operator">=&gt;</span> <span class="token punctuation">{</span>
                          fullfilledProm<span class="token operator">++</span><span class="token punctuation">;</span> <span class="token comment">//已完成的promise数量+1；</span>
                          result<span class="token punctuation">[</span>selfIndex<span class="token punctuation">]</span> <span class="token operator">=</span> data<span class="token punctuation">;</span> <span class="token comment">//根据专属下标添加数据。</span>

                          <span class="token comment">// 所有的都完成了。</span>
                          fullfilledProm <span class="token operator">===</span> promCount <span class="token operator">&amp;&amp;</span> <span class="token function">resolve</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
                      <span class="token punctuation">}</span><span class="token punctuation">,</span>
                      <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token arrow operator">=&gt;</span> <span class="token punctuation">{</span>
                          <span class="token comment">// 有一个promise失败了。</span>
                          <span class="token comment">// 传入的reject函数只会更改属于自己的promsie。</span>
                          <span class="token comment">// 当传入的promsie失败了，那么这个rejected会更该Promise.all返回的promise状态。</span>
                          <span class="token comment">// 同时意味着promise.all的结束，且状态不可逆。</span>
                          <span class="token function">reject</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
                      <span class="token punctuation">}</span>
                  <span class="token punctuation">)</span><span class="token punctuation">;</span>
              <span class="token punctuation">}</span>
              <span class="token comment">// 此时循环已经完毕，如果传入的promise的个数为0；</span>
              promCount <span class="token operator">===</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> <span class="token function">resolve</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span> <span class="token keyword control-flow keyword-catch">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token comment">// 走到这意味着不支持迭代协议</span>
              <span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>
              <span class="token console class-name">console</span><span class="token punctuation">.</span><span class="token method function property-access">log</span><span class="token punctuation">(</span>
                  error<span class="token punctuation">,</span>
                  <span class="token string">'这是手写Promise时 try catch捕获到的错误，可无视'</span>
              <span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token doc-comment comment">/**
   * ! MyPromise.allsettled()
   * <span class="token keyword keyword-@param">@param</span> <span class="token class-name"><span class="token punctuation">{</span>iterable<span class="token punctuation">}</span></span> <span class="token parameter">iterable</span>
   * 该Promise.allSettled()方法返回一个在所有给定的promise都已经fulfilled或rejected后的promise，
   * 并带有一个对象数组，每个对象表示对应的promise结果。
   * 当您有多个彼此不依赖的异步任务成功完成时，或者您总是想知道每个promise的结果时，通常使用它。
   * 相比之下，Promise.all() 更适合彼此相互依赖或者在其中任何一个reject时立即结束。
   *
   * 接受参数：可迭代就行。
   *          如果传入的参数里数量为0 --》返回空数组
   *          如果是不支持迭代协议的，那么会进入rejected。
   *
   * 返回值：  一个新的promise
   *
   * then的后续处理：
   *          fullfilled：数据为一个数组。与传入时顺序一一对应。数组每一项为对象，
   *                      有一个state属性记录状态（fullfiled，rejected）。
   *                      如果为rejected，那么有一个reason属性记录失败值
   *                      如果为fullfiled，那么有一个value属性记录成功值
   *
   *
   */</span>
  <span class="token keyword keyword-static">static</span> <span class="token function">allSettled</span><span class="token punctuation">(</span><span class="token parameter">iterable</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 的一种写法</span>
      <span class="token doc-comment comment">/**
         return new MyPromise((resolve, reject) =&gt; <span class="token punctuation">{</span>
          const result = [];
          let index = 0;
          let fullfilledProm = 0;

          const pushData = (index, prop, state, value) =&gt; <span class="token punctuation">{</span>
              result[index] = (<span class="token punctuation">{</span>
                  state,
                  [prop]: value,
              <span class="token punctuation">}</span>)
          <span class="token punctuation">}</span>;
          for (const prom of iterable) <span class="token punctuation">{</span>
              const selfIndex = index;
              index++;
              MyPromise.resolve(prom).then(data =&gt; <span class="token punctuation">{</span>
                  fullfilledProm++;
                  pushData(selfIndex, 'value', FULLFILLED, data)
                  index === fullfilledProm &amp;&amp; resolve(result);
              <span class="token punctuation">}</span>, data =&gt; <span class="token punctuation">{</span>
                  fullfilledProm++;
                  pushData(selfIndex, 'value', FULLFILLED, data)
                  index === fullfilledProm &amp;&amp; resolve(result);
              <span class="token punctuation">}</span>)
          <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>)
       */</span>

      <span class="token comment">// 第二种写法</span>
      <span class="token keyword keyword-const">const</span> newPromList <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">//保存传入的promise改造之后的promise，</span>

      <span class="token keyword control-flow keyword-for">for</span> <span class="token punctuation">(</span><span class="token keyword keyword-const">const</span> prom <span class="token keyword keyword-of">of</span> iterable<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// 改造传入的promise。利用身上的then进行改造。</span>
          <span class="token comment">//  1.then注册的函数无论时成功还是失败，那么的返回值都会作为下一次then的状态数据。如果上一次的resolve，reject都有返回值，那么下一次then只会走resolve</span>
          <span class="token doc-comment comment">/**
           * const p1 = new Promise((resolve, reject) =&gt; <span class="token punctuation">{</span>
                  setTimeout(() =&gt; <span class="token punctuation">{</span>
                      reject("1")
                  <span class="token punctuation">}</span>, 100);
              <span class="token punctuation">}</span>)
              // p1的后续处理都有返回值。那么p2的then只会走resolve
              const p2 = p1.then(value =&gt; <span class="token punctuation">{</span>
                  return value;
              <span class="token punctuation">}</span>, reason =&gt; <span class="token punctuation">{</span>
                  return reason
              <span class="token punctuation">}</span>)
              // 此时就只会成功。
              p2.then(d =&gt; <span class="token punctuation">{</span>
                  console.log(d);
              <span class="token punctuation">}</span>)
           * 
           * 
           */</span>

          <span class="token comment">// 改造成只会成功的promise。</span>
          <span class="token keyword keyword-const">const</span> fullfilledProm <span class="token operator">=</span> <span class="token maybe-class-name">MyPromise</span><span class="token punctuation">.</span><span class="token method function property-access">resolve</span><span class="token punctuation">(</span>prom<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token method function property-access">then</span><span class="token punctuation">(</span>
              <span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token arrow operator">=&gt;</span> <span class="token punctuation">{</span>
                  <span class="token keyword control-flow keyword-return">return</span> <span class="token punctuation">{</span>
                      value<span class="token punctuation">,</span>
                      state<span class="token operator">:</span> <span class="token constant">FULLFILLED</span><span class="token punctuation">,</span>
                  <span class="token punctuation">}</span><span class="token punctuation">;</span>
              <span class="token punctuation">}</span><span class="token punctuation">,</span>
              <span class="token punctuation">(</span><span class="token parameter">reason</span><span class="token punctuation">)</span> <span class="token arrow operator">=&gt;</span> <span class="token punctuation">{</span>
                  <span class="token keyword control-flow keyword-return">return</span> <span class="token punctuation">{</span>
                      reason<span class="token punctuation">,</span>
                      state<span class="token operator">:</span> <span class="token constant">REJECTED</span><span class="token punctuation">,</span>
                  <span class="token punctuation">}</span><span class="token punctuation">;</span>
              <span class="token punctuation">}</span>
          <span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token comment">// 添加到列表</span>
          newPromList<span class="token punctuation">.</span><span class="token method function property-access">push</span><span class="token punctuation">(</span>fullfilledProm<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// 利用自身的方法执行并得到所有成功后的数据。</span>
      <span class="token keyword control-flow keyword-return">return</span> <span class="token maybe-class-name">MyPromise</span><span class="token punctuation">.</span><span class="token method function property-access">all</span><span class="token punctuation">(</span>newPromList<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword keyword-static">static</span> <span class="token function">race</span><span class="token punctuation">(</span><span class="token parameter">itterable</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword control-flow keyword-return">return</span> <span class="token keyword keyword-new">new</span> <span class="token class-name">MyPromise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token arrow operator">=&gt;</span> <span class="token punctuation">{</span>
          <span class="token keyword control-flow keyword-for">for</span> <span class="token punctuation">(</span><span class="token keyword keyword-const">const</span> prom <span class="token keyword keyword-of">of</span> itterable<span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token maybe-class-name">MyPromise</span><span class="token punctuation">.</span><span class="token method function property-access">resolve</span><span class="token punctuation">(</span>prom<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token method function property-access">then</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</pre>
    <p><a name="l01PU" href="file:///C:\Users\Mr.Chen\Desktop"></a></p>





    <h3 class="mume-header" id="anchor-title-8">九、Fetch API</h3>

    <p><strong>9.2Fetch 返回值</strong><br>fetch 返回的是一个 Promise 对象。那么就可以使用 async，await。<br>-当收到服务器的返回结果后，Promise 进入
        fulfilled 状态，状态数据为 Response 对象。只要服务器给了响应就会进入 fulfilled。不管响应结果如何。<br>-当网络发送错误（或其他导致无法完成交互的错误）时，Promise 进入
        rejected 状态，状态数据为错误信息。<br>
        <a name="nzy1b" href="file:///C:\Users\Mr.Chen\Desktop"></a>
    </p>



    <h3 class="mume-header" id="anchor-title-9">十、迭代器和生成器
    </h3>

    <p><strong>10.1 迭代器</strong><br>迭代器：一个具有 next 方法的对象，next 方法返回下一个数据并且能指示是否迭代完成。<br>-迭代器创建函数（iterator
        creator）：一个迭代器的函数。<br>总结：迭代器就像一个仓库的管理员，会帮我们取数据。不用自己跟数据打交道。<br>迭代器思想：取下一个取下一个，还有没有还有没有？。<br><strong>10.2 迭代协议与
            for of 循环</strong><br>1.ES6 规定，如果一个对象具有知名符号 “Symbol.iterator”，并且属性是一个迭代器创建函数，那么这个对象就是可迭代的。<br>2.for-of
        循环用于可迭代的对象。格式：<br>for（let item of iterable）{<br>item：迭代对象的 value
        值<br>iterable：可迭代的对象。<br>}<br>3.展开运算符可以作用于可迭代对象，可以轻松的将可迭代对象转换为数组。<br><strong>10.3
            生成器---为了简化迭代器。</strong><br>1.生成器是一个通过构造函数 Generator
        创建的对象。生成器既是一个迭代器，同时又是一个可迭代对象。<br>2.必须使用生成器函数才能创建一个生成器（Generator Function）<br>3.function* test（）{} &nbsp;
        &nbsp;&nbsp;*test（）就能创建一个生成器了。调用改方法得到的一定是生成器。<br>4.调用了生成器并不会执行函数里的代码，只有调用 next
        方法才会执行。<br>1）生成器函数内部是为了给生成器每次迭代提供的数据<br>2）每次调用生成器的 next 方法，将导致生成器函数运行到下一个 yield[/jiːld/出产（产品|作物）
        ]关键字位置。<br>3）yield 是一个关键字，该关键字只能在生成器函数内部使用。表示“产生一个迭代数据”。<br>5.展开运输符是可以展开可迭代对象的。<br>
        <a name="mEhUj" href="file:///C:\Users\Mr.Chen\Desktop"></a>
    </p>
    <h3 class="mume-header" id="anchor-title-10">
        十一、更多的集合类型</h3>

    <p><strong>11.1 set 集合--一个不能重复数据的集合（能进行简单的去重）</strong><br>1.基本使用：<br>&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp; 1).new Set（可迭代的对象）就创建了一个 set 集合。 <br>2).set.add( data ) 在末尾添加一个数据。如果已经有了则不进行任何操作。<br>set 使用
        <a href="http://Object.is">Object.is</a>（）判断是否相等，但是 set 里+0 与 -0 是相等的。<br>3).
        has（data）：判断是否有对应的数据<br>4).delete（data）：删除对应的数据。返回是否删除成功。<br>5).clear（）：清除整个集合。<br>6).size 数据总数<br>7)set
        本身也是一个可以迭代的对象，每次迭代的结果就是每一项的值。<br>2.set 遍历<br>1）for of 循环<br>2）forEach（）*这里不存在下标。<br>**11.2map 集合--用于存储多个键值对数据。
        **<br>1 创建 map 对象 &nbsp;new&nbsp;Map([ ['a',&nbsp;1],&nbsp;['b',&nbsp;2],&nbsp;['c',&nbsp;3] ])<br>
        <a name="TSckh" href="file:///C:\Users\Mr.Chen\Desktop"></a>
    </p>
    <h3 class="mume-header" id="anchor-title-11">十二、代理和反射</h3>

    <p><strong>12.1【回顾】属性描述符</strong><br>&nbsp;&nbsp; 存取器属性<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
        属性描述符中，如果配置了 get 和 set 中的任意一个，那么该属性不再是一个普通属性<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        存取器属性<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;get 和 set 都是函数，如果一个属性是存取器属性，那么读取该属性时，会运行 get
        方法<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 将 get
        方法得到的返回值作为属性值；<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 如果时给属性赋值，则运行 set 方法。<br>配置<br> &nbsp;
        &nbsp;&nbsp; &nbsp;value:&nbsp;''。属性值<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;configurable:&nbsp;
        属性描述本身是否可以修改。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;writable:&nbsp;
        属性值是否可写入（重新赋值）<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enumerable:&nbsp; 该属性是否可枚举。<br>注意细节<br>配置了
        value 与 writable 就不能配置 set 与 get。配置 set 与 get 不能再配置 value 与 writable。<br>配置 get 与 set
        后就变成了一个存取器属性，那么就没有了内存空间，就不需要 value 值。--矛盾了。</p>
    <p><strong>Proxy(代理）为一个类</strong><br><strong>proxy</strong></p>
    <p><a name="ySxeZ" href="file:///C:\Users\Mr.Chen\Desktop"></a></p>
    <h3 class="mume-header" id="anchor-title-12">
        十三、增前的数组功能</h3>

    <p><strong>13.1 新增的数组 API</strong><br>1.静态方法--如 length，放在构造函数身上的方法<br>1）Array.of(...args)
        创建一个新数组。<br>2）Array.from(arg) 把类数组，可迭代对象，变成一个新的数组<br>2.实例方法--this.xx。通过 this 绑定的方法。<br>·&nbsp;
        &nbsp;&nbsp;&nbsp; &nbsp;find(callback) : 查找某一个满足条件的第一个原始<br> findIndex(callback) :
        找到满足条件的第一个原始的下标<br>fill(data) : 用指定的数据填充满数组所有的内容。<br>copyWithin( target,start?,end?):
        在数组内完成赋值。<br>includes(data) : 判断数组是否包含某个值，使用得是 <a href="http://Object.is">Object.is</a> 匹配。<br>
        <a name="N4Vk9" href="file:///C:\Users\Mr.Chen\Desktop"></a>
    </p>
    <h3 class="mume-header" id="anchor-title-13">十四、技术提升 1</h3>

    <p><strong>1.对象</strong><br>1）Object.entries(obj) 把对象里的值变为[ [key,value] ,[key,value] ] <br><strong>2.ES2019 新增
            API</strong><br>1）.flat( infinity || num ) 扁平化数组。<br>2）.flatMap(it=&gt;xx)&nbsp; &nbsp;&nbsp;
        根据要求隐射再扁平化<br>3）Object.fromEntries(arr) ;把数组[ [ 'a', 1], ['b': 2 ] 变成 {a : 1, b : 2}<br>4）String.trim()去掉首尾空格
        trimLeft() || trimStart 左边空格。 trimEnt() || trimRight()右边空格。<br><strong>2.ES2020</strong><br>1）可选链操作符。obj?.a?.b
        如果 obj 有 a 执行后续代码，没有那么直接返回 undefined。<br>2）空位合并操作符 a ？？b --&gt; a === undefined || a ===&nbsp; &nbsp;null ? b :
        a 。 a 有值用 a ，没有用 b。<br>3）Promise.allSettled( [] ).then(result=&gt;{})&nbsp; &nbsp;&nbsp; 当数组里的函数全部进入已决状态时，那么当前的
        promise 对象就进入已决状态。状态数据为数组里每个 promise 的已决信息。 <br>4）globalThis--this 指向为 window。node 中全局为 global。浏览器环境中全局为
        window。<br>Promise<br>const&nbsp;pro1&nbsp;=&nbsp;new&nbsp;Promise((fulfill,&nbsp;reject)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;setTimeout(()&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;reject();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},&nbsp;1000);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;})<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;pro1
        的结果为 rejected，pro1 并没有处理 rejecte 状态。那么 pro2 的状态就与 pro1 保持一致--》为 rejected
        状态。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;pro2&nbsp;=&nbsp;pro1.then(data&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;throw&nbsp;new&nbsp;Error('errow');<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;})<br>
        <a name="qE2Qa" href="file:///C:\Users\Mr.Chen\Desktop"></a>
    </p>

</div>
            
            `
        }
    }
    )

})

// 获取文章评论
Mock.mock(/^\/api\/comment\/?(\?.+)?/, 'get', function (options) {
    const params = getURLParams(options.url)
    params.limit <= 2
    return Mock.mock({
        code: 0,
        msg: "",
        data: {
            "total|13-40": 0,
            [`rows|${params.limit}`]: [
                {
                    id: "@guid",
                    "nickName|1": person,
                    content: "@cparagraph(1,15)",
                    createTime: Mock.Random.date('yyyy-MM-dd'),
                    'avatar|1': avatars
                }
            ]
        }
    })
})

// /**
//  *  * 提交评论
//  * @param {
//  *  nickName:"昵称"
// *   text："提交的评论"
// *   id:"文章的id"
// * }
//  */
Mock.mock('/api/comment', 'post', function (options) {

    // 提交的评论对象。
    const commentObj = JSON.parse(options.body) || {};
    return Mock.mock({
        code: 0,
        msg: "",
        data: {
            id: "@guid",
            nickName: '@cname',
            content: "@cparagraph(1,10)",
            createTime: Mock.Random.date('yyyy-MM-dd'),
            'avatar|1': avatars
        }
    })
})

