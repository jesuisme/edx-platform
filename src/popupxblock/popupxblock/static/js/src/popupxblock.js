/* Javascript for PopUpXBlock. */
function PopUpXBlock(runtime, element) {
$('#plusDivs_left', element).click(function (eventObject) {
    console.log("aaaaaaaaaaaaaaaa");
    console.log(eventObject);
    var plus_left = document.getElementById("plusDivs_left").value;
    console.log("aaaaaaaaa");
    console.log(plus_left);
    var integer = parseInt(plus_left, 10);
    console.log(integer);
    console.log(typeof(integer));
    plusDivs(integer);


});

$('#plusDivs_right', element).click(function (eventObject) {
    console.log("aaaaaaaaaaaaaaaa");
    console.log(eventObject.data);
    var plus_right = document.getElementById("plusDivs_right").value;
    console.log("rrrrrrrr");
    console.log(plus_right);
    var integer = parseInt(plus_right, 10);
    console.log(integer);
    console.log(typeof(integer));
    plusDivs(integer);


});
$('#currentDiv1', element).click(function (eventObject) {
    var currentDiv1 = document.getElementById("currentDiv1").getAttribute('value');
    currentDiv(parseInt(currentDiv1, 10));

});

$('#currentDiv2', element).click(function (eventObject) {
    var currentDiv2 = document.getElementById("currentDiv2").getAttribute('value');
    currentDiv(parseInt(currentDiv2, 10));

});
$('#currentDiv3', element).click(function (eventObject) {
    var currentDiv3 = document.getElementById("currentDiv3").getAttribute('value');
    currentDiv(parseInt(currentDiv3, 10));

});
$('#currentDiv4', element).click(function (eventObject) {
    var currentDiv4 = document.getElementById("currentDiv4").getAttribute('value');
    currentDiv(parseInt(currentDiv4, 10));

});
$('#currentDiv5', element).click(function (eventObject) {
    var currentDiv5 = document.getElementById("currentDiv5").getAttribute('value');
    currentDiv(parseInt(currentDiv5, 10));

});
$('#currentDiv6', element).click(function (eventObject) {
    var currentDiv6 = document.getElementById("currentDiv6").getAttribute('value');
    currentDiv(parseInt(currentDiv6, 10));

});
$('#submit_answer1', element).click(function (eventObject) {
    var answer1 = document.getElementById("submit_answer1").getAttribute('value');
    var res = answer1.split(",");
    var answer = parseInt(res[0], 10);
    var slide_number = parseInt(res[1], 10);
    answer_check(answer, slide_number);

});
$('#submit_answer2', element).click(function (eventObject) {
    var answer2 = document.getElementById("submit_answer2").getAttribute('value');
    var res = answer2.split(",");
    var answer = parseInt(res[0], 10);
    var slide_number = parseInt(res[1], 10);
    answer_check(answer, slide_number);

});
$('#submit_answer3', element).click(function (eventObject) {
    var answer3 = document.getElementById("submit_answer3").getAttribute('value');
    var res = answer3.split(",");
    var answer = parseInt(res[0], 10);
    var slide_number = parseInt(res[1], 10);
    answer_check(answer, slide_number);

});
$('#submit_answer21', element).click(function (eventObject) {
    var answer21 = document.getElementById("submit_answer21").getAttribute('value');
    var res = answer21.split(",");
    var answer = parseInt(res[0], 10);
    var slide_number = parseInt(res[1], 10);
    answer_check(answer, slide_number);

});
$('#submit_answer22', element).click(function (eventObject) {
    var answer22 = document.getElementById("submit_answer22").getAttribute('value');
    var res = answer22.split(",");
    var answer = parseInt(res[0], 10);
    var slide_number = parseInt(res[1], 10);
    answer_check(answer, slide_number);

});
$('#submit_answer23', element).click(function (eventObject) {
    var answer23 = document.getElementById("submit_answer23").getAttribute('value');
    var res = answer23.split(",");
    var answer = parseInt(res[0], 10);
    var slide_number = parseInt(res[1], 10);
    answer_check(answer, slide_number);

});

$('#submit_answer41', element).click(function (eventObject) {
    var answer41 = document.getElementById("submit_answer41").getAttribute('value');
    var res = answer41.split(",");
    var answer = parseInt(res[0], 10);
    var slide_number = parseInt(res[1], 10);
    answer_check(answer, slide_number);

});
$('#submit_answer42', element).click(function (eventObject) {
    var answer42 = document.getElementById("submit_answer42").getAttribute('value');
    var res = answer42.split(",");
    var answer = parseInt(res[0], 10);
    var slide_number = parseInt(res[1], 10);
    answer_check(answer, slide_number);

});
$('#submit_answer43', element).click(function (eventObject) {
    var answer43 = document.getElementById("submit_answer43").getAttribute('value');
    var res = answer43.split(",");
    var answer = parseInt(res[0], 10);
    var slide_number = parseInt(res[1], 10);
    answer_check(answer, slide_number);

});



var trace1 = {
  x: [1.5],
  y: [2.67],
  mode: 'markers',
  type: 'scatter',
  name: ' ',
  text: ['Diagnosis:Single liveborn X=$1504, Y=2.67 Opportunity index (size): $3192578'],
  marker: { size: 24, color: 'rgb(141, 102, 175)' }
};

var trace2 = {
  x: [12],
  y: [2.88],
  mode: 'markers',
  type: 'scatter',
  name: ' ',
  text: ['B-a'],
  marker: { size: 24, color: 'rgb(244, 124, 68)',}
};

var trace3 = {
  x: [3],
  y: [1.91],
  mode: 'markers',
  type: 'scatter',
  name: ' ss',
  text: ['ccc-a'],
  marker: { size: 14, color: 'rgb(176, 141, 158)', }
};
var trace4 = {
  x: [3.9],
  y: [1.71],
  mode: 'markers',
  type: 'scatter',
  name: ' ss',
  text: ['ccc-a'],
  marker: { size: 11, color: 'rgb(237, 76, 64)', }
};

var trace5 = {
  x: [4.2],
  y: [0.47],
  mode: 'markers',
  type: 'scatter',
  name: ' ',
  text: ['ccc-a'],
  marker: { size: 9, color: 'rgb(216, 171, 188)', }
};

var trace6 = {
  x: [5.3],
  y: [0.63],
  mode: 'markers',
  type: 'scatter',
  name: ' ',
  text: ['ccc-a'],
  marker: { size: 9, color: 'rgb(255, 173, 86)', }
};

var trace7 = {
  x: [7.7],
  y: [0.89],
  mode: 'markers',
  type: 'scatter',
  name: ' ',
  text: ['ccc-a'],
  marker: { size: 11, color: 'rgb(137, 201, 105)', }
};

var trace8 = {
  x: [7.9],
  y: [0.79],
  mode: 'markers',
  type: 'scatter',
  name: ' ',
  text: ['ccc-a'],
  marker: { size: 11, color: 'rgb(254, 131, 33)', }
};

var trace9 = {
  x: [8.6],
  y: [0.67],
  mode: 'markers',
  type: 'scatter',
  name: ' ',
  text: ['ccc-a'],
  marker: { size: 11, color: 'rgb(93, 162, 62)', }
};

var trace10 = {
  x: [8.8],
  y: [0.88],
  mode: 'markers',
  type: 'scatter',
  name: ' ',
  text: ['ccc-a'],
  marker: { size: 11, color: 'rgb(177, 89, 40)', }
};

var trace11 = {
  x: [11.9],
  y: [1.65],
  mode: 'markers',
  type: 'scatter',
  name: ' ',
  text: ['ccc-a'],
  marker: { size: 19, color: 'rgb(72, 138, 190)', }
};

var trace12 = {
  x: [10.9],
  y: [0.55],
  mode: 'markers',
  type: 'scatter',
  name: ' ',
  text: ['ccc-a'],
  marker: { size: 9, color: 'rgb(166, 206, 227)', }
};

var trace13 = {
  x: [14.3],
  y: [1.12],
  mode: 'markers',
  type: 'scatter',
  name: ' ',
  text: ['ccc-a'],
  marker: { size: 14, color: 'rgb(133, 177, 159)', }
};

var trace14 = {
  x: [15.5],
  y: [0.99],
  mode: 'markers',
  type: 'scatter',
  name: ' ss',
  text: ['ccc-a'],
  marker: { size: 19, color: 'rgb(239, 156, 146)', }
};

var trace15 = {
  x: [22.3],
  y: [1.65],
  mode: 'markers',
  type: 'scatter',
  name: 'yellowcolor',
  text: ['ccc-a'],
  marker: { size: 85, color: 'rgb(241, 219, 127)', }
};



trace1.hovertemplate = 'Diagnosis:Single liveborn<br> X=$1504, Y=2.67 <br> Opportunity index (size): $3192578';
trace2.hovertemplate = 'Diagnosis:Diabetes with ketoacidosis<br>X=$12030, Y=2.88<br>Opportunity Index (size):$3395270';
trace3.hovertemplate = 'Diagnosis:Single liveborn, c-section<br>X=$3033, Y=1.91<br>Opportunity Index (size):$1141213';
trace4.hovertemplate = 'Diagnosis:Condition of mother<br>X=$3958, Y=1.71<br>Opportunity Index (size):$615878';
trace5.hovertemplate = 'Diagnosis:Post term pregnancy<br>X=$4221, Y=0.47<br>Opportunity Index (size):$359115';
trace6.hovertemplate = 'Diagnosis:Other chest pain<br>X=$5371, Y=0.62<br>Opportunity Index (size):$352979';
trace7.hovertemplate = 'Diagnosis:Alcohol withdrawal<br>X=$7787, Y=0.89<br>Opportunity Index (size):$609903';
trace8.hovertemplate = 'Diagnosis:Pneumonia<br>X=$7930, Y=0.79<br>Opportunity Index (size):$645245';
trace9.hovertemplate = 'Diagnosis:Cellulitis and abscess of leg<br>X=$8621, Y=0.67<br>Opportunity Index (size):$675813';
trace10.hovertemplate = 'Diagnosis:Urinary tract infection<br>X=$8839, Y=0.88<br>Opportunity Index (size):$614486';
trace11.hovertemplate = 'Diagnosis:Acute kidney failure<br>X=$11996, Y=1.65<br>Opportunity Index (size):$2256383';
trace12.hovertemplate = 'Diagnosis:Acute appendicitis<br>X=$10915, Y=0.55<br>Opportunity Index (size):$474270';
trace13.hovertemplate = 'Diagnosis:Acute pancreatitis<br>X=$14340, Y=1.12<br>Opportunity Index (size):$1493637';
trace14.hovertemplate = 'Diagnosis:Cerebral artery occlusion<br>X=$15583, Y=0.99<br>Opportunity Index (size):$2206151';
trace15.hovertemplate = 'Diagnosis:Unspecified septicemia<br>X=$22372, Y=1.65<br>Opportunity Index (size):$12624520';









var data = [ trace1, trace2, trace3, trace4, trace5, trace6, trace7, trace8, trace9, trace10, trace11, trace12, trace13, trace14, trace15 ];

var layout = { 
    showlegend: false,
  xaxis: {
    tickmode: "array", 
    tickvals: [0, 5, 10, 15, 20, 25],
    ticktext: ['0', '5k', '10k', '15k', '20k', '25k'],
    title: {
      text: 'Mean Cost of Diagnosis',
      font: {
        family: 'Courier New, monospace',
        size: 13,
        color: '#7f7f7f'
      }
    },
  },
  yaxis: {
    title: {
      text: 'Coefficient of Variation (SD/Mean)',
      font: {
        family: 'Courier New, monospace',
        size: 13,
        color: '#7f7f7f'
      }
    },
    range: [0.1, 3]
  },
  plot_bgcolor:'rgb(223, 223, 223)',
  title: {
    text:'<b> OPPORTUNITY INDEX SCATTERPLOT (DIAGNOSIS)</b> <br> <sub>Explore the graph. Then answer the questions below </sub> ',
    font: {
      family: 'Courier New, monospace',
      size: 20
    },
  },

};
Plotly.newPlot('myDiv', data, layout);








var trace21 = {
  x: [14.2],
  y: [1],
  mode: 'markers',
  type: 'scatter',
  name: ' ',
  text: ['Diagnosis:Single liveborn X=$1504, Y=2.67 Opportunity index (size): $3192578'],
  marker: { size: 17, color: 'rgb(166, 206, 227)' }
};

var trace22 = {
  x: [14.5],
  y: [0.61],
  mode: 'markers',
  type: 'scatter',
  name: ' ',
  text: ['B-a'],
  marker: { size: 9, color: 'rgb(178, 148, 199)',}
};

var trace23 = {
  x: [15.1],
  y: [1.29],
  mode: 'markers',
  type: 'scatter',
  name: '',
  text: ['ccc-a'],
  marker: { size: 48, color: 'rgb(177, 89, 40)', }
};
var trace24 = {
  x: [17.2],
  y: [0.82],
  mode: 'markers',
  type: 'scatter',
  name: '',
  text: ['ccc-a'],
  marker: { size: 13, color: 'rgb(255, 135, 26)', }
};

var trace25 = {
  x: [18.9],
  y: [1.08],
  mode: 'markers',
  type: 'scatter',
  name: ' ',
  text: ['ccc-a'],
  marker: { size: 45, color: 'rgb(250, 141, 137)', }
};

var trace26 = {
  x: [19.2],
  y: [0.75],
  mode: 'markers',
  type: 'scatter',
  name: ' ',
  text: ['ccc-a'],
  marker: { size: 16, color: 'rgb(109, 157, 167)', }
};

var trace27 = {
  x: [19.5],
  y: [0.78],
  mode: 'markers',
  type: 'scatter',
  name: ' ',
  text: ['ccc-a'],
  marker: { size: 20, color: 'rgb(204, 179, 158)', }
};

var trace28 = {
  x: [22.6],
  y: [0.88],
  mode: 'markers',
  type: 'scatter',
  name: ' ',
  text: ['ccc-a'],
  marker: { size: 30, color: 'rgb(244, 124, 68)', }
};

var trace29 = {
  x: [23.8],
  y: [1.76],
  mode: 'markers',
  type: 'scatter',
  name: ' ',
  text: ['ccc-a'],
  marker: { size: 80, color: 'rgb(88, 176, 68)', }
};


trace21.hovertemplate = 'Diagnosis:Single liveborn<br> X=$1504, Y=2.67 <br> Opportunity index (size): $3192578';
trace22.hovertemplate = 'Diagnosis:Diabetes with ketoacidosis<br>X=$12030, Y=2.88<br>Opportunity Index (size):$3395270';
trace23.hovertemplate = 'Diagnosis:Single liveborn, c-section<br>X=$3033, Y=1.91<br>Opportunity Index (size):$1141213';
trace24.hovertemplate = 'Diagnosis:Condition of mother<br>X=$3958, Y=1.71<br>Opportunity Index (size):$615878';
trace25.hovertemplate = 'Diagnosis:Post term pregnancy<br>X=$4221, Y=0.47<br>Opportunity Index (size):$359115';
trace26.hovertemplate = 'Diagnosis:Other chest pain<br>X=$5371, Y=0.62<br>Opportunity Index (size):$352979';
trace27.hovertemplate = 'Diagnosis:Alcohol withdrawal<br>X=$7787, Y=0.89<br>Opportunity Index (size):$609903';
trace28.hovertemplate = 'Diagnosis:Pneumonia<br>X=$7930, Y=0.79<br>Opportunity Index (size):$645245';
trace29.hovertemplate = 'Diagnosis:Cellulitis and abscess of leg<br>X=$8621, Y=0.67<br>Opportunity Index (size):$675813';

var data2 = [ trace21, trace22, trace23, trace24, trace25, trace26, trace27, trace28, trace29];

var layout2 = { 
    showlegend: false,
  xaxis: {
    tickmode: "array", 
    tickvals: [0, 14, 16, 18, 20, 22, 24],
    ticktext: ['0', '14k', '16k', '18k', '20k', '22k', '24k'],
    title: {
      text: 'Mean Cost of Diagnosis',
      font: {
        family: 'Courier New, monospace',
        size: 13,
        color: '#7f7f7f'
      }
    },
  },
  yaxis: {
    title: {
      text: 'Coefficient of Variation (SD/Mean)',
      font: {
        family: 'Courier New, monospace',
        size: 13,
        color: '#7f7f7f'
      }
    },
    range: [0.5, 3]
  },
  plot_bgcolor:'rgb(223, 223, 223)',
  title: {
    text:'<b> OPPORTUNITY INDEX SCATTERPLOT (PHYSICIAN; UNSPECIFIED SEPTICEMIA)</b> <br> <sub>Explore the graph. Then answer the questions below </sub> ',
    font: {
      family: 'Courier New, monospace',
      size: 20
    },
  },

};







Plotly.newPlot('myDiv2', data2, layout2);
















var trace31 = {
  x: ['Patient ID 25472'],
  y: [20],
  type: 'bar',
  hoverinfo: 'none',
  text: '$20,463',
  textposition: 'auto',
  marker: {
    color: 'rgb(25, 51, 99)',
    }
};

var trace32 = {
  x: ['Patient ID 61852'],
  y: [46],
  type: 'bar',
  hoverinfo: 'none',
  text: '$46,457',
  textposition: 'auto',
  marker: {
    color: 'rgb(71, 138, 201)',
    }
};

var trace33 = {
  x: ['Patient ID 64013'],
  y: [6],
  text: '$6,323',
  hoverinfo: 'none',
  textposition: 'auto',
  type: 'bar',
  marker: {
    color: 'rgb(64, 173, 150)',
    }
};


var data3 = [trace31, trace32, trace33];


var layout3 = {
  title: "<b>PATIENT STORIES BAR GRAPH</b><br>Detailing health care costs and reviewing data on cost variance at various levels is a method to<br> identify areas to start tackling high costs.<br>Select each bar to read more about the patient's story. Where do you think there might be room for improvement?",
  font:{
    family: 'Raleway, sans-serif',
    size: 10
  },
  showlegend: false,
  yaxis: {
    tickmode: "array", 
    tickvals: [0, 10, 20, 30, 40],
    ticktext: ['0', '10k', '20k', '30k', '40k'],
    title: {
      text: 'Total Cost of Encounter,  In Dollars',
      font: {
        family: 'Courier New, monospace',
        size: 10,
        color: '#7f7f7f'
      }
    },
  },
  bargap :0.2
};

Plotly.newPlot('myDiv3', data3, layout3, {displayModeBar: false});

document.getElementById("myDiv3").on('plotly_click', function(data){
    var dataevent = data.event;
    var xval;
    for(var i=0; i < 1; i++){
     xval = data.points[i].y;
    }
    if(xval == 6){
        $('.hover_bkgr_fricc1').show();
    }
    if(xval == 20){
        $('.hover_bkgr_fricc').show();
    }
    if(xval == 46){
        $('.hover_bkgr_fricc2').show();
    }
});

    $('.popupCloseButton').click(function(){
        $('.hover_bkgr_fricc').hide();
    });
    $('.popupCloseButton1').click(function(){
        $('.hover_bkgr_fricc1').hide();
    });
    $('.popupCloseButton2').click(function(){
        $('.hover_bkgr_fricc2').hide();
    });







    $(function ($) {
        /* Here's where you'd do things on page load. */
    });






var slideIndex = 1;
showDivs(slideIndex);
function try_again_function(){
  var msg_slide = document.getElementsByClassName("incorrect_msg");
  for (var i = 0; i < msg_slide.length; i++) {
    msg_slide[i].style.display = "none";
  }
  showDivs(slideIndex);
}
function next_question_function(){
  var msg_slide = document.getElementsByClassName("correct_msg");
  for (i = 0; i < msg_slide.length; i++) {
    msg_slide[i].style.display = "none";
  }
  plusDivs(1);
}

function plusDivs(n) {
    var msg_slide_incorrect = document.getElementsByClassName("incorrect_msg");
    for (var i = 0; i < msg_slide_incorrect.length; i++) {
        msg_slide_incorrect[i].style.display = "none";
    }
    var msg_slide_correct = document.getElementsByClassName("correct_msg");
    for (var i = 0; i < msg_slide_correct.length; i++) {
        msg_slide_correct[i].style.display = "none";
    }
  showDivs(slideIndex += n);
}
function answer_check(answer, n) {
  if (answer == 0) {

      var i;
      var x = document.getElementsByClassName("mySlides");
      for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";   
      }

      var msg_slide = document.getElementsByClassName("incorrect_msg");
      for (i = 0; i < msg_slide.length; i++) {
        msg_slide[i].innerHTML = "";
      var msg_div1 = document.createElement("div");
      msg_div1.className = "row";
      var msg_div2 = document.createElement("div");
      msg_div2.className = "col_sm_9";
      var msg_div3 = document.createElement("div");
      msg_div3.className = "col_sm_3";

    var try_again_head = document.createElement("center");
    var try_tag = document.createElement("p");
    try_tag.className = "tryagain";
    try_tag.innerText = "Try again";
    try_tag.addEventListener("click", try_again_function);
    try_again_head.appendChild(try_tag);
    msg_div3.appendChild(try_again_head);
      var msg_header = document.createElement("h3");
      var msg_i = document.createElement("i");
      msg_i.className = "fa fa-times fa-2";
      msg_i.innerText = "    Incorrect.";
      msg_header.appendChild(msg_i);
      var f_tag = document.createElement("f");
      var p_tag = document.createElement("p");
      p_tag.innerText = "How is opportunity index represented in the graph?";
      if (n == 1){
        p_tag.innerText = "How is opportunity index represented in the graph?";

      }
      if (n == 2){
        p_tag.innerText = "Where is mean cost found on the graph?";

      }
      if (n == 4){
        p_tag.innerText = "How are physicians represented on the graph?";

      }
      f_tag.appendChild(p_tag);
      msg_div2.appendChild(msg_header);
      msg_div2.appendChild(f_tag);
      msg_div1.appendChild(msg_div2);
      msg_div1.appendChild(msg_div3);
      msg_slide[i].appendChild(msg_div1);
      msg_slide[i].style.display = "block";   
  }

  }
 if (answer == 1) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length) {slideIndex = 1;}
  if (n < 1) {slideIndex = x.length;}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }

  var msg_slide = document.getElementsByClassName("correct_msg");
  for (i = 0; i < msg_slide.length; i++) {
    msg_slide[i].innerHTML = "";
  var msg_div1 = document.createElement("div");
  msg_div1.className = "row";
  var msg_div2 = document.createElement("div");
  msg_div2.className = "col_sm_9";
  var msg_div3 = document.createElement("div");
  msg_div3.className = "col_sm_3";

  var try_again_head = document.createElement("center");
  var try_tag = document.createElement("p");
  try_tag.className = "nextquestion";
  try_tag.innerText = "Next Question";
  try_tag.addEventListener("click", next_question_function);
  try_again_head.appendChild(try_tag);
  msg_div3.appendChild(try_again_head);
  var msg_header = document.createElement("h3");
  var msg_i = document.createElement("i");
  msg_i.className = "fa fa-check fa-2";
  msg_i.innerText = "    Correct!";
  msg_header.appendChild(msg_i);
  var f_tag = document.createElement("f");
  var p_tag = document.createElement("p");
  if (n == 1){
    p_tag.innerText = "This is the correct answer because the diagnosis (ICD9 code) with the largest bubble, and thus the largest opportunity cost, is Sepsis.";

  }
  if (n == 2){
    p_tag.innerText = "This is the correct answer because this diagnosis (ICD9 code) has the lowest mean cost, represented as the smallest value on the x-axis.";

  }
  if (n == 4){
    p_tag.innerText = "This is the correct answer because there are a total of nine bubbles on the chart, each representing one physician.";

  }
  f_tag.appendChild(p_tag);
  msg_div2.appendChild(msg_header);
  msg_div2.appendChild(f_tag);
  msg_div1.appendChild(msg_div2);
  msg_div1.appendChild(msg_div3);
  msg_slide[i].appendChild(msg_div1);
  msg_slide[i].style.display = "block";  

  }
 }
}



