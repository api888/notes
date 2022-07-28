setup的两个注意点（149）
[TOC]

# setup执行时机

`setup` 在 `beforeCreate` 之前执行一次，`this` 是 `undefined`

# setup的两个参数

## props

`props` 值为对象，包含：组件外部传过来，且组件内部声明接收了的属性

> 回顾Vue2中props传参，如：

`App.vue`
```html
<template>
  <TestProps name="张三" :age="12" />
</template>
<script>
import TestProps from './components/TestProps.vue';
export default {
  name: 'App',
  components: { TestProps },
};
</script>
```

`TestProps`
```html
<template>
  <div>
    <h2>姓名:{{ name }}</h2>
    <h2>年龄:{{ age }}</h2>
  </div>
</template>
<script>
export default {
  name: 'TestProps',
  props: ['name', 'age'],
  mounted() {
    console.log(this);
  },
};
</script>
```
控制台打印：

![](https://cdn.jsdelivr.net/gh/api888/PublicPic@main//img/iShot2022-06-17%2016.54.30.png)

声明接收的属性，会存放在组件实例对象身上

如果父组件传了，但是子组件没有声明接收呢，修改下`TestProps` 组件

```html
<template>
  <div></div>
</template>
<script>
export default {
  name: 'TestProps',
  mounted() {
    console.log(this);
  },
};
</script>
```

控制台打印：

![](https://cdn.jsdelivr.net/gh/api888/PublicPic@main//img/iShot2022-06-17%2016.51.01.png)

没有声明接收的数据，会被存放在组件实例对象的 `$attrs` 对象中


## context

`context` 为上下文对象：

- attrs：值为对象，包含：组件外部传递过来，但是组件内部没有声明接收的属性，相当于 `this.$attrs`。
- slots：收到的插槽内容，相当于 `this.$slots`

> 回顾Vue2中的插槽

`App.vue`

```html
<template>
  <TestSlots>
    <h2>想往插槽中放的内容</h2>
  </TestSlots>
</template>
<script>
import TestSlots from './components/TestSlots.vue';
export default {
  name: 'App',
  components: { TestSlots },
};
</script>
```

`TestSlots.vue`
```html
<template>
  <div>子组件</div>
</template>
<script>
export default {
  name: 'TestSlots',
  mounted() {
    console.log(this);
  },
};
</script>
```

控制台打印

![](https://cdn.jsdelivr.net/gh/api888/PublicPic@main//img/iShot2022-06-17%2017.05.05.png)

如果父组件想要使用插槽，无论子组件是否有对应的插槽声明，都会存放到组件实例对象的 `$slots` 中


- emit：分发自定义事件的函数，相当于 `this.$emit`