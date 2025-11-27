export function showSpecialCardAlert(message: string) {
  const alertBox = document.getElementById("special-card");
  if (!alertBox) return;

  alertBox.textContent = message;

  alertBox.classList.remove("hidden");

  setTimeout(() => alertBox.classList.add("show"), 10);

  setTimeout(() => {
    alertBox.classList.remove("show");

    setTimeout(() => {
      alertBox.classList.add("hidden");
    }, 400);

  }, 3000);
}
