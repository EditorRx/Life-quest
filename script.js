/*====================================================
            LIFEQUEST v1.0
            JAVASCRIPT ENGINE

            Part 1A
            Core Engine + Storage
====================================================*/


"use strict";


//====================================================
//                  GLOBAL DATABASE
//====================================================

const LifeQuest = {

    player: {

        name: "Maverix",

        rank: "Dream Chaser",

        level: 1,

        xp: 0

    },


    quests: [],


    companions: [

        {

            id: Date.now(),

            name: "Parents",

            role: "Guardian",

            notes:
            "The first companions of my journey.",

            image: "",

        },

        {

            id: Date.now()+1,

            name: "ChatGPT",

            role: "Strategist",

            notes:
            "A digital companion helping me plan and create.",

            image: "",

        }

    ],


    achievements: [],


    memories: [],


    settings: {

        firstLaunch:true

    }


};



//====================================================
//              LOCAL STORAGE SYSTEM
//====================================================


const STORAGE_KEY = "MAVERIX_LIFEQUEST_DATA";



// Save everything

function saveGame(){

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(LifeQuest)

    );

}



// Load saved data

function loadGame(){

    const savedData =

        localStorage.getItem(STORAGE_KEY);



    if(savedData){

        const parsed =

            JSON.parse(savedData);



        Object.assign(

            LifeQuest,

            parsed

        );

    }

}



// Reset everything

function resetGame(){

    localStorage.removeItem(

        STORAGE_KEY

    );


    location.reload();

}



//====================================================
//              APP STARTUP
//====================================================


function initializeLifeQuest(){


    loadGame();


    console.log(

        "⚡ LifeQuest System Online"

    );


    console.log(

        "Player:",

        LifeQuest.player.name

    );


    saveGame();


}



// Start Engine

document.addEventListener(

    "DOMContentLoaded",

    initializeLifeQuest

);
/*====================================================
            LIFEQUEST v1.0

            Part 1B
            Navigation Engine
====================================================*/


//====================================================
//              PAGE NAVIGATION
//====================================================


const navButtons = document.querySelectorAll(
    ".nav-btn"
);


const pages = document.querySelectorAll(
    ".page"
);



function openPage(pageID){


    // Hide all pages

    pages.forEach(page => {

        page.classList.remove(
            "active-page"
        );

    });



    // Show selected page

    const targetPage = document.getElementById(
        pageID
    );


    if(targetPage){

        targetPage.classList.add(
            "active-page"
        );

    }



    // Update sidebar active state

    navButtons.forEach(btn => {

        btn.classList.remove(
            "active"
        );


    });



    const activeButton = document.querySelector(

        `[data-page="${pageID}"]`

    );


    if(activeButton){

        activeButton.classList.add(
            "active"
        );

    }



    // Update top title if available

    updatePageTitle(pageID);

}



//====================================================
//              BUTTON LISTENER
//====================================================


function setupNavigation(){


    navButtons.forEach(button => {


        button.addEventListener(

            "click",

            () => {


                const page =

                    button.dataset.page;



                openPage(page);


            }

        );


    });


}



//====================================================
//              PAGE TITLES
//====================================================


const pageTitles = {


    dashboard:

        [

            "Command Center",

            "Your life mission dashboard"

        ],


    quests:

        [

            "Quest Board",

            "Your goals and adventures"

        ],


    favorites:

        [

            "Hall of Legends",

            "Your most important quests"

        ],


    allies:

        [

            "Hall of Allies",

            "Your journey companions"

        ],


    achievements:

        [

            "Achievement Hall",

            "Your unlocked victories"

        ],


    memory:

        [

            "Memory Vault",

            "Your completed chapters"

        ],


    settings:

        [

            "Mission Control",

            "Customize your experience"

        ]

};




function updatePageTitle(pageID){


    const title = document.querySelector(

        ".topbar-left h1"

    );


    const subtitle = document.querySelector(

        ".topbar-left p"

    );



    if(

        title &&

        pageTitles[pageID]

    ){


        title.textContent =

            pageTitles[pageID][0];



        subtitle.textContent =

            pageTitles[pageID][1];


    }

}



