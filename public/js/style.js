//var sign_in_btn = document.querySelector('#sign-in-button');
//var sign_up_btn = document.querySelector('#sign-up-button');
var main_container = document.querySelector('.main-container');

//document.getElementById('sign-up-button').addEventListener('click', ()=>{
//    main_container.classList.add('sign-up-mode');
//});

$('#sign-up-button').on('click', function (){
    main_container.classList.add('sign-up-mode');
});

$('#sign-in-button').on('click', function (){
    main_container.classList.remove('sign-up-mode');
});