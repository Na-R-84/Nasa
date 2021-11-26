//API key: https://api.nasa.gov/planetary/apod?api_key=sZZudIO4Fv65nenTQsawNYCtlWO4CSQONunX69kg


//--------------skapa ref till HTML
let switchBtn= document.querySelector("#switchBtn");
let bodyRef= document.querySelector("body");
let spaceNameInput=document.querySelector("#spaceName");
let submitBtn= document.querySelector("#sendBtn");
let welcomeTxt= document.querySelector(".welcome-txt");
let apiMarsPhotosRef= "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=sZZudIO4Fv65nenTQsawNYCtlWO4CSQONunX69kg ";
let containerCardRef= document.querySelector(".mars-card-container");


//----------- after 3 tecken ska btn vara aktiv/ det behovs att lyssna efter när användare skriver i input
spaceNameInput.addEventListener("keyup",function(){
    let getChar = spaceNameInput.value.length;//hämtar antalet i input (hur många tecken finns i input)
    
    if (getChar >= 3) {
        sendBtn.disabled= false;// ta bort disabled när man skriver 3 tecken i input
    }else{
        sendBtn.disabled= true; //bli disabled igen när det blir mindre än 3 tecken i input
    }


 });
 


//-----------------------input ska rensas när man klikar på submit btn
sendBtn.addEventListener("click",function (event) {
        console.log("btn klickades");
        event.preventDefault(); //hindrar default beteende på submit btn
       
       //inputfält värde där användaren kan skriva in sitt namn och få det visat på sidan.
        let nameInputValue= spaceNameInput.value;
        welcomeTxt.innerHTML="Welcome "+ nameInputValue +"!";
        nameInputValue = "";

    if (!nameInputValue) {
        sendBtn.disabled= true;
      
    }

});



//------------------ focus ska lyssnas efter användare klikar i input
//------------------när 3 tecken skrivas då ska btn vara aktiv

spaceNameInput.addEventListener("focus",function(){
    spaceNameInput.classList.toggle("focusBorder");
});

//------------------blur (motsatts till focus) ska lyssnas när användare klikar utanför
spaceNameInput.addEventListener("blur",function(){
    spaceNameInput.classList.toggle("focusBorder")
});

//------------------------hämta API

fetch(apiMarsPhotosRef)
.then(response=>response.json())
.then(data => {

    if (data.photos.length === 0){
        //---kontrolera om det finns något i photos array ___ om det är tomt
        containerCardRef.innerHTML="<div class='error'>Ledsen!!Det Finns Inga Bilder Att Hämta </div>";
        
    }else{
        //----------om det inte tomt kör detta
        for (let i = 0; i < data.photos.length; i++) {
            //----skriver till console varje title som finns i objekt
            containerCardRef.innerHTML += " <figure class='mars-card'><figcaption>"+data.photos[i].rover.name+"</figcaption><img class='mars-pic' src='"+data.photos[i].img_src+"'><span class='mars-date'>"+ data.photos[i].earth_date+"</span></figure>"

            // <figure class="mars-card">
            //         <figcaption>Opportunity</figcaption>
            //         <img class="mars-pic" src="" alt="image">
            //         <span class="mars-date" id="time"></span>
            // </figure>
        }


    }
})

//---------------- dark Mode 
switchBtn.addEventListener("click",function () {
        bodyRef.classList.toggle("dark");
    });
