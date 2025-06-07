let select = document.querySelector("select");
let search = document.querySelector("#search input");
let likecount = document.querySelector(".like-count");
let savecount = document.querySelector(".save-count");
let modalWrapper = document.querySelector(".model-wrapper");
let modalInner = document.querySelector(".model-inner");

function createOptionToSelect(arr, list) {
    list.innerHTML = "";
    arr.forEach((item) => {
        let option = document.createElement("option");
        option.value = item.capital.toLowerCase();
        option.textContent = item.capital;
        list.appendChild(option);
    });
}
createOptionToSelect(countries, select);

const body = document.querySelector("body");
const countryList = document.querySelector(".country-list");

function switchmode() {
    body.classList.toggle("dark-mode");
    const mode = body.classList.contains("dark-mode") ? "dark" : "light";
    localStorage.setItem("mode", mode);
    const header = document.querySelector("header");
    header.classList.toggle("dark-mode");
    const input = document.querySelector("#search");
    input.classList.toggle("dark-mode");
    const select = document.querySelector("select");
    select.classList.toggle("dark-mode");
    const ulcard = document.querySelector("ul div");
    // if (ulcard) ulcard.classList.toggle("dark-mode"); // ❗️ tekshirish qo‘shildi
    // const ultext = document.querySelectorAll("ul div p");
    // ultext.forEach((p) => p.classList.toggle("dark-mode"));
    // const ulStrong = document.querySelector("ul strong");
    if (ulStrong) ulStrong.classList.toggle("dark-mode"); // ❗️ tekshirish qo‘shildi
}

function renderCountry(arr, list) {
    list.innerHTML = "";
    arr.forEach((country) => {
        let li = document.createElement("li");
        li.className =
            "w-[264px] h-[380px] bg-white shadow-md rounded-md overflow-hidden";
        list.appendChild(li);
        li.innerHTML = `
                        <img
                            class="w-[264px] h-[160px]"
                            src="${country.flag}"
                            alt=""
                        />
                        <div class="p-[24px] h-[100px]">
                            <strong class="text-[#111517]">${
                                country.name
                            }</strong>
                            <p class="text-[#111517] text-[14px] mt-[16px]">
                                Population: <span>${country.population}</span>
                            </p>
                            <p class="text-[#111517] text-[14px] mt-[16px]">
                                Region: <span>${country.region}</span>
                            </p>
                            <p class="text-[#111517] text-[14px] mt-[16px]">
                                Capital: <span>${country.capital}</span>
                            </p>
                        </div>
                        <div class="flex gap-4 mt-4 p-6">
                            <button onclick="handlike(${country.id})" class="${
            country.isliked ? "bg-red-500 text-white" : ""
        } like-btn text-gray-800 border px-4 py-2 rounded transition">Like</button>
                            <button onclick="handsave(${country.id})" class="${
            country.issaved ? "bg-blue-500 text-white" : ""
        } save-btn text-gray-800 border px-4 py-2 rounded transition">Save</button>
                            <button onclick="handleMoreBtn(${
                                country.id
                            })" class="more-btn text-gray-800 border px-4 py-2 rounded transition">More</button>
                        </div>
        `;
    });
}

renderCountry(countries, countryList);
select.addEventListener("change", (e) => {
    const selectedCapital = e.target.value.toLowerCase();
    const filteredCountries = countries.filter(
        (country) => country.capital.toLowerCase() === selectedCapital
    );
    renderCountry(filteredCountries, countryList);
    if (filteredCountries.length === 0) {
        countryList.innerHTML = "<p>No country found</p>";
    }
});

search.addEventListener("input", (e) => {
    let result = countries.filter(
        (item) =>
            item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
            item.population.toString().includes(e.target.value)
    );
    renderCountry(result, countryList);
});

////////////
function handlike(id) {
    let findObj = countries.find((item) => item.id === id);
    findObj.isliked = !findObj.isliked;
    console.log(countries);
    renderCountry(countries, countryList);
    likecount.textContent = countries.filter((item) => item.isliked).length;
}
function handsave(id) {
    let findObj = countries.find((item) => item.id === id);
    findObj.issaved = !findObj.issaved;
    console.log(countries);
    renderCountry(countries, countryList);
    savecount.textContent = countries.filter((item) => item.issaved).length;
}

function likebtnclick() {
    let res = countries.filter((item) => item.isliked);
    renderCountry(res, countryList);
    likecount.textContent = res.length;
}
function savebtnclick() {
    let res = countries.filter((item) => item.issaved);
    renderCountry(res, countryList);
    savecount.textContent = res.length;
}
//////////////

function handleMoreBtn(id) {
    let findObj = countries.find((item) => item.id === id);
    modalWrapper.classList.remove("scale-0");
    modalInner.innerHTML = `
        <div class="flex flex-col items-center">
            <img src="${findObj.flag}" alt="${findObj.name}" class="w-[264px] h-[160px] mb-4">
            <h2 class="text-xl font-bold mb-2">${findObj.name}</h2>
            <p class="text-gray-700">Population: ${findObj.population}</p>
            <p class="text-gray-700">Region: ${findObj.region}</p>
            <p class="text-gray-700">Capital: ${findObj.capital}</p>
        </div>
    `;
}

modalWrapper.addEventListener(
    "click",
    (e) => e.target === modalWrapper && modalWrapper.classList.add("scale-0")
);
