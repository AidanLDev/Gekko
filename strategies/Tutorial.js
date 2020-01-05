var strat = {};

strat.init = function() {
  this.addTulipIndicator('ema10', 'ema', {
    optInTimePeriod: this.settings.slow,
  });
  this.addTulipIndicator('ema21', 'ema', {
    optInTimePeriod: this.settings.fast,
  });

  this.addTulipIndicator('rsi', 'rsi', {
    optInTimePeriod: 14,
  });
};
//  Candle Object:
/*
  {
    start: moment("2020-01-03T09:50:00.000"),
    open: 7315,
    high: 7405,
    low: 7229.3,
    close: 7360.13,
    vwp: 7327.286649557245,
    volume: 45467.682411000016,
    trades: 360676 
  }
*/
console.log(this);
strat.check = function(candle) {
  const RSI = this.tulipIndicators.rsi.result.result;

  const ema10 = this.tulipIndicators.ema10.result.result;
  const ema21 = this.tulipIndicators.ema21.result.result;

  console.log(RSI);

  if (ema10 > ema21) {
    this.advice({
      direction: 'long',
      trigger: {
        type: 'trailingStop',
        trailPercentage: 1,
      },
    });
  }
};

module.exports = strat;
