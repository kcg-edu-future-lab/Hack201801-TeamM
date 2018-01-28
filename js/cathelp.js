// スケジュールのカレンダーを初期化
initCalendar($('#schedule .calendar'));

// ナビゲーションタブの初期化
$('#navigation-tabs').tabs({
  'onShow' : function(tab) {
    // 表示時にカレンダーを初期化
    initCalendar($('.calendar', tab));

    if (tab[0].id === 'item') {
      $('#item .panel-header').text('備品予約');
      updateItems();
    }
    if (tab[0].id === 'room') {
      $('#room .panel-header').text('施設予約');
      updateRooms();
    }
  }
});

function initCalendar($target) {
  $target.fullCalendar('destroy');;
  $target.fullCalendar({
    'allDaySlot'  : false,
    'header'      : false,
    'height'      : 'parent',
    'defaultView' : 'agendaWeek',
    'scrollTime'  : moment().format('HH:00:00'),
    'selectable'  : true,
    'select'      : function(start, end) {
      $('#schedule .calendar').fullCalendar('unselect');
    },
  });
}

// 備品リストを更新する
function updateItems(items) {
  $('#item-list').empty();

  if (items === (void 0)) {
    items = [
      {
        'name': 'カメラ',
        'type': [
          {
            'name': 'カメラA',
          },
          {
            'name': 'カメラB',
          },
          {
            'name': 'カメラC',
          },
        ],
      },
      {
        'name': 'ハードディスク',
        'type': [
          {
            'name': 'ハードディスクA',
          },
          {
            'name': 'ハードディスクB',
          },
          {
            'name': 'ハードディスクC',
          },
        ],
      },
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
    {
      'start' : '2018-01-28 15:00:00',
      'end'   : '2018-01-28 17:00:00',
    }
  ];

  $('#item .calendar').fullCalendar('removeEvents');
  $('#item .calendar').fullCalendar('renderEvents', items);
  $('#item .panel-header').text($(this).text() + 'の予約');

  return false;
});

// 施設スケジュールの表示
$(document).on('click', '[href="#room-reservation"]', function() {
  // Ajaxで取得
  var rooms = [
    {
      'start' : '2018-01-28 15:00:00',
      'end'   : '2018-01-28 17:00:00',
    }
  ];

  $('#room .panel-header').text($(this).text() + 'の予約');
  $('#room .calendar').fullCalendar('removeEvents');
  $('#room .calendar').fullCalendar('renderEvents', rooms);

  return false;
});



$(document).ready(function(){
  $('.modal').modal();
});
