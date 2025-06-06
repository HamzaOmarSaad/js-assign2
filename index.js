var siteName= document.getElementById("siteName");
var siteUrl = document.getElementById("siteURL");

var sitelist=[];
if (localStorage.getItem("sitelist")){
    sitelist=JSON.parse(localStorage.getItem("sitelist"))
}
display();


function add(){
    if (!validate()) {
        return;
    }
    site={
        name:siteName.value,
        site:siteUrl.value,
    }

    sitelist.push(site)
    localStorage.setItem("sitelist", JSON.stringify(sitelist));
    siteName.value="";
    siteUrl.value="";
    display();
    
}

function display(){
    var siteTable = document.getElementById("bookmarkList");
    var container=""
    for(var i =0;i<sitelist.length;i++){
        container += `<tr>
            <td>${i+1}</td>
            <td>${sitelist[i].name}</td>
            <td><a href="${sitelist[i].site}" target="_blank" class="btn btn-primary">visit</a></td>
            <td><button class="btn btn-danger" onclick="deleteSite(${i})">Delete</button></td>
        </tr>`;

        siteTable.innerHTML = container;
    }
}
function deleteSite(index){
    sitelist.splice(index, 1);
    localStorage.setItem("sitelist", JSON.stringify(sitelist));
    display();
}
function validate (){
    if (siteName.value == "" || siteUrl.value == ""){
        alert("Please fill all fields");
        return false;
    }
    if (siteName.value.length < 3) {
        alert("Site name must be at least 3 characters long");
        return false;
    }
    var urlPattern = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w- .\/?%&=]*)?$/;
    if (!urlPattern.test(siteUrl.value)){
        alert("Please enter a valid URL");
        return false;
    }
    return true;
}