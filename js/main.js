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
  var fnum = (num/cookies.length * 100).toFixed(0) + '%';
  $('.jd-line').css({
    'width':fnum
  });
  $('.process').html(fnum);
})

var ver = new Swiper('.ver-tic', {
  direction: 'horizontal',
  pagination: {
    clickable: true,
  },
  on: {
    slideChange: function () {
      // 设置总数
      var all = ver.slides.length - 3;
      var index = this.activeIndex;
      var length = index / all * 100;
      console.log(index);
      if(index == 0){
        $('.redetail .redetail-footer').css({
          'display':'none'
        })
      }else{
        $('.redetail .redetail-footer').css({
          'display':'none'
        })
        if(index == all){
          $('.rede-next').hide();
          $('.rede-quit').show();
          $('.DrotZ-next').hide();
          $('.DrotZ-finish').show();
          $('.redeline').animate({
            'width':length+'%'
          },'fast');
          $('.rede-word').html(index+'/'+all);
        }else if(index > all){
          var key = true;
          for(var i=0;i<ver.slides.length - 1;i++){
            console.log($('.ques').eq(i).attr('data-opt'));
            if($('.ques').eq(i).attr('data-opt') == 'error'){
              key = false;
              $('.qi-f').show();
              $('.qi-s').hide();
              $('.q-s').hide();
              $('.q-f').show();
              $('.q-contiune').css({'display':'block'});
              $('.qs-contiune').hide();
            }
          }
          if(key){
            $('.qi-f').hide();
            $('.qi-s').show();
            $('.q-s').show();
            $('.q-f').hide();
            $('.q-contiune').css({'display':'none'});
            $('.qs-contiune').show();
          }
        }else{
          $('.rede-next').show();
          $('.rede-quit').hide();
          $('.DrotZ-next').show();
          $('.DrotZ-finish').hide();
          $('.redeline').animate({
            'width':length+'%'
          },'fast');
          $('.rede-word').html(index+'/'+all);
        }
      }

    },
  },
});

$('.rede-prev').click(function(){
  if(ver.realIndex>1){
    ver.slidePrev();
  }
});

$('.rede-next').click(function(){
  ver.slideNext();
});


