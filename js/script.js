//where your profile information will appear
const overview = document.querySelector(".overview");
//GitHub username
const username = "jclegg31"

const repoList = document.querySelector(".repo-list");


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
    console.log(repoData);
    displayRepo(repoData);
};


//Display Repo Info
const displayRepo = function (repos) { 
    //loop and create a list item for each repo
    //give each item a class of "repo" and an <h3> element with the repo name
    //then append the list item to the global variable that selects the unordered repos list

    for (const i of repos) { 
        console.log(i.name);
        const newLi = document.createElement("li");
        newLi.classList.add("repo");
        newLi.innerHTML = `<h3>${i.name}</h3>`
        repoList.append(newLi);
        //console.log(newLi);
    }

};