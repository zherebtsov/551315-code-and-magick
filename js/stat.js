'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_BOTTOM = CLOUD_Y + CLOUD_HEIGHT;
var SMALL_GAP = 5;
var GAP = 10;
var PADDING = 25;
var FONT_GAP = 16;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var BAR_GAP = 50;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
  ctx.fillRect(x + GAP, y + GAP, CLOUD_WIDTH, CLOUD_HEIGHT); // shadow cloud
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT); // cloud
};

var addText = function (ctx, text, x, y) {
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText(text, x, y);
};

var fillColor = function (name) {
  if (name === 'Вы') {
    return 'rgba(255, 0, 0, 1)';
  }
  return 'rgba(0, 0, 255, ' + Math.random() + ')';
};

var getMaxElemArr = function (arr) {
  var maxElem = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (maxElem < arr[i]) {
      maxElem = arr[i];
    }
  }
  return maxElem;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  addText(ctx, 'Ура вы победили!', CLOUD_X + PADDING, CLOUD_Y + PADDING);
  addText(ctx, 'Список результатов:', CLOUD_X + PADDING, CLOUD_Y + PADDING + FONT_GAP);

  var maxTime = getMaxElemArr(times);

  for (var i = 0; i < names.length; i++) {
    var x = CLOUD_X + (i + 1) * BAR_GAP + i * BAR_WIDTH;
    var currentBarHeight = (BAR_HEIGHT * times[i]) / maxTime;
    addText(ctx, names[i], x, CLOUD_BOTTOM - PADDING);
    ctx.fillStyle = fillColor(names[i]);
    ctx.fillRect(x, CLOUD_BOTTOM - PADDING - FONT_GAP - currentBarHeight, BAR_WIDTH, currentBarHeight);
    addText(ctx, Math.round(times[i]), x, CLOUD_BOTTOM - PADDING - currentBarHeight - FONT_GAP - SMALL_GAP);
  }
};

