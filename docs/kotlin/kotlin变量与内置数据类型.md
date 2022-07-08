# 变量声明
> kotlin中声明变量，先写变量名，后写变量类型，与java相反。

```kotlin
var name:String="张三";
println(name);
```


# 内置数据类型

> 本节主要讲解：基本类型、数组、区间、集合框架

## 基本类型


| 类型 | Kotlin       | Java                      |
|----------|:------------:|:-------------------------:|
| 字节类型 | Byte         | byte/Byte                 |
| 整形     | Int & Long     | int/Integer & long/Long     |
| 浮点型   | Float & Double | float/Float &  double/Double |
| 字符     | Char         | char/Character            |
| 字符串   | String       | String                    |

### kotlin与java易混淆的Long类型标记

`java`中
```java
long c = 12345678910l;  // ok but not good.    
long d = 12345678910L; // ok
```

`kotlin`
```kotlin
val c = 12345678910l // compile error    
val d = 1234567890L; // ok
```

### kotlin的数值类型转换

`java`中
```java
int e = 10;    
long f = e; // implicit conversion隐式转换
```

`kotlin`
```kotlin
val e : Int =10    
val f : Long = e.toLong() // ok
```

## 数组


| 类型     | Kotlin        | Java        |
|----------|:-------------:|:-----------:|
| 整型     | IntArray      | int[]       |
| 整型装箱 | Array\<Int>    | Integer[]   |
| 字符     | CharArray     | char[]      |
| 字符装箱 | Array\<Char>   | Character[] |
| 字符串   | Array\<String> | String[]    |

### kotlin与java数组的创建

`java` 中

```java
int[] c = new int[]{1, 2, 3, 4, 5};
```
`kotlin` 中
```kotlin
val c = intArayof(1, 2, 3, 4, 5)
val c1 = IntArray(size: 5){it + 1} 
it 为数组下标，从0到size - 1   
```

例如：
```kotlin
val c = IntArray( size: 5){3 * (it + 1))}    // y = 3 * (x + 1)
it的取值为0, 1, 2, 3, 4
c的值为[3, 6, 9，12，15]
```

### kotlin与java数组的长度

`java` 中

```java
int[] a = new int[5];    
System.out.println(a.length);
```

`kotlin` 中
```kotlin
val a = IntArray(5)    
println(a.size) 
```

### kotlin与java数组的读写

`java` 中

```java
String[] d = new String[]{"Hello","World"};
d[1] = "Java"；
System.outprintln(d[0] + "," + d[1]);
```

`kotlin` 中

```kotlin
val d = arrayof{"Hellb", "World")
d[1] = "Kotlin"
println("${d[0]}, $(d[1]}")
```

### kotlin与java数组的遍历

`java` 中

```java
float[] e = new float[]{1, 3, 5, 7}; 
for (float element : e) {
     System. out println(element);
}
```

`kotlin` 中

```kotlin
val e = floatArrayof(1f, 3f, 5f, 7f)    
for (element in e) {
    println(element)
}
```

或者另一种写法
```kotlin
e.forEach { element ->
        println(element)
}
```

### kotlin与java数组的包含关系

`java` 中

```java
for (float element : e) {
      if (element == 1f) {
          System. out.println("If exists in variabl 'e'");
          break;
      }
}
```

`kotlin` 中

```kotlin
if (1f in e) {
    println("If exists in variabl 'e'");
}
```

## 区间

### 闭区间的创建

> `… `表示闭区间

```kotlin
val intRange = 1 .. 10     // [1, 10]    
val charkange = 'a' .. 'z'    
val longRange = 1L .. 100L
```

### 开区间的创建

> `until`表示开区间，但是不包含结束值

```kotlin
val intRangeExclusive = 1 until 10   // [1, 10)    
val charRangeEXclusive = 'a' until 'z'    
val long RangeExclusive = 1L until 100L
```

### 倒序区间的创建