//====================================================
//              START NAVIGATION
//====================================================


document.addEventListener(

    "DOMContentLoaded",

    () => {


        setupNavigation();


        openPage(

            "dashboard"

        );


    }

);

/*====================================================
            LIFEQUEST v1.0

            Part 1C
            Player Dashboard Engine
====================================================*/


//====================================================
//              PLAYER UI UPDATE
//====================================================


function updatePlayerUI(){


    const player = LifeQuest.player;



    // Player name locations

    const playerNames = document.querySelectorAll(

        "#playerName, .player-name"

    );



    playerNames.forEach(element => {

        element.textContent =

            player.name;

    });



    // Rank

    const ranks = document.querySelectorAll(

        ".player-rank"

    );


    ranks.forEach(element => {

        element.textContent =

            player.rank;

    });



    // Level

    const levels = document.querySelectorAll(

        ".player-level strong, #playerLevel"

    );


    levels.forEach(element => {

        element.textContent =

            player.level;

    });



    // XP

    const xpElements = document.querySelectorAll(

        "#playerXP, .player-xp"

    );


    xpElements.forEach(element => {

        element.textContent =

            player.xp + " XP";

    });


}



//====================================================
//              LEVEL SYSTEM
//====================================================


function calculateLevel(){


    const xp = LifeQuest.player.xp;



    let level = 1;



    if(xp >= 100)

        level = 2;


    if(xp >= 300)

        level = 3;


    if(xp >= 600)

        level = 4;


    if(xp >= 1000)

        level = 5;



    LifeQuest.player.level = level;



}




//====================================================
//              XP ADD FUNCTION
//====================================================


function addXP(amount){


    LifeQuest.player.xp += amount;



    calculateLevel();



    saveGame();



    updatePlayerUI();



}



//====================================================
//              DASHBOARD REFRESH
//====================================================


function refreshDashboard(){


    calculateLevel();


    updatePlayerUI();


    saveGame();


}



//====================================================
//              START DASHBOARD ENGINE
//====================================================


document.addEventListener(

    "DOMContentLoaded",

    () => {


        refreshDashboard();


    }

);
/*====================================================
            LIFEQUEST v1.0

            Part 2A
            Quest Engine Foundation
====================================================*/


//====================================================
//              QUEST DATABASE
//====================================================


function createQuest(data){


    const quest = {


        id: Date.now(),


        title:

            data.title || "Untitled Quest",



        description:

            data.description || "",



        category:

            data.category || "Adventure",



        priority:

            data.priority || "common",



        image:

            data.image || "",



        progress:

            0,



        favorite:

            false,



        notes:

            data.notes || "",



        companions:

            data.companions || [],



        completed:

            false,



        createdAt:

            new Date().toLocaleDateString()



    };



    LifeQuest.quests.push(

        quest

    );



    saveGame();



    renderQuests();



    return quest;

}
//====================================================
//              QUEST CONTAINER
//====================================================


function getQuestContainer(){


    return document.querySelector(

        "#questContainer"

    );


}



//====================================================
//              RENDER QUESTS
//====================================================


function renderQuests(){


    const container = getQuestContainer();



    if(!container)

        return;



    container.innerHTML = "";



    if(LifeQuest.quests.length === 0){


        container.innerHTML = `

        <div class="empty-state glass">

            <i class="fa-solid fa-map"></i>

            <h2>No quests yet</h2>

            <p>

            Your adventure begins by creating your first goal.

            </p>

        </div>

        `;


        return;


    }



    LifeQuest.quests.forEach(

        quest => {



        const card = document.createElement(

            "div"

        );



        card.className =

            `quest-card glass ${quest.priority}`;



        card.innerHTML = `


        <div class="quest-image">


            ${

            quest.image ?

            `<img class="quest-img"

            src="${quest.image}">`

            :

            ""

            }



            <button class="favorite-btn

            ${quest.favorite ? "active":""}"

            onclick="toggleFavorite(${quest.id})">


            <i class="fa-solid fa-heart"></i>


            </button>


        </div>



        <div class="quest-body">


            <h2 class="quest-title">

                ${quest.title}

            </h2>



            <p class="quest-description">

                ${quest.description}

            </p>



            <div class="quest-progress">


                <div class="progress-info">

                    <span>Progress</span>

                    <span>

                    ${quest.progress}%

                    </span>

                </div>



                <div class="progress-bar">


                    <div class="progress-fill"

                    style="width:${quest.progress}%">

                    </div>


                </div>


            </div>



        </div>


        `;



        container.appendChild(card);



        }


    );


}



