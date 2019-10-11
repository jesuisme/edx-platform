/* Javascript for SliderSevenNineXBlock. */


function SliderSevenNineXBlock(runtime, element) {
    $(function ($) {
        /* Here's where you'd do things on page load. */
        $(".lnkBreakdown").click(function () {
            $('html, body').animate({
                scrollTop: $("#all_report").offset().top
            }, 1000);
        });
    });
}
    var app_2 = {
        score:0,
        wrongAttempt:0,  
        Attempt:false,
        timeOutId:null,
        arrClicked:[],
        ConfigXML:null,
        Flag:false,
        isReportOpen:false,
        IsIntrupt:false,
        init: function () {
          this.Events();
          $("#HiTom,#HiTom2,#Tom_story,#First_step,#glad,#glad1,#glad2,#Second_step,#Tom_story2,#Tom_story3").hide();
          $("#Second_step_1,#Green2_Text,#Yellow2_Text,#Wrong2_Text,#3rd_step,#3rd_step_1").hide();
          $("#Green3Text,#Yellow3Text,#Red3Text,#whiteText,#4th_step").hide();
          $('#commonMSg,#5th_step,#5th_step_text,#6th_step,#5th_step_Y,#5th_step_Ytext').hide();
          $('#6th_step_1,#6th_step_2,#Gree6Text,#Yellow6Text,#Wrong6Text,#Wrong6_1Text').hide();
          $('#7th_step,#7th_step_1,#7th_step_2,#Gree7_2Text').hide();	
          $('#Green7Text,#Yellow7Text,#Wrong7Text,#Green7Text_1,#Green7Text_2,#6th_step_3').hide();
          $('#all_report').hide();
          $('#all_report P.Y1,#all_report P.R1,#all_report P.G1').hide();
           //setInterval(function(){app_2.ErrorReport();},10000);
           //app_2.Breakdown();
        },
        
       //// app_2.HideAll();
        HideAll: function(){
          clearTimeout(app_2.timeOutId);
          $("#HiTom,#HiTom2,#Tom_story,#First_step,#glad,#glad1,#glad2,#Second_step,#Tom_story2,#Tom_story3").hide();
          $("#Second_step_1,#Green2_Text,#Yellow2_Text,#Wrong2_Text,#3rd_step,#3rd_step_1").hide();
          $("#Green3Text,#Yellow3Text,#Red3Text,#whiteText,#4th_step").hide();
          $('#commonMSg,#5th_step,#5th_step_text,#6th_step,#5th_step_Y,#5th_step_Ytext').hide();
          $('#6th_step_1,#6th_step_2,#Gree6Text,#Yellow6Text,#Wrong6Text,#Wrong6_1Text').hide();
          $('#7th_step,#7th_step_1,#7th_step_2,#Gree7_2Text').hide();	
          $('#Green7Text,#Yellow7Text,#Wrong7Text,#Green7Text_1,#Green7Text_2,#6th_step_3').hide();
          //$('#all_report').hide();
          //$('#all_report P.Y1,#all_report P.R1,#all_report P.G1').hide();
        },
        
        
        
        First_step: function(){
          clearTimeout(app_2.timeOutId);
          $('#Tom_story').hide(); 
          $('#First_step').show();
        },
       Events:function(){ 
           $("#Konck").click(function(e){
             $("#Konck").hide(); $("#knockdoortext1").hide(); $("#knockdoortext2").show(); 
             $("#HiTom").show();
              });
          
          
          $('#TomStart').click(function(e){	
              $("#HiTom").hide();
               $("#HiTom2").show();
               app_2.timeOutId=setTimeout(function(){
                  $("#HiTom2").hide();
                  $('#Tom_story').show();			
              }, 3000);
          });	
             
          $("#intrupt").click(function(e){
              clearTimeout(app_2.timeOutId);
              app_2.IsIntrupt=false;
              app_2.arrClicked.push('No-Bonus');
              //app_2.First_step();
               $("#Tom_story").hide();
               $("#Tom_story3").show();
               /*  app_2.timeOutId=setTimeout(function(){
                          $("#Tom_story3").hide();
                          app_2.First_step();
                      }, 3000); */
           });
           
           $("#intrupt_continue").click(function(e){
              clearTimeout(app_2.timeOutId);
              if(app_2.score==0)
              {
                  app_2.score=app_2.score+10;		
                  app_2.arrClicked.push('Bonus');
                  app_2.IsIntrupt=true;
              }
              $("#Tom_story").hide();
               $("#Tom_story2").show();
               /* app_2.timeOutId=setTimeout(function(){
                   $("#Tom_story2").hide();
                   app_2.First_step();
                      }, 30000); */
           });
      ///////////////////////////	 
          $("#skip").click(function(e){
              clearTimeout(app_2.timeOutId);
               //$("#Tom_story2").hide();
               app_2.HideAll();
               $("#First_step").show();
             });
             $("#skip0").click(function(e){
             clearTimeout(app_2.timeOutId);
             //$('#HiTom2').hide(); $("#HiTom").hide();
              app_2.HideAll();
             $('#Tom_story').show();	
             });
            $("#skip01").click(function(e){	
            // $('#Tom_story3').hide();
            // $('#Tom_story').hide();	
              app_2.HideAll();
               $("#First_step").show();
             });
             
            $("#skip1").click(function(e){
              //$('#expiration').hide();
              app_2.HideAll(); $('#glad').show();  $('#expiration').hide();	
             $('#expiration_txt').show();	
             });
             
            $("#skip2").click(function(e){
            // $('#glad').hide();
            // $('#expiration').hide();
            // $('#expiration_txt').hide();
              app_2.HideAll();
             $('#Second_step').show();
             });
             
            $("#skip3").click(function(e){
             app_2.HideAll();
             //$('#glad1').hide(); $('#glad').hide(); $('#Tom_story').hide();	
             $('#Second_step').show();
             });
             
            $("#skip4").click(function(e){
             // $('#glad2').hide();
              app_2.HideAll();
              $('#Second_step_1').show();
             });
             $("#skip5").click(function(e){
              //$('#Green2_Text').hide();
              app_2.HideAll();
              $('#3rd_step').show();
              });
              
              $("#skip6").click(function(e){
              $('#Yellow2_Text').hide();
              //app_2.HideAll();
              $('#whiteText').show();
              });
              $("#skip7").click(function(e){
              //$('#Wrong2_Text').hide();
              app_2.HideAll();
              $('#3rd_step_1').show();
              });
              
              $("#skip8").click(function(e){
              clearTimeout(app_2.timeOutId);
              $('#Green3Text').hide();
              $('#whiteText').show();
              /* app_2.timeOutId=setTimeout(function(){
                  $('#whiteText').hide();
                  $('#commonMSg').show();
                  app_2.timeOutId=setTimeout(function(){
                      $('#commonMSg').hide();
                      $('#6th_step_1').show();
                  },7000);
              },13000); */
              });
              
              $("#skip9").click(function(e){
              //$('#Red3Text').hide();
              app_2.HideAll();
              $('#4th_step').show();
              });
              
              $("#skip10").click(function(e){
              clearTimeout(app_2.timeOutId);
                  $('#whiteText').hide();
                  $('#commonMSg').show();
                  /* app_2.timeOutId=setTimeout(function(){
                      $('#commonMSg').hide();
                      $('#6th_step_1').show();
                  },7000); */
              });
              
              $("#skip11").click(function(e){
              //$('#commonMSg').hide();
              app_2.HideAll();
              $('#6th_step_1').show();
              });
              $("#skip12").click(function(e){
              //$('#5th_step_text').hide();
              app_2.HideAll();
              $('#6th_step').show();
              });
              $("#skip13").click(function(e){
              //$('#5th_step_Ytext').hide();
              app_2.HideAll();
              $('#6th_step_3').show();
              });
              $("#skip14").click(function(e){
              //$('#Gree6Text').hide();
              app_2.HideAll();
              $('#7th_step').show();
              });
              $("#skip15").click(function(e){
              //$('#Yellow6Text').hide();
              app_2.HideAll();
              $('#7th_step_1').show();
              });
              
              $("#skip17").click(function(e){
              //$('#Wrong6_1Text').hide();
              app_2.HideAll();
              $('#7th_step_2').show();
              });
              $("#skip18").click(function(e){
              //$('#Gree7_2Text').hide();
              app_2.HideAll();
              $('#6th_step').show();
              });
              $("#skip19").click(function(e){
              clearTimeout(app_2.timeOutId);
              //$('#Green7Text').hide();	
              $('#Green7Text').hide();
              $('#Green7Text_1').show();
              app_2.timeOutId=setTimeout(function(){
                  $('#Green7Text_1').hide();
                  $('#Green7Text_2').show();
                  app_2.GenerateReport();
              },15000);
                //$('#Green7Text_1').show();
              });
              
              $("#skip22").click(function(e){
              clearTimeout(app_2.timeOutId);
                  $('#Green7Text_1').hide();
                  app_2.HideAll();
                  $('#Green7Text_2').show();
                  app_2.GenerateReport();
              }); 
      ////////////////////////////////	 
        },
          
        first_click:function(){
        clearTimeout(app_2.timeOutId);
          app_2.score=app_2.score+15;
          app_2.arrClicked.push('G1');
          $('#First_step').hide();
          $('#expiration_txt').hide();
          $('#glad').show();
          $('#expiration').show();
          /* app_2.timeOutId=setTimeout(function(){
          $('#expiration').hide();
          $('#expiration_txt').show();
          app_2.timeOutId=setTimeout(function(){
              $('#glad').hide();
              $('#Second_step').show();
          }, 20000);
          }, 4000); */
        },
        Second_click:function(){
          clearTimeout(app_2.timeOutId);
          $('#First_step').hide();
          $('#glad1').show();	
          /* app_2.timeOutId=setTimeout(function(){
              $('#glad1').hide();
              $('#Second_step').show();
          }, 5000); */
        },
        third_click:function(){
          clearTimeout(app_2.timeOutId);
          app_2.wrongAttempt++;
          app_2.arrClicked.push('R1');
          $('#First_step').hide();
          $('#glad2').show();
          app_2.ErrorReport();
          /* app_2.timeOutId=setTimeout(function(){
              $('#glad2').hide();
              $('#Second_step_1').show();
          }, 10000); */
        },
        Green2:function(){
          app_2.score=app_2.score+15;
          app_2.arrClicked.push('G2');
          clearTimeout(app_2.timeOutId);
          $('#Second_step').hide();
          $('#Green2_Text').show();
          /* app_2.timeOutId=setTimeout(function(){
              $('#Green2_Text').hide();
              $('#3rd_step').show();
          },6000); */
        },
        Yellow2:function(){
          clearTimeout(app_2.timeOutId);
          $('#Second_step,#Second_step_1,#3rd_step,#3rd_step_1').hide();
          $('#Yellow2_Text').show();
          
          /* app_2.timeOutId=setTimeout(function(){
              $('#Yellow2_Text').hide();
              $('#whiteText').show();
              app_2.timeOutId=setTimeout(function(){
                  $('#whiteText').hide();
                  $('#commonMSg').show();
                  app_2.timeOutId=setTimeout(function(){
                      $('#commonMSg').hide();
                      $('#6th_step_1').show();
                  },17000);
              },17000);
          },7000); */
        },
        Wrong2:function(){
          clearTimeout(app_2.timeOutId);
          $('#Second_step_1,#Second_step').hide();
          $('#Wrong2_Text').show();
          app_2.arrClicked.push('R2');
          app_2.wrongAttempt++;
          /* app_2.timeOutId=setTimeout(function(){
              $('#Wrong2_Text').hide();
              $('#3rd_step_1').show();
          },9000); */
          app_2.ErrorReport();
        },
        Green3:function(){
          clearTimeout(app_2.timeOutId);
          app_2.score=app_2.score+15;
          app_2.arrClicked.push('G3');
          $('#3rd_step,#3rd_step_1,#4th_step').hide();	
          $('#Green3Text').show();
          /* app_2.timeOutId=setTimeout(function(){
              $('#Green3Text').hide();
              $('#whiteText').show();
              app_2.timeOutId=setTimeout(function(){
                  $('#whiteText').hide();
                  $('#commonMSg').show();
                  app_2.timeOutId=setTimeout(function(){
                      $('#commonMSg').hide();
                      $('#6th_step_1').show();
                  },7000);
              },13000);
          },3000); */
        },
        Wrong3:function(){
          app_2.wrongAttempt++;
          app_2.arrClicked.push('R3');
          clearTimeout(app_2.timeOutId);
          $('#3rd_step,#3rd_step_1,#4th_step').hide();	
          $('#Red3Text').show();
          /* app_2.timeOutId=setTimeout(function(){
              $('#Red3Text').hide();
              $('#4th_step').show();
              
          },9000); */
          app_2.ErrorReport();
        },
        Wrong3_1:function(){
          app_2.wrongAttempt++;
          app_2.arrClicked.push('R3');
          $('#4th_step,#3rd_step_1').hide();
          clearTimeout(app_2.timeOutId);
          $('#whiteText').show();
          /* app_2.timeOutId=setTimeout(function(){
              $('#whiteText').hide();
              $('#commonMSg').show();
              app_2.timeOutId=setTimeout(function(){
                  $('#commonMSg').hide();
                  $('#6th_step_1').show();
              },9000);
          },14000); */
          app_2.ErrorReport();
        },
        Green4:function(){
          clearTimeout(app_2.timeOutId);
          app_2.score=app_2.score+15;
          app_2.arrClicked.push('G4');
          $('#5th_step,#6th_step_1').hide();
          $('#5th_step_text').show();
          /* app_2.timeOutId=setTimeout(function(){
              $('#5th_step_text').hide();
              $('#6th_step').show();
          },9000); */
        },
        Yellow5:function(){
          clearTimeout(app_2.timeOutId);
          $('#5th_step_Y,#6th_step_1').hide();
          $('#5th_step_Ytext').show();
          /* app_2.timeOutId=setTimeout(function(){
              $('#5th_step_Ytext').hide();
              $('#6th_step_3').show();
          
          },9000); */
        },
        Green6:function(){
          clearTimeout(app_2.timeOutId);
          app_2.score=app_2.score+15;
          app_2.arrClicked.push('G5');
          $('#6th_step,#6th_step_3').hide();
          $('#Gree6Text').show();
          /* app_2.timeOutId=setTimeout(function(){
              $('#Gree6Text').hide();
              $('#7th_step').show();
          },9000); */
        },
        Yellow6:function(){
          clearTimeout(app_2.timeOutId);
          $('#6th_step,#6th_step_3').hide();
          $('#Yellow6Text').show();
          /* app_2.timeOutId=setTimeout(function(){	
              $('#Yellow6Text').hide();
              $('#7th_step_1').show();
          },9000); */
        },
        Wrong6:function(){
          app_2.wrongAttempt++;
          app_2.arrClicked.push('R5');
          clearTimeout(app_2.timeOutId);
          $('#6th_step,#6th_step_2').hide();
          $('#Wrong6Text').show();
          $('#7th_step_2').hide();
          app_2.GenerateReport();
          app_2.ErrorReport();
        },
        Wrong6_1:function(){
          app_2.wrongAttempt++;
          app_2.arrClicked.push('R4');
          clearTimeout(app_2.timeOutId);
          $('#6th_step_1').hide();
          $('#Wrong6_1Text').show();
          /* app_2.timeOutId=setTimeout(function(){	
              $('#Wrong6_1Text').hide();
              $('#7th_step_2').show();
          },9000);  */ 
          app_2.ErrorReport();
        },
        Green7_2:function(){
          clearTimeout(app_2.timeOutId);
          $('#7th_step_2').hide();
          $('#Gree7_2Text').show();
          /* app_2.timeOutId=setTimeout(function(){
              $('#Gree7_2Text').hide();
              $('#6th_step').show();
          },9000); */ 
        },
        Green7:function(){
          clearTimeout(app_2.timeOutId);
          app_2.score=app_2.score+15;
          app_2.arrClicked.push('G6');
          $('#7th_step').hide();
          $('#Green7Text').show();
          /* app_2.timeOutId=setTimeout(function(){
              $('#Green7Text').hide();
              $('#Green7Text_1').show();
              app_2.timeOutId=setTimeout(function(){
                  $('#Green7Text_1').hide();
                  $('#Green7Text_2').show();
                  app_2.GenerateReport();
              },10000);
          },10000); */
        },
        Yellow7:function(){
          clearTimeout(app_2.timeOutId);
          $('#7th_step,#7th_step_1').hide();
          $('#Yellow7Text').show();
          app_2.GenerateReport();
        },
        Wrong7:function(){
          clearTimeout(app_2.timeOutId);
          app_2.wrongAttempt++;
          app_2.arrClicked.push('R6');
          $('#7th_step,#7th_step_1').hide();
          $('#Wrong7Text').show();
          app_2.ErrorReport();
          app_2.GenerateReport();
          
        },
        
        
        GenerateReport:function()
        {
          clearTimeout(app_2.timeOutId);
          $('#marks').removeClass('red');
          $('#marks').removeClass('yellow');
          $('#marks').removeClass('green');
          if ((app_2.score <= 69) && (app_2.score >= 0))
          {
              $('#FeedBack1').show();
              $('.displayBlock').show();
              $('#marks').addClass('red');
              $('#all_report P.R1').show();
              app_2.Breakdown();
          }
          else if ((app_2.score <= 79) && (app_2.score >= 70)){
              $('#FeedBack2').show();
              $('.displayBlock').show();
              $('#marks').addClass('yellow');
              $('#all_report P.Y1').show();
              app_2.Breakdown();
          }
          else{
              $('#FeedBack3').show();
              $('.displayBlock').show();
              $('#marks').addClass('green');
              $('#all_report P.G1').show();
              app_2.Breakdown();
          }
        },
       ErrorReport:function()
        {
          if(app_2.wrongAttempt>=3 && app_2.Flag!=true)
          {
              clearTimeout(app_2.timeOutId);
              app_2.Flag=true;
              app_2.GenerateReport();
              $('#FeedBack1').show();
              $('.displayBlock').show();
          } 
        },
        
        
       Breakdown:function()
        {
         if(app_2.isReportOpen!=true){
          app_2.isReportOpen=true;
            app_2.LoadConfig();		
          var Rtext='';
              var xPath="//Sec9Report/Category";
              var nodes= app_2.ConfigXML.evaluate(xPath, app_2.ConfigXML, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
              for ( var i=0 ; i < nodes.snapshotLength; i++ )
              {
                  var point=null;
                  var explain=null;
                  var Temp=null;
                  
                  /* if(app_2.arrClicked.indexOf(nodes.snapshotItem(i).children[0].attributes['name'].value)!=-1)
                  {
                      Temp=nodes.snapshotItem(i).children[0];
                  }
                  else if(app_2.arrClicked.indexOf(nodes.snapshotItem(i).children[1].attributes['name'].value)!=-1)
                  {
                      Temp=nodes.snapshotItem(i).children[1];				
                  }
                  else
                  {
                      Temp=nodes.snapshotItem(i).children[1];
                  }
                  point=Temp.children[0];
                  explain=Temp.children[1]; */
                  if(app_2.arrClicked.indexOf(nodes.snapshotItem(i).firstElementChild.attributes['name'].value)!=-1)
                  {
                      Temp=nodes.snapshotItem(i).firstElementChild;
                  }
                  else if(app_2.arrClicked.indexOf(nodes.snapshotItem(i).lastElementChild.attributes['name'].value)!=-1)
                  {
                      Temp=nodes.snapshotItem(i).lastElementChild;				
                  }
                  else
                  {
                      Temp=nodes.snapshotItem(i).lastElementChild;
                  }
                  point=Temp.firstElementChild;
                  explain=Temp.lastElementChild;
                  Rtext+='<div class="row">';
                  Rtext+='<div class="col-xs-2 pd1"><div class="marks1 '+point.attributes["color"].value+'"><p>'+point.textContent+'</p><span>POINTS</span></div></div>';
                  Rtext+='<div class="col-xs-10 pd1"><f><h5>'+nodes.snapshotItem(i).attributes['title'].value+'</h5></f>';
                  Rtext+='<f><p>'+explain.textContent+'</p></f></div></div>';
                  
              }
          
          $('#marks').html(app_2.score+'%');
          $('#report_details').html(Rtext);
          $('#all_report').show();
          }
          /*    $('html, body').animate({
              scrollTop: $("#all_report").offset().top
          }, 1000);*/
        },
       
         BreakdownLink:function()
         {
         $('#all_report').show();
         $('html, body').animate({
              scrollTop: $("#all_report").offset().top
          }, 1000);
          },
        
        LoadConfig:function(){
          var xmlhttp;
          if (window.XMLHttpRequest) {
              xmlhttp = new XMLHttpRequest();
          } else {
              // code for older browsers
              xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
          }
          xmlhttp.onreadystatechange = function() {
              if (this.readyState == 4 && this.status == 200) {
                  app_2.ConfigXML=xmlhttp.responseXML;
              }
          };
          xmlhttp.open("GET", "Config/Section9Report.xml", false);
          xmlhttp.send();
          },
          ResetFun1:function(){
              app_2.timeOutId=null;
              app_2.arrClicked=[];
              app_2.ConfigXML=null;
              app_2.score= 0,
              app_2.wrongAttempt=0,
              app_2.IsIntrupt=false;
              $('#FeedBack1,#FeedBack2,#FeedBack3').hide();
              $('.displayBlock').hide();
              $("#Konck").show();
              app_2.init();
              app_2.Flag=false;
              app_2.isReportOpen=false;
          }
      }
      $(window).load(function () {
        app_2.init();  
      });
