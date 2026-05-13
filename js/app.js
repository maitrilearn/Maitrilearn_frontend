console.log("MaitriLearn Started 🚀");

async function uploadNote() {

  const file = document
    .getElementById("fileInput")
    .files[0];

  await uploadNoteService(file, {

    student_class:
      document.getElementById("classInput").value,

    subject:
      document.getElementById("subjectInput").value,

    topic:
      document.getElementById("topicInput").value
  });

  alert("Uploaded Successfully");
}

async function searchNotes() {

  const search = document
    .getElementById("searchInput")
    .value;

  const notes = await searchNotesService(search);

  const list = document.getElementById("notesList");

  list.innerHTML = "";

  notes.forEach(note => {

    list.innerHTML += `
      <div>
        <h3>${note.topic}</h3>

        <a href="${note.url}" target="_blank">
          Preview Note
        </a>

        <br><br>

        <a href="${note.url}" download>
          Download Note
        </a>
      </div>
    `;
  });
}

async function askDoubt(event) {

  const btn = event.target;

  btn.disabled = true;
  btn.innerText = "Thinking...";

  const result = await askDoubtAPI(

    document.getElementById("doubtQuestion").value,

    document.getElementById("doubtSubject").value,

    document.getElementById("doubtTopic").value
  );

  document.getElementById("doubtOutput")
    .innerText = result.answer;

  btn.disabled = false;
  btn.innerText = "Ask";
}

async function runTutor(event) {

  const btn = event.target;

  btn.disabled = true;
  btn.innerText = "Teaching...";

  const result = await tutorAPI(
    document.getElementById("tutorTopic").value
  );

  document.getElementById("tutorOutput")
    .innerText = result.answer;

  btn.disabled = false;
  btn.innerText = "Teach Me";
}

async function submitFeedback(event) {

  const btn = event.target;

  btn.disabled = true;

  await feedbackAPI(
    document.getElementById("feedbackText").value
  );

  alert("Feedback Sent");

  btn.disabled = false;
}