//====================================================
//              INITIAL QUEST LOAD
//====================================================


document.addEventListener(

    "DOMContentLoaded",

    () => {


        renderQuests();


    }

);/*====================================================
            LIFEQUEST v1.0

            Part 2B
            Quest Creation Controls
====================================================*/


//====================================================
//              QUEST MODAL
//====================================================


function openQuestModal(){


    const modal = document.querySelector(

        "#questModal"

    );


    if(modal){

        modal.showModal();

    }

}



function closeQuestModal(){


    const modal = document.querySelector(

        "#questModal"

    );


    if(modal){

        modal.close();

    }

}



//====================================================
//              CREATE QUEST FORM
//====================================================


function setupQuestForm(){


    const form = document.querySelector(

        "#questForm"

    );



    if(!form)

        return;



    form.addEventListener(

        "submit",

        function(event){


            event.preventDefault();



            const formData =

                new FormData(form);



            const questData = {



                title:

                formData.get("title"),



                description:

                formData.get("description"),



                category:

                formData.get("category"),



                priority:

                formData.get("priority"),



                image:

                formData.get("image"),



                notes:

                formData.get("notes")



            };



            createQuest(

                questData

            );



            form.reset();



            closeQuestModal();



            showToast(

                "🎯 New Quest Added!"

            );


        }

    );


}



//====================================================
//              FAVORITE SYSTEM
//====================================================


function toggleFavorite(id){


    const quest = LifeQuest.quests.find(

        q => q.id === id

    );



    if(!quest)

        return;



    quest.favorite =

        !quest.favorite;



    saveGame();


    renderQuests();


    showToast(

        quest.favorite ?

        "❤️ Added to Favorites"

        :

        "💔 Removed from Favorites"

    );


}



//====================================================
//              DELETE QUEST
//====================================================


function deleteQuest(id){


    LifeQuest.quests =

        LifeQuest.quests.filter(

            q => q.id !== id

        );



    saveGame();


    renderQuests();



    showToast(

        "🗑 Quest Removed"

    );


}



//====================================================
//              BUTTON CONNECTION
//====================================================

document.addEventListener(

    "DOMContentLoaded",

    () => {



        const addButton = document.querySelector(

            "#addQuestBtn"

        );



        if(addButton){


            addButton.addEventListener(

                "click",

                openQuestModal

            );


        }



        setupQuestForm();


    }

);
/*====================================================
            LIFEQUEST v1.0

            Part 2C
            Quest Completion + Rewards
====================================================*/


//====================================================
//              COMPLETE QUEST
//====================================================


function completeQuest(id){


    const quest = LifeQuest.quests.find(

        q => q.id === id

    );



    if(!quest)

        return;



    if(quest.completed){

        showToast(

            "⭐ Quest already completed"

        );

        return;

    }



    quest.completed = true;


    quest.progress = 100;



    // XP reward based on priority

    let reward = 50;



    if(quest.priority === "rare")

        reward = 100;



    if(quest.priority === "epic")

        reward = 250;



    if(quest.priority === "legendary")

        reward = 500;



    addXP(reward);



    createMemory(quest);



    checkAchievements();



    saveGame();



    renderQuests();



    launchConfetti();



    showToast(

        `🏆 Quest Complete +${reward} XP`

    );


}



//====================================================
//              UPDATE PROGRESS
//====================================================


function updateQuestProgress(

    id,

    value

){


    const quest = LifeQuest.quests.find(

        q => q.id === id

    );



    if(!quest)

        return;



    quest.progress =

        Math.min(

            100,

            Math.max(0,value)

        );



    if(quest.progress === 100){

        completeQuest(id);

        return;

    }



    saveGame();



    renderQuests();


}



