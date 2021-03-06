// JSXGraph template commands.

getCoord = function(x, info) {
    return (x-info.min)/(info.max-info.min);
}

getValue = function(coord, info) {
    return info.min + coord*(info.max-info.min);
}

createTicks = function(board, axis, info) {
    var logWidth = Math.log10(info.max - info.min);
    var mag = Math.floor(logWidth);
    var val = logWidth-mag;
    var tickGap;
    if (val > 0.1) {
        tickGap = Number("1e"+mag);
    } else {
        tickGap = Number("0.1e"+mag);
    }
    var tickVal = (Math.floor(info.min/tickGap)+1)*tickGap;
    var tickPos = [], myLabels = [], i=0;
    while (tickVal < info.max) {
        tickPos[i] = getCoord(tickVal, info);
        myLabels[i] = ""+tickVal.toPrecision(3);
        i++;
        tickVal += tickGap;
    }
    board.create('ticks', [axis, tickPos],
        {
            drawZero: false,
            label: {offset: [0, -12], fontSize: 10},
            labels: myLabels,
            drawLabels: true,
        }
    );
}

createFGraph = function(jcf, idName)
{
    if (jcf.input.min == undefined || jcf.input.max == undefined) {
        jcf.input.min = -5.5;
        jcf.input.max = 5.5;
    }
    if (jcf.output.min == undefined || jcf.output.max == undefined) {
        jcf.output.min = jcf.input.min;
        jcf.output.max = jcf.input.max;
    }
    JXG.Options.axis.ticks.majorHeight = 8;
    JXG.Options.axis.ticks.minorHeight = 4;
    JXG.Options.axis.ticks.drawZero = false;

    if (jcf.input.min == undefined || jcf.input.max == undefined) {
        jcf.input.min = -5.5;
        jcf.input.max = 5.5;
    }
    if (jcf.output.min == undefined || jcf.output.max == undefined) {
        jcf.output.min = jcf.input.min;
        jcf.output.max = jcf.input.max;
    }

    jcf.b = JXG.JSXGraph.initBoard(idName, 
        {
            boundingbox:[
                    jcf.input.min,
                    jcf.output.max,
                    jcf.input.max,
                    jcf.output.min
                ],
            axis: true,
            grid: false,
            showCopyright:false,
            showNavigation:false,
        }
    );
    jcf.xaxis = jcf.b.create('axis',
        [ [0,0],[1,0] ], {
        visible:false
        }
    );
    jcf.b.create('functiongraph', [jcf.f]);
    jcf.xV = jcf.b.create('glider',
        [jcf.input.value,0, jcf.xaxis],
        {
            name:jcf.input.name,
            color:jcf.input.color,
        }
    );
    jcf.gPt = jcf.b.create('point', 
        [
            function() {return jcf.xV.X()}, 
            function() { return jcf.f(jcf.xV.X())}
        ],
        {
            fixed:true,
            name:'',
            color:'black',
            size:1,
        }
    );
    jcf.yV = jcf.b.create('point', 
        [0, function() { return jcf.f(jcf.xV.X())}],
        {
            fixed:true,
            name:jcf.output.name,
            color:jcf.output.color,
            size:1,
        }
    );
    jcf.b.create('arrow',
        [jcf.xV, jcf.gPt],
        {
            fixed:true,
            dash: 2,
            color:'black',
        }
    );
    jcf.b.create('arrow',
        [jcf.gPt, jcf.yV],
        {
        fixed:true,
        dash: 2,
        color:'black',
        }
    );
}

