5_setup语法糖下显示暴露

[TOC]

# 显示的暴露_defineExpose

## 基本使用

> 默认情况下使用`<script setup>`的组件是默认关闭的（外界无法访问声明在其中的变量、函数），也就是说通过模板`ref`或者`$parent`链接取到的组件的实例，并不会暴露任何在`<script setup>`中声明的绑定（变量、函数）。
> 为了在`<script setup>`组件中明确要暴露出去的属性，那么就需要使用`defineExpose`这个宏命令

### 不使用`<script setup>`情况下，获取子组件绑定

`子组件`

```ts
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const count = ref(1);
    const handle = () => console.log('子组件中的方法');

    return {
      count,
      handle,
    };
  },
});
</script>
```

`父组件`

```ts
<script setup lang="ts">
import { defineComponent, onMounted } from 'vue';
import Class08Vue from './Class08.vue';
import { ref } from '@vue/runtime-core';
const test = ref(null);
onMounted(() => {
  console.log(test.value, test.value.count);
});
</script>
<template>
  <Class08Vue ref="test" />
</template>
```

控制台输出
```
Proxy {…} 1
```

可以正常获取绑定的值


### 使用`<script setup>`情况下，默认是无法获取组件中的绑定

`子组件`

```ts
<script setup lang="ts">
import { ref } from 'vue';

const count = ref(1);
const handleClick = () => console.log('子组件中的时间');
</script>
```

`父组件`

```ts
<script setup lang="ts">
import Class09Vue from './Class09.vue';
import { ref } from '@vue/runtime-core';
import { onMounted } from 'vue';
const test = ref(null);
onMounted(() => {
  console.log(test.value, test.value.count);
});
</script>
<template>
  <Class09Vue ref="test" />
</template>
```

控制台输出

```
Proxy {__v_skip: true} undefined
```

无法获取绑定的值

### 使用`<script setup>`情况下，显示暴露绑定

`子组件`

```ts
<script setup lang="ts">
import { reactive, ref } from 'vue';

const count = ref(1);
const handleClick = () => {
  console.log('子组件中的方法');
};
defineExpose({
  count,
  handleClick,
});
</script>
```

`父组件`

```ts
<script setup lang="ts">
import Class09_03Vue from './Class09_03.vue';
import { ref } from '@vue/runtime-core';
import { onMounted } from 'vue';

const test09 = ref(null);
onMounted(() => {
  console.log(test09.value);
  console.log(test09.value.count);
  console.log(test09.value.handleClick);
});
</script>
<template>
  <Class09_03Vue ref="test09" />
</template>
```

控制台输出

```
Proxy {count: RefImpl, handleClick: ƒ, __v_skip: true}
1
() => {
      console.log("\u5B50\u7EC4\u4EF6\u4E2D\u7684\u65B9\u6CD5");
}
```