//====================================================
//              MEMORY CREATION
//====================================================


function createMemory(quest){



    const memory = {


        id:Date.now(),



        title:

            quest.title,



        description:

            quest.description,



        image:

            quest.image,



        completedDate:

            new Date().toLocaleDateString(),



        xp:

            LifeQuest.player.xp



    };



    LifeQuest.memories.push(

        memory

    );


}



//====================================================
//              QUEST XP PREVIEW
//====================================================


function getQuestReward(priority){


    const rewards = {


        common:50,

        rare:100,

        epic:250,

        legendary:500


    };



    return rewards[priority] || 50;


}



//====================================================
//              COMPLETION CHECK
//====================================================


function getCompletedQuestCount(){


    return LifeQuest.quests.filter(

        quest => quest.completed

    ).length;


}
/*====================================================
            LIFEQUEST v1.0

            Part 3A
            Companion Engine
====================================================*/


//====================================================
//              CREATE COMPANION
//====================================================


function createCompanion(data){


    const companion = {


        id: Date.now(),


        name:

            data.name || "Unknown",



        role:

            data.role || "Supporter",



        notes:

            data.notes || "",



        image:

            data.image || "",



        joined:

            new Date().toLocaleDateString()


    };



    LifeQuest.companions.push(

        companion

    );



    saveGame();



    renderCompanions();



    showToast(

        "🤝 New Companion Joined"

    );



    return companion;


}



//====================================================
//              COMPANION CONTAINER
//====================================================


function getCompanionContainer(){


    return document.querySelector(

        "#companionContainer"

    );


}



//====================================================
//              RENDER COMPANIONS
//====================================================


function renderCompanions(){


    const container =

        getCompanionContainer();



    if(!container)

        return;



    container.innerHTML = "";



    LifeQuest.companions.forEach(

        companion => {



            const card =

            document.createElement(

                "div"

            );



            card.className =

            "ally-card glass";



            card.innerHTML = `



            <div class="ally-top">


                ${

                companion.image ?

                `<img class="ally-image"

                src="${companion.image}">`

                :

                `<div class="ally-image">

                🤝

                </div>`

                }



                <div>


                <h2 class="ally-name">

                ${companion.name}

                </h2>


                <span class="ally-role">

                ${companion.role}

                </span>


                </div>


            </div>




            <div class="ally-body">


            <p class="ally-notes">

            ${companion.notes}

            </p>


            </div>




            <div class="ally-footer">


            <button

            class="danger-btn"

            onclick="removeCompanion(${companion.id})">


            Remove

            </button>


            </div>



            `;



            container.appendChild(card);


        }

    );


}



//====================================================
//              REMOVE COMPANION
//====================================================


function removeCompanion(id){


    LifeQuest.companions =

    LifeQuest.companions.filter(

        companion =>

        companion.id !== id

    );



    saveGame();



    renderCompanions();



    showToast(

        "🤝 Companion Removed"

    );


}



//====================================================
//              COMPANION COUNT
//====================================================


function getCompanionCount(){


    return LifeQuest.companions.length;


}



//====================================================
//              LOAD COMPANIONS
//====================================================


document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        renderCompanions();


    }

);
/*====================================================
            LIFEQUEST v1.0

            Part 3B
            Quest Companion Linking
====================================================*/


//====================================================
//          GET COMPANION BY ID
//====================================================


function getCompanionById(id){


    return LifeQuest.companions.find(

        companion =>

        companion.id === id

    );


}



//====================================================
//          ASSIGN COMPANION TO QUEST
//====================================================


function assignCompanionToQuest(

    questID,

    companionID

){


    const quest = LifeQuest.quests.find(

        q => q.id === questID

    );



    if(!quest)

        return;



    if(!quest.companions)

        quest.companions = [];



    if(

        !quest.companions.includes(

            companionID

        )

    ){


        quest.companions.push(

            companionID

        );


    }



    saveGame();



    renderQuests();



    showToast(

        "🤝 Companion assigned"

    );


}



