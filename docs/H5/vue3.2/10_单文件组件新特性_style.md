10_单文件组件新特性_style v-bind

[TOC]

# style module

```html
<script setup lang="ts"></script>
<template>
  <p :class="$style.red">测试css module</p>
</template>
<style module>
.red {
  color: red;
}
</style>
```

渲染结果

![](https://cdn.jsdelivr.net/gh/api888/PublicPic@main//img/iShot2022-08-10%2011.34.01.png)


就像在`<script setup>`中维护了一个`$style`对象
```
$style{
    red:xxx
}
```

还可以给`module`命名

```html
<script setup lang="ts"></script>
<template>
  <p :class="test.red">测试css module</p>
</template>
<style module="test">
.red {
  color: red;
}
</style>
```

# useCssModule

> `useCssModule`用于获取`<style module>`中定义的样式

```html
<script setup lang="ts">
import { useCssModule } from 'vue';

// 如果module定义了名称,则useCssModule需要接收定义的名称
const cssModule = useCssModule();
console.log(cssModule);
</script>
<template>
  <p :class="$style.red">测试css module</p>
</template>
<style module>
.red {
  color: red;
}
.blue {
  color: blue;
}
</style>
```

控制台输出：

```
{red: "_red_13cse_2", blue: "_blue_13cse_5"}
```

# 状态驱动的CSS

## 基本使用

> 单文件组件的`<style>`标签，可以通过`v-bind`这一`CSS`函数将`CSS`的值关联到动态的组件状态上，有了这一特性，可以将大量的动态样式通过状态来驱动了，而不是写动态的`class`类名或者获取`dom`来动态设置了。也就是css可以绑定js中的变量了。

```html
<script setup lang="ts">
import { ref } from 'vue';

const color = ref('red');

setTimeout(() => {
  color.value = 'blue';
}, 2000);
</script>
<template>
  <p>hello</p>
</template>
<style scoped>
p {
  color: v-bind(color);
}
</style>
```
