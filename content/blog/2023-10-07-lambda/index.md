---
title: ラムダ計算入門
created_at: 2023-10-07
tags: ["ラムダ計算", "プログラミング", "TypeScript"]
draft: true
---

## 想定読者

- TypeScript を読むことができる
- [ラムダ計算](https://ja.wikipedia.org/wiki/%E3%83%A9%E3%83%A0%E3%83%80%E8%A8%88%E7%AE%97)について知りたい
- 具体的なコードを通じてラムダ計算について学びたい

説明は可能な限り具体例とともに行い、コードに関する説明も文法を除く要素については丁寧に行う。
そのため、TypeScript のコードを読むことに慣れている人については冗長的に感じるかもしれない。

## ラムダ計算 (Lambda caluculus)

[LISP](https://ja.wikipedia.org/wiki/LISP)

[ラムダ・キューブ](https://ja.wikipedia.org/wiki/%E3%83%A9%E3%83%A0%E3%83%80%E3%83%BB%E3%82%AD%E3%83%A5%E3%83%BC%E3%83%96)

ラムダ項の定義の仕方は主に3つある。
ここでは3つとも紹介するが最終的には BNF 記法による定義を採用して話を進める。
それでは最初に

### ラムダ項の定義

####

- 変数 $x$ はラムダ項
- $M$ がラムダ項ならば $(\lambda x. M)$ はラムダ項
- $M$、$N$ がラムダ項ならば $(M\ N)$ はラムダ項

#### 集合による定義

ラムダ項の集合を $\mathscr{L}$ とする。

#### BNF 記法による定義

ラムダ項の集合は [BNF記法](https://ja.wikipedia.org/wiki/%E3%83%90%E3%83%83%E3%82%AB%E3%82%B9%E3%83%BB%E3%83%8A%E3%82%A6%E3%82%A2%E8%A8%98%E6%B3%95) で書くと以下のように定義される。

$$
\begin{aligned}
\langle \mathit{expr} \rangle &::= \langle \mathit{identifier} \rangle \\
\langle \mathit{expr} \rangle &::= (\lambda \langle \mathit{identifier} \rangle . \langle \mathit{expr} \rangle) \\
\langle \mathit{expr} \rangle &::= (\langle \mathit{expr} \rangle\ \langle \mathit{expr} \rangle)
\end{aligned}
$$

$\langle \rangle$ で囲まれた記号列はメタ変数と呼ばれている。

それぞれ右辺は上から順に、

- **変数** (_variable_)
- **ラムダ抽象** (_lambda abstraction_)
- **適用** (_application_)

に対応する。具体的なラムダ項を例として上げると、

- **変数**: $x$
- **ラムダ抽象**: $(\lambda x. x)$
- **適用**: $((\lambda x. x)\ y)$

のようになる。変数は `λ`、`(`、`)`、`.` を除く任意の記号列を使っても構文や[意味論](https://ja.wikipedia.org/wiki/%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%A0%E6%84%8F%E5%91%B3%E8%AB%96)を考える上では問題ないが、
この記事内では[正規表現](https://www.tohoho-web.com/ex/regexp.html) `[a-zA-Z][a-zA-Z0-9]*` で表現される記号列だけを考える。

### 変数

### ラムダ抽象

ラムダ抽象は引数を一つ受け取る関数を定義する。ラムダ抽象のBNF記法による定義を思い出そう。

$$
\langle \mathit{expr} \rangle ::= (\lambda \langle \mathit{identifier} \rangle .\ \langle \mathit{expr} \rangle)
$$

左辺の $\langle \mathit{expr} \rangle$ はラムダ項自身を表現しているため、この部分は一度忘れて右辺に注目する。
全体が括弧で囲まれているのは、括弧がないと $\langle \mathit{expr} \rangle$ の範囲がわからなくなってしまう。
そのような[曖昧さ](https://ja.wikipedia.org/wiki/%E6%9B%96%E6%98%A7%E3%81%AA%E6%96%87%E6%B3%95)を回避するために全てのラムダ抽象は括弧で囲まれることを文法に組み込む。
ラムダ抽象とラムダ適用の優先順位を考えると冗長的な括弧を除くことができるが、今回は簡単のために常に明示的な括弧がある前提で考える。
次に括弧の中身を見ると $\lambda$ がある。
$\lambda$ はこれから定数の定義します、という宣言の役割となっており、TypeScript で言うところの `function` に対応すると考えてもらえばいい。
そして $\langle \mathit{identifier} \rangle$ は引数名、`.` は区切りのために存在し、その右側の $\langle \mathit{expr} \rangle$ は関数本体を表す。
ラムダ抽象は TypeScript の文脈だと以下のような[アロー関数](https://typescriptbook.jp/reference/functions/arrow-functions)に相当する。

```ts
((<identifier>) => <expr>)
```

説明のため関数という言葉を使ったが JavaScript/TypeScript であればアロー関数、
他の言語であればラムダ式と呼ばれるものの方が近い。

一つ具体例を見て理解を深めよう。次のようなラムダ抽象を考えてみる。

$$
(\lambda x. (\lambda y. x))
$$

このラムダ抽象は、アロー関数で定義すると以下のようになる。

```ts
(x) => (y) => x;
```

|           ラムダ項            |      TypeScript       |
| :---------------------------: | :-------------------: |
|         $\lambda y.$          |       `(y) =>`        |
|       $(\lambda y. x)$        |     `((y) => x)`      |
| $(\lambda x. (\lambda y. x))$ | `((x) => ((y) => x))` |

さて、プログラミング言語における関数定義相当の構文を学んだ。
関数が定義できたため次は関数の呼び出しだ。
ラムダ計算では関数呼び出しに相当するものは**適用**と呼ぶ。
次は適用について見てみよう。

### 適用

$$
\langle \mathit{expr} \rangle ::= (\langle \mathit{expr} \rangle\ \langle \mathit{expr} \rangle)
$$

### ラムダ項を TypeScript で定義

これらを TypeScript のコードで表現すると以下のようになる。

```ts
/**
 * ラムダ項。
 *
 * expr := <identifier>
 * expr := λ<identifier>.<expr>
 * expr := <expr> <expr>
 */
export type Expr =
  /** 変数 (<identifier>) */
  | Variable
  /** λ抽象 (λ<identifier>.<expr>) */
  | Abstraction
  /** 関数適用 (<expr> <expr>) */
  | Application;

/**
 * 変数 (x)。
 */
export type Variable = {
  type: "var";
  /** 変数名 (x) */
  id: string;
};

/**
 * ラムダ抽象 (λx.M)。
 */
export type Abstraction = {
  type: "abst";
  /** 仮引数 (x) */
  var: Variable;
  /** 関数の本体 (M) */
  body: Expr;
};

/**
 * 適用 (M N)。
 */
export type Application = {
  type: "app";
  /** 関数 (M) */
  func: Expr;
  /** 実引数 (N) */
  arg: Expr;
};
```

勿論これは実装方法の一つというだけであり異なる定義も可能だ。
今回は[判別可能なユニオン型](https://typescriptbook.jp/reference/values-types-variables/discriminated-union)を使って定義している。
`Expr` 型は BNF 記法によるラムダ項の定義とほぼそのまま対応する。
`Variable`、`Abstraction`、`Application` はそれぞれ判別するためのタグに相当する `type` プロパティと
BNF 記法におけるメタ変数をプロパティとして持つ。

- `Variable`: $\langle \mathit{identifier} \rangle$
- `Expr`: $\langle \mathit{expr} \rangle$

$$
\begin{aligned}
\mathtt{Variable}    &::= \mathtt{id} \\
\mathtt{Abstraction} &::= (\lambda\ \mathtt{var}.\ \mathtt{body}) \\
\mathtt{Application} &::= (\mathtt{func}\ \mathtt{arg})
\end{aligned}
$$

$$
\mathtt{Expr} ::= \mathtt{Variable} \mid \mathtt{Abstraction} \mid \mathtt{Application}
$$

### ラムダ項で遊ぶ

さて、ラムダ項の定義を学んだので少しばかりラムダ計算で遊んでみよう。
ここまでで知ったのはラムダ項の定義だけで、その意味については学んでいないが
**ラムダ抽象**が無名関数の定義、**適用**が関数適用という直観が得られているので
ラムダ計算についても例を見れば理解できるだろう。

$$
((\lambda x. \lambda y. (x\ y))\ z) \stackrel{\beta}{\to} (\lambda y. (z\ y))
$$

### 自由変数 (free variables)

### $\alpha$ 同値 (alpha equivalence)

$$
(\lambda x. x) \stackrel{\alpha}{=} (\lambda y. y)
$$

$$
((\lambda x. (\lambda y. (\lambda x. x))))
$$

### $\alpha$ 変換 (alpha conversion)

$$
(\lambda x.(\lambda y. x))
$$

### $\beta$ 簡約 (beta reduction)

## 参考資料

- [コンピュータ・サイエンス入門 ラムダ計算第1回目資料](https://www.kurims.kyoto-u.ac.jp/~sinya/paper/lecture080515.pdf)
- [ラムダ計算入門 2005 年度「計算機ソフトウェア工学」授業資料](https://www.kb.ecei.tohoku.ac.jp/~sumii/class/keisanki-software-kougaku-2005/lambda.pdf)
