/* JSXGraph code to create a graph y=b^x                     */
/* with adjustable b, and a sliding point on the graph       */
/* which shows the tangent line. Shows the ratio of the      */
/* slope of the tangent line to the y-value at the point     */
/* as being constant.                                        */

var brd = JXG.JSXGraph.initBoard('jsxgraph-exponential-proportional',
{boundingbox:[-4,6,4,-1],keepaspectratio:true,axis:true});

var xaxis = brd.create('axis',
    [ [0,0],[1,0] ], {
    visible:false
    }
);
var pt = brd.create('glider',
    [0,0, xaxis],
    {
      name: "x",
      color: "red",
    }
);
var baxis = brd.create('axis',
    [ [1,0],[1,1] ], {
    visible:false
    }
);
var b = brd.create('glider',
    [1,2, baxis],
    {
        name:"b",
        color:"blue",
    }
);
expFunc = function(x) { var bVal = b.Y(); return Math.exp(x*Math.log(bVal)); }
brd.create('functiongraph', [expFunc]);
var p = brd.create('point',
    [function() {return pt.X();}, function() {return expFunc(pt.X())}],
    {
        name:"",
        color:"black",
    }
);
var q = brd.create('point',
    [function() {return p.X()+1;}, function() {return expFunc(pt.X())*(1+Math.log(b.Y()))}],
    {
        visible:false,
    }
);
brd.create('line', [p,q], { dash:2 });
brd.create('text', [function() {return p.X()+.5}, function() {return p.Y()+0.2}, function() {return "y(x)="+p.Y().toString()}]);
brd.create('text', [function() {return p.X()+.5}, function() {return p.Y()-0.2}, function() {return "y'(x)="+(q.Y()-p.Y()).toString()}]);
brd.create('text', [function() {return p.X()+.5}, function() {return p.Y()-0.6}, function() {return "y'(x)/y(x)="+Math.log(b.Y()).toString()}]);
