var chelsea = ['Hazard', 'Cesar Azpiliqeta', 'Andreas Christenten', 'Cesc Fabregas', 'Ngolo Kante', 'Alvaro Morata']
var newbox = document.getElementById('next');
var create = document.getElementById('box');

create.addEventListener("keypress",function(word){
    word = create.value;
    if(word == 'Hazard'){
        newbox.style.display = 'block';
    }
});


