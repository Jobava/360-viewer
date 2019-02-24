var pictureURLs = []

function slideshow(localstate={slideindex: 0, elem: null, urls: []} ) {
	if (localstate.urls.length === 0) {
		localstate.urls = pictureURLs;
	}
	if (localstate.elem === null) {
		localstate.elem = document.getElementById("sky");
        localstate.elem.setAttribute("src", pictureURLs[0]);
        //localstate.elem = pictureURLs[0];
	}
	return {slideindex: localstate.slideindex, elem: localstate.elem, urls: localstate.urls};
}

function advanceSlide(localstate) {
	if (localstate.slideindex === (localstate.urls.length - 1)) {
		return slideshow({slideindex: 0, elem: localstate.elem, urls: localstate.urls});	
	} else {
		return slideshow({slideindex: localstate.slideindex + 1, elem: localstate.elem, urls: localstate.urls});
	}
}

function rewindSlide(localstate) {
	if (localstate.slideindex === 0) {
		return slideshow({slideindex: (localstate.urls.length - 1), elem: localstate.elem, urls: localstate.urls});	
	} else {
		return slideshow({slideindex: localstate.slideindex - 1, elem: localstate.elem, urls: localstate.urls});
	}
}

function getURL(localstate) {
	return localstate.urls[state.slideindex];
}

function renderCurrent(localstate) {
	localstate.elem.setAttribute("src", getURL(state));
}

var state;

document.getElementById('files').onchange = function() {
    const fileInput = document.getElementById("files");

    // files is a FileList object (similar to NodeList)
    const files = fileInput.files;
    let file;

    // loop through files
    for (let i = 0; i < files.length; i++) {
        file = files[i];
        pictureURLs.push('pictures/' + file.name);
        //alert(pictureURLs[i]);
    }

    state = slideshow();

    document.onclick = function(e) {
	    state = advanceSlide(state);
	    renderCurrent(state);
    }
};
