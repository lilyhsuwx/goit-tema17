const URL = "https://pixabay.com/api/"

const API_KEY = "56145635-1dfedf23379adae5fa585b845";

let currentPage = 1;

const limit = 9;

let search = "";

const listEl = document.querySelector(".list");
const loadBtn = document.querySelector(".btn");
const searchInput = document.querySelector(".input");

// fetch(`${URL}?key=${API_KEY}&q=${search}&page=${currentPage}&per_page=${limit}`)
// .then(res => res.json())
// .then(res => console.log(res))

function getImagesApi() {
    return fetch(`${URL}?key=${API_KEY}&q=${search}&page=${currentPage}&per_page=${limit}&orientation=horizontal`)
.then(res => res.json())
}


function render() {
    getImagesApi().then((res) => {
        // console.log(res.totalHits);
        // console.log(currentPage * limit);
        if(currentPage * limit >= res.totalHits) {
            // loadBtn.style.display = "none"
            loadBtn.disabled = true;
            loadBtn.classList.add("disabled-btn")
            loadBtn.textContent = "Більше немає"
        }

        createImagesMarkup(res.hits)
    });
}


function createImagesMarkup(array) {
    const images = array.map(({largeImageURL, tags}) => {
        return `<li class="item">
                    <img src="${largeImageURL}" alt="${tags}" class="images">
                </li>`
    }).join("");
    listEl.insertAdjacentHTML("beforeend", images)
}

loadBtn.addEventListener("click", () => {
    currentPage += 1
    
    render()
});


searchInput.addEventListener("input", _.debounce((evt) => {
    search = evt.target.value.trim();

    currentPage = 1;
    listEl.innerHTML = "";

    if (search) {
        loadBtn.style.display = "block";
        loadBtn.disabled = false;
        loadBtn.textContent = "Завантажити ще";
        loadBtn.classList.remove("disabled-btn")

        render();
    }

    else {
         loadBtn.style.display = "none";
    }
    
}, 350));

 loadBtn.style.display = "none";