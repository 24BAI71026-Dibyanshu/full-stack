const form = document.getElementById("jobForm");
const progress = document.getElementById("progress");

function updateProgress(){
    const inputs = document.querySelectorAll("#jobForm input[type='text'], #jobForm input[type='email'], #jobForm textarea");
    let filled = 0;
    inputs.forEach(i=>{
        if(i.value.trim() !== "") filled++;
    });
    progress.style.width = (filled/inputs.length)*100 + "%";
}

document.querySelectorAll("#jobForm input, #jobForm textarea").forEach(el=>{
    el.addEventListener("input", updateProgress);
});

document.getElementById("resume").addEventListener("change",function(){
    document.getElementById("fileName").innerText = this.files[0]?.name || "";
});

form.addEventListener("submit",function(e){
    e.preventDefault();

    let valid = true;

    const name = document.getElementById("name");
    const email = document.getElementById("email");

    if(name.value.trim() === ""){
        document.getElementById("nameError").style.display="block";
        valid=false;
    }else{
        document.getElementById("nameError").style.display="none";
    }

    if(!email.value.includes("@")){
        document.getElementById("emailError").style.display="block";
        valid=false;
    }else{
        document.getElementById("emailError").style.display="none";
    }

    if(!valid) return;

    document.getElementById("pname").innerText = name.value;
    document.getElementById("prole").innerText = document.getElementById("role").value;
    document.getElementById("pemail").innerText = email.value;

    const skills = document.getElementById("skills").value.split(",");
    const container = document.getElementById("skillContainer");
    container.innerHTML="";
    skills.forEach(s=>{
        if(s.trim() !== ""){
            const span = document.createElement("span");
            span.className="skill";
            span.innerText=s.trim();
            container.appendChild(span);
        }
    });

    const photo = document.getElementById("photo").files[0];
    if(photo){
        const reader = new FileReader();
        reader.onload=function(){
            document.getElementById("avatar").src = reader.result;
        }
        reader.readAsDataURL(photo);
    }

    localStorage.setItem("profileData",JSON.stringify({
        name:name.value,
        email:email.value,
        role:document.getElementById("role").value
    }));
});

window.onload=function(){
    const data = JSON.parse(localStorage.getItem("profileData"));
    if(data){
        document.getElementById("pname").innerText=data.name;
        document.getElementById("pemail").innerText=data.email;
        document.getElementById("prole").innerText=data.role;
    }
};

