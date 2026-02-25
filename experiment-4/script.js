 const jobForm = document.getElementById("jobForm");
      const jobList = document.getElementById("jobList");
      const emptyState = document.getElementById("emptyState");

      jobForm.addEventListener("submit", (e) => {
        e.preventDefault();

        emptyState.style.display = "none";
        
        const title = document.getElementById("jobTitle").value;
        const company = document.getElementById("companyName").value;
        const location = document.getElementById("location").value;
        const desc = document.getElementById("description").value;

        const card = document.createElement("div");
        card.className = "job-card";
        card.innerHTML = `
                <div class="card-content">
                    <h3>${title}</h3>
                    <div class="company-info">
                        <span> ${company}</span>
                        <span> ${location}</span>
                    </div>
                    <p class="description">${desc}</p>
                </div>
                <button class="btn-delete" onclick="this.parentElement.remove(); checkEmpty();">Delete</button>
            `;

        jobList.prepend(card);

        jobForm.reset();
      });
      function checkEmpty() {
        if (
          jobList.children.length === 1 &&
          jobList.querySelector("#emptyState")
        ) {
          emptyState.style.display = "block";
        } else if (jobList.querySelectorAll(".job-card").length === 0) {
          emptyState.style.display = "block";
        }
      }
