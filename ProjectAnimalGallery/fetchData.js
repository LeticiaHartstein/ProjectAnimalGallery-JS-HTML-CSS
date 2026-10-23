
function requestImageToAPI(requestURL, jsonKey, imageContent, imageQuantiity) {

    if (!document.getElementById(imageContent)){
    let gallerySection = document.createElement("div");
    gallerySection.id = imageContent + "Section";
    document.body.appendChild(gallerySection);

    let galleryImageList = document.createElement("div");
    galleryImageList.id = imageContent;
    galleryImageList.className = "gallery";
    gallerySection.appendChild(galleryImageList);

    let galleryNameTitle = document.createElement("h1");
    galleryNameTitle.innerText = imageContent.toUpperCase();
    document.getElementById(imageContent).appendChild(galleryNameTitle); 

    let textLine = document.createElement("hr");
    document.getElementById(imageContent).appendChild(textLine)
    }
    for (let i = 0; i < imageQuantiity; i++) {
        setTimeout(() => {
            let request = new XMLHttpRequest();
            request.open("GET", requestURL);
            request.responseType = "json";
            request.send();

            request.onload = function () {
                if (request.status == 200) {
                   
                    let imageURL = request.response[jsonKey];
                    let newImage = document.createElement("img");
                    newImage.src = imageURL;
                    newImage.id = imageContent + "Image" + i;
                    newImage.className = "image";
                    newImage.alt = imageContent + "Image" + i + imageURL;
                    document.getElementById(imageContent).appendChild(newImage);

                    newImage.onerror = function () {
                        this.remove();
                        requestImageToAPI(requestURL, jsonKey, imageContent, 1);
                    };
                }
                else {
                    let error = document.createElement("H1");
                    error.textContent = "Error!";
                }
            }
            }, i * 300);
    }
}



