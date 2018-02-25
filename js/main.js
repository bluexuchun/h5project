$(function(){
  var cookies = [$.cookie('0'),$.cookie('1'),$.cookie('2'),$.cookie('3'),$.cookie('4'),$.cookie('5')];
  var num = 0;
  for(var i = 0;i<=cookies.length;i++){
    if(cookies[i] != undefined){
      $('.list-item').eq(i).attr('is-finish',1);
      $('.list-item').eq(i).find('.list-item-img').hide();
      $('.list-item').eq(i).find('.list-item-acimg').addClass('acimg');
      num++;
    }
  }
  var fnum = (num/cookies.length * 100).toFixed(2) + '%';
  $('.jd-line').css({
    'width':fnum
  });
  $('.process').html(fnum);
})
var hor = new Swiper('.hor', {
  direction: 'horizontal',
  pagination: {
    clickable: true,
  },
  watchSlidesProgress : true,
  on: {
    slideChange: function () {
      // 设置总数
      var all = hor.slides.length;
      var index = this.activeIndex + 1;
      var length = index / all * 100;
      if(index == all){
        $('.de-next').hide();
        $('.de-quit').show();
        $('.DrotZ-next').hide();
        $('.DrotZ-finish').show();
      }else{
        $('.de-next').show();
        $('.de-quit').hide();
        $('.DrotZ-next').show();
        $('.DrotZ-finish').hide();
      }
      $('.deline').animate({
        'width':length+'%'
      },'fast');
      $('.de-word').html(index+'/'+all);
    },
  },
});
$('.de-prev').click(function(){
  hor.slidePrev();
})
$('.de-next').click(function(){
  hor.slideNext();
})
$('.d-back').on('click',function(){
  hor.slideTo(0, 100, false);
  $('.detail').animate({
    'left':'100%'
  });
});
$('.de-quit').on('click',function(){
  $('.detail').css({
    'opacity':'0',
  });
  hor.slideTo(0, 100, false);
  $('.finish').animate({
    'left':'0%'
  },'fast');
});
$('.continue').on('click',function(){
  var item = $(this).attr('data-item');
  var length = $('.list-item').length;
  var num = 0;
  for(var i=0;i<=length;i++){
    if($('.list-item').eq(i).attr('is-finish') == 1){
      num = num + 1;
    }
  }
  if($('.list-item').eq(item).attr('is-finish')==0){
    $('.list-item').eq(item).attr('is-finish',1);
    $('.list-item').eq(item).find('.list-item-img').hide();
    $('.list-item').eq(item).find('.list-item-acimg').addClass('acimg');
    $.cookie(item, 1, { expires: 7 });
    num = num + 1;
    var fnum = (num/length * 100).toFixed(2);
    $('.jd-line').animate({
      'width':fnum + '%'
    },'fast');
    $('.process').html(fnum + '%');
  }

  $('.detail').css({
    'opacity':'1',
    'left':'100%'
  });
  $('.finish').animate({
    'left':'100%'
  },'fast');
});
// 点击进入
$('.list-item').on('click',function(){
  var id = $(this).attr('data-id');
  $('.continue').attr('data-item',id);
  var item = chooseItem(id);
  var html = makeHtml(item);
  hor.removeAllSlides();
  hor.appendSlide(html);
  $('.detail').animate({
    'left':'0px'
  },'fast');

});


