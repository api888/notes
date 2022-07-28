watch监视（151）
[TOC]

# 介绍

与Vue2中的`watch`配置功能一致，只不过Vue3中是组合式`api`，要用到什么`api`，就需要导入什么`api`。

# 监视 `ref` 定义的数据

vue2中的监视属性写法

```js
watch:{
    // 简单写法
    sum(newValue,oldValue){
        console.log("sum变化了",newValue,oldValue) 
    }
    
    // 完整写法
    sum:{
        immediate:true,//立即监视
        deep:true,//深度监视
        handler(newValue,oldValue){
            console.log("sum变化了",newValue,oldValue) 
        }
    }
}
```

vue3中写法

```js
// 监视ref定义的响应式数据
watch(sum,(newValue,oldValue)=>{
    console.log("sum变化了",newValue,oldValue);// 输出 sum变换了 1 0
},{immediate:true})


// 监视多个ref定义的数据
watch([sum,msg],(newValue,oldValue)=>{
    // 监视多个属性的时候，newValue、oldValue不再是值，而是一个数组，数组中是每个元素的最新值（或者是原来的值）
    console.log("sum或msg变化了",newValue,oldValue);// 输出 sum或msg变换了 (2) [1, "你好"] (2) [0, "你好"]
})
```

# 监视 `reactive` 定义的数据

## 坑一

> 监视 `reactive` 定义的数据，无法正确获取`oldValue`

```js
const person = reactive({
  name: '张三',
  age: 18,
});
watch(person, (newValue, oldValue) => {
  console.log('person变换了', newValue, oldValue);
});
```

当修改 `person` 中的任意属性值，如：

```html
<h2>姓名:{{ person.name }}</h2>
<button @click="person.name += '!'">修改姓名</button>

<h2>年龄:{{ person.age }}</h2>
<button @click="person.age += 1">修改年龄</button>
```

点击`修改姓名`控制台打印：

```
person变换了 Proxy {name: "张三!", age: 18} Proxy {name: "张三!", age: 18}
```

点击`修改年龄`控制台打印：

```
person变换了 Proxy {name: "张三", age: 19} Proxy {name: "张三", age: 19}
```

**可以发现，`newValue`, `oldValue`都是变化后的值，无法正确获取`oldValue`**

## 坑二

`reactive`定义的响应式数据，默认是开启了深度监视，无法被关闭(deep:false无效)；【`reactive`定义的数据，本来就是为了实现响应式数据，所以deep:false无效也是合理的】

```html
<h2>薪资:{{ person.job.j1.salary }}</h2>
<button @click="person.job.j1.salary++">涨薪</button>

...
<script>
...
  const person = reactive({
    name: '张三',
    age: 18,
    job: {
      j1: {
        salary: 20,
      },
    },
  });
  watch(person, (newValue, oldValue) => {
    console.log('person变换了', newValue, oldValue);
  });
</script>
```

在Vue2中，如果点击涨薪，默认情况下无法监视到，必须开启深度监视 `deep:true`，而在Vue3中，只要是`reactive`定义的响应式数据，无论层次多少，只要被修改了，就能被监视到

Vue2中：
```js
watch: {
  person: {
    deep: true,// 开启深度监视
    handler(newValue, oldValue) {
      console.log('person变换了1', newValue, oldValue);
    },
  },
},
```

Vue3中：

```js
watch(
  person,
  (newValue, oldValue) => {
    console.log('person变换了', newValue, oldValue);
  },
  { deep: false },// 此处deep无效
);
```

点击涨薪，控制台还是会打印：
```
person变换了 Proxy {name: "张三", age: 18, job: {…}} Proxy {name: "张三", age: 18, job: {…}}
```

**所以，如果在Vue3中，监视`reactive`定义的数据，关闭深度监视无效**

## 监视`reactive`定义的数据中的某个属性

如果一个对象中的数据太多，如果监视整个对象，势必会影响性能，通常的业务场景，只需要监视某一个属性的变化，所以如果只关注某个属性的变化，性能肯定更好

语法
```js
watch(
  function(){return 需要监视的对象中的某个属性},
  (newValue, oldValue) => {},
);
```

如：

```js
watch(
  () => person.job.j1.salary,
  (newValue, oldValue) => {
    console.log('薪资变换了', newValue, oldValue);
  },
);
```

## 监视`reactive`定义的数据中的某些属性

这里和监视多个 `ref` 定义的响应式数据类似

语法
```js
watch(
 [ 
 function(){return 需要监视的对象中的某个属性1}, 
 function(){return 需要监视的对象中的某个属性2}
 ...
 ],
  (newValue, oldValue) => {},
);
```
如：
```js
watch(
 [ () => person.job.j1.salary, () => person.age],
  (newValue, oldValue) => {
    console.log('薪资变换了', newValue, oldValue);
  },
);
```

## 坑三

监视`reactive`定义的数据中的某个属性，如果属性是个对象类型数据，需要开启深度监视

由上面的知识可知，监视`reactive`定义的数据，关闭深度监视无效，默认就开启了深度监视，下面案例：
```html
<h2>薪资:{{ person.job.j1.salary }}</h2>
<button @click="person.job.j1.salary++">涨薪</button>
...
<script>
...
watch(
  () => person.job,
  (newValue, oldValue) => {
    console.log('监视到job变换了', newValue, oldValue);
  },
);
</script>
```

点击涨薪，发现`watch`函数没有被回调，当开启深度监视后

```html
<h2>薪资:{{ person.job.j1.salary }}</h2>
<button @click="person.job.j1.salary++">涨薪</button>
...
<script>
...

watch(
  () => person.job,
  (newValue, oldValue) => {
    console.log('监视到job变换了', newValue, oldValue);
  },
  { deep: true },
);
</script>
```
再次点击涨薪按钮，可以被监视到；而**上面知识已经知道，监视监视`reactive`定义的数据，无需开启深度监视，但是这里又需要开启深度监视，其实并不矛盾，只有监视`reactive`定义的数据，深度监视开关无效，默认开启，而这里监视的是`reactive`定义的数据中的某个属性，并且属性是个对象类型数据，并不是监视`reactive`定义的数据（Proxy实例），所以需要开启深度监视**







