let loadbtn = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => showbtn(json.data));
};

let loaddata = (id) => {
  let url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((json) => showdata(json.data));
};

let showdata = (data) => {
  let wordcontainer = document.getElementById("word");

  wordcontainer.innerHTML = " ";

  if(data.length == 0){
    wordcontainer.innerHTML =`
        <div
        class="font-bangla text-center col-span-full rounded-xl py-10 space-y-6"
      >
      <img class="mx-auto" src="../assets/alert-error.png">
        <p class="text-xl font-medium text-gray-400">
          এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>

        <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
      </div>
    `
  }
  data.forEach((item) => {
    let div = document.createElement("div");
    div.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-16 px-5 space-y-4">

            <h2 class="font-bold text-2xl">${item.word? item.word:"শব্দ পাওয়া জয়নি"}</h2>

            <p class="text-black font-semibold">Meaning / Pronounciation</p> 

            <div class="text-2xl font-medium font-bangla">
            ${item.meaning?item.meaning:"অর্থো পাওয়া জায়নি"}/${item.pronunciation?item.pronunciation:"pronunciation পাওয়া জায়নি"} 
            </div>

            <div class="flex justify-between items-center">

                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
                    <i class="fa-solid fa-circle-info"></i>
                </button>

                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
                    <i class="fa-solid fa-volume-high"></i>
                </button>

            </div>

        </div>
        `;
        wordcontainer.append(div)
  });
};

let showbtn = (data) => {
  let section = document.getElementById("vocabolary-section");
  section.innerHTML = " ";

  data.forEach((btn) => {
    let div = document.createElement("div");
    div.innerHTML = `
        <button onclick = "loaddata(${btn.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson -${btn.level_no}</button>
        `;
    section.appendChild(div);
  });
};
loadbtn();
