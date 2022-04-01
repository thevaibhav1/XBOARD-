let getApiUrl = "https://api.rss2json.com/v1/api.json?rss_url=";
var count = 1;


 
async function init(){
    for(var magazine of magazines){
        let data = await getApiFromUrl(magazine);
        addCarouselToDOM(data,`carousel-card-${count}`,`carousel-IDcard-${count}`);
        count++;
    }
}


async function getApiFromUrl(feed){
    try{
        let data = await fetch(getApiUrl+feed);
        let resp = await data.json();
        return resp;
    }catch(err){
        return err;
    }
}



function addCarouselToDOM(data,idToAttach,ID){

    let parentElement = document.getElementById(idToAttach);
    let ParentDivForCarousel = document.createElement("div");
    ParentDivForCarousel.setAttribute("id",`${ID}`);
    ParentDivForCarousel.setAttribute("class","carousel slide");
    ParentDivForCarousel.setAttribute("data-ride","carousel");
    ParentDivForCarousel.innerHTML = `<a class="carousel-control-prev" href="#${ID}" role="button" data-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="carousel-control-next" href="#${ID}" role="button" data-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span></a>`


    let CarouselInnerWrapper = document.createElement("div");
    CarouselInnerWrapper.setAttribute("class","carousel-inner");


    data.items.forEach((element,index) =>{
        
        let carouselElement = document.createElement("div");
        if(index === 0)
            carouselElement.setAttribute("class","carousel-item active");
        else
            carouselElement.setAttribute("class","carousel-item");
        
        let parentCardElement = document.createElement("div");
        parentCardElement.setAttribute("class","card");

        let imgEleForCard = document.createElement("img");
        imgEleForCard.style.height = "500px"
        imgEleForCard.setAttribute("class","card-img-top");
        imgEleForCard.setAttribute("src",`${element.enclosure.link}`);

        let divCardBody = document.createElement("div");
        divCardBody.setAttribute("class","card-body");


        let newHeaderTextElement = document.createElement("h3");
        newHeaderTextElement.setAttribute("class","card-text");
        newHeaderTextElement.innerText = `${element.title}  `;
        newHeaderTextElement.style.color = "black";

        let authorPubDateElement = document.createElement("div");
        authorPubDateElement.style.fontWeight = "lighter";
        authorPubDateElement.style.fontSize = "16px";
        authorPubDateElement.style.color = "black";
        authorPubDateElement.innerHTML = "by "+element.author + " • " + new Date(element.pubDate).toLocaleDateString();
        
        
        newHeaderTextElement.appendChild(authorPubDateElement);

        let newPTag = document.createElement("p");
        newPTag.style.color = "black";
        newPTag.innerText = `${element.description}`;

        divCardBody.appendChild(newHeaderTextElement);
        divCardBody.appendChild(newPTag)


        parentCardElement.appendChild(imgEleForCard);
        parentCardElement.appendChild(divCardBody);

        let newLinkForDetails = document.createElement("a");
        newLinkForDetails.setAttribute("href",`${element.link}`);
        newLinkForDetails.appendChild(parentCardElement);
        

        carouselElement.appendChild(newLinkForDetails);
        CarouselInnerWrapper.appendChild(carouselElement);


    });

    ParentDivForCarousel.appendChild(CarouselInnerWrapper);
    parentElement.appendChild(ParentDivForCarousel);
   
}

