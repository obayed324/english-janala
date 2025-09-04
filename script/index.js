function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-EN"; // English
    window.speechSynthesis.speak(utterance);
  }

const manageSpinner = (status) => {
    if(status == true){
        document.getElementById("spinner").classList.remove("hidden");

        document.getElementById("word-container").classList.add("hidden");
    }
    else{
        document.getElementById("word-container").classList.remove("hidden");

        document.getElementById("spinner").classList.add("hidden");
    }
}


const loadLessons = () =>{

    const url = "https://openapi.programming-hero.com/api/levels/all"
    fetch(url)
    .then(res => res.json())
    .then(json => displayLessons(json.data))
}

const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn")
    lessonButtons.forEach(btn => btn.classList.remove("active"));
}

const loadLevelWord =(id) => {
    manageSpinner(true);

    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(res => res.json())
    .then(json => {
        removeActive();//remove all active class
        const clickBtn = document.getElementById(`lesson-btn-${id}`);
        clickBtn.classList.add("active");
        displayLevelWord((json.data))
       
    });
} 

const loadWordDetail = async(id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);   
}


const displayWordDetails = (word) =>{
    const wordDetailsContainer = document.getElementById("word-details-container")
    console.log(word);
    wordDetailsContainer.innerHTML = `<div class="div">
        <h2 class=" text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
        </div>

        <div class="div">
            <h2 class="font-bold">Meaning</h2>
            <p>${word.meaning}</p>
        </div>
        <div class="div">
            <h2 class="font-bold">Example</h2>
            <p>${word.sentence}</p>
        </div>

        <div class="div">
            <h2 class="font-bold">Synonym</h2>
            <span class="btn">${word.synonyms[0]}</span>
            <span class="btn">${word.synonyms[1]}</span>
            <span class="btn">${word.synonyms[2]}</span>
        </div>`
    document.getElementById("word_modal").showModal();
}

const displayLevelWord = (words) => {
    const  wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    if(words.length == 0){
        wordContainer.innerHTML = `<div class=" text-center col-span-full rounded-xl py-10 space-y-5 font-bangla">
        <img src="./assets/alert-error.png" alt="" class=" mx-auto">
        <p class=" text-xl font-medium text-gray-400  ">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <h2 class=" font-bold text-4xl">নেক্সট Lesson এ যান।</h2>
        </div>`;
        manageSpinner(false);
        return;
    }

    words.forEach(word => {
        //console.log(word);

        const card = document.createElement("div");
        card.innerHTML = ` <div class=" bg-white rounded-xl shadow-sm text-center py-15 px-5 space-y-4">
        <h2 class=" font-bold text-xl">${word.word ? word.word:" This word is not found"}</h2>
        <p class=" font-semibold">Meaning /Pronunciation</p>

        <div class=" text-2xl font-medium font-bangla">"${word.meaning ? word.meaning :"No Meaning"}" / ${word.pronunciation ? word.pronunciation:"No.pronunciation found"}</div>
        <div class=" flex justify-between items-center">
            <button onclick = "loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>

            <button onclick = "pronounceWord('${word.word}')" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            
        </div>

    </div>`

        wordContainer.append(card);
    });
    manageSpinner(false);
}

const displayLessons = (lessons) => {
    // 1.get the container & empty
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";

    // 2.get into every lessons
    for(let lesson of lessons){
        // 3.create Element
        // console.log(lesson);
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <button id ="lesson-btn-${lesson.level_no}" onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
        <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
        </button>
        `;

        // 4.append into container

        levelContainer.append(btnDiv)

        //console.log(lesson);
    }

    
   

}
loadLessons();

document.getElementById("btn-search").addEventListener("click", () => {
    const input = document.getElementById("input-search");
    const searchValue = input.value.trim().toLowerCase();
    //console.log(searchValue);

    fetch("https://openapi.programming-hero.com/api/words/all")
    .then(res => res.json())
    .then(data => {
        const allWords = data.data
        console.log(allWords);
        const filterWords = allWords.filter(word => word.word.toLowerCase().includes(searchValue))
        displayLevelWord(filterWords);
    });
})