computed计算属性（150）
[TOC]

# 介绍

与Vue2中的`computed`配置功能一致，只不过Vue3中是组合式`api`，要用到什么`api`，就需要导入什么`api`。

# 写法

```js
import {computed} from 'vue'

setup(){
    ...
    // 计算属性简写
    let fullName = computed(()=>{
        return person.firstName + '_' + person.lastName;
    });
    
    // 计算属性完整写法
     let fullName = computed({
        get(){
            return person.firstName + '_' + person.lastName;
        }
        set(value){
            const nameArr = value.split('_');
            person.firstName = nameArr[0];
            person.lastName = nameArr[1];
        }
     });
    
}
```