//====================================================
//          REMOVE COMPANION FROM QUEST
//====================================================


function removeCompanionFromQuest(

    questID,

    companionID

){


    const quest = LifeQuest.quests.find(

        q => q.id === questID

    );



    if(!quest)

        return;



    quest.companions =

        quest.companions.filter(

            id => id !== companionID

        );



    saveGame();



    renderQuests();


}



//====================================================
//          DISPLAY QUEST COMPANIONS
//====================================================


function getQuestCompanionsHTML(

    quest

){


    if(

        !quest.companions ||

        quest.companions.length === 0

    ){

        return "";

    }



    let html = `


    <div class="quest-allies">


    <strong>

    🤝 Companions

    </strong>


    <div class="ally-tags">


    `;



    quest.companions.forEach(

        id => {



            const companion =

                getCompanionById(id);



            if(companion){


                html += `


                <span class="ally-tag">

                ${companion.name}

                </span>


                `;


            }


        }

    );



    html += `

    </div>

    </div>

    `;



    return html;


}



//====================================================
//          QUEST PARTY SIZE
//====================================================

function getQuestPartySize(

    quest

){


    if(!quest.companions)

        return 0;



    return quest.companions.length;


}



//====================================================
//          UPDATE QUEST RENDER
//====================================================


// This function refreshes quest cards

// after companion changes


function refreshQuestParty(){


    renderQuests();


}
/*====================================================
            LIFEQUEST v1.0

            Part 4A
            Achievement Engine
====================================================*/


//====================================================
//              ACHIEVEMENT DATABASE
//====================================================


const achievementList = [


    {

        id:"first_step",

        title:"First Step",

        description:
        "Completed your first quest",

        icon:"🌱",

        condition:

        () => getCompletedQuestCount() >= 1

    },


    {

        id:"quest_master",

        title:"Quest Master",

        description:
        "Completed 10 quests",

        icon:"⚔️",

        condition:

        () => getCompletedQuestCount() >= 10

    },


    {

        id:"xp_hunter",

        title:"XP Hunter",

        description:
        "Earned 1000 XP",

        icon:"⚡",

        condition:

        () => LifeQuest.player.xp >= 1000

    },


    {

        id:"legendary",

        title:"Legendary Maverix",

        description:
        "Completed a legendary quest",

        icon:"👑",

        condition:

        () =>

        LifeQuest.quests.some(

            q =>

            q.completed &&

            q.priority === "legendary"

        )

    }


];



//====================================================
//              CHECK ACHIEVEMENTS
//====================================================


function checkAchievements(){


    achievementList.forEach(

        achievement => {



            const alreadyUnlocked =

            LifeQuest.achievements.some(

                item =>

                item.id === achievement.id

            );



            if(

                achievement.condition()

                &&

                !alreadyUnlocked

            ){


                unlockAchievement(

                    achievement

                );


            }


        }

    );


}



//====================================================
//              UNLOCK ACHIEVEMENT
//====================================================


function unlockAchievement(

    achievement

){


    const badge = {


        id:

        achievement.id,


        title:

        achievement.title,


        description:

        achievement.description,


        icon:

        achievement.icon,


        unlockedDate:

        new Date()

        .toLocaleDateString()


    };



    LifeQuest.achievements.push(

        badge

    );



    saveGame();



    showAchievementPopup(

        badge

    );


}



//====================================================
//              ACHIEVEMENT POPUP
//====================================================


function showAchievementPopup(

    achievement

){


    const popup = document.querySelector(

        "#achievementPopup"

    );



    if(!popup)

        return;



    popup.innerHTML = `


    <i>

    ${achievement.icon}

    </i>


    <div>


    <h3>

    Achievement Unlocked!

    </h3>


    <p>

    ${achievement.title}

    </p>


    </div>


    `;



    popup.classList.add(

        "show"

    );



    setTimeout(

        ()=>{


            popup.classList.remove(

                "show"

            );


        },

        4000

    );


}



//====================================================
//              ACHIEVEMENT COUNT
//====================================================


