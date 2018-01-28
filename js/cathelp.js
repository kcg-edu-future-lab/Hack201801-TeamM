// スケジュールのカレンダーを初期化
$('#schedule .calendar').fullCalendar({
  'allDaySlot'  : false,
  'header'      : false,
  'height'      : 'parent',
  'defaultView' : 'agendaWeek',
  'scrollTime'  : moment().format('HH:00:00'),
});

// ナビゲーションタブの初期化
$('#navigation-tabs').tabs({
  'onShow' : function(tab) {
    // 表示時にカレンダーを初期化
    $('.calendar', tab).fullCalendar('destroy');
    $('.calendar', tab).fullCalendar({
      'allDaySlot'  : false,
      'header'      : false,
      'height'      : 'parent',
      'defaultView' : 'agendaWeek',
      'scrollTime'  : moment().format('HH:00:00'),
    });

    if (tab.id === 'item') updateItems();
    if (tab.id === 'room') updateRooms();
  }
});

// 備品リストを更新する
function updateItems(items) {
  $('#item-list').empty();

  if (items === (void 0)) {
    items = [
      {
        'name': 'カメラ',
      },
      {
        'name': 'ハードディスク',
      },
    ];
    updateItems(items);
  }
  if (items !== (void 0)) {
    items.forEach(function(item) {
      $('#item-list').append($('<a class="collection-item" href="#" />').text(item.name));
    });
  }
}

// 施設リストを更新する
function updateRooms(rooms) {
  $('#room-list').empty();

  if (rooms === (void 0)) {
    rooms = [
      {
        'name': '会議室',
      },
    ];
    updateRooms(rooms);
  }
  if (rooms !== (void 0)) {
    rooms.forEach(function(room) {
      $('#room-list').append($('<a class="collection-item" href="#" />').text(room.name));
    });
  }
}

// 備品予約の検索ボタンが押された場合
$('#item-search').on('submit', function() {
  // ダミー
  var items = [
    {
      'name': $('[name="item"]', this).val() + 'AAAA',
    },
    {
      'name': $('[name="item"]', this).val() + 'BBBB',
    },
    {
      'name': $('[name="item"]', this).val() + 'CCCC',
    },
  ];

  updateItems(items);
  return false;
});

// 施設予約の検索ボタンが押された場合
$('#room-search').on('submit', function() {
  // ダミー
  var rooms = [
    {
      'name': $('[name="room"]', this).val() + 'AAAA',
    },
    {
      'name': $('[name="room"]', this).val() + 'BBBB',
    },
    {
      'name': $('[name="room"]', this).val() + 'CCCC',
    },
  ];

  updateRooms(rooms);
  return false;
});

// modal window
$(document).ready(function(){
  $('.modal').modal();
});

// ヤベェボタン
$("#yabeBtn").click(function () {
    $('#modal1').modal('close');
    $.ajax({
        type: 'POST',
        url: " /api/v1/nekonote/test",
        timeout: 10000,         // タイムアウト(ミリ秒)
        cache: true,            // キャッシュするかどうか
        // async: false,        // 同期通信にする : false
        // data: sendData || null,     // サーバに送信するデータ(name: value)
        dataType: 'json',       // レスポンスが適切なContentTypeを返していれば自動判別します。
        beforeSend: function(jqXHR) {       // Ajax通信前処理
            return true;        // falseを返すと処理を中断
        }
    })
});

// ネこの手リスト
$(document).ready( function(){

    var j;
    var rec = $.ajax({
        type: 'GET',
        url: "http://10.41.0.4:4567/api/v1/nekonote",
        timeout: 10000,         // タイムアウト(ミリ秒)
        cache: true,            // キャッシュするかどうか
        // async: false,        // 同期通信にする : false
        // data: sendData || null,     // サーバに送信するデータ(name: value)
        dataType: 'json',       // レスポンスが適切なContentTypeを返していれば自動判別します。
        beforeSend: function(jqXHR) {       // Ajax通信前処理
            return true;        // falseを返すと処理を中断
        }
    })

    rec.done(function(data){
        // 成功処理

        console.log(data);
        j = data;

        var base = $("#cat-help tbody");
    
        for(let i in j) {
            var tr = $("<tr>");

            var thName = $("<td>");
            thName.append(j[i].user_id);

            var thTime= $("<td>");
            thTime.append(moment(j[i].start_date).format('YYYY-MM-DD HH:mm') + " - " + moment(j[i].end_date).format('HH:mm'));

            var thBtn = $("<td>");
            thBtn.addClass("help-"+j[i].user_id); // ヘルプの要請ID
            thBtn.append("<a class=\"waves-effect waves-light btn catHelpBtn\">救援要請</a>");

            tr.append(thName);
            tr.append(thTime);
            tr.append(thBtn);

            base.append(tr);
            
        }
        
    })
    rec.fail(function(data){
        // 失敗処理
        
        
    });


    

});

$(document).on("click", ".catHelpBtn", function (e) {
    console.log(e.target.parentElement.className);

    // var data={};
    // data.id = "test";

    $.ajax({
        type: 'GET',
        url: "http://10.41.0.4:4567/api/v1/nekonote/test",
        timeout: 10000,         // タイムアウト(ミリ秒)
        cache: true,            // キャッシュするかどうか
        // async: false,        // 同期通信にする : false
        // data: data,     // サーバに送信するデータ(name: value)
        dataType: 'json',       // レスポンスが適切なContentTypeを返していれば自動判別します。
        beforeSend: function(jqXHR) {       // Ajax通信前処理
            return true;        // falseを返すと処理を中断
        }
    })
});