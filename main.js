prediction1 = "";
prediction2 = "";

Webcam.set({
    width: 300, height:350, image_format: "png", png_quality:90
});

camera = document.getElementById("web-camera");


Webcam.attach("#web-camera");
function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="capturedImage" src="'+ data_uri +'">'
        console.log(data_uri);
    });
}

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/jDu9WoSW-/model.json", modelLoaded);

function modelLoaded(){
    console.log("modelLoaded");
}

function speak(){
    var synth = window.speechSynthesis;
    speakdata1 = "The First Prediction Is " + prediction1; 
    speakdata2 = "The Second Prediction Is" + prediction2;
    var utterThis = new SpeechSynthesisUtterance(speakdata1 + speakdata2);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById("capturedImage")
    classifier.classify(img, gotResult)
}

function gotResult(error, results) {
    if (error){
        console.log(error)
    }
    else{
        console.log(results)
        document.getElementById("resultEmotion").innerHTML = results[0].label;
        document.getElementById("resultEmotion2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();
        if (results[0].label == "neutral"){
        document.getElementById("updateEmoji").innerHTML = "&#128548";}
        if (results[0].label == "happy"){
            document.getElementById("updateEmoji").innerHTML = "&#128548";}
            if (results[0].label == "sad"){
                document.getElementById("updateEmoji").innerHTML = "&#128548";}
    }
    if (results[1].label == "neutral"){
        document.getElementById("updateEmoji").innerHTML = "&#128548";}
        if (results[1].label == "happy"){
            document.getElementById("updateEmoji").innerHTML = "&#128548";}
            if (results[1].label == "sad"){
                document.getElementById("updateEmoji").innerHTML = "&#128548";}
            
}