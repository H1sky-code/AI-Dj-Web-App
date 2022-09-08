music = "";
leftwristX = 0;
leftwristY = 0;
rightwristX = 0;
rightwristY = 0;
scoreleftwrist= 0;
scorerightwrist = 0;

function setup(){
canvas = createCanvas(600,500);
canvas.position(500,225);
video = createCapture(VIDEO);
video.hide();

poseNet = ml5.poseNet(video,modelLoaded);
poseNet.on('pose',gotposes);
}

function draw(){
    image(video,0,0,600,500);

    fill ("blue");
    stroke ("black");
    if (scoreleftwrist>0.2){

    circle (leftwristX,leftwristY,20);
     NumberleftwristY= Number(leftwristY);
     removedecimal= floor(NumberleftwristY);
     volume = removedecimal/500;
     document.getElementById("volume").innerHTML = "volume = "+volume;
     music.setVolume(volume)
    }
if (scorerightwrist>0.2)
     circle(rightwristX,rightwristY,20);
     if (rightwristY>0 && rightwristY<= 100) {
        document.getElementById("speed").innerHTML = "speed=0.5x";
        music.rate(0.5);
     }
     if (rightwristY>100 && rightwristY<= 200) {
        document.getElementById("speed").innerHTML = "speed=1x";
        music.rate(1);
     }
     if (rightwristY>200 && rightwristY<= 300) {
        document.getElementById("speed").innerHTML = "speed=1.5x";
        music.rate(1.5);
     }
     if (rightwristY>300 && rightwristY<= 400) {
        document.getElementById("speed").innerHTML = "speed=2x";
        music.rate(2);
     }
     if (rightwristY>400 && rightwristY<= 500) {
        document.getElementById("speed").innerHTML = "speed=2.5x";
        music.rate(2.5);
     }
 
}

function preload(){
  music = loadSound("music.mp3");
}

function Start(){
    music.play();
    music.setVolume(1);
    music.rate(1);
}

function modelLoaded(){
    console.log("PoseNet is Initialized");
}

function gotposes(results){
   if(results.length >0){
    console.log(results);
    scoreleftwrist = results[0].pose.keypoints[9].score;
    scorerightwrist = results[0].pose.keypoints[10].score;
    leftwristX = results[0].pose.leftWrist.x;
    leftwristY = results[0].pose.leftWrist.y;
    rightwristX = results[0].pose.rightWrist.x;
    rightwristY = results[0].pose.rightWrist.y;
    
   }
   
}
