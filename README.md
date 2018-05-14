# 2018-01 TEAM-M

## サーバの起動

```
git clone https://github.com/kcg-edu-future-lab/Hack201801-TeamM.git
cd Hack201801-TeamM/app
bundle install --path vender/bundle
bundle exec ruby app.rb
```

![screenshot-2018-5-7 5](https://user-images.githubusercontent.com/12947868/39707746-382fbbc8-5250-11e8-9025-06264ccff55c.png)

TeamMによる成果物です。  

スケジュールはドラッグアンドドロップで予定を追加できます。  
備品予約は右のメニューから備品を選んでドラッグアンドドロップで予定を追加できます。  
施設予約も同様の操作です。

ある程度ハッカソン当日の状態まで修正しました。  
しかしまだ多くの機能がAPIを通さず、ダミーデータで動いています。  
ログインして確かめるにはテストユーザの`debugger`でログインして下さい。  
ID、パスワード共に`debugger`でログインできます。  
正常にWebアプリケーションとして動作するよう修正中です。
