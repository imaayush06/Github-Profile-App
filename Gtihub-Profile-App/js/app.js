const APIURL = "https://api.github.com/users/"
const main = document.querySelector("#main")
const search = document.querySelector("#search")

const getUser = async(username) => {        //async is used bcoz we've to fetch in this function which will be implemented with await
    const response = await fetch(APIURL + username) //await waits before sending data to JS ()
    const data = await response.json() //converting the data into json
    console.log(data)
    const card = `
        <div class="card">
            <div>
                <img class="avatar" src="${data.avatar_url}" alt="florin pop" >
            </div>
            <div class="user">
                <h2>${data.name}</h2>
                <p>${data.bio}</p>

                <ul class="info">
                    <li>${data.followers}<strong> Followers</strong></li>
                    <li>${data.following}<strong> Following</strong></li>
                    <li>${data.public_repos}<strong> Repos</strong></li>
                </ul>

                <div id="repos">
                

                </div>
            </div>    
        </div>
    `
    main.innerHTML = card
    getRepos(username)
}

//init call
getUser("ShrutiMishra511995")


// <a class="repo" href="#" target="_blank">Repo 1</a>
// <a class="repo" href="#" target="_blank">Repo 2</a>
// <a class="repo" href="#" target="_blank">Repo 3</a>

const getRepos = async(username) =>{
    const repos = document.querySelector("#repos")
    const response = await fetch(APIURL + username + "/repos")
    const data = await response.json()
    console.log(data)
    data.forEach(
        (item) =>{
            const elem = document.createElement("a")
            elem.classList.add("repo")
            elem.href = item.html_url
            elem.innerText = item.name
            elem.target = "_blank"
            repos.appendChild(elem)
        }
    )
}

const formSubmit = () =>   {
    if(search.value != ""){
        getUser(search.value)
        search.value = ""
    }
    return false
}

search.addEventListener(
    "focusout",
    function(){
        formSubmit()
    }
)