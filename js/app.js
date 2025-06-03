let select = document.querySelector("select");

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
    if (ulcard) ulcard.classList.toggle("dark-mode"); // ❗️ tekshirish qo‘shildi
    const ultext = document.querySelectorAll("ul div p");
    ultext.forEach((p) => p.classList.toggle("dark-mode"));
    const ulStrong = document.querySelector("ul strong");
    if (ulStrong) ulStrong.classList.toggle("dark-mode"); // ❗️ tekshirish qo‘shildi
}

function renderCountry(arr, list) {
    list.innerHTML = "";
    arr.forEach((country) => {
        let li = document.createElement("li");
        li.className =
            "w-[264px] h-[320px] bg-white shadow-md rounded-md overflow-hidden";
        list.appendChild(li);
        li.innerHTML = `
                        <img
                            class="w-[264px] h-[160px]"
                            src="${country.flag}"
                            alt=""
                        />
                        <div class="p-[24px]">
                            <strong class="text-[#111517]">${country.name}</strong>
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
