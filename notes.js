document.addEventListener("DOMContentLoaded", () => {
  const branchSelection = document.getElementById("branchSelection");
  const semesterSelection = document.getElementById("semesterSelection");
  const subjectSelection = document.getElementById("subjectSelection");
  const resourceList = document.getElementById("resourceList");
  const btnBackToBranch = document.getElementById("btnBackToBranch");
  const btnBackToSemester = document.getElementById("btnBackToSemester");

  let selectedBranch = "";
  let selectedSemester = "";

  // Branch selection
  document.querySelectorAll(".branch-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      selectedBranch = btn.getAttribute("data-branch");
      branchSelection.classList.add("hidden");
      semesterSelection.classList.remove("hidden");
    });
  });

  // Back to branch
  btnBackToBranch.addEventListener("click", () => {
    semesterSelection.classList.add("hidden");
    branchSelection.classList.remove("hidden");
    resourceList.classList.add("hidden");
  });

  // Semester selection
  document.querySelectorAll(".semester-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      selectedSemester = btn.getAttribute("data-semester");
      semesterSelection.classList.add("hidden");

      // Show subject selection
      subjectSelection.classList.remove("hidden");

      // Dynamically generate subject buttons
      const subjectList = document.getElementById("subjectList");
      if (selectedBranch === "CSE" && selectedSemester === "1") {
        subjectList.innerHTML = `
          <button class="subject-btn" data-file="maths.pdf">Engineering Maths</button>
          <button class="subject-btn" data-file="physics.pdf">Engineering Physics</button>
          <button class="subject-btn" data-file="bee.pdf">Basic Electrical Engg</button>
          <button class="subject-btn" data-file="cp.pdf">C Programming</button>
        `;
      } else {
        subjectList.innerHTML = `<p>No subjects available.</p>`;
      }

      // Subject button click handler
      document.querySelectorAll(".subject-btn").forEach(subBtn => {
        subBtn.addEventListener("click", () => {
          const file = subBtn.getAttribute("data-file");
          const path = `notes/${selectedBranch.toLowerCase()}/sem${selectedSemester}/${file}`;
          subjectSelection.classList.add("hidden");
          resourceList.classList.remove("hidden");
          resourceList.innerHTML = `
            <h3>Subject Notes</h3>
            <p><a href="${path}" target="_blank">📄 Click here to view/download the PDF</a></p>
            <button id="btnBackToSubjects" class="btn btn-back">← Back to Subjects</button>
          `;

          document.getElementById("btnBackToSubjects").addEventListener("click", () => {
            resourceList.classList.add("hidden");
            subjectSelection.classList.remove("hidden");
          });
        });
      });
    });
  });
});