createFGraphMulti = function(jcf, idName)
{
    if (jcf.input.min == undefined || jcf.input.max == undefined) {
        jcf.input.min = -5.5;
        jcf.input.max = 5.5;
    }
    if (jcf.output.min == undefined || jcf.output.max == undefined) {
        jcf.output.min = jcf.input.min;
        jcf.output.max = jcf.input.max;
    }
    JXG.Options.axis.ticks.majorHeight = 8;
    JXG.Options.axis.ticks.minorHeight = 4;
    JXG.Options.axis.ticks.drawZero = false;

    if (jcf.input.min == undefined || jcf.input.max == undefined) {
        jcf.input.min = -5.5;
        jcf.input.max = 5.5;
    }
    if (jcf.output.min == undefined || jcf.output.max == undefined) {
        jcf.output.min = jcf.input.min;
        jcf.output.max = jcf.input.max;
    }

    jcf.b = JXG.JSXGraph.initBoard(idName, 
        {
            boundingbox:[
                    jcf.input.min,
                    jcf.output.max,
                    jcf.input.max,
                    jcf.output.min
                ],
            axis: true,
            grid: false,
            showCopyright:false,
            showNavigation:false,
        }
    );
    jcf.xaxis = jcf.b.create('axis',
        [ [0,0],[1,0] ], {
        visible:false
        }
    );
    jcf.b.create('functiongraph', [jcf.f]);
    jcf.xV = [];
    jcf.gPt = [];
    jcf.yV = [];
    for (var i in jcf.input.values) {
        jcf.xV[i] = jcf.b.create('glider',
            [jcf.input.values[i],0, jcf.xaxis],
            {
                name:jcf.input.name+"_{"+i+"}",
                color:jcf.input.color,
            }
        );
        jcf.gPt[i] = jcf.b.create('point', 
            [
                function() {return jcf.xV[this.name].X()}, 
                function() { return jcf.f(jcf.xV[this.name].X())}
            ],
            {
                fixed:true,
                name:i,
                color:'black',
                size:1,
            }
        );
        jcf.yV[i] = jcf.b.create('point', 
            [0, function() {
                    var start = this.name.indexOf("{")+1;
                    var end = this.name.indexOf("}");
                    var index = this.name.substring(start,end);
                    return jcf.f(jcf.xV[index].X())
                }],
            {
                fixed:true,
                name:jcf.output.name+"_{"+i+"}",
                color:jcf.output.color,
                size:1,
            }
        );
        jcf.b.create('arrow',
            [jcf.xV[i], jcf.gPt[i]],
            {
                fixed:true,
                dash: 2,
                color:'black',
            }
        );
        jcf.b.create('arrow',
            [jcf.gPt[i], jcf.yV[i]],
            {
            fixed:true,
            dash: 2,
            color:'black',
            }
        );
    }
}

createMap = function(jcf, idName)
{
    JXG.Options.axis.ticks.majorHeight = 8;
    JXG.Options.axis.ticks.minorHeight = 4;
    JXG.Options.axis.ticks.drawZero = true;
    jcf.b = JXG.JSXGraph.initBoard(idName, 
        {
            boundingbox:[0,3,1,-1],
            axis: false,
            grid: false,
            showCopyright:false,
            showNavigation:false,
        });
    jcf.xaxis = jcf.b.create('axis',
        [ [0,2],[1,2] ], 
        {
            drawZero:false // Doesn't do anything here.
        }
    );
    jcf.xaxis.removeAllTicks();
    if (jcf.input.min == undefined || jcf.input.max == undefined) {
        jcf.input.min = -5.5;
        jcf.input.max = 5.5;
    }
    createTicks(jcf.b, jcf.xaxis, jcf.input);

    jcf.yaxis = jcf.b.create('axis',
        [ [0,0],[1,0] ], {
            drawZero:false // Doesn't do anything here.
        }
    );
    jcf.yaxis.removeAllTicks();
    if (jcf.output.min == undefined || jcf.output.max == undefined) {
        jcf.output.min = jcf.input.min;
        jcf.output.max = jcf.input.max;
    }
    createTicks(jcf.b, jcf.yaxis, jcf.output);

    if (jcf.input.snap == undefined) {
        jcf.input.snap = false;
    }
    if (jcf.input.snap) {
      // Create points on the axis on which to snap.
      for (i=Math.ceil(jcf.input.min); i <= Math.floor(jcf.input.max); i++) {
        jcf.b.create('point', [i, 2, jcf.xaxis],
          {showInfobox:false});
      }
    }
    jcf.xV = jcf.b.create('glider', 
        [getCoord(jcf.input.value, jcf.input), 2, jcf.xaxis],
        {
            name:jcf.input.name,
            color:jcf.input.color,
            showInfobox:false,
            snapWidth:1,
        }
    );
    jcf.b.create('text', 
        [
            0.1,2.7,
            function() { return jcf.input.name+": "+getValue(jcf.xV.X(), jcf.input).toFixed(3); }
        ]);
    
    jcf.yV = jcf.b.create('point', 
        [ function() { return getCoord(jcf.f(getValue(jcf.xV.X(), jcf.input)), jcf.output)}, 0],
        {
            fixed:true,
            name:jcf.output.name,
            color:jcf.output.color,
            size:1,
            showInfobox:false,
        }
    );
    jcf.b.create('text', 
        [
            0.1,0.7,
            function() { return jcf.output.name+": "+getValue(jcf.yV.X(), jcf.output).toFixed(3); }
        ]);

    jcf.fArrow = jcf.b.create('arrow', [jcf.xV, jcf.yV],
        {
            fixed:true,
            color:'black',
        }
    );
    if (jcf.input.fix != undefined) {
      for (var i in jcf.input.fix) {
        var x = jcf.input.fix[i];
        var y = jcf.f(x);
        jcf.b.create('arrow', 
                    [[getCoord(x, jcf.input),2],[getCoord(y,jcf.output),0]],
                    {dash:2});
      }
    }
}

