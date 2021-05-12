const alerts = ["Stop it!", "Ouch!", "WHY!", "What do you want from me!", "Who are you?", "Listen, I have a very specific set of skills"];
function clickIt(){
    let i = Math.floor(Math.random()*alerts.length);
    alert(alerts[i]);
}
let favoriteFood = ["A BLT","With an egg"];
let MyName = 'nick';
let text = document.getElementById("food").innerHTML;
document.getElementById("food").innerHTML = text.slice(0, text.indexOf(':')+1) + ' ' + favoriteFood[0] + text.slice(text.indexOf(':')+1);
document.write(favoriteFood[1]);
clickIt();