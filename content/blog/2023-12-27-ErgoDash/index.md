---
title: ErgoDash
created_at: 2023-12-27
tags: ["自作キーボード", "キーボード"]
draft: false
---

引きこもりはクリスマス・イヴに何をするのか。
そう、自作キーボードを組み立てます。
24、25日は [ErgoDash](https://shop.yushakobo.jp/products/ergodash) を組み立てました。

![ErgoDash](./imgs/ErgoDash.jpg)

キースイッチが届くのが 25 日であったため、24 日はダイオードの足を折って指した後にマスキングテープで止めたところで満足してしまいました (はんだ付けまではできるだろ :anger:)。
そのため、25 日のお昼前頃からご飯を食べるのを忘れて夕方くらいまで作業していました。
自作キーボードキットを組み立てたことがある人は、時間かけすぎでは？って思うだろうけど、途中で失敗してキースイッチのはんだを取り除いたので…。

その他にも ErgoDash の組み立てでいくつか失敗したので書き記しておきます。
ErgoDash を組み立てようとしている人は一読して二の轍を踏まないようにしてもらえたら…。

## TL;DL

- キースイッチが浮かないようにはんだ付けしましょう
- スタビラザーのルブもした方がいいでしょう
  - 潤滑剤も適切なものを選びましょう
- Pro Micro Type-C 版はそのままだと ErgoDash には付きません :cry:
- 左右のマスターがファームウェアで固定です
  - ケーブルを左右のどちらに指すか固定

## 懺悔

ErgoDash の組み立てで失敗した項目は以下の 3 つ。

- キースイッチのはんだ付け
- スタビライザーのルブ
- Pro Micro

自作キーボード組み立てるの 2 回目なのに失敗しすぎでは？

組み立て後に気がついたこととして、

- 左右のマスターが存在する

です。それでは一つずつ見ていきましょう。

### キースイッチのはんだ付け

最初の懺悔としてキースッチのハンダ付けに失敗しました。
これは[ビルドガイド](https://github.com/yushakobo/build-documents/blob/master/ErgoDash/ErgoDash_BuildGuide.md)にも書かれていることですが、
キースイッチをはんだ付けするときは、アクリル板との間に隙間ができないように気をつけましょう。
失敗すると画像のようになります。

![キースイッチの浮き](./imgs/ErgoDash_Side.jpg)

一番右側はキースイッチが奥まで刺さっていますが左側にいくにつれて浮いてます。
今のところ使用する上で大きな問題は起きてないですが、置いたときに若干のぐらつきが出てしまったのはこの辺りが問題かと思ってます。
一部のキースイッチのはんだを取り除いてはんだ付けし直したのですが、ほぼ全てのキースイッチを外さないと直せなそうだったので妥協しました。

最後の感想で触れますがホットスワップに対応していないとこういうときに軌道修正が面倒です…。
注意してはんだ付けしなかったのが悪いだけではありますが…。

### スタビライザーのルブ

二つ目の失敗はスタビライザーのルブです。
[スタビライザーのルブの話](https://salicylic-acid3.hatenablog.com/entry/stabilizer-lubrication)で触れられていますが、
スタビライザーのルブはした方がいいと思います。
ビルドキットでは一切触れられてません。
また、潤滑剤も種類があるので「自作キーボード温泉街の歩き方」で推奨されているものを使うのがいいと思います。
組み立てた後にこの記事を見たので Krytox GPL 205 Grade 0 ではなく 3203 を使ってしまいました。
そこまで大きな失敗ではないですが、再びルブしようと思うとキースイッチを全て外さないといけないので固まって 2u のキーが動かないといった事態にならない限りは塗り直すやる気は起きないので失敗したなーと思いました。

### Pro Micro

これが一番の誤算でしょうか。
Ergo Dash には Pro Micro Type-C 版がそのままだと使えません。

ΩΩΩ < な、なんだってー!?

[背筋トレーニング日記: 遅ればせながら自作キーボードデビューしました](https://mohammedari.blogspot.com/2019/02/blog-post.html)で触れられているように PCB を削らないといけません。
手元に PCB を削るための道具がないので諦めて Micro-USB を付けました。
手元のケーブルは USB Type-C で揃えたいので悲しいです…。
それが原因が利用頻度が減りそうです。

ケーブルが 2 m と長いのと汎用性がないのが気になりますが、以下の商品を買おうか検討してます。

- [Amazon.co.jp: 9pin マグネット 充電ケーブル PD60W USBケーブル 540°回転 1本6役【2m＋2m】USB-A変換アダプタ付き USB₋A/USB-C to Type-C/Micro USB/他の機種 PD急速充電 高速データ転送 タイプc マイクロb Ma-Book Pro/Air/Pad/phone/Micro/Android等対応 磁石 マグネット式【AUFU】（グリーン・2本セット） : パソコン・周辺機器](https://www.amazon.co.jp/gp/product/B0CBRX2QDH/)

### マスターの左右が決まっている

組み立てにおける失敗ではないですが、ErgoDash は分割された左右のキーボードに対してマスターが存在します。
そのため、ケーブルは常に右、もしくは左の決まった方に指さなければなりません。
Keyball61 では右に指しても左に指しても問題ありませんでした。
これは PCB の一部をショートさせて右、左の判別ができるようにしているからですが、ErgoDash にはそれがないためファームウェア側で右、左のマスターを指定して書き込まなければなりません。

面倒ですね。

## ErgoDash 組み立ての感想

ErgoDash はいい感じのキーボードだと思います。
キー配列やサイズは好みです。
Keyball61 を使っていなかったらメインの持ち運び用のキーボードにしていたと思います。
しかし、初心者にはおすすめできない点がいくつかあります。

おすすめできない一番の理由はキットを買っただけだとホットスワップに対応していないことです。
ホットスワップに対応するためにベリリウム銅が必要です。
自作キーボードでホットスワップに対応するには、[Kailh Switch Socket](https://shop.yushakobo.jp/products/a01ps/) を使うか、
ベリリウム銅と呼ばれているピンレセプタクルコネクタを使わないといけないのですが、
ErgoDash はベリリウム銅を使わなければなりません。
今回は使っていないので ErgoDash で使えるかわからないですが、
[こんな感じの部品](https://www.digikey.jp/ja/products/detail/mill-max-manufacturing-corp/7305-0-15-15-47-27-10-0/1765737)をキースイッチの数 × 2 だけ用意しないといけないです。
それなりの金額になりますし、初めてのはんだ付けでは挑戦しない方がいいでしょう。
それでは、ホットスワップに対応できないと何がよくないのでしょうか。
自作キーボードが初めての人だとキースイッチが交換できないだけじゃないの？と思うかもしれません。
しかし、それだけではないのです。
キーボードを分解しようと思ったときにキースイッチを外さないといけません…。
つまり、はんだ付けが甘くてあとから接触不良があることに気がついたり、あとからスタビライザーに潤滑剤を塗ろうと思ったとき、
すべてのキースイッチのはんだを取り除いてキースイッチを外さなければなりません。
これが結構辛い。
ビルドキットにはんだ付けが問題なく行えているか通電を確認するタイミングとか書かれてないし…。

おすすめできない二つ目の理由としてビルドキットが不親切な点です。
[[遊舎工房ギルドクエスト]ErgoDashビルドログ](https://note.com/964_kuroyon/n/n07b61980d7fb) では触れられていますが、
スタビライザーのルブ (潤滑剤を塗ること) についてビルドキットでは触れられていません。
また、ダイオードのはんだ付けの後にキースイッチのはんだ付けをするのはどうなのでしょうか。
Pro Micro のコンスルーをはんだ付けしてファームウェアを焼いた後にピンセットでキースイッチを取り付ける部分をショートさせて入力が問題ないことを確認してからキースイッチのはんだづけに進むべきではないかと思いました。
それに加えてビルドガイドにはトラブルシューティングもなければ、LED の取り付けをしたい場合だけ本家ビルドガイドを参照と書いてありますが、ファームウェアがどこで手に入るのかも元のビルドガイドには書かれていません。
つまり、本家ビルドガイドは LED の使用有無によらず事実上の必読です。

上記のような理由から ErgoDash は初心者向けではないと思いました (私も初心者なのですが…)。

ボタンが少なくていい人は [Iris FR4 Plates Set](https://shop.yushakobo.jp/products/iris-fr4-plates-set) あたりも選択肢に入ってくるのではないでしょうか。

調べと Rev. 8 まで出ているようだけど、Rev. 5 以降は国内だと海外輸入しかないですかね。

<lite-youtube videoid="wkuL4u3ZAP4"></lite-youtube>

Iris も気になっていますが、このサイズ感のキーボードはこれ以上組み立てても使わなそうなので次回は [Corne Cherry V3](https://shop.yushakobo.jp/products/corne-cherry-v3?_pos=3&_sid=8729bdb07&_ss=r) を組み立てます。
[Corchim](https://kbd.arashike.com/corchim) を衝動買いしてしまったので、基盤の方を売り切れる前に手に入れておかないと…。