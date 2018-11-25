/* JSXGraph code to create a of a piecewise polynomial       */
/* function with adjustable parameters so that we can try    */
/* to make the function both continuous and differentiable   */

var brd = JXG.JSXGraph.initBoard('jsxgraph-piecewise-differentiable',
{boundingbox:[-5,6,5,-6],keepaspectratio:false,axis:true});

var xaxis = brd.create('axis',
    [ [0,0],[1,0] ], {
    visible:false
    }
);
brd.create('text', [-4.5,5.5,"a"]);
aSlider = brd.create('slider', [[-4,5.5], [1,5.5], [-20,0,20]], {snapWidth:0.1} );
bCheck = brd.create('checkbox', [-4.5, 5, "Require b=8-2a"], {});
brd.create('text', [-2,4.75,
          function() {
            var b = 8 - 2*aSlider.Value();
            return 'b='+b.toFixed(2);
          }],
          { visible:function(){
            var vis=false;
            if (bCheck.Value()) {
              vis = true;
            }
            return vis;
          }});
brd.create('text', [-4.5,4.25,"b"]);
bSlider = brd.create('slider', [[-4,4.25], [1,4.25], [-20,0,20]],
    { snapWidth:0.1,
      visible:function(){
        var vis=true;
        if (bCheck.Value()) {
          vis = false;
        }
        return vis;
      },
     } );
brd.create('functiongraph',
  [
    function(x) {
      var y=0;
      var a=aSlider.Value();
      var b=bSlider.Value();
      if (bCheck.Value()) {
        b = 8-2*a;
      }
      if (x <= 2) {
        y = x*x-2*x;
      } else {
        y = -2*x*x + a*x + b;
      }
      return y;
    }
  ], { strokeColor:"blue" });
