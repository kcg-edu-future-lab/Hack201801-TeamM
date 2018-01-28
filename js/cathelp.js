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
    });
  }
});

// スケジュールのカレンダーを初期化
$('#schedule .calendar').fullCalendar({
  'allDaySlot'  : false,
  'header'      : false,
  'height'      : 'parent',
  'defaultView' : 'agendaWeek',
});

// 備品リストを更新する
function updateItems() {
}

// 施設リストを更新する
function updateRooms() {
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

  $('#item-list').empty();
  items.forEach(function(item) {
    $('#item-list').append($('<a class="collection-item" href="#" />').text(item.name));
  });

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

  $('#room-list').empty();
  rooms.forEach(function(room) {
    $('#room-list').append($('<a class="collection-item" href="#" />').text(room.name));
  });

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
        url: "http://127.0.0.1/" + 'aaa',
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

    var j = {
        "0":{
            "name" : "aaa",
            "position" : "bbb",
            "time" : "10:00-12:00"
        },
        "1":{
            "name" : "aaaa",
            "position" : "bbb",
            "time" : "10:00-12:00"
        }, 
        "2":{
            "name" : "aaaaa",
            "position" : "bbb",
            "time" : "10:00-12:00"
        }
    }

    var base = $("#cat-help tbody");
    
    
    
    for(let i in j) {
        var tr = $("<tr>");

        var thName = $("<td>");
        thName.append(j[i].name);

        var thPosition = $("<td>");
        thPosition.append(j[i].position); 

        var thTime= $("<td>");
        thTime.append(j[i].time);

        var thBtn = $("<td>");
        thBtn.addClass("help-"+j[i].name); // ヘルプの要請ID
        thBtn.append("<a class=\"waves-effect waves-light btn catHelpBtn\">救援要請</a>");

        tr.append(thName);
        tr.append(thPosition);
        tr.append(thTime);
        tr.append(thBtn);

        base.append(tr);
        
    }

});

$(document).on("click", ".catHelpBtn", function (e) {
    console.log(e.target.parentElement.className);
});