createMapMulti = function(jcf, idName)
{
    JXG.Options.axis.ticks.majorHeight = 8;
    JXG.Options.axis.ticks.minorHeight = 4;
    JXG.Options.axis.ticks.drawZero = true;
    jcf.b = JXG.JSXGraph.initBoard(idName, 
        {
            boundingbox:[0,3,1,-1],
            axis: false,
            grid: false,
            showCopyright:false,
            showNavigation:false,
        });
    jcf.xaxis = jcf.b.create('axis',
        [ [0,2],[1,2] ], 
        {
            drawZero:false // Doesn't do anything here.
        }
    );
    jcf.xaxis.removeAllTicks();
    if (jcf.input.min == undefined || jcf.input.max == undefined) {
        jcf.input.min = -5.5;
        jcf.input.max = 5.5;
    }
    createTicks(jcf.b, jcf.xaxis, jcf.input);

    jcf.yaxis = jcf.b.create('axis',
        [ [0,0],[1,0] ], {
            drawZero:false // Doesn't do anything here.
        }
    );
    jcf.yaxis.removeAllTicks();
    if (jcf.output.min == undefined || jcf.output.max == undefined) {
        jcf.output.min = jcf.input.min;
        jcf.output.max = jcf.input.max;
    }
    createTicks(jcf.b, jcf.yaxis, jcf.output);
    jcf.xV = [];
    jcf.yV = [];
    for (var i in jcf.input.values) {
        jcf.xV[i] = jcf.b.create('glider', 
            [getCoord(jcf.input.values[i], jcf.input), 2, jcf.xaxis],
            {
                name:jcf.input.name+"_{"+i+"}",
                color:jcf.input.color,
                showInfobox:false,
            }
        );
        jcf.yV[i] = jcf.b.create('point', 
            [
                function() {
                    var xV;
                    if (this.name == undefined) {
                        xV = jcf.xV[0];
                    } else {
                        var start = this.name.indexOf("{")+1;
                        var end = this.name.indexOf("}");
                        var index = this.name.substring(start,end);
                        xV = jcf.xV[index];
                    }
                    return getCoord(jcf.f(getValue(jcf.xV[index].X(), jcf.input)), jcf.output)
                },
                0
            ],
            {
                fixed:true,
                name:jcf.output.name+"_{"+i+"}",
                color:jcf.output.color,
                size:1,
                showInfobox:false,
            }
        );
        jcf.yV[i].index=i;
        jcf.b.create('arrow', [jcf.xV[i], jcf.yV[i]],
            {
                fixed:true,
                color:'black',
            }
        );
    }

}


