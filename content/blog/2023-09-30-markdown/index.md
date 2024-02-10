---
title: Hello, World
created_at: 2023-09-30
tags: []
draft: false
---

# Markdown

これは Markdown のレンダリング確認用の記事です。
本サイトでサポートされている Markdown が機能していることを確認します。

## 見出し

# h1

## h2

### h3

#### h4

##### h5

###### h6

## 引用

> 実際のところ、良いプログラマーと悪いプログラマーの違いはデータ構造を重要であると考えるかどうかにあると言いたい。悪いプログラマーはコードそのものに気を使ってしまうが、良いプログラマーはデータ構造とそれらの関係性について気を使うものだ。
>
> <cite>-- Linus Torvalds</cite>

## リスト

Markdown では `*` もしくは `-` を使った箇条書きが `ul` タグを用いたリストに変換される。

- アイテム 1
  - アイテム 1-1
    - アイテム 1-1-1
  - アイテム 1-2
- アイテム 2

`ul` は `Unordered List` (順序なしリスト) の略になっている。

`*` や `-` の代わりに `1.` を使って箇条書きを書くと `ol` タグを用いたリストに変換される。

1. アイテム 1
   1. アイテム 1.1
      1. アイテム 1.1.1
   1. アイテム 1.2
1. アイテム 2

チェックボックス `- [ ]` でチェックボックスを表現することもできる。

- [ ] 未チェック
- [x] チェック

## 水平線

---

## コード

Markdown ではバッククォート 3つ ``\` で囲まれた要素は HTML の `<pre><code></code></pre>` で囲まれたコードに変換される。

```
console.log("Hello, World");
```

また、``\` の後に言語を指定し、Prisma や Shiki といったライブラリを利用することでシンタックスハイライトを付けられる。

```js
// コンソールに Hello, World! と出力する
console.log("Hello, World!");
```

```java
public class Main {
  public static void main(args: String[]) {
    System.out.println("Hello, World!");
  }
}
```

## 数式

$E = mc^2$。

フーリ変換の公式。

$$
\mathcal{F}(\omega) = \frac{1}{\sqrt{2\pi}}\int^{\infty}_{-\infty}  f(x) e^{-i\omega x} dx
$$
