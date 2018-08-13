var jcm2 = {
  outer : function(b) { var a; a=(b-2)/3; return a; },
  inner : function(a) { var b; b=3*a+2; return b; },
  input : { name:'b', color:'blue', value:0 },
  middle : { name:'a', color:'orange'},
  output : { name:'y', color:'red' },
};
createChainMap(jcm2, 'box');