$('.rede-quit').on('click',function(){
  $('.redetail').css({
    'opacity':'0'
  });
  ver.slideTo(0, 100, false);
  $('.finish').animate({
    'left':'0%'
  },'fast');
});

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
  $('.main-black').hide();
  hor.slideTo(0, 100, false);
  $('.detail').animate({
    'left':'100%'
  });
});
$('.red-back').on('click',function(){
  $('.main-black').hide();
  ver.slideTo(0, 100, false);
  $('.redetail').animate({
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
  $(document).attr('title','遇见最澄澈透白的你');
  $('.main-black').hide();
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
    var fnum = (num/length * 100).toFixed(0);
    $('.jd-line').animate({
      'width':fnum + '%'
    },'fast');
    $('.process').html(fnum + '%');
  }
  $('.main-black').hide();
  $('.detail').css({
    'opacity':'1',
    'left':'100%'
  });
  $('.redetail').css({
    'opacity':'1',
    'left':'100%'
  });
  $('.finish').animate({
    'left':'100%'
  },'fast');
});

// 点击进入
$('.list-item').on('click',function(){
  $('.main-black').show();
  var id = $(this).attr('data-id');
  var title = $(this).find('.list-item-title').text();
  $(document).attr('title',title);
  if(id != 0){
    if(id == 5) {
      location.href = 'http://wechanel.eweixin.biz/Common/CourseExam_2017.aspx?CourseID=70';
      $('.list-item').eq(5).attr('is-finish',1);
      $('.list-item').eq(5).find('.list-item-img').hide();
      $('.list-item').eq(5).find('.list-item-acimg').addClass('acimg');
      $.cookie(5, 1, { expires: 7 });
    }else{
      $('.continue').attr('data-item',id);
      var item = chooseItem(id);
      var html = makeHtml(item);
      hor.removeAllSlides();
      hor.appendSlide(html);
      $('.detail').animate({
        'left':'0px'
      },'fast');
    }
  }else{
    $('.continue').attr('data-item',id);
    var item = chooseItem(id);
    var html = makeHtml(item);
    ver.removeAllSlides();
    ver.appendSlide(html);
    $('.redetail').animate({
      'left':'0px'
    },'fast');
  }
});

// 翻卡片
function change(val,obj){
  var option = val;
  var right = $(obj).parent().attr('data-right');
  var opt = $(obj).text();
  $('.DrotZ-Ychoos #Ychos').html(opt);
  if(option == right){
    $('.DrotZ-right').show();
    $('.DrotZ-ierror').hide();
    $('.i-error').hide();
    $('.i-success').show();
    $(obj).parent().parent().parent().parent().parent().parent().parent().attr('data-opt','right');
  }else{
    $('.DrotZ-right').hide();
    $('.DrotZ-ierror').show();
    $('.i-success').hide();
    $('.i-error').show();
  }
  $(obj).parent().parent().parent().removeClass('rotz').removeClass('rotz-ori').addClass('rotz');
  $(obj).parent().parent().parent().next().removeClass('rotz-back').removeClass('rotz-back-ori').addClass('rotz-back');
}

// function changeOrigin(){
//   $('.DrotZ').removeClass('rotz').removeClass('rotz-ori').addClass('rotz-ori');
//   $('.DrotZ-back').removeClass('rotz-back').removeClass('rotz-back-ori').addClass('rotz-back-ori');
// }

function toNext(){
  ver.slideNext();
}

// 路由跳转
function redirectTo(obj){
  var url = $(obj).attr('data-url');
  location.href = url;
}
function finish(){
  ver.slideTo(6, 100, false);
  var key = true;
  for(var i=0;i<ver.slides.length - 1;i++){
    console.log($('.ques').eq(i).attr('data-opt'));
    if($('.ques').eq(i).attr('data-opt') == 'error'){
      key = false;
      $('.qi-f').show();
      $('.qi-s').hide();
      $('.q-s').hide();
      $('.q-f').show();
      $('.q-contiune').css({'display':'block'});
      $('.qs-contiune').hide();
    }
  }
  if(key){
    $('.qi-f').hide();
    $('.qi-s').show();
    $('.q-s').show();
    $('.q-f').hide();
    $('.q-contiune').css({'display':'none'});
    $('.qs-contiune').show();
  }
}
// 继续答题
function qContinue(){
  $('.DrotZ').removeClass('rotz').removeClass('rotz-ori');
  $('.DrotZ-back').removeClass('rotz-back').removeClass('rotz-back-ori');
  $('.qfinish').animate({
    'left':'100%'
  },'fast');
  $('.qi-f').hide();
  $('.qi-s').show();
  $('.q-s').show();
  $('.q-f').hide();
  $('.q-contiune').css({'display':'none'});
  $('.qs-contiune').show();
  ver.slideTo(1,100,false);
}
// 完成答题
function fContiune(){
  $('.redetail').css({
    'opacity':'0'
  });
  $('.qfinish').css({
    'opacity':'0',
    'left':'100%'
  });
  ver.slideTo(0, 100, false);
  $('.finish').animate({
    'left':'0%'
  },'fast');
}

// 获取内容元素
function chooseItem(id){
  var item = null;
  switch(id){
    case '0':
      item = [
        {
          'title':'珍贵白梅——健康净澈光采的秘密',
          'type':'reflux',
          'questionList':[
            {
              'id':1,
              'question':'白梅花的花期是什么时候？',
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
              'question':'白梅花的象征是什么？',
              'options':[
                {
                  'A':'和平与纯洁',
                  'B':'健康和生命力',
                  'C':'幸福和甜美'
                }
              ],
              'right':'B',
              'rightQue':'健康和生命力',
              'mark':'白梅花是健康和生命力的象征，1000年的白梅花仍在开花。'
            },
            {
              'id':3,
              'question':'白梅精粹的功效有哪些？',
              'options':[
                {
                  'A':'修复细胞，提升肌肤活力，让肌肤重焕光彩',
                  'B':'净化肌肤',
                  'C':'舒缓、柔软肌肤'
                }
              ],
              'right':'A',
              'rightQue':'修复细胞，提升肌肤活力，让肌肤重焕光彩',
              'mark':'香奈儿研发中心历时4年，提炼出白梅精粹，它能提升肌肤活力，代谢和修复受损的细胞。'
            },
            {
              'id':4,
              'question':'白梅花采摘的时间？',
              'options':[
                {
                  'A':'清晨',
                  'B':'午后',
                  'C':'傍晚'
                }
              ],
              'right':'A',
              'rightQue':'清晨',
              'mark':'香奈儿只选取短暂盛放期的白梅花，于清晨全手工摘取，经过3周12道工序的专业萃取，完整保存其独特功效。'
            },
            {
              'id':5,
              'question':'香奈儿使用的珍贵白梅产自哪里？',
              'options':[
                {
                  'A':'格拉斯',
                  'B':'热带地区',
                  'C':'日本宇和岛'
                }
              ],
              'right':'C',
              'rightQue':'日本宇和岛',
              'mark':'香奈儿只选取最佳品种——日本德岛县的南高梅。那里有香奈儿专属种植区。'
            },
          ]
        }
      ];
      break;
    case '1':
      item = [
        {
          'title':'核心产品只选对的',
          'type':'img',
          'imgsList':[
            {
              'id':'1',
              'img':'hx1.jpg',
              'long':'fix'
            },
            {
              'id':'2',
              'img':'hx2.jpg',
              'long':'long'
            },
            {
              'id':'3',
              'img':'hx3.jpg',
              'long':'fix'
            },
            {
              'id':'4',
              'img':'hx4.jpg',
              'long':'fix'
            }

          ]
        }
      ];
      break;
    case '2':
      item = [
        {
          'title':'恰当的夜间保养，让你光采焕发',
          'type':'video',
          'imgsList':[
            {
              'id':'1',
              'img':'qd1.jpg',
              'long':'long',
              'type':'img'
            },
            {
              'id':'2',
              'img':'qd2.jpg',
              'long':'fix',
              'type':'img'
            },
            {
              'id':'3',
              'img':'qd3.jpg',
              'long':'long',
              'type':'video',
              'link':'http://wechanel.eweixin.biz/mkptest/video_play.html?URL=http://chanelqy.oss-cn-hangzhou.aliyuncs.com/2018/kejian/0213/xiaoxiannvFiona.mp4'
            },
            {
              'id':'4',
              'img':'qd4.jpg',
              'long':'fix',
              'type':'video',
              'link':'http://wechanel.eweixin.biz/mkptest/video_play.html?URL=http://chanelqy.oss-cn-hangzhou.aliyuncs.com/2018/kejian/0213/guangcai.mp4'
            },
            {
              'id':'5',
              'img':'qd5.jpg',
              'long':'fix',
              'type':'img'
            }
          ]
        }
      ];
      break;
    case '3':
      item = [
        {
          'title':'用彩妆和上妆技巧提升元气',
          'type':'img',
          'imgsList':[
            {
              'id':'1',
              'img':'cz1.jpg',
              'long':'long'
            },
            {
              'id':'2',
              'img':'cz2.jpg',
              'long':'fix'
            },
            {
              'id':'3',
              'img':'cz3.jpg',
              'long':'long'
            },
            {
              'id':'4',
              'img':'cz4.jpg',
              'long':'long'
            },
            {
              'id':'5',
              'img':'cz5.jpg',
              'long':'fix'
            },
            {
              'id':'6',
              'img':'cz6.jpg',
              'long':'long'
            },
            {
              'id':'7',
              'img':'cz7.jpg',
              'long':'long'
            },
            {
              'id':'8',
              'img':'cz8.jpg',
              'long':'fix'
            }
          ]
        }
      ];
      break;
    case '4':
      item = [
        {
          'title':'KEEP IN MIND',
          'type':'video',
          'imgsList':[
            {
              'id':'1',
              'img':'kp1.jpg',
              'long':'long',
              'type':'button',
              'link':'http://wechanel.eweixin.biz/Common/CourseExam_2017.aspx?CourseID=70'
            }
          ]
        }
      ];
        break;
    case '5':
      item = [

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
    var ilist = lists.imgsList;
    var length = lists.imgsList.length;
    console.log(length);
    $('.deline').css({
      'width':1/length * 100 +'%'
    });
    $('.de-word').html(1+'/'+length);
    for(var i = 0;i<length;i++){
      if(ilist[i]['long'] == 'fix'){
        html+='<div class="swiper-slide">'+
          '<div class="global">'+
            '<img src="img/hx/'+ilist[i]['img']+'" />'+
          '</div>'+
        '</div>';
      }else{
        html+='<div class="swiper-slide">'+
          '<div class="global-long">'+
            '<img src="img/hx/'+ilist[i]['img']+'" />'+
            '<div class="long-arrow">'+
              '<img class="slarrow" src="img/sliper-arrow.png" alt="">'+
            '</div>'+
          '</div>'+
        '</div>';
      }
    }
  }else if(lists.type == 'video'){
    var vlist = lists.imgsList;
    var length = lists.imgsList.length;
    if(length == 1){
      $('.de-next').hide();
      $('.de-quit').show();
    }
    $('.deline').css({
      'width':1/length * 100 +'%'
    });
    $('.de-word').html(1+'/'+length);
    for(var i = 0;i<length;i++){
      if(vlist[i]['long'] == 'fix'){
        html+='<div class="swiper-slide">'+
          '<div class="global">'+
            '<img src="img/hx/'+vlist[i]['img']+'" />';
        if(vlist[i]['type'] == 'video'){
          html+='<div class="glink" onclick="redirectTo(this)" data-url="'+vlist[i]['link']+'"></div>';
        }
        html+='</div>'+
        '</div>';
      }else{
        html+='<div class="swiper-slide">'+
          '<div class="global-long">'+
            '<img src="img/hx/'+vlist[i]['img']+'" />';
            if(vlist[i]['type'] == 'video'){
              html+='<div class="glink" onclick="redirectTo(this)" data-url="'+vlist[i]['link']+'"></div>';
            }else if(vlist[i]['type'] == 'button'){
              html+='<div class="gbtn" onclick="redirectTo(this)" data-url="'+vlist[i]['link']+'"></div>';
            }
            html+='<div class="long-arrow">'+
              '<img class="slarrow" src="img/sliper-arrow.png" alt="">'+
            '</div>'+
          '</div>'+
        '</div>';
      }
    }
  }else{
    var qlist = lists.questionList;
    var length = qlist.length;
    console.log(length);
    $('.deline').css({
      'width':1/length * 100 +'%'
    });
    $('.de-word').html(1+'/'+length);
    html += '<div class="swiper-slide special-slide swiper-no-swiping">'+
      '<div class="reindex">'+
        '<div class="reindex-content">'+
          '<div class="reindex-title">'+
            '<h3>珍贵白梅</h3>'+
            '<h3>——健康净澈光采的秘密</h3>'+
          '</div>'+
          '<div class="reindex-img">'+
            '<img src="img/bg-content.png" alt="">'+
          '</div>'+
          '<div class="reindex-desc">'+
            '<div class="desc-detail">核心成分——白梅精萃</div>'+
            '<div class="desc-detail">具有强大的焕活和修复功效</div>'+
            '<div class="desc-detail">可以让肌肤散发健康、透白的光采</div>'+
          '</div>'+
          '<div class="reindex-btn">'+
            '<button class="reindexbtn" onclick="toNext()">关于珍贵白梅的知识，你还记得么？</button>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</div>';

    for(var i = 0;i<length;i++){
      html += '<div class="swiper-slide ques swiper-no-swiping" data-opt="error" user-opt="empty">'+
        '<div class="q-main">'+
          '<div class="content">'+
            '<div class="content-rotZ">'+
              '<div class="DrotZ">'+
                '<div class="DrotZ-content">'+
                  '<div class="DrotZ-que">'+
                    '<img src="img/flower.png" alt="">'+
                    '<div class="D-question">'+qlist[i]['id']+'.'+qlist[i]['question']+'</div>'+
                  '</div>'+
                  '<ul class="DrotZ-options" data-right="'+qlist[i]['right']+'">'+
                    '<li class="D-item" onclick="change(\'A\',this)">'+qlist[i]['options'][0]['A']+'</li>'+
                    '<li class="D-item" onclick="change(\'B\',this)">'+qlist[i]['options'][0]['B']+'</li>'+
                    '<li class="D-item" onclick="change(\'C\',this)">'+qlist[i]['options'][0]['C']+'</li>'+
                  '</ul>'+
                '</div>'+
              '</div>'+
              '<div class="DrotZ-back">'+
                '<div class="DrotZ-content">'+
                  '<div class="DrotZ-bdetail">'+
                    '<div class="DrotZ-success">'+
                      '<img class="i-success" src="img/success.png">'+
                      '<img class="i-error" src="img/error.png">'+
                    '</div>'+
                    '<div class="DrotZ-right">回答正确</div>'+
                    '<div class="DrotZ-ierror">回答错误</div>'+
                    '<div class="DrotZ-que">'+
                      '<div class="D-question small">'+qlist[i]['mark']+'</div>'+
                    '</div>'+
                  '</div>'+
                  '<div class="DrotZ-button">'+
                    '<button class="DrotZ-next" onclick="toNext()">继续下一题</button>'+
                    '<button class="DrotZ-finish" onclick="finish()">完成答题</button>'+
                  '</div>'+
                '</div>'+
              '</div>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</div>';
    }

    html += '<div class="swiper-slide swiper-no-swiping">'+
    '<div class="qfinish">'+
      '<div class="qfinish-content">'+
        '<div class="qfinish-word">'+
          '<div class="qfsuccess">'+
            '<img class="qi-s" src="img/success.png" alt="">'+
            '<img class="qi-f" src="img/error.png" alt="">'+
          '</div>'+
          '<div class="qfword">'+
            '<p class="q-s">恭喜你，全部答对。</p>'+
            '<div class="q-f">'+
              '<p>很抱歉你没有全部答对，</p>'+
              '<p>可以重新回顾测试，加深记忆。</p>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</div>'+
      '<div class="qfinish-btn">'+
        '<button class="qs-contiune" onclick="toNext()">完成答题</button>'+
        '<div class="qother">'+
          '<button class="q-contiune" onclick="qContinue()">重新测试</button>'+
          '<button class="q-contiune" onclick="toNext()">继续学习</button>'+
        '</div>'+
      '</div>'+
    '</div>'+
    '</div>';

    html += '<div class="swiper-slide special-slide swiper-no-swiping">'+
      '<div class="recindex">'+
        '<img src="img/new.jpg">'+
        '<button class="contiunebtn" onclick="fContiune()">完成学习</button>'+
      '</div>'+
    '</div>';
  }
  return html;
}
