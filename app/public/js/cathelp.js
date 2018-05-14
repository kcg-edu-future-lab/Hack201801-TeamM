// スケジュールのカレンダーを初期化
initCalendar($('#schedule .calendar'));

// fetchのラッパー
function fetchWrapper(urlString, options) {
  return fetch(urlString, options)
    .catch(err => {
      // corsエラー、networkエラー等、そもそもサーバへ本リクエストする以前のエラー
      console.log("CLIENT-ERR :", err)
      throw new Error("アクセスできません、時間を置いてお試しください")
    })
    .then(response => {
      // レスポンスのヘッダを処理したい場合はここで
      for (const pair of response.headers.entries()) {
        // console.log(" RES-HEADER: ", pair[0]+ ': '+ pair[1])
      }
      // 返り値はpromiseになってるので展開する
      const responseBodyPromise = response.json()
      return responseBodyPromise.then(body => ({ body: body, responseOk: response.ok }))
    })
    .then(({ body, responseOk }) => {
      // ここで正常なリクエスト完了だと判定
      if (responseOk) {
        return body
      }
      // サーバとのやりとりが出来ている40x系、50x系はここ
      console.log("SERVER-ERR :", body)
      throw new Error(body || "リクエストに失敗しました")
    })
}

// ナビゲーションタブの初期化
$('#navigation-tabs').tabs({
  'onShow' : function(tab) {
    // 表示時にカレンダーを初期化
    initCalendar($('.calendar', tab));

    if (tab[0].id === 'item') {
      $('#item').removeData('name');
      $('#item .panel-header').text('備品予約');
      fetchWrapper('/api/v1/equipment', null).then(body => {
        updateItems(body);
      }).catch(err => {
        console.log("通信エラー");
        updateItems();
      });
    }
    if (tab[0].id === 'room') {
      $('#room').removeData('name');
      $('#room .panel-header').text('施設予約');
      updateRooms();
    }
  }
});

// 予約モーダルの完了処理
$('#item-reservation .modal-close').on('click', function() {
  var eid = 1;
  var pid = 1;
  var stime = $('#item-reservation .stime').text();
  var etime = $('#item-reservation .etime').text();

  $.post('http://10.41.0.4:4567/api/v1/reservation/equipment', {
    'eid' : eid,
    'pid' : pid,
    'stime' : stime,
    'etime' : etime,
  }).done(console.log).fail(console.log);

  var items = [
    {
      'start' : stime,
      'end'   : etime,
    }
  ];

  $('#item .calendar').fullCalendar('renderEvents', items);
});
$('#room-reservation .modal-close').on('click', function() {
  var eid = 1;
  var pid = 1;
  var stime = $('#room-reservation .stime').text();
  var etime = $('#room-reservation .etime').text();

  $.post('http://10.41.0.4:4567/api/v1/reservation/equipment', {
    'eid' : eid,
    'pid' : pid,
    'stime' : stime,
    'etime' : etime,
  }).done(console.log);

  var items = [
    {
      'start' : stime,
      'end'   : etime,
    }
  ];

  $('#room .calendar').fullCalendar('renderEvents', items);
});
$('#schedule-reservation .modal-close').on('click', function() {
  var name  = $('#schedule-reservation input').val();

  if (name === '') {
    return;
  }

  var stime = $('#schedule-reservation .stime').text();
  var etime = $('#schedule-reservation .etime').text();

  $.post('http://10.41.0.4:4567/api/v1/schedule', {
    'name'  : name,
    'stime' : stime,
    'etime' : etime,
  }).done(console.log);

  var items = [
    {
      'start' : stime,
      'end'   : etime,
    }
  ];

  $('#schedule .calendar').fullCalendar('renderEvents', items);
});

