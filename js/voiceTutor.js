window.generateVoiceTutor = async function () {

  const prompt =
    document.getElementById(
      "voiceTutorInput"
    ).value;

  if (!prompt) {
    alert("Enter question");
    return;
  }

  const status =
    document.getElementById(
      "voiceStatus"
    );

  status.innerText =
    "Thinking...";

  try {

    const response =
      await fetch(
        "http://localhost:5001/generate",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            prompt
          })
        }
      );

    const data =
      await response.json();

    document
      .getElementById(
        "voiceAnswer"
      )
      .innerText = data.text;

    const player =
      document.getElementById(
        "voicePlayer"
      );

    player.src =
      "http://localhost:5001"
      + data.audio;

    player.play();

    status.innerText =
      "Done ✅";

  } catch (error) {

    console.error(error);

    status.innerText =
      "Voice tutor failed";
  }
};
