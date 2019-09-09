/* Javascript for SliderXBlock. */

function SliderXBlock(runtime, element) {



var app2 = {
  score: 0,
  total: 8,
  Array: [],
  Attempt:false,

  ArrAns:[
  ["4","5","6","7"],
  ["0","1","2","3"],
  ["0","1","2","3"],
  ["4","5","6","7"],
  ["4","5","6","7"],
  ["0","1","2","3"],
  ["4","5","6","7"],
  ["0","1","2","3"],
  ],

  init: function () {
    $('body').show();
    $('body').bind('contextmenu', function (e) {
      return false;
    });
  $.each($('.dd'), function(k,v){
    app2.Array.push($(v).html());
  })
  app2.shuffle(app2.Array);
  
  $.each(app2.Array, function(k,v){
    $('.dd:eq('+k+')').html(v);
  })
    this.DragStart();
  },
DragStart:function(){


  
   $('.draggable').draggable({revert:true,zIndex:999999,containment:"#containerdnd",start:function(){
                app2.top = $(this).css('top');
                  app2.left = $(this).css('left');

  }, stop: function(){$(this).css({'z-index': '9999'})}});
   $('.droppable').droppable({drop:app2.DropFun});
  },

 DropFun:function(event,ui){
    var drags = ui.draggable.attr('id');
    var drops = $(this).attr('id');

    if (ui.draggable.element !== undefined) {
    ui.draggable.element.droppable('enable');
    }
    ui.draggable.position({of: $(this),my: "center center",at:"center center"});
    ui.draggable.draggable('option', 'revert', "invalid"); 
    
    var data_id = ui.draggable.attr('data-id');
    var data_ids = $(this).attr('data-ids');
    var num = $(this).attr('num');
    var drag_status = ui.draggable.attr('drag');
    var dro = ui.draggable.attr('dro');
   
      
    if(app2.ArrAns[data_id].indexOf(num) != -1 && data_ids == -1 ){
    $("#"+drops).attr('data-ids',data_id);
    $(this).removeClass('draggable');
    ui.draggable.draggable('disable').addClass('rights');
    }else{
    ui.draggable.draggable('option', 'revert', true);
    }
    
    if($('.rights').length == 8){
      $('#aud8,#dndtext1').hide();
    $('#correct1,#aud_correct,#dndtext2').show();
    // current_sound = document.getElementById('sound'+soundid);
    
    if(!document.getElementById('sound8').paused){
      document.getElementById('sound8').pause();
      document.getElementById('sound_correct').play();
      app2.isPlayAud9=true;
      
      $('#sound_correct').removeClass('play1').addClass('play2');
    }else{      
      $('#sound_correct').addClass('play1').removeClass('play2');
    }
    
    }
   } ,
 
  shuffle: function (o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  },
 
}
$(window).load(function () {
  app2.init();
});


























    $('#correct2').hide();
  
  $(".question2 .c2").click(function(){
  if($(this).hasClass("r1")){        
     if($(this).hasClass("mleft")){
     $(this).addClass('right1').addClass('right3').addClass('c3').removeClass('c2');
     $(this).prop('colspan','2').addClass('c3').removeClass('c2').prev('td').hide();
    // $(this).closest('td').prev('td').addClass('right1').addClass('right2').removeClass('wrong1').html('').addClass('c3').removeClass('c2');
     $(this).html('<span class="Idrop"><i class="glyphicon glyphicon-minus-sign"></i>');
     } else {
     $(this).addClass('right1').addClass('right2').addClass('c3').removeClass('c2');
      // $(this).closest('td').next('td').addClass('right1').addClass('right3').removeClass('wrong1').html('').addClass('c3').removeClass('c2');
     $(this).prop('colspan','2').addClass('c3').removeClass('c2').next('td').hide();
     $(this).html('<span class="Idrop"><i class="glyphicon glyphicon-plus-sign"></i></span>');
   
    // $(this).closest('Idrop').addClass('rightside-icon');
     }
     var numItems = $('.question2 .c3').length; 
     if(numItems>=15) $('#correct2').show();
     
  } else {
  
  if($(this).hasClass("c4") ) {  
  } else {   
  $(this).addClass('wrong1').addClass('c4').removeClass('c2');
  }
  }
  });


















var isPlayAud9=false;
  

   $('.left1').hide();     
   $('#dndtext2').hide();  
   // $('#aud9,#dndtext2').hide();  
 
 $('.stop').click(function(){  
  $(".item-footer").find(".show-bot").toggle();   
  $(".item-footer").find('.stop').toggleClass('glyphicon-plus-sign glyphicon-minus-sign');
    });

    var myAudio = document.getElementById('sound1');
    var isPlaying = false;
    var playBtnId = document.getElementById('aud1');
    $('.play').click(function(){
      if (this.id == "aud_correct"){
        stopPlay()
        myAudio = document.getElementById('sound_correct');
        // myAudio.pause();
        $(this).toggleClass('play2 play1');
        
        togglePlay();


      }
      else{
        var id = this.id.split('aud')[1];
        ///if(id!='9'){
        myAudio = document.getElementById('sound'+id);
        playBtnId = this.id;    
    
        $(this).toggleClass('play2 play1');
        
        togglePlay();
        }
      // }      
    })

function togglePlay() {
  if (isPlaying) {
    myAudio.pause();
    isPlaying = false;
    // stop();
  } else {
    myAudio.currentTime=0;
    myAudio.play();
    //alert(myAudio.duration);
    isPlaying = true;
    // play();      
  }
};

$("#sound1,#sound2, #sound3, #sound4, #sound5, #sound6, #sound7, #sound8, #sound9, #sound10, #sound11, #sound12, #sound13, #sound14, #sound15, #sound16, #sound_correct").bind('ended', function(){
 $('#'+playBtnId).removeClass('play2').addClass('play1');  
isPlaying = false; 
});

        
function stopPlay() {
document.getElementById('sound1').pause();
document.getElementById('sound2').pause();
document.getElementById('sound3').pause();
document.getElementById('sound4').pause();
document.getElementById('sound5').pause();
document.getElementById('sound6').pause();
document.getElementById('sound7').pause();
document.getElementById('sound8').pause();
document.getElementById('sound9').pause();
document.getElementById('sound10').pause();
document.getElementById('sound11').pause();
document.getElementById('sound12').pause();
document.getElementById('sound13').pause();
document.getElementById('sound14').pause();
document.getElementById('sound15').pause();
document.getElementById('sound16').pause();
document.getElementById('sound_correct').pause();
} 

    //for 1st scroll swipe
   // $('#my-Carousel2').on('slid.bs.carousel', function (e) {
   //  console.log("inside my-Carousel2=====");
   //  console.log(e.relatedTarget.id);
   //    //var id = parseInt(e.relatedTarget.id);   
   //    var id = e.relatedTarget.id;      
   //        if(id == 'a0'){
   //            $('.left1').hide();              
   //            $('.right11 ').show();
   //        }else if(id == 'a17'){
   //          $('.left1').show();
   //          $('.right11 ').hide();
   //        } else {
   //          $('.left1').show();
   //          $('.right11 ').show();
   //        }
     
   //  myAudio.currentTime = 0;
    
   //  myAudio.pause();
    
   //  if((isPlaying==false && id=='a9') || (isPlaying==false && id=='a7')){ 
   //  document.getElementById('sound9').pause();  
   //  //alert('condition2222');
   //  $('#aud7').removeClass('play2').addClass('play1');
   //  $('#aud8').removeClass('play2').addClass('play1');
   //  $('#aud9').removeClass('play2').addClass('play1');
   //  $('#aud10').removeClass('play2').addClass('play1');
   //  isPlaying = false;
  
   //  } 
    
   //  if(isPlaying==false && id=='a8') 
   //  {   
   //  $('#aud8').removeClass('play2').addClass('play1');
   //  $('#aud9').removeClass('play2').addClass('play1');
   //  isPlaying = false;
   //  }
  
  
  
   //  if(isPlaying){
   //    isPlaying = false;
   //    $('#'+playBtnId).removeClass('play2').addClass('play1');
   //     if(app2.isPlayAud9==true && id=='a8')
   //    {
   //        stopPlay();
   //        document.getElementById('sound8').pause();
   //        $('#aud8').removeClass('play2').addClass('play1');
   //        document.getElementById('sound9').currentTime=0;
   //        document.getElementById('sound9').play();
   //        $('#aud9').removeClass('play1').addClass('play2');
   //         playBtnId='aud8';  
   //        isPlaying = true;
   //    } 
   //    else if(app2.isPlayAud9==false && id=='a8')
   //    {
   //    if($('#aud9').is(':hidden')) {
   //        stopPlay();
   //         document.getElementById('sound8').currentTime=0;
   //         document.getElementById('sound8').play();
   //        $('#aud8').removeClass('play1').addClass('play2');
   //         playBtnId='aud8';  
   //                   isPlaying = true;           
             
   //           } else {
   //           stopPlay();
   //          document.getElementById('sound9').currentTime=0;
   //        document.getElementById('sound9').play();
   //        $('#aud9').removeClass('play1').addClass('play2');
   //         playBtnId='aud9';
   //         isPlaying = true;
   //        }
   //    }       
   //       else if(app2.isPlayAud9==true && id=='a7')
   //    {
   //        stopPlay();
   //        document.getElementById('sound9').pause();
   //        $('#aud9').removeClass('play2').addClass('play1');
   //        document.getElementById('sound7').currentTime=0;
   //        document.getElementById('sound7').play();
   //        $('#aud7').removeClass('play1').addClass('play2');
   //         playBtnId='aud7';  
   //        isPlaying = true;
   //    } 
                
   //    else{
   //          stopPlay();
   //    $('#'+id+'.active').find('.play')[0].click();
   //    }
   //  }
    
   //    });



  

$('.playStart').click(function(){
        var id = 1;
        isPlaying = true;
        myAudio = document.getElementById('sound'+id);
        playBtnId = 'aud1';
        $('#aud1').removeClass('play1').addClass('play2');
        currentDiv(2);
        // togglePlay();
        myAudio.play();
        
    })




$('#plusDivs_left', element).click(function (eventObject) {
    var plus_left = document.getElementById("plusDivs_left").value;
    var integer = parseInt(plus_left, 10);
    plusDivs(integer);


});

$('#plusDivs_right', element).click(function (eventObject) {
    var plus_right = document.getElementById("plusDivs_right").value;
    var integer = parseInt(plus_right, 10);
    plusDivs(integer);


});



$('.w3-badge').on('click', function(data){
    var dataevent = this.id;
    var xval;
    currentDiv(parseInt(dataevent, 10));
    
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




function currentDiv(n) {
  showDivs(slideIndex = n);
}

function showDivs(n) {
  var i;
  // var x = document.getElementsByClassName("mySlides");
  var x = document.getElementsByClassName("additem1");
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
  // $('.play').toggleClass('play1 play2');
  if (isPlaying == false){
    for (i = 1; i <= 16; i++) {
      $('#aud'+i).removeClass('play2').addClass('play1');  
    }

  }
  if (isPlaying == true){
    for (i = 1; i <= 16; i++) {
      $('#aud'+i).removeClass('play1').addClass('play2');  
    }

  }








  soundid = slideIndex-1
  stopPlay();
  var pre_aud = soundid -1;
  var next_aud = soundid +1;
  previous_sound = document.getElementById('sound'+pre_aud);
  previous_audio = document.getElementById('aud'+pre_aud);
  current_sound = document.getElementById('sound'+soundid);
  current_audio = document.getElementById('aud'+soundid);
  next_sound = document.getElementById('sound'+next_aud);
  next_audio = document.getElementById('aud'+next_aud);

  if (isPlaying){
  if (current_sound){


    if (previous_audio){ 
      var classchange = previous_audio.className;
      if (previous_sound){ previous_sound.pause(); }
      if (classchange){
      if (classchange.includes("play2")){
      // current_audio.removeClass('play1').addClass('play2');
      $('#aud'+soundid).removeClass('play1').addClass('play2');
      current_sound.play();
      isPlaying =true;

    } else{
      current_sound.pause();
      isPlaying =false;
    } 
  } else {
    stopPlay();
  }



    if (classchange.includes("play1")){
      current_sound.pause();


    }

    }
    if (next_sound){ 
      next_sound.pause();
      current_sound.play(); 
    }
    



    
    
  }
} else {
  stopPlay();
  for (i = 1; i <= 16; i++) {
      $('#aud'+i).removeClass('play2').addClass('play1');  
    }

}


  // if (next_sound){
  //   next_sound.pause();
  // }





  // if (current_sound){
  //   var classcheck = previous_audio.className;
  //   if (classcheck.includes("play1")){
  //     // current_audio.removeClass('play1').addClass('play2');
  //     $('#aud'+soundid).removeClass('play1').addClass('play2');


  //   }


  //   current_sound.play();
  //   isPlaying =true;
  // }
  
  


  // next_sound = document.getElementById('sound'+next_aud);
  // next_audio = document.getElementById('aud'+next_aud);
  // console.log("next_sound===", next_sound);
  // console.log("next_audio===", next_audio);


  // $('#aud7').removeClass('play1').addClass('play2');



  
  

}

}





