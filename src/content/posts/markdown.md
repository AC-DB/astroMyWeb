---
title: Markdown示例
published: 2023-10-01
description: Markdown 博客文章的一个简单示例。
tags: [Markdown, 写博客, 演示]
category: 示例
draft: false
---

# h1 标题

段落之间以空行分隔。

第二段。斜体、**粗体**和等宽字体。逐项列表
如下所示：

- 这一项
- 那一项
- 另一项

请注意，--- 不考虑星号 --- 实际文本
内容从第 4 列开始。

> 块引用
> 的写法如下。
>
> 如果您愿意，它们可以跨越多个段落。

使用 3 个破折号表示长破折号。使用 2 个破折号表示范围（例如，“全部
在第 12-14 章”）。三个点...将转换为省略号。
支持 Unicode。☺

## 一个 h2 标题

这是一个带编号的列表：

1. 第一项
2. 第二项
3. 第三项

再次注意，实际文本从第 4 列（从左侧算起 4 个字符）开始。以下是代码示例：

# 让我再重复一遍……

for i in 1 .. 10 { do-something(i) }

你可能已经猜到了，缩进 4 个空格。顺便说一句，除了缩进代码块之外，如果你愿意，也可以使用分隔块：

```
define foobar() {
    print "Welcome to flavor country!";
}
```

（这使得复制和粘贴更容易）。您可以选择标记
分隔块，以便 Pandoc 对其进行语法高亮：

```python
import time
# Quick, count to ten!
for i in range(10):
    # (but not *too* quick)
    time.sleep(0.5)
    print i
```

### An h3 header

Now a nested list:

1. First, get these ingredients:

    - carrots
    - celery
    - lentils

2. Boil some water.

3. Dump everything in the pot and follow
    this algorithm:

        find wooden spoon
        uncover pot
        stir
        cover pot
        balance wooden spoon precariously on pot handle
        wait 10 minutes
        goto first step (or shut off burner when done)

    Do not bump wooden spoon or it will fall.

Notice again how text always lines up on 4-space indents (including
that last line which continues item 3 above).

Here's a link to [a website](http://foo.bar), to a [local
doc](local-doc.html), and to a [section heading in the current
doc](#an-h2-header). Here's a footnote [^1].

[^1]: Footnote text goes here.

Tables can look like this:

size material color

---

9 leather brown
10 hemp canvas natural
11 glass transparent

Table: Shoes, their sizes, and what they're made of

(The above is the caption for the table.) Pandoc also supports
multi-line tables:

---

keyword text

---

red Sunsets, apples, and
other red or reddish
things.

green Leaves, grass, frogs
and other things it's
not easy being.

---

A horizontal rule follows.

---

Here's a definition list:

apples
: Good for making applesauce.
oranges
: Citrus!
tomatoes
: There's no "e" in tomatoe.

Again, text is indented 4 spaces. (Put a blank line between each
term/definition pair to spread things out more.)

Here's a "line block":

| Line one
| Line too
| Line tree

and images can be specified like so:

[//]: # (![example image]&#40;./demo-banner.png "An exemplary image"&#41;)

Inline math equations go in like so: $\omega = d\phi / dt$. Display
math should get its own line and be put in in double-dollarsigns:

$$I = \int \rho R^{2} dV$$

$$
\begin{equation*}
\pi
=3.1415926535
 \;8979323846\;2643383279\;5028841971\;6939937510\;5820974944
 \;5923078164\;0628620899\;8628034825\;3421170679\;\ldots
\end{equation*}
$$

And note that you can backslash-escape any punctuation characters
which you wish to be displayed literally, ex.: \`foo\`, \*bar\*, etc.
