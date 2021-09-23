function init_cookie_consent(){$(".grt-cookie").grtCookie({background:"#FFC107"});}
function init_slick_carousel(){$('.js-slick-carousel').each(function(){var slickCarousel=$.HSCore.components.HSSlickCarousel.init($(this));});}
function init_rest(){$('.js-validate').each(function(){$.HSCore.components.HSValidation.init($(this),{rules:{confirmPassword:{equalTo:'#signupPassword'}}});});$('.js-animation-link').each(function(){var showAnimation=new HSShowAnimation($(this)).init();});$('.js-go-to').each(function(){var goTo=new HSGoTo($(this)).init();});AOS.init({duration:650,once:true});var header=new HSHeader($('#header')).init();unfold=new HSUnfold('.js-hs-unfold-invoker').init();}
function notify(msg,type){$.notify({message:msg,url:'javascript:',target:'_self'},{type:type,allow_dismiss:true,animate:{enter:'animated fadeIn',exit:'animated fadeOutUp'},delay:4000,template:'<div data-notify="container" style="opacity:0.6; width: 330px;" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">'+
'<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>'+
'<span data-notify="message">{2}</span>'+
'<a href="{3}" target="{4}" data-notify="url"></a>'+
'</div>'});}
function signOut(){NProgress.start();$('header').fadeOut(1500)
$('main').fadeOut(1500)
$('footer').fadeOut(1500)
try{var auth2=gapi.auth2.getAuthInstance();auth2.signOut().then(function(){localStorage.setItem('logged_in',false);NProgress.done();location.href="/logout";});}catch(e){location.href="/logout";}}