//where your profile information will appear
const overview = document.querySelector(".overview");
//GitHub username
const username = "jclegg31"


//Fetch API JSON Data
const getUser = async function () {
    const request = await fetch(`https://api.github.com/users/${username}`);
    const data = await request.json();
    //displayUser(data);
    console.log(data);
 };

 getUser();

//display the fetched user information on the page
const displayUser = function (data) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("user-info");
    newDiv.innerHTML = `<figure><img alt="user avatar" src=${data.avatar_url} /></figure><div><p><strong>Name:</strong> ${data.name}</p><p><strong>Bio:</strong> ${data.bio}</p><p><strong>Location:</strong> ${data.location}</p><p><strong>Number of public repos:</strong> ${data.public_repos}</p></div>`;
    overview.append(newDiv);

};