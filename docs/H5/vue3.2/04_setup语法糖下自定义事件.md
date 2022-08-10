4_setup语法糖下自定义事件

# 自定义事件_defineEmits

> 在`<script setup>`中声明`emit`，必须使用`defineEmits API`，这也是一个[宏命令](mweblib://16599516184752#_compiler_macros)。同样可采用普通写法和类型声明式写法，在类型声明下`emit`将具备完美的类型推断。


## 普通写法

`子组件中`

```ts
<script setup lang="ts">
// 这样是没有任何的类型检查的
const emit = defineEmits(['parentHandleClick', 'parentHandleChange']);
// emit发送事件
const handleClick = () => emit('parentHandleClick', Date.now() + '');
const handleChange = () => emit('parentHandleChange', Date.now());
</script>
<template>
  <button @click="handleClick">发送自定义事件1</button>
  <br />
  <button @click="handleChange">发送自定义事件2</button>
</template>
```

`父组件中`

```ts
<script setup lang="ts">
import Class06Vue from './Class06.vue';

const parentHandleChange = (val: string) => console.log('父组件接收到子组件触发的事件2', val);
const parentHandleClick = (val: number) => console.log('父组件接收到子组件触发的事件1', val);
</script>
<template>
  <Class06Vue 
  @parent-handle-change="parentHandleChange" 
  @parentHandleClick="parentHandleClick" />
</template>
```
> 普通写法`defineEmits`接收一个数组，传入需要在父组件中需要监听的事件名

# 类型声明式

`子组件`

```ts
<script setup lang="ts">
// 完美的类型检查
const emit = defineEmits<{
  (e: 'handleClickWithTypeDeclaration', data: number): void;
  (e: 'handleChangeWithTypeDeclaration'): void;
}>();

const handleClick = () => emit('handleClickWithTypeDeclaration', Date.now());
const handleChange = () => emit('handleChangeWithTypeDeclaration');
</script>
<template>
  <button @click="handleClick">事件1</button>
  <br />
  <button @click="handleChange">事件2</button>
</template>
```

`父组件`

```ts
<script setup lang="ts">
import Class07Vue from './Class07.vue';
const changeClick = () => console.log('监听子组件事件');
const handleClick = (data: number) => console.log('监听子组件事件');
</script>
<template>
  <Class07Vue
    @handle-change-with-type-declaration="changeClick"
    @handle-click-with-type-declaration="handleClick"
  />
</template>
```