function currentDiv(n) {
  console.log("currentDiv=====", n);
  showDivs(slideIndex = n);
}


document.getElementById("myDiv").on('plotly_click', function(data){
    var dataevent = data.event;
    var slide1;
    var slide1_a;
    for(var i=0; i < 1; i++){
     slide1 = data.points[i].y;
     slide1_a = data.points[i].x;
    }
    if(slide1 == 1.65 && slide1_a == 22.3 && slideIndex == 3){
        currentDiv(4);
    }
    
});


document.getElementById("myDiv2").on('plotly_click', function(data){
    var dataevent = data.event;
    var xval;
    var xval1;
    console.log("mydiv2=======")
    for(var i=0; i < 1; i++){
     xval = data.points[i].y;
     xval1 = data.points[i].x;
    }
    if(xval == 1.76 && xval1 == 23.8 && slideIndex == 5){
        currentDiv(6);
    }
    
});









function showDivs(n) {
  console.log("inside show div");
  console.log("inside show div", n);
  var i;
  var x = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }

for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" w3-grey", "");
  }
  x[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " w3-grey";

  var slider_show = slideIndex - 1;

  if (slider_show == 0 || slider_show == 1 || slider_show == 2) {
        var graph1 = document.getElementById("myDiv3").style.display = "none";
        var graph1 = document.getElementById("myDiv2").style.display = "none";
        var graph1 = document.getElementById("myDiv").style.display = "block";

  }
  if (slider_show == 3 || slider_show == 4) {
        var graph1 = document.getElementById("myDiv3").style.display = "none";
        var graph1 = document.getElementById("myDiv2").style.display = "block";
        var graph1 = document.getElementById("myDiv").style.display = "none";

  }
  if (slider_show == 5) {
        var graph1 = document.getElementById("myDiv3").style.display = "block";
        var graph1 = document.getElementById("myDiv2").style.display = "none";
        var graph1 = document.getElementById("myDiv").style.display = "none";

  }




}

}
