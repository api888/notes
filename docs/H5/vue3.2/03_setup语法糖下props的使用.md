3_setup语法糖下props的使用

[TOC]

# props的使用_defineProps

## 运行时声明

> 顾名思义，运行时声明，就是需要在运行中会生效的一种声明。
> 比如在这里，对于`props`的运行时声明，会`在运行后给出提示`，例如：`options API`的`props`写法，也就是运行时声明。

```js
props:{
    height:Number,
    title:String,
}
```

运行后会检查对应传递的`props`类型，因此这种叫运行时声明。

## 类型声明

> 在这里类型声明指基于`ts`的类型检查，`ts`的类型检查仅限于编译时的类型检查，编译成`js`后，就不再受类型的约束了，要使用类型声明，需要基于`ts`，即`<script setup lang="ts">`

<span id="_compiler_macros"></span>
## 编译时宏命令（Compiler Macros）

`<script setup>`其实就是普通的`<script>`语法糖，在运行前会经过一个编译的过程，这个语法糖还提供了一系列的宏命令供开发者使用，会在编译阶段进行替换。

简单点来说，宏命令就是一系列预定义的规则替换一定的文本模式，当解释器或者编译器在遇到宏（一定规则的文本）时自动进行替换。

## props的基本用法

为了在`<script setup>`中声明`props`，必须使用`defineProps` API，这是一个宏命令，不需要导入，直接在`<script setup>`中使用，且只能在`<script setup>`中使用，有两种方式可以使用这个宏命令声明`props`，运行时声明和类型声明，不同的方式下使用这个宏命令后`props`将具备不同的类型推断。

### 运行时声明使用`props`

`defineProps`运行时声明的基本用法如下，仅支持运行时的校验（volar插件还是完美支持了IDE的校验和提示）。

```ts
<script setup lang="ts">
const props = defineProps({
  foo: String,
  bar: {
    type: Number,
    required: true,
  },
})
</script>
```

### 类型声明使用`props`

`defineProps`类型声明的基本用法如下:

```ts
<script setup lang="ts">
const props = defineProps<{
  foo?: string;
  bar: number;
}>();
</script>
```

**运行时声明和类型声明不能同时存在**

错误写法：

```ts
<script setup lang="ts">
const props = defineProps<{
  foo?: string;
  bar: number;
}>({
  ...
});
</script>
```

# props的默认值_widthDefaults

> `defineProps`使用类型声明的不足之处在于，它没有可以给`props`提供默认值的方式，`widthDefaults`宏命令就是为了解决这个问题

## 基本用法

```ts
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string;
    list?: List.Basic[];
  }>(),
  {
    title: 'DefaultTitle',
    list: () => [
      { id: 1, content: '1', isDone: false },
      { id: 2, content: '2', isDone: true },
    ],
  },
);
</script>
```