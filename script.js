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



