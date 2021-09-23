var googleUser={};var startApp=function(){gapi.load('auth2',function(){auth2=gapi.auth2.init({client_id:window.google_signin_client_id,cookiepolicy:'single_host_origin',});attachGoogleSignin(document.getElementById('googleSignIn'));});};function attachGoogleSignin(element){auth2.attachClickHandler(element,{},function(googleUser){googleSignIn(googleUser);},function(error){console.log(JSON.stringify(error,undefined,2));});}
function googleSignIn(googleUser){NProgress.start();var unfold=new HSUnfold($('#sidebarContent'));var profile=googleUser.getBasicProfile();var id_token=googleUser.getAuthResponse().id_token;next_url=$('#sidebarContent input[name="next"]').val()
$('#sidebarContent .sidebar-scroller').css('opacity',0.6)
fetch('/oauth/google',{method:'post',body:new URLSearchParams('oauth_token='+id_token+'&csrf_token='+window.csrf_token+'&user_id='+profile.getId()+'&next='+next_url)}).then((response)=>{return response.json();}).then((result)=>{NProgress.done();if(result.error){notify(result.error,'danger');}else if(result.url){if(result.is_signup){notify('Logged in successfully.','info');}else{notify('Welcome back.','primary');}
location.href=result.url;}})}
function magicSignIn($form){form_serialized=$form.serialize()
$form.validate();if($form.valid()){NProgress.start();$('button#magicSigninEmailMain .spinner-border').removeClass('d-none')
$('button#magicSigninEmail .spinner-border').removeClass('d-none')
$('button#magicSigninEmail').attr('disabled','true');$('input#magicLinkEmailMain').attr('disabled','true');$('input#magicLinkEmail').attr('disabled','true');$('#sidebarContent .sidebar-scroller').css('opacity',0.6)
fetch('/oauth/magic',{method:'post',body:new URLSearchParams(form_serialized)}).then((response)=>{return response.json();}).then((result)=>{NProgress.done();$('button#magicSigninEmailMain .spinner-border').addClass('d-none')
$('button#magicSigninEmail .spinner-border').addClass('d-none')
$('button#magicSigninEmail').attr('disabled','false')
$('input#magicLinkEmailMain').attr('disabled','false');$('input#magicLinkEmail').attr('disabled','false');$('#sidebarContent .sidebar-scroller').css('opacity',1)
if(result.error){notify(result.error,'danger');}else if(result.message){location.href='/oauth/magic-result'}})}}
$(document).on('ready',function(){$('button#magicSigninEmail, button#magicSigninEmailMain').click(function(){$form=$(this).parents('form:first')
magicSignIn($form);});$('input#magicLinkEmail, input#magicLinkEmailMain').keypress(function(e){var keycode=(e.keyCode?e.keyCode:e.which);if(keycode==13){$form=$(this).parents('form:first')
magicSignIn($form);return false;}});$('a[data-next-url]').click(function(e){$this=$(this)
url=$this.attr('data-next-url');$("input[name='next']").val(url);$('a.btn-github').attr('href','/oauth/github?next='+encodeURIComponent(url))
if(window.signedin){location.href=url}else{$('#plansModalv2').modal('hide')
$('button#signInButton').trigger('click');return false;}})
if(location.search=='?signin'){window.setTimeout(function(){$('button#signInButton').trigger('click');},1000);}});