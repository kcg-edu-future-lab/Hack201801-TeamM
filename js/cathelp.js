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

$(document).ready(function(){
  $('.modal').modal();
});
