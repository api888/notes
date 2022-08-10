1_setup语法糖

[TOC]

# 传统写法

```html
<template>
  <p>{{ count }}</p>
  <button @click="add">++</button> &nbsp;
  <button @click="dec">--</button>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const count = ref(1);
    function add() {
      count.value += 1;
    }
    function dec() {
      count.value -= 1;
    }
    return {
      count,
      add,
      dec,
    };
  },
});
</script>
```

# `<script setup>`语法糖写法

> 这个语法糖，需要将`setup` 添加到`script`标签属性中

```ts
<script setup>
const a = ref(1);
console.log(a.value);
</script>
```
这里边的代码会被编译成组件`setup()`函数的内容。

这也就意味着与传统的`<script>`写法，只在组件被首次引入的时候仅执行一次不同，`<script setup>`中的代码会在**每次组件实例被创建的时候执行**。也就是写在`<script setup>`中的代码，例如初始化的赋值，在组件每次实例创建时都重新执行一次。

```html
<template>
  <p>{{ count }}</p>
  <button @click="add">++</button> &nbsp;
  <button @click="dec">--</button>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const count = ref(1);

function add() {
  count.value += 1;
}
function dec() {
  count.value -= 1;
}
</script>
```

# 顶层绑定将自动暴露给模板

## 基本使用

`顶层绑定将自动暴露给模板`这句话似乎不太好理解，通俗的讲就是：当使用`<script setup>`的时候，任何在`<script setup>`中声明的顶层绑定（包括声明的变量，函数，以及import引入的内容），都能在模板中直接使用，不再需要`return`导出。

传统写法，要想在`<template>`模板中使用的变量、函数等，不仅需要先定义声明，还要`return`导出。不仅写起来麻烦，还有点多此一举的感觉。