createMapRateOfChange = function(jcf, idName)
{
    JXG.Options.axis.ticks.majorHeight = 8;
    JXG.Options.axis.ticks.minorHeight = 4;
    JXG.Options.axis.ticks.drawZero = true;
    jcf.b = JXG.JSXGraph.initBoard(idName, 
        {
            boundingbox:[0,3,1,-1],
            axis: false,
            grid: false,
            showCopyright:false,
            showNavigation:false,
        });
    jcf.xaxis = jcf.b.create('axis',
        [ [0,2],[1,2] ], 
        {
            drawZero:false // Doesn't do anything here.
        }
    );
    jcf.xaxis.removeAllTicks();
    if (jcf.input.min == undefined || jcf.input.max == undefined) {
        jcf.input.min = -5.5;
        jcf.input.max = 5.5;
    }
    if (jcf.input.fixed == undefined) {
      jcf.input.fixed = false;
    }
    createTicks(jcf.b, jcf.xaxis, jcf.input);

    jcf.yaxis = jcf.b.create('axis',
        [ [0,0],[1,0] ], {
            drawZero:false // Doesn't do anything here.
        }
    );
    jcf.yaxis.removeAllTicks();
    if (jcf.output.min == undefined || jcf.output.max == undefined) {
        jcf.output.min = jcf.input.min;
        jcf.output.max = jcf.input.max;
    }
    createTicks(jcf.b, jcf.yaxis, jcf.output);
    jcf.xV = [];
    if (jcf.input.fixed) {
      jcf.xV[0] = jcf.b.create('point', 
              [getCoord(jcf.input.value, jcf.input), 2],
              {
                  name:jcf.input.name+"_{0}",
                  fixed:true,
                  size:1,
                  color:jcf.input.color,
                  showInfobox:false,
              }
          );
    } else {
      jcf.xV[0] = jcf.b.create('glider', 
              [getCoord(jcf.input.value, jcf.input), 2, jcf.xaxis],
              {
                  name:jcf.input.name+"_{0}",
                  color:jcf.input.color,
                  showInfobox:false,
              }
          );
    }
    jcf.xV[1] = jcf.b.create('glider', 
            [getCoord(jcf.input.value+jcf.input.delta, jcf.input), 2, jcf.xaxis],
            {
                name:jcf.input.name+"_{1}",
                color:jcf.input.color,
                showInfobox:false,
            }
        );
    jcf.yV = [];
    for (var i in [0,1]) {
        jcf.yV[i] = jcf.b.create('point', 
            [
                function() {
                    var xV;
                    if (this.name == undefined) {
                        xV = jcf.xV[0];
                    } else {
                        var start = this.name.indexOf("{")+1;
                        var end = this.name.indexOf("}");
                        var index = this.name.substring(start,end);
                        xV = jcf.xV[index];
                    }
                    return getCoord(jcf.f(getValue(jcf.xV[index].X(), jcf.input)), jcf.output)
                },
                0
            ],
            {
                fixed:true,
                name:jcf.output.name+"_{"+i+"}",
                color:jcf.output.color,
                size:1,
                showInfobox:false,
            }
        );
        jcf.yV[i].index=i;
        jcf.b.create('arrow', [jcf.xV[i], jcf.yV[i]],
            {
                fixed:true,
                color:'black',
            }
        );
    }
    jcf.b.create('arrow', [jcf.xV[0], jcf.xV[1]],
        {
            fixed:true,
            color:'black',
        }
    );
    jcf.b.create('arrow', [jcf.yV[0], jcf.yV[1]],
        {
            fixed:true,
            color:'black',
        }
    );
    jcf.b.create('text', 
        [
            0.1,1.3,
            function() { 
              var x0 = getValue(jcf.xV[0].X(),jcf.input),
                x1 = getValue(jcf.xV[1].X(),jcf.input),
                deltaX = x1-x0;
              return "&Delta;"+jcf.input.name+": "+deltaX.toFixed(6); }
        ]);
    jcf.b.create('text', 
        [
            0.1,1.0,
            function() { 
              var y0 = getValue(jcf.yV[0].X(),jcf.output),
                y1 = getValue(jcf.yV[1].X(),jcf.output),
                deltaY = y1-y0;
              return "&Delta;"+jcf.output.name+": "+deltaY.toFixed(6); }
        ]);
    jcf.b.create('text', 
        [
            0.1,0.7,
            function() { 
              var x0 = getValue(jcf.xV[0].X(),jcf.input),
                x1 = getValue(jcf.xV[1].X(),jcf.input),
                y0 = getValue(jcf.yV[0].X(),jcf.output),
                y1 = getValue(jcf.yV[1].X(),jcf.output),
                deltaX = x1-x0,
                deltaY = y1-y0,
                ratio = deltaY / deltaX;
              return "&Delta;"+jcf.output.name+"/&Delta;"+jcf.input.name+": "+ratio.toFixed(6); }
        ]);
}