// カレンダーを初期化します。
function initCalendar($target) {
  $target.fullCalendar('destroy');;
  $target.fullCalendar({
    'allDaySlot'  : false,
    'header'      : false,
    'height'      : 'parent',
    'defaultView' : 'agendaWeek',
    'scrollTime'  : moment().format('HH:00:00'),
    'selectable'  : true,
    'select'      : function(stime, etime) {
      var id = $target.closest('.panel').attr('id');

      if (id === 'item' && $('#item').data('name') !== (void 0)) {
        $('#item-reservation h4').text($('#item').data('name') + 'の予約');
        $('#item-reservation .stime').text(stime.format('YYYY-MM-DD HH:mm:ss'));
        $('#item-reservation .etime').text(etime.format('YYYY-MM-DD HH:mm:ss'));
        $('#item-reservation').modal('open');
      }
      if (id === 'room' && $('#room').data('name') !== (void 0)) {
        $('#room-reservation h4').text($('#room').data('name') + 'の予約');
        $('#room-reservation .stime').text(stime.format('YYYY-MM-DD HH:mm:ss'));
        $('#room-reservation .etime').text(etime.format('YYYY-MM-DD HH:mm:ss'));
        $('#room-reservation').modal('open');
      }
      if (id === 'schedule') {
        $('#schedule-reservation .stime').text(stime.format('YYYY-MM-DD HH:mm:ss'));
        $('#schedule-reservation .etime').text(etime.format('YYYY-MM-DD HH:mm:ss'));
        $('#schedule-reservation').modal('open');
      }

      $target.fullCalendar('unselect');
    },
  });
}

// 備品リストを更新する
function updateItems(items) {
  $('#item-list').empty();

  if (items === (void 0)) {
    items = [
      {
        'name': 'none',
        'type': [],
      }
    ];
    updateItems(items);
  } else {
    items.forEach(function(item) {
      var $li = $('<li />');

      var $head = $('<div class="collapsible-header" />');
      var $body = $('<div class="collapsible-body" />');

      $head.append(item.name);

      var $collection = $('<div class="collection" />');
      item.type.forEach(function(type) {
        $collection.append($('<a class="collection-item" href="#item-reservation" />').text(type.name));
      });
      $body.append($collection);

      $li.append($head);
      $li.append($body);

      $('#item-list').append($li);
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
        'type': [
          {
            'name': '会議室A',
          },
          {
            'name': '会議室B',
          },
          {
            'name': '会議室C',
          },
        ],
      },
    ];
    updateRooms(rooms);
  } else {
    rooms.forEach(function(room) {
      var $li = $('<li />');

      var $head = $('<div class="collapsible-header" />');
      var $body = $('<div class="collapsible-body" />');

      $head.append(room.name);
      var $collection = $('<div class="collection" />');
      room.type.forEach(function(type) {
        $collection.append($('<a class="collection-item" href="#room-reservation" />').text(type.name));
      });
      $body.append($collection);

      $li.append($head);
      $li.append($body);

      $('#room-list').append($li);
    });
  }
}

// 備品予約の検索ボタンが押された場合
$('#item-search').on('submit', function() {
  // Ajaxで取得
  var items = [
  ];

  updateItems(items);
  return false;
});

// 施設予約の検索ボタンが押された場合
$('#room-search').on('submit', function() {
  // Ajaxで取得
  var rooms = [
  ];

  updateRooms(rooms);
  return false;
});


// 備品スケジュールの表示
$(document).on('click', '[href="#item-reservation"]', function() {
  // Ajaxで取得
  var items = [
    // {
    //   'start' : '2018-01-28 15:00:00',
    //   'end'   : '2018-01-28 17:00:00',
    // }
  ];

  $('#item .calendar').fullCalendar('removeEvents');
  $('#item .calendar').fullCalendar('renderEvents', items);
  $('#item .panel-header').text($(this).text() + 'の予約');
  $('#item').data('name', $(this).text());

  return false;
});

// 施設スケジュールの表示
$(document).on('click', '[href="#room-reservation"]', function() {
  // Ajaxで取得
  var rooms = [
    // {
    //   'start' : '2018-01-28 15:00:00',
    //   'end'   : '2018-01-28 17:00:00',
    // }
  ];

  $('#room .panel-header').text($(this).text() + 'の予約');
  $('#room .calendar').fullCalendar('removeEvents');
  $('#room .calendar').fullCalendar('renderEvents', rooms);
  $('#room').data('name', $(this).text());

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
