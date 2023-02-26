//where your profile information will appear
const overview = document.querySelector(".overview");
//GitHub username
const username = "jclegg31"

const repoList = document.querySelector(".repo-list");
const repoSection = document.querySelector(".repos");
const repoDataSection = document.querySelector(".repo-data");


//Fetch API JSON Data
const getUser = async function () {
    const request = await fetch(`https://api.github.com/users/${username}`);
    const data = await request.json();
    displayUser(data);

 };

 getUser();

//display the fetched user information on the page
const displayUser = function (data) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("user-info");
    newDiv.innerHTML = `<figure><img alt="user avatar" src=${data.avatar_url} /></figure><div><p><strong>Name:</strong> ${data.name}</p><p><strong>Bio:</strong> ${data.bio}</p><p><strong>Location:</strong> ${data.location}</p><p><strong>Number of public repos:</strong> ${data.public_repos}</p></div>`;
    overview.append(newDiv);
    getRepos();
};

//Fetch the Repos
const getRepos = async function () {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json();
    //console.log(repoData);
    displayRepo(repoData);
};


//Display Repo Info
const displayRepo = function (repos) { 
    //loop and create a list item for each repo
    //give each item a class of "repo" and an <h3> element with the repo name
    //then append the list item to the global variable that selects the unordered repos list

    for (const i of repos) { 
        //console.log(i.name);
        const newLi = document.createElement("li");
        newLi.classList.add("repo");
        newLi.innerHTML = `<h3>${i.name}</h3>`
        repoList.append(newLi);
        //console.log(newLi);
    }

};

repoList.addEventListener("click", function (e) { 
    //add conditional statement to check if the event target that was clicked
    //matches the h3 element (name of the repo)
    if (e.target.matches("h3")) { 
        const repoName = e.target.innerText;
        oneRepo(repoName);
    }
});

//Function to get specific repo info
const oneRepo = async function (repoName) {
    const getOneRepo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await getOneRepo.json();
    console.log(repoInfo);

    //Grab the languages
    const fetchLanguages = await fetch(repoInfo.languages_url); //fetch data from language_url property of your repoInfo
    const languageData = await fetchLanguages.json(); //saves JSON response

    console.log(languageData);//languageData is an object

    const languages = [];

    //loop through languageData object and push to the end of the languages array
    for (const language in languageData) { 
        languages.push(language);
    }

    //console.log(languages);
    // to get specific repo information, call the function 
    //to display the repo info (displayRepoInfo).Pass it the repoInfo object and the languages array.
    displayRepoInfo(repoInfo, languages);

};

//function to display the specific repo information
const displayRepoInfo = function (repoInfo, languages) { 
    //empty the HTML of the section with a class of “repo-data” 
    //where the individual repo data will appear.
    repoDataSection.innerHTML = "";
    
    //Unhide (show) the “repo-data” element. Hide the element with the class of “repos”.
    repoDataSection.classList.remove("hide");
    repoSection.classList.add("hide");

    //Create a new DIV element and add the selected repo name, description, default
    //branch and link to its code on GitHub.
    const newInfoDiv = document.createElement("div");
    newInfoDiv.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;

    //append new div element to the section with a class of "repo-data"
    repoDataSection.append(newInfoDiv);
};
 
