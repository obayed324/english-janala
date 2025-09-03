const loadLessons = () =>{

    const url = "https://openapi.programming-hero.com/api/levels/all"
    fetch(url)
    .then(res => res.json())
    .then(json => displayLessons(json.data))
}

const displayLessons = (lessons) => {
    // 1.get the container & empty
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";

    // 2.get into every lessons
    for(let lesson of lessons){
        // 3.create Element
        console.log(lesson);
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <button type="button" class="btn btn-outline btn-primary">
        <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
        </button>
        `;

        // 4.append into container

        levelContainer.append(btnDiv)

        //console.log(lesson);
    }

    // console.log(lessons);
   

}
loadLessons();