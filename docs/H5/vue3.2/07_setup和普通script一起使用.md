7_`<script setup>`和普通`<script>`一起使用

[TOC]

> `<script setup>`和普通`<script>`可以一起使用。普通的`<script>`在有这些需求的情况下或许会被使用到：


- 无法在`<script setup>`声明的选项，例如`inheritAttrs`或通过插件启用的自定义的选项

> `inheritAttrs`属性解释:如果不希望组件的根元素继承特性，你可以在组件的选项中设置 inheritAttrs: false。

`父组件parent-component.vue`

```html
<template>
　<div class="parent">
    <child-component aaa="1111"></child-component>
  </div>
</template>
<script>
import ChildComponent from './child-component'
export default {
  components: {
    ChildComponent
  }
}
</script>
```

`子组件 child-component.vue`

设置 `inheritAttrs: true（默认）`

```html
<template>
  <div class="child">子组件</div>
</template>
<script>
export default {
  inheritAttrs: true,
  mounted() {
    console.log('this.$attrs', this.$attrs)
  }
}
</script>
```

最后渲染的结果：

Elements

![](https://img2018.cnblogs.com/blog/1298706/201906/1298706-20190629114826938-1555065923.png)

控制台输出

![](https://img2018.cnblogs.com/blog/1298706/201906/1298706-20190629114845325-760983584.png)

可以发现，子组件中能够渲染到父组件传入的`aaa="111"`

`子组件 child-component.vue`  
设置 `inheritAttrs: false`

```html
<template>
  <div class="child">子组件</div>
</template>
<script>
export default {  inheritAttrs: fasle,
  mounted() {
    console.log('this.$attrs', this.$attrs)
  }
}
</script>
```

最后渲染的结果：

Elements
![](https://img2018.cnblogs.com/blog/1298706/201906/1298706-20190629115139668-1500270722.png)

控制台输出
![](https://img2018.cnblogs.com/blog/1298706/201906/1298706-20190629114845325-760983584.png)

可以发现，Elements没有渲染`aaa="111"`

由上述例子可以看出，前提：子组件的props中未注册父组件传递过来的属性。

    1. 当设置inheritAttrs: true（默认）时，子组件的顶层标签元素中（本例子的div元素）会渲染出父组件传递过来的属性(本例子的aaa="1111")。
    
    2. 当设置inheritAttrs: false时，子组件的顶层标签元素中（本例子的div元素）不会渲染出父组件传递过来的属性(本例子的aaa="1111")。
    
    3. 不管inheritAttrs为true或者false，子组件中都能通过$attrs属性获取到父组件中传递过来的属性。

- 显示定义组件的名称
    
    `<script setup>`无法定义组件的名称，组件名称会根据文件名自动推断，此时可以和`<script>`一起使用，自定义组件的名称
    
```html
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'CustomName',
});
</script>
<script setup lang="ts">
import { ref } from 'vue';
const test = ref(1);
</script>
<template>
  <div></div>
</template>
```

- 运行副作用或者创建只需要执行一次的对象。
    
    组件每实例化一次，`<script setup>`代码都会被执行一次，如果组件中某段逻辑只想在组件被引入的时候执行一次，可以和`<script>`一起使用

```ts
<script lang="ts">
import { defineComponent, reactive } from 'vue';
// 只会在组件被引入的时候执行一次
const val = reactive({
  title: '测试',
});
export default defineComponent({
  name: 'CustomName',
});
</script>
<script setup lang="ts">
import { ref } from 'vue';
// 组件每次被实例化都会执行
const test = ref(1);
</script>
<template>
  <div></div>
</template>
```

**注意** 如果同时使用`<script setup>`和`<script>`，那么将打破`<script setup>`的默认关闭（外部无法获取组件内部的绑定，也就是内部声明的属性和方法，需要显示暴露），此时，组件内部的属性和方法都将在外部可以获取到，例如：`ref.xxx`。因为`<script>`默认是对外暴露的