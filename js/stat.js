'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_COLOR = 'white';
var SHADOW_GAPE = 10;
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';

var PLAYER_NAME = 'Вы';
var PLAYER_COLOR = 'rgba(255, 0, 0, 1)';
var LINE_HEIGHT = 20;
var TEXT_X = 120;
var TEXT_Y = 30;

var COLUMN_X = 150;
var COLUMN_Y = 70;
var COLUMN_WIDTH = 40;
var MAX_COLUMN_HEIGHT = 150;
var COLUMN_GAP = 50;

var FONT_SETTINGS = '16px PT Mono';
var TEXT_BASE_LINE = 'top';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var max = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }

  return max;
};

var getColumnColor = function () {
  return 'rgba(0, 0, 255, ' + Math.random() + ')'; // нужно округлить
};


var renderText = function (ctx, font, baseLine, textX, textY, lineHeight) {
  ctx.font = font;
  ctx.textBaseline = baseLine;
  ctx.fillStyle = 'black';
  ctx.fillText('Ура вы победили!', textX, textY);
  ctx.fillText('Список результатов:', textX, textY + lineHeight);
};

var renderColumns = function (ctx, names, times) {
  var maxTime = Math.round(getMaxElement(times)); // округляю к целому
  for (var i = 0; i < times.length; i++) {
    var columnCoordinateX = COLUMN_X + i * (COLUMN_WIDTH + COLUMN_GAP);
    var time = Math.round(times[i]);
    var columnHeight = Math.round(MAX_COLUMN_HEIGHT * time / maxTime);
    var timeCoordinateY = COLUMN_Y + (MAX_COLUMN_HEIGHT - columnHeight);
    var columnCoordinateY = timeCoordinateY + LINE_HEIGHT;
    var nameCoordinateY = columnCoordinateY + columnHeight;

    ctx.fillStyle = 'black';
    ctx.fillText(time, columnCoordinateX, timeCoordinateY);
    ctx.fillText(names[i], columnCoordinateX, nameCoordinateY);

    ctx.fillStyle = (names[i] === PLAYER_NAME) ? PLAYER_COLOR : getColumnColor();
    ctx.fillRect(columnCoordinateX, columnCoordinateY, COLUMN_WIDTH, columnHeight);
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + SHADOW_GAPE, CLOUD_Y + SHADOW_GAPE, SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);
  renderText(ctx, FONT_SETTINGS, TEXT_BASE_LINE, TEXT_X, TEXT_Y, LINE_HEIGHT);
  renderColumns(ctx, names, times);
};
