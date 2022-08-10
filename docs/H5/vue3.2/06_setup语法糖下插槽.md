6_setup语法糖下插槽

[TOC]

# 常规使用

`子组件`

```ts
<script setup lang="ts"></script>
<template>
  <h1>子组件</h1>
  <slot name="header">子组件中的插槽默认值</slot>
</template>
```

`父组件`

```ts
<script setup lang="ts">
import Class10Vue from './Class10.vue';
</script>
<template>
  <Class10Vue></Class10Vue>
  <Class10Vue>
    <!-- 使用子组件中的插槽 -->
    <template #header>
      <h2>父组件</h2>
    </template>
  </Class10Vue>
</template>
```

# useSlots

> `useSlots`不是宏命令，所以使用的时候，需要导入；
> `useSlots`会返回本组件的插槽被使用情况

`子组件`

```ts
<script setup lang="ts">
import { onMounted, useSlots } from 'vue';

const slots = useSlots();
onMounted(() => {
  console.log('---slots---', slots);
  // 如果插槽没有被使用，则会为undefined，所以使用&&不为空的时候执行
  console.log('---header---', slots.header && slots.header());
  console.log('---footer---', slots.footer && slots.footer());
});
</script>
<template>
  <h1>子组件</h1>
  <slot name="header">header插槽</slot>
  <slot name="footer">footer插槽</slot>
</template>
```

`父组件`

```ts
<script setup lang="ts">
import Class10_03Vue from './Class10_03.vue';
</script>
<template>
  <Class10_03Vue></Class10_03Vue>
  <Class10_03Vue>
    <template v-slot:header>
      <div>父组件使用header插槽</div>
    </template>
    <template #footer>
      <div>父组件使用footer插槽</div>
    </template>
  </Class10_03Vue>
</template>
```

控制台输出

![](https://cdn.jsdelivr.net/gh/api888/PublicPic@main//img/iShot2022-08-10%2010.15.55.png)


# useAttrs

> 用法和`useSlots`相似，用于获取父组件使用子组件的时候，向下传递的属性

`子组件`

```ts
<script setup lang="ts">
import { onMounted, useAttrs } from 'vue';

const attrs = useAttrs();
onMounted(() => {
  console.log(attrs);
});
</script>
<template>
  <div>子组件</div>
</template>
```

`父组件`

```ts
<script setup lang="ts">
import Class11Vue from './Class11.vue';
</script>
<template>
  <Class11Vue class="test" test-data="testData" :data="`testProps`"></Class11Vue>
</template>
```

控制台输出

```
Proxy {class: "test", test-data: "testData", data: "testProps", __vInternal: 1}
```
可以发现，父组件在使用子组件的时候，所传递的所有属性，都能被获取到，包括`props`