
  const form = document.getElementById("quoteForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    document.querySelector(".loading").style.display = "block";

    try {
      await addDoc(collection(db, "quote_requests"), {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        type: form.type.value,
        timeline: form.timeline.value,
        budget: form.budget.value || "",
        message: form.message.value,
        status: "new",
        createdAt: serverTimestamp()
      });

      document.querySelector(".loading").style.display = "none";
      document.querySelector(".sent-message").style.display = "block";
      form.reset();

    } catch (error) {
      document.querySelector(".loading").style.display = "none";
      document.querySelector(".error-message").innerText = error.message;
    }
  });

