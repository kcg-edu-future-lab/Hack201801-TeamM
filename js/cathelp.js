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

$(document).ready(function(){
  $('.modal').modal();
});