function getAchievementCount(){


    return LifeQuest.achievements.length;


}
/*====================================================
            LIFEQUEST v1.0

            Part 4B
            Achievement Hall Renderer
====================================================*/


//====================================================
//          ACHIEVEMENT CONTAINER
//====================================================


function getAchievementContainer(){


    return document.querySelector(

        "#achievementContainer"

    );


}



//====================================================
//          RENDER ACHIEVEMENTS
//====================================================


function renderAchievements(){


    const container =

        getAchievementContainer();



    if(!container)

        return;



    container.innerHTML = "";



    achievementList.forEach(

        achievement => {



            const unlocked =

            LifeQuest.achievements.some(

                item =>

                item.id === achievement.id

            );



            const card =

            document.createElement(

                "div"

            );



            card.className =

            `achievement-card glass

            ${

            unlocked ?

            ""

            :

            "locked"

            }`;



            card.innerHTML = `


            <div class="achievement-icon">


                ${

                unlocked ?

                achievement.icon

                :

                "🔒"

                }


            </div>



            <div class="achievement-info">


                <h2 class="achievement-title">


                ${achievement.title}


                </h2>



                <p class="achievement-description">


                ${achievement.description}


                </p>




                <span class="achievement-date">


                ${

                unlocked ?

                "Unlocked"

                :

                "Locked"

                }


                </span>



            </div>


            `;



            container.appendChild(card);



        }

    );


}



//====================================================
//          ACHIEVEMENT REFRESH
//====================================================


function refreshAchievements(){


    checkAchievements();


    renderAchievements();


}



//====================================================
//          AUTO LOAD
//====================================================
document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        renderAchievements();


    }

);
/*====================================================
            LIFEQUEST v1.0

            Part 5A
            Memory Vault Engine
====================================================*/


//====================================================
//              CREATE MEMORY
//====================================================


function addMemory(data){


    const memory = {


        id:

            Date.now(),



        title:

            data.title || "Untitled Memory",



        description:

            data.description || "",



        image:

            data.image || "",



        date:

            new Date()

            .toLocaleDateString(),



        questID:

            data.questID || null,



        xpEarned:

            data.xpEarned || 0



    };



    LifeQuest.memories.push(

        memory

    );



    saveGame();



    renderMemories();



    return memory;


}



//====================================================
//              MEMORY CONTAINER
//====================================================


function getMemoryContainer(){


    return document.querySelector(

        "#memoryContainer"

    );


}



//====================================================
//              RENDER MEMORIES
//====================================================


function renderMemories(){


    const container =

        getMemoryContainer();



    if(!container)

        return;



    container.innerHTML = "";



    if(

        LifeQuest.memories.length === 0

    ){


        container.innerHTML = `


        <div class="empty-state glass">


            <i class="fa-solid fa-book-open"></i>


            <h2>

            No Memories Yet

            </h2>


            <p>

            Complete quests to create your story archive.

            </p>


        </div>


        `;


        return;

    }




    LifeQuest.memories.forEach(

        memory => {



            const card =

            document.createElement(

                "div"

            );



            card.className =

            "memory-card glass";



            card.innerHTML = `


            ${

            memory.image ?

            `

            <img

            class="memory-image"

            src="${memory.image}">

            `

            :

            ""

            }



            <div class="memory-body">


                <h2 class="memory-title">


                ${memory.title}


                </h2>




                <p class="memory-notes">


                ${memory.description}


                </p>




                <div class="memory-meta">


                    <span class="memory-date">


                    📅 ${memory.date}


                    </span>



                    <span class="memory-xp">


                    ⚡ +${memory.xpEarned} XP


                    </span>



                </div>


            </div>


            `;



            container.appendChild(card);



        }

    );


}



//====================================================
//              MEMORY COUNT
//====================================================


function getMemoryCount(){


    return LifeQuest.memories.length;


}



//====================================================
//              LOAD MEMORY VAULT
//====================================================


document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        renderMemories();


    }

);
/*====================================================
            LIFEQUEST v1.0

            Part 5B
            Memory Vault Expansion
====================================================*/


//====================================================
//          CREATE MEMORY FROM QUEST
//====================================================


