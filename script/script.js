let createlement = (arr)=>{
  let htmlelemetn  = arr.map(elm => `<span class = "btn">${elm}</span>`)

  return htmlelemetn.join(" ")
}

let spinars = (status)=>{
  if(status == true){
    document.getElementById("spinar").classList.remove("hidden")
    document.getElementById("word").classList.add("hidden")

  }else{
    document.getElementById("spinar").classList.add("hidden")
    document.getElementById("word").classList.remove("hidden")
  }
}
let loadbtn = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => showbtn(json.data));
};

let deactive = () => {
  let allbtn = document.querySelectorAll(".lesson-btn");
  allbtn.forEach((btn) => btn.classList.remove("active"));
};

let loaddata = (id) => {
  spinars(true)
  let url = `https://openapi.programming-hero.com/api/level/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      deactive();
      let activebtn = document.getElementById(`lesson-btn${id}`);
      activebtn.classList.add("active");
      showdata(json.data);
    });
};

let showdata = (data) => {
  let wordcontainer = document.getElementById("word");

  wordcontainer.innerHTML = " ";

  if (data.length == 0) {
    wordcontainer.innerHTML = `
        <div
        class="font-bangla text-center col-span-full rounded-xl py-10 space-y-6"
      >
      <img class="mx-auto" src="../assets/alert-error.png">
        <p class="text-xl font-medium text-gray-400">
          এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>

        <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
      </div>
    `;
    spinars(false)
    return
    
  }
  data.forEach((item) => {
    let div = document.createElement("div");
    div.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-16 px-5 space-y-4">

            <h2 class="font-bold text-2xl">${item.word ? item.word : "শব্দ পাওয়া জয়নি"}</h2>

            <p class="text-black font-semibold">Meaning / Pronounciation</p> 

            <div class="text-2xl font-medium font-bangla">
            ${item.meaning ? item.meaning : "অর্থো পাওয়া জায়নি"}/${item.pronunciation ? item.pronunciation : "pronunciation পাওয়া জায়নি"} 
            </div>

            <div class="flex justify-between items-center">

                <button onclick="loadetails(${item.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
                    <i class="fa-solid fa-circle-info"></i>
                </button>

                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
                    <i class="fa-solid fa-volume-high"></i>
                </button>

            </div>

        </div>
        `;
    wordcontainer.append(div);

  });
  spinars(false)
};

let showbtn = (data) => {
  let section = document.getElementById("vocabolary-section");
  section.innerHTML = " ";

  data.forEach((btn) => {
    let div = document.createElement("div");
    div.innerHTML = `
        <button id="lesson-btn${btn.level_no}" onclick = "loaddata(${btn.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson -${btn.level_no}</button>
        `;
    section.appendChild(div);
  });
};

let loadetails = async (id) => {
  let url = `https://openapi.programming-hero.com/api/word/${id}`;
  let res = await fetch(url);
  let details = await res.json();
  showmodalinfo(details.data);
};

let showmodalinfo = (word) => {

 let showModals= document.getElementById("shwodata")
 showModals.innerHTML = `
          <div>
        <h2 class="text-2xl font-bold">
          ${word.word} 
          (<i class="fa-solid fa-microphone-lines"></i> : ${word.pronunciation})
        </h2>
      </div>

      <div>
        <h2 class="font-bold">Meaning</h2>
        <p>${word.meaning}</p>
      </div>

      <div>
        <h2 class="font-bold">Example</h2>
        <p>${word.sentence}</p>
      </div>

      <div>
        <h2 class="font-bold">Synonym</h2>
        <div> ${createlement(word.synonyms)}</div>
      </div>
        
        `;

  document.getElementById("my_modal_5").showModal();
};
loadbtn();
