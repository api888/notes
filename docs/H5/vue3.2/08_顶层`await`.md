8_顶层`await`

[TOC]

`await`的使用必须是要在`async`语法糖的包裹下，否则将无法执行，为了简化代码，`<script setup>`中可以使用顶层`await`

```ts
<script setup>
const post = await fetch('/api/post/i').then(r => r.json())
</script>
```

上述代码，在编译后，实际上在普通写法`setup`函数前加了`async`，因此可以在`<script setup>`中使用顶层`await`