function createMemoryFromQuest(quest){


    const alreadyExists =

    LifeQuest.memories.some(

        memory =>

        memory.questID === quest.id

    );



    if(alreadyExists)

        return;



    addMemory({



        title:

            quest.title,



        description:

            quest.description,



        image:

            quest.image,



        questID:

            quest.id,



        xpEarned:

            getQuestReward(

                quest.priority

            )



    });


}



//====================================================
//          FAVORITE MEMORY
//====================================================


function toggleMemoryFavorite(id){


    const memory =

    LifeQuest.memories.find(

        item =>

        item.id === id

    );



    if(!memory)

        return;



    memory.favorite =

        !memory.favorite;



    saveGame();



    renderMemories();



    showToast(

        memory.favorite ?

        "⭐ Memory saved"

        :

        "Removed from favorites"

    );


}



//====================================================
//          DELETE MEMORY
//====================================================


function deleteMemory(id){


    LifeQuest.memories =

    LifeQuest.memories.filter(

        memory =>

        memory.id !== id

    );



    saveGame();



    renderMemories();



    showToast(

        "📜 Memory removed"

    );


}



//====================================================
//          SORT MEMORIES
//====================================================


function sortMemories(){


    LifeQuest.memories.sort(

        (a,b)=>

        b.id-a.id

    );



}



//====================================================
//          ENHANCED MEMORY RENDER
//====================================================


function refreshMemoryVault(){


    sortMemories();


    renderMemories();


}



//====================================================
//          AUTO REFRESH
//====================================================


document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        refreshMemoryVault();


    }

);
/*====================================================
            LIFEQUEST v1.0

            Part 6A
            Companion UI Controls
====================================================*/


//====================================================
//              OPEN COMPANION MODAL
//====================================================
function openCompanionModal(){


    const modal = document.querySelector(

        "#companionModal"

    );



    if(modal){

        modal.showModal();

    }


}



//====================================================
//              CLOSE COMPANION MODAL
//====================================================


function closeCompanionModal(){


    const modal = document.querySelector(

        "#companionModal"

    );



    if(modal){

        modal.close();

    }


}



//====================================================
//              COMPANION FORM
//====================================================


function setupCompanionForm(){


    const form = document.querySelector(

        "#companionForm"

    );



    if(!form)

        return;



    form.addEventListener(

        "submit",

        (event)=>{


            event.preventDefault();



            const data =

            new FormData(form);



            createCompanion({



                name:

                data.get("name"),



                role:

                data.get("role"),



                notes:

                data.get("notes"),



                image:

                data.get("image")



            });



            form.reset();



            closeCompanionModal();



            showToast(

                "🤝 Companion Added"

            );


        }

    );


}



//====================================================
//              CONNECT BUTTON
//====================================================


function setupCompanionButton(){


    const button = document.querySelector(

        "#addAllyBtn"

    );



    if(button){


        button.addEventListener(

            "click",

            openCompanionModal

        );


    }


}



//====================================================
//              START COMPANION UI
//====================================================


document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        setupCompanionButton();


        setupCompanionForm();


    }

);
/*====================================================
            LIFEQUEST v1.0

            Part 6B
            Companion Quest Assignment UI
====================================================*/


//====================================================
//          COMPANION SELECT OPTIONS
//====================================================


function generateCompanionOptions(){


    let options = "";



    LifeQuest.companions.forEach(

        companion => {


            options += `

            <option value="${companion.id}">

            ${companion.name}

            (${companion.role})

            </option>

            `;


        }

    );



    return options;


}



//====================================================
//          LOAD COMPANION SELECT
//====================================================


function loadCompanionSelector(){


    const selector = document.querySelector(

        "#companionSelector"

    );



    if(!selector)

        return;



    selector.innerHTML =

    generateCompanionOptions();



}



//====================================================
//          ASSIGN FROM UI
//====================================================


function assignSelectedCompanion(){


    const questSelect = document.querySelector(

        "#questSelector"

    );



    const companionSelect = document.querySelector(

        "#companionSelector"

    );



    if(

        !questSelect ||

        !companionSelect

    )

        return;



    const questID =

        Number(

            questSelect.value

        );



    const companionID =

        Number(

            companionSelect.value

        );



    assignCompanionToQuest(

        questID,

        companionID

    );


}



