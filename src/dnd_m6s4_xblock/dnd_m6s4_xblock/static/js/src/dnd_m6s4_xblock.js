/* Javascript for Dndm6s4XBlock. */
function Dndm6s4XBlock(runtime, element) {

    
      $(window).load(function () {
        app1.init();
      });
      
      $(document).ready(function(){
          $("#paradiv").click(function(){
          $('#paradivopen').show();
          $('#paradiv_1').hide();
          });
          $("#closebot").click(function(){
          $('#paradivopen').hide();
          $('#paradiv_1').show();
          });
      
      });
}
var app1 = {
    score: 0,
    total: 8,
    Email: null,
    DocTitel: null,
    did:0,ab1:0,
    path:'https://s3.us-east-2.amazonaws.com/dms-vbhc/',
    Attempt:false,
    //dragx:[10,120,230,340,450],
   // dragy:[10,10,10,10,10],
    dragx:[0,0,0,0,0],
    dragy:[0,0,0,0,0],
    ss:[0,1,2,3,4],
    init: function () {
   // this.Email = this.getUrlVars() ['email'];
   // this.DocTitel = document.title;
    app1.shuffle(app1.ss);
    for(var i=0;i<app1.ss.length;i++)
    {
    $("#drags"+i).css({"left":app1.dragx[app1.ss[i]],"top":app1.dragy[app1.ss[i]]});
    }
      $('body').show();
      $('body').bind('contextmenu', function (e) { return false;});
      //    $('audio,video').mediaelementplayer();   
      //this.BtnAD('check_ans', 'enabled');
      //this.BtnAD('reset', 'disabled');  
        this.DragStart();  
    },
    
  DragStart:function(){
      $('.draggable').draggable({
      containment: "#containerdnd",
      //cursor: 'move',
      revert:true,
      helper: 'clone'
      });
      
      $(".droppable").droppable({
      accept: ".draggable",
      drop: app1.DropFun
  });
  },
   DropFun:function(event,ui){
   var drags = ui.draggable.attr('id');
  
   if(drags==undefined)
   {
   var idd = ui.draggable.parent().attr("id");
    $("#"+idd).html("");
   }
    var drops = $(this).attr('id'); 
      if (ui.draggable.element !== undefined) {
        ui.draggable.element.droppable('enable');
      }
      try
      {
      ui.draggable.draggable('option', 'revert',false);
      ui.draggable.draggable( "destroy" );
      }
      catch(e)
      {
      app1.did=app1.did-2;
      }
      if($(this).children('div').length==1)
      {
          $(this).children('div').remove(); 
      }
           
       var element = ui.helper.clone();
       $(element).css({"left":"0px", "top": "0px"});
       element.removeClass('ui-draggable-dragging'); 
       if(drops!="dragBox")
       {
        element.appendTo(this);  app1.did++; 
       }
       //alert(app.did);
          var ab=0; var meal=0; var glip=0;  
          for(var k=0;k<=27;k++)
          {
           if($($('#drops'+k).html()).find('img:first').attr('src')== app1.path+"img/m6s4p1-05.png") meal=1;
           
           if($($('#drops'+k).html()).find('img:first').attr('src')== app1.path+"img/m6s4p1-03.png" && meal==0){
            $('#incorrectText').text("Glipizide-metformin needs to be taken twice, each time with meals."); 
            $('#dis').show();
             $("#drops"+k).html("");
            $('#incorrect2').show();
            glip=1;	 
            }
           
            if(glip==0){  
            var k2=k-7;
  
           if(($($('#drops'+k).html()).find('img:first').attr('src')==app1.path+"img/m6s4p1-03.png" && $($('#drops'+k2).html()).find('img:first').attr('src')!=app1.path+"img/m6s4p1-05.png" ) || ($($('#drops'+k).html()).find('img:first').attr('src')==app1.path+"img/m6s4p1-02.png" && $($('#drops'+k2).html()).find('img:first').attr('src')!=app1.path+"img/m6s4p1-05.png" )) {
           $('#incorrectText').text("Colesevelam and Glipizide need to be taken with meals."); 
           $('#dis').show();
           $("#drops"+k).html("");
           $('#incorrect2').show();	
           } 
           }
           
          
           
               
           var k3a=k+3; k3b=k+2; k3c=k+1;
           if(($($('#drops'+k).html()).find('img:first').attr('src')==app1.path+"img/m6s4p1-04.png" && ($($('#drops'+k3a).html()).find('img:first').attr('src')==app1.path+"img/m6s4p1-02.png" || $($('#drops'+k3b).html()).find('img:first').attr('src')==app1.path+"img/m6s4p1-02.png" || $($('#drops'+k3c).html()).find('img:first').attr('src')==app1.path+"img/m6s4p1-02.png"))
           ||
           ($($('#drops'+k).html()).find('img:first').attr('src')==app1.path+"img/m6s4p1-02.png" && ($($('#drops'+k3a).html()).find('img:first').attr('src')==app1.path+"img/m6s4p1-04.png" || $($('#drops'+k3b).html()).find('img:first').attr('src')==app1.path+"img/m6s4p1-04.png" || $($('#drops'+k3c).html()).find('img:first').attr('src')==app1.path+"img/m6s4p1-04.png"))
           ) {
           $('#incorrectText').text("Birth control needs to be taken at least 4 hours before Colesevelam."); 
           $('#dis').show();
           $("#drops"+k).html("");
           $('#incorrect2').show();	
           } 
           
  
           var k4a=k+1; var k4b=k+2; var k4c=k+3;		
           var k4a1=k+8; var k4b1=k+9; var k4c1=k+10; 		
           if(
           ($($('#drops'+k).html()).find('img:first').attr('src')==app1.path+"img/m6s4p1-02.png" && ($($('#drops'+k4a).html()).find('img:first').attr('src')==app1.path+"img/m6s4p1-03.png"  || $($('#drops'+k4b).html()).find('img:first').attr('src')==app1.path+"img/m6s4p1-03.png" || $($('#drops'+k4c).html()).find('img:first').attr('src')==app1.path+"img/m6s4p1-03.png" ) 
            ) || 
            ($($('#drops'+k).html()).find('img:first').attr('src')==app1.path+"img/m6s4p1-03.png" && ($($('#drops'+k4a).html()).find('img:first').attr('src')==app1.path+"img/m6s4p1-02.png"  || $($('#drops'+k4b).html()).find('img:first').attr('src')==app1.path+"img/m6s4p1-02.png" || $($('#drops'+k4c).html()).find('img:first').attr('src')==app1.path+"img/m6s4p1-02.png" ) )
           ||
            ($($('#drops'+k).html()).find('img:first').attr('src')==app1.path+"img/m6s4p1-02.png" && ($($('#drops'+k4a1).html()).find('img:first').attr('src')==app1.path+"img/m6s4p1-03.png"  || $($('#drops'+k4b1).html()).find('img:first').attr('src')==app1.path+"img/m6s4p1-03.png" || $($('#drops'+k4c1).html()).find('img:first').attr('src')==app1.path+"img/m6s4p1-03.png" ) 
            ) || 
            ($($('#drops'+k).html()).find('img:first').attr('src')==app1.path+"img/m6s4p1-03.png" && ($($('#drops'+k4a1).html()).find('img:first').attr('src')==app1.path+"img/m6s4p1-02.png"  || $($('#drops'+k4b1).html()).find('img:first').attr('src')==app1.path+"img/m6s4p1-02.png" || $($('#drops'+k4c1).html()).find('img:first').attr('src')==app1.path+"img/m6s4p1-02.png" ) )
           ) {
           $('#incorrectText').text("Colesevelam and Glipizide cannot be taken within 4 hours of one another."); 
           $('#dis').show();
           $("#drops"+k).html("");
           $('#incorrect2').show();	
           } 
  
          //$('#toptitle').text("Colesevelam and Glipizide need to be taken with meals"); 
        //$('#toptitle').text("Birth control needs to be taken at least 4 hours before Colesevelam"); 
         //$('#toptitle').text("Colesevelam and Glipizide cannot be taken within 4 hours of one another."); 
        //$('#toptitle').text("Glipizide-metformin needs to be taken twice, each time with meals."); 
        //$('#toptitle').text("Artovastatin needs to be taken at night (past 6:00 pm)"); 
           
           if((k!=18 && k!=19 && k!=20 && k!=25 && k!=26 && k!=27) && $($('#drops'+k).html()).find('img:first').attr('src')==app1.path+"img/m6s4p1-01.png"){
           $('#incorrectText').text("Artovastatin needs to be taken at night (past 6:00 pm)"); 
           $('#dis').show();
           $("#drops"+k).html("");
           $('#incorrect2').show();	
           } 
  
          }	
       app1.ResetBox();
       //if(app1.did>=8) app1.CheckFun(); 
       for(var k=0;k<=27;k++)
          {
             if($($('#drops'+k).html()).find('img:first').attr('src')) ab++;  
          }
          //alert(ab);
  
      if(ab>=8) app1.CheckFun(); 
       app1.DragStart();
     } ,
  
  CheckFun: function () {
      app1.Attempt=true;
      $('#dis').show();
          
        if($($("#drops0").html()).find('img:first').attr('src')==app1.path+"img/m6s4p1-05.png")
        {
        app1.score++;
        } 
        if($($("#drops5").html()).find('img:first').attr('src')==app1.path+"img/m6s4p1-05.png")
        {
        app1.score++;
        } 
        if($($("#drops17").html()).find('img:first').attr('src')==app1.path+"img/m6s4p1-05.png")
        {
        app1.score++;
        } 
        
        if($($("#drops7").html()).find('img:first').attr('src')==app1.path+"img/m6s4p1-03.png")
        {
        app1.score++;
        } 
        if($($("#drops24").html()).find('img:first').attr('src')==app1.path+"img/m6s4p1-03.png")
        {
        app1.score++;
        } 
        
       if($($("#drops8").html()).find('img:first').attr('src')==app1.path+"img/m6s4p1-04.png")
        {
        app1.score++;
        }  
        if($($("#drops19").html()).find('img:first').attr('src')==app1.path+"img/m6s4p1-01.png")
        {
        app1.score++;
        }  else { 
        }
       if($($("#drops12").html()).find('img:first').attr('src')==app1.path+"img/m6s4p1-02.png")
        {
        app1.score++;
        }  
        
      //alert(app1.score);
      if(app1.score==8) {
      $('#dis').show();
      $('#correct1').show();
      } else {
      $('#dis').show();
      $('#correct1').show();
      //$('#incorrect1').show();	
      }
    },
    
   ResetFun1: function () {
       $('#dis').hide();
      $('#incorrect1').hide(); $('#incorrect2').hide();	
      $('#correct1').hide();
      //app1.did=0; app1.score=0;
      app1.DragStart();
      app1.ResetBox();
   },
    ResetFun: function () {
      for(var j=0;j<=27;j++)
          {
          if((j==19 && $($("#drops19").html()).find('img:first').attr('src')==app1.path+'img/m6s4p1-01.png') ||
          (j==12 && $($("#drops12").html()).find('img:first').attr('src')==app1.path+'img/m6s4p1-02.png') ||
          (j==8 && $($("#drops8").html()).find('img:first').attr('src')==app1.path+'img/m6s4p1-04.png')||
          (j==7 && $($("#drops7").html()).find('img:first').attr('src')==app1.path+'img/m6s4p1-03.png')||
          (j==24 && $($("#drops24").html()).find('img:first').attr('src')==app1.path+'img/m6s4p1-03.png')||
          (j==0 && $($("#drops0").html()).find('img:first').attr('src')==app1.path+'img/m6s4p1-05.png')||
          (j==5 && $($("#drops5").html()).find('img:first').attr('src')==app1.path+'img/m6s4p1-05.png')||
          (j==17 && $($("#drops17").html()).find('img:first').attr('src')==app1.path+'img/m6s4p1-05.png')) 
          {
          //alert($($("#drops19").html()).find('img:first').attr('src'));		
          } else {
           $("#drops"+j).html("");
           }
          }
      $('#dis').hide();
      $('#incorrect1').hide(); $('#incorrect2').hide();	
      $('#correct1').hide();
      app1.did=0; app1.score=0;
      app1.DragStart();
      app1.ResetBox();
      
    },
    
      ResetFunNow2: function () {
      for(var j=0;j<=27;j++)
          {		
           $("#drops"+j).html("");		
          }
      $('#dis').hide();
      $('#incorrect1').hide(); $('#incorrect2').hide();	
      $('#correct1').hide();
      app1.did=0; app1.score=0;
      app1.DragStart();
      app1.ResetBox();	
    },
    
    
    ResetBox: function () {
           var ab1=0;
          for(var k=0;k<=27;k++)
          {
           if($($('#drops'+k).html()).find('img:first').attr('src') ==app1.path+"img/m6s4p1-01.png") ab1++;	 
          }
          var ab2=0;
          for(var k=0;k<=27;k++)
          {
           if($($('#drops'+k).html()).find('img:first').attr('src') ==app1.path+"img/m6s4p1-02.png") ab2++;	 
          }
          var ab3=0;
          for(var k=0;k<=27;k++)
          {
           if($($('#drops'+k).html()).find('img:first').attr('src') ==app1.path+"img/m6s4p1-03.png") ab3++;	 
          }
          var ab4=0;
          for(var k=0;k<=27;k++)
          {
           if($($('#drops'+k).html()).find('img:first').attr('src') ==app1.path+"img/m6s4p1-04.png") ab4++;	 
          }
          var ab5=0;
          for(var k=0;k<=27;k++)
          {
           if($($('#drops'+k).html()).find('img:first').attr('src') ==app1.path+"img/m6s4p1-05.png") ab5++;	 
          }
          
         if(ab5>=3) $('#drags4').hide(); else $('#drags4').show();
         if(ab4>=1) $('#drags3').hide(); else $('#drags3').show();
         if(ab3>=2) $('#drags2').hide(); else $('#drags2').show();
         if(ab2>=1) $('#drags1').hide(); else $('#drags1').show();
         if(ab1>=1) $('#drags0').hide(); else $('#drags0').show();
    },
  ResetFunNew: function () {
  $('#dragBox .draggable').show();
  $('#containerdnd .row.question .droppable').html('');
  },
  shuffle: function (o) {
      for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
    },
  }