> `downTo`为倒序区间，也是闭区间

```kotlin
val intRangeReverse = 10 downTo 1  // [10, 9..…,1]
val charRangeReverse = 'z' downTo 'a'
val longRangeReverse = 100L downTo 1L
```
### 区间的步长

```kotlin
val intRangeWithStep = 1 .. 10 step 2    
val charRangeWithStep = 'a' .. 'z' step 2    
val longRangeWithStep = 1L .. 100L step 5
```

### 区间的迭代与包含

```kotlin
for (element in intRange) {
     println(element)
}

intRange.forEach {
    println(it)
}

if (3 in intRange) {
    println("3 in range 'intRange'")
}

if (12 !in intRange) {
     println("12 not in range 'intRange'")
} 
```

### 区间的应用

```kotlin
val array = intArrayOf(1, 3, 5, 7)
for(i in array.indices) {
    println(array[i])
}

indices返回[0, array.size)
```

## 集合框架

### kotlin集合框架的特点

- 增加了“不可变”集合框架的接口
- 没有另起炉灶，复用 Java API的所有实现类型
- 提供了丰富易用的方法，例如 forEach/map/flatMap
- 运算符级别的支持，简化集合框架的访问

### kotlin与java集合框架的接口类型对比

> 不可变的意思是：不能添加或者删除元素
可变的意思是：可以添加或者删除元素

<table>
  <thead>
	  <tr>
	    <th>集合类型</th>
	    <th>Kotlin</th>
	    <th>Java</th>  
	  </tr >
  </thread>
  <tbody>
    <tr >
        <td>不可变的List</td>
        <td>List&lt;T&gt;</td>
        <td rowspan="2">List&lt;T&gt;</td>
    </tr>
    <tr>
        <td>可变的List</td>
        <td>MutableList&lt;T&gt;</td>
    </tr>
    <tr>
        <td>不可变Map</td>
        <td>Map&lt;K,V&gt;</td>
        <td rowspan="2">Map&lt;K,V&gt;</td>
    </tr>
    <tr>
        <td>可变Map</td>
        <td>MutableMap&lt;K,V&gt;</td>
    </tr>
    <tr>
        <td>不可变Set</td>
        <td>Set&lt;T&gt;</td>
        <td rowspan="2">Set&lt;T&gt;</td>
    </tr>
    <tr>
        <td>可变Set</td>
        <td>MutableSet&lt;T&gt;</td>
    </tr>
  </tbody>
</table>

### kotlin与java集合框架的创建

`java`中

```java
List<String> stringList = new ArraylList<>();
List<Integer> intList = new ArraylList<>(Arrays.asList(1, 2, 3));
```

`kotlin`中

```kotlin
var stringList = ArrayList<String>()

val intList : List<Int>= listof(1, 2, 3)
val intList2 : MutableList<Int> = mutableListof(1, 2, 3)

val map: Map<String, Any> = mapOf("name" to "benny", "age" to "20")
val map2: Map<String, Any> = mutableMapOf("name" to "benny", "age" to "20")

"name" to "benny"可以理解为，k - v
Any等价与java中的object
```

### kotlin与java集合框架的修改

`java`中

```java
for (int i = 0; i < 10;  i++) {
    stringList.add(num: " 1)
}
```

`kotlin`中

```kotlin
for (i in 0.. 10) {
    stringList +="num : $i"
}
```

### kotlin与java集合框架的读写

`java`中

- List

```java
stringList.set(5, "HelloWorld");
String valueAt5 = stringList.get(5);
```
- Map
```java
HashMap<String, Integer> map = new HashMap<>;    
map.put("Hello, 10);
System.out.printIn(map.get( "Hello" );
```

`kotlin`中

- List

```kotlin
stringList[5] = "HelloWorld"
val valueAt5 = stringList[5]
```

- Map

```kotlin
val map = HashMap<String, Int>()
map["Hello"] = 10
println(map["Hello"])
```