//====================================================
//          QUEST OPTIONS
//====================================================


function generateQuestOptions(){


    let options = "";



    LifeQuest.quests.forEach(

        quest => {



            options += `


            <option value="${quest.id}">

            ${quest.title}

            </option>


            `;


        }

    );



    return options;


}



//====================================================
//          LOAD QUEST SELECT
//====================================================


function loadQuestSelector(){


    const selector = document.querySelector(

        "#questSelector"

    );



    if(!selector)

        return;



    selector.innerHTML =

        generateQuestOptions();


}



//====================================================
//          REFRESH PARTY SYSTEM
//====================================================


function refreshPartySystem(){


    loadCompanionSelector();


    loadQuestSelector();


}



//====================================================
//          START PARTY UI
//====================================================


document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        refreshPartySystem();


    }

);

/*====================================================
            LIFEQUEST v1.0

            Part 7A
            UI Control Center
====================================================*/


//====================================================
//              TOAST SYSTEM
//====================================================


function showToast(message){


    const toast = document.querySelector(

        "#toast"

    );



    if(!toast)

        return;



    toast.textContent = message;



    toast.classList.add(

        "show"

    );



    setTimeout(

        ()=>{


            toast.classList.remove(

                "show"

            );


        },

        3000

    );


}



//====================================================
//              CLOSE MODALS
//====================================================


function setupModalCloseButtons(){


    const closeButtons = document.querySelectorAll(

        ".close-modal"

    );



    closeButtons.forEach(

        button => {



            button.addEventListener(

                "click",

                ()=>{


                    const modal =

                    button.closest(

                        "dialog"

                    );



                    if(modal)

                        modal.close();



                }

            );


        }

    );


}



//====================================================
//          CLICK OUTSIDE MODAL CLOSE
//====================================================


function setupOutsideModalClose(){


    const modals = document.querySelectorAll(

        "dialog"

    );



    modals.forEach(

        modal => {



            modal.addEventListener(

                "click",

                (event)=>{


                    const box =

                    modal.querySelector(

                        ".modal-content"

                    );



                    if(

                        box &&

                        !box.contains(

                            event.target

                        )

                    ){


                        modal.close();


                    }


                }

            );


        }

    );


}



//====================================================
//              DELETE CONFIRMATION
//====================================================


function confirmAction(

    message,

    callback

){


    const result = confirm(

        message

    );



    if(result){


        callback();


    }


}



//====================================================
//              BUTTON RIPPLE SUPPORT
//====================================================


function setupButtonEffects(){


    const buttons = document.querySelectorAll(

        "button"

    );



    buttons.forEach(

        button => {



            button.addEventListener(

                "click",

                ()=>{


                    button.classList.add(

                        "clicked"

                    );



                    setTimeout(

                        ()=>{


                            button.classList.remove(

                                "clicked"

                            );


                        },

                        200

                    );


                }

            );


        }

    );


}



//====================================================
//              UI INITIALIZER
//====================================================


function initializeUI(){


    setupModalCloseButtons();


    setupOutsideModalClose();


    setupButtonEffects();


}



//====================================================
//              START UI ENGINE
//====================================================


document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        initializeUI();


    }

);
/*====================================================
            LIFEQUEST v1.0

            Part 7B
            Celebration Engine
====================================================*/


//====================================================
//              CONFETTI SYSTEM
//====================================================


function launchConfetti(){


    const canvas = document.querySelector(

        "#confettiCanvas"

    );



    if(!canvas)

        return;



    const ctx = canvas.getContext(

        "2d"

    );



    canvas.width = window.innerWidth;

    canvas.height = window.innerHeight;



    let particles = [];



    for(

        let i = 0;

        i < 120;

        i++

    ){


        particles.push({


            x:

            Math.random()

            *

            canvas.width,



            y:

            -20,



            size:

            Math.random()

            *

            8 + 4,



            speed:

            Math.random()

            *

            4 + 2,