createChainMap = function(jcf, idName)
{
    JXG.Options.axis.ticks.majorHeight = 12;
    JXG.Options.axis.ticks.strokeWidth = 2;
    JXG.Options.axis.ticks.minorHeight = 4;
    JXG.Options.axis.ticks.drawZero = true;
    jcf.b = JXG.JSXGraph.initBoard(idName, 
        {
            boundingbox:[0,5,1,-1],
            axis: false,
            grid: false,
            showCopyright:false,
            showNavigation:false,
        }
    );
    jcf.xaxis = jcf.b.create('axis',
        [ [0,4],[1,4] ], 
        {}
    );
    jcf.xaxis.removeAllTicks();
    if (jcf.input.min == undefined || jcf.input.max == undefined) {
        jcf.input.min = -5.5;
        jcf.input.max = 5.5;
    }
    createTicks(jcf.b, jcf.xaxis, jcf.input);
    
    jcf.uaxis = jcf.b.create('axis',
        [ [0,2],[1,2] ],
        {}
    );
    jcf.uaxis.removeAllTicks();
    if (jcf.middle.min == undefined || jcf.middle.max == undefined) {
        jcf.middle.min = jcf.input.min;
        jcf.middle.max = jcf.input.max;
    }
    createTicks(jcf.b, jcf.uaxis, jcf.middle);
    
    jcf.yaxis = jcf.b.create('axis',
        [ [0,0],[1,0] ], 
        {}
    );
    jcf.yaxis.removeAllTicks();
    if (jcf.output.min == undefined || jcf.output.max == undefined) {
        jcf.output.min = jcf.input.min;
        jcf.output.max = jcf.input.max;
    }
    createTicks(jcf.b, jcf.yaxis, jcf.output);
    
    jcf.xV = jcf.b.create('glider', 
        [getCoord(jcf.input.value, jcf.input),4, jcf.xaxis],
        {
            name: jcf.input.name, 
            color:jcf.input.color,
            showInfobox:false,
        }
    );
    jcf.b.create('text', 
        [
            0.1,4.4,
            function() { return jcf.input.name+": "+getValue(jcf.xV.X(), jcf.input).toFixed(3); }
        ]);
    
    jcf.uV = jcf.b.create('point', 
        [ function() { return getCoord(jcf.inner(getValue(jcf.xV.X(), jcf.input)), jcf.middle)}, 2],
        {
            fixed:true,
            name: jcf.middle.name,
            color:jcf.middle.color,
            size:1,
            showInfobox:false,
        }
    );
    jcf.b.create('text', 
        [
            0.1,2.4,
            function() { return jcf.middle.name+": "+getValue(jcf.uV.X(), jcf.middle).toFixed(3); }
        ]);

    jcf.yV = jcf.b.create('point', 
        [ function() { return getCoord(jcf.outer(getValue(jcf.uV.X(), jcf.middle)), jcf.output)}, 0],
        {
            fixed:true,
            name: jcf.output.name,
            color:jcf.output.color,
            size:1,
            showInfobox:false,
        }
    );
    jcf.b.create('text', 
        [
            0.1,0.4,
            function() { return jcf.output.name+": "+getValue(jcf.yV.X(), jcf.output).toFixed(3); }
        ]);

    jcf.fArrow1 = jcf.b.create('arrow', 
        [jcf.xV, jcf.uV],
        {
            fixed:true,
            color:'black',
        }
    );
    jcf.fArrow2 = jcf.b.create('arrow',
        [jcf.uV, jcf.yV],
        {
            fixed:true,
            color:'black',
        }
    );
}


// The "cw" object passed in should have information about the cobweb.
// cw.f = projection function
// cw.xmin, cw.xmax = min/max for the window (will be square)
// cw.n = number of points (default=10)
// cw.x0 = starting value
createCobweb = function(cw, idName) {
  if (cw.n == undefined) {
    cw.n = 10
  }
  cw.board = JXG.JSXGraph.initBoard(
                idName, 
                {
                  boundingbox: [-0.25, 1.5, 2, -0.25], 
                  axis:true, 
                  showNavigation:false
                }
              );
  cw.x0 = cw.board.create('slider', 
      [[0,0],[2,0],[0,0.25,2]],{name:'x0', precision:2});
  cw.f = function(x) { return 1 + cw.a.Value()*(x-1); };
  cw.board.create('line', [[0,0], [1,1]], {color:'red',fixed:true});
  cw.project = cw.board.create('functiongraph', 
      [cw.f], {strokeColor:'blue', strokeWidth:2});
  // Build the points used for the cobweb.
  cw.x = [];
  cw.x[0] = cw.board.create('point', [ function() {return cw.x0.Value();}, 0], {name:0, visible:false});
  for (var i=1; i<=cw.n; i++) {
      cw.x[i] = cw.board.create('point',
          [ function() {var j=this.name; return cw.f(cw.x[j-1].X());}, 0 ], 
          {name:i, visible:false}
      );
  }
  cw.y = [];
  for (var i=0; i<=cw.n; i++) {
      cw.y[i] = cw.board.create('transform', 
          [ 0, "X("+i+")"],
          {name:i, type:'translate'}
      );
  }
  // Now construct the actual cobweb diagram.
  for (var i=0; i<cw.n; i++) {
      var a = cw.board.create('point', 
          [cw.x[i], cw.y[i]], {visible:false});
      var b = cw.board.create('point', 
          [cw.x[i], cw.y[i+1]], {visible:false});
      var c = cw.board.create('point', 
          [cw.x[i+1], cw.y[i+1]], {visible:false});
      cw.board.create('segment',
          [a, b], {color:'black',fixed:true});
      cw.board.create('segment',
          [b, c], {color:'black',fixed:true});
  }
}