function change(val,obj){
  var option = val;
  var right = $(obj).parent().attr('data-right');
  var opt = $(obj).text();
  $('.DrotZ-Ychoos #Ychos').html(opt);
  if(option == right){
    $('.DrotZ-right').show();
    $('#right').hide();
  }else{
    $('.DrotZ-right').hide();
    $('#right').show();
  }
  $(obj).parent().parent().parent().removeClass('rotz').removeClass('rotz-ori').addClass('rotz');
  $(obj).parent().parent().parent().next().removeClass('rotz-back').removeClass('rotz-back-ori').addClass('rotz-back');
}
// function changeOrigin(){
//   $('.DrotZ').removeClass('rotz').removeClass('rotz-ori').addClass('rotz-ori');
//   $('.DrotZ-back').removeClass('rotz-back').removeClass('rotz-back-ori').addClass('rotz-back-ori');
// }
function toNext(){
  hor.slideNext();
}
function finish(){
  hor.slideTo(0, 100, false);
  $('.detail').css({
    'opacity':'0'
  });
  $('.finish').animate({
    'left':'0%'
  },'fast');
}
function chooseItem(id){
  var item = null;
  switch(id){
    case '0':
      item = [
        {
          'title':'珍贵白梅——健康净澈光采的秘密',
          'type':'img',
          'imgsList':['图片1','图片2','图片3','图片4']
        }
      ];
      break;
    case '1':
      item = [
        {
          'title':'核心产品只选对的',
          'type':'img',
          'imgsList':['图片1','图片2','图片3']
        }
      ];
      break;
    case '2':
      item = [
        {
          'title':'恰当的夜间保养，让你光采焕发',
          'type':'img',
          'imgsList':['图片1','图片2','图片3']
        }
      ];
      break;
    case '3':
      item = [
        {
          'title':'用彩妆和上妆技巧提升元气',
          'type':'img',
          'imgsList':['图片1','图片2','图片3']
        }
      ];
      break;
    case '4':
      item = [
        {
          'title':'KEEP IN MIND',
          'type':'img',
          'imgsList':['图片1','图片2','图片3']
        }
      ];
        break;
    case '5':
      item = [
        {
          'title':'随堂小测试',
          'type':'reflux',
          'questionList':[
            {
              'id':1,
              'question':'白梅花的花期是什么时候',
              'options':[
                {
                  'A':'2-3月',
                  'B':'4-5月',
                  'C':'6-7月'
                }
              ],
              'right':'A',
              'rightQue':'2-3月',
              'mark':'每年2-3月，在白雪茫茫的暮冬与初春时节，白梅花就已经抢在百花之前悄然绽放。'
            },
            {
              'id':2,
              'question':'白梅花的象征是什么',
              'options':[
                {
                  'A':'健康和生命力',
                  'B':'和平与纯洁',
                  'C':'幸福和甜美'
                }
              ],
              'right':'A',
              'rightQue':'健康和生命力',
              'mark':'白梅花是健康和生命力的象征，1000年的白梅花仍在开花。'
            }
          ]
        }
      ];
      break;
    default:
      item = '网络出错';
  }
  return item;
}
function makeHtml(array){
  var lists = array[0];
  var html = '';
  $('.head-title').html(lists.title);
  if(lists.type == 'img'){
    var length = lists.imgsList.length;
    $('.deline').css({
      'width':1/length * 100 +'%'
    });
    $('.de-word').html(1+'/'+length);
    for(var i = 0;i<length;i++){
      html+='<div class="swiper-slide">图片'+(i+1)+'</div>';
    }
  }else{
    var qlist = lists.questionList;
    var length = qlist.length;
    console.log(qlist[0]['options'])
    $('.deline').css({
      'width':1/length * 100 +'%'
    });

    $('.de-word').html(1+'/'+length);
    for(var i = 0;i<length;i++){
      html += '<div class="swiper-slide">'+
        '<div class="q-main">'+
          '<div class="content">'+
            '<div class="content-rotZ">'+
              '<div class="DrotZ">'+
                '<div class="DrotZ-content">'+
                  '<div class="DrotZ-title">CHANEL</div>'+
                  '<div class="DrotZ-que">'+
                    '<img src="img/flower.png" alt="">'+
                    '<div class="D-question">'+qlist[i]['id']+'.'+qlist[i]['question']+'</div>'+
                  '</div>'+
                  '<ul class="DrotZ-options" data-right="'+qlist[i]['right']+'">'+
                    '<li class="D-item" onclick="change(\'A\',this)">'+qlist[i]['options'][0]['A']+'</li>'+
                    '<li class="D-item" onclick="change(\'B\',this)">'+qlist[i]['options'][0]['B']+'</li>'+
                    '<li class="D-item" onclick="change(\'C\',this)">'+qlist[i]['options'][0]['C']+'</li>'+
                  '</ul>'+
                  '<div class="DrotZ-logo">'+
                    '<img src="img/logo2.png" alt="">'+
                  '</div>'+
                '</div>'+
              '</div>'+
              '<div class="DrotZ-back">'+
                '<div class="DrotZ-content">'+
                  '<div class="DrotZ-title">CHANEL</div>'+
                  '<div class="DrotZ-right">回答正确</div>'+
                  '<div class="DrotZ-Ychoos" id="right">'+
                    '<div class="Yc">正确答案:</div>'+
                    '<div class="choos chos-right">'+qlist[i]['rightQue']+'</div>'+
                  '</div>'+
                  '<div class="DrotZ-Ychoos">'+
                    '<div class="Yc">您的答案:</div>'+
                    '<div class="choos" id="Ychos"></div>'+
                  '</div>'+
                  '<div class="DrotZ-que">'+
                    '<img src="img/flower.png" alt="">'+
                    '<div class="D-question small">'+qlist[i]['mark']+'</div>'+
                  '</div>'+
                  '<div class="DrotZ-button">'+
                    '<button class="DrotZ-next" onclick="toNext()">下一题</button>'+
                    '<button class="DrotZ-finish" onclick="finish()">完成答题</button>'+
                  '</div>'+
                  '<div class="DrotZ-logo">'+
                    '<img src="img/logo2.png" alt="">'+
                  '</div>'+
                '</div>'+
              '</div>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</div>';
    }
  }


  return html;
}
