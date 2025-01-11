// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

let taxToggle = document.getElementById("taxToggle");
taxToggle.addEventListener("click", () => {
  let taxInfo = document.getElementsByClassName("taxInfo");
  for (info of taxInfo) {
    if (info.style.display === "block") {
      info.style.display = "none";
      continue;
    }
    info.style.display = "block";
  }
});

function confirmDeleteListingSwal(form) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      form.submit(); // Proceed with the form submission
      const button = document.getElementById("deleteButton");
      button.classList.add("buttonload");
      button.innerHTML = `<i class="fa fa-spinner fa-spin"></i> Deleting`;
    }
  });
  return false; // Prevent immediate form submission
}

function confirmEditLisintgSwal(form) {
  Swal.fire({
    title: "Are you sure?",
    text: "You are about to update this listing!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, update it!",
  }).then((result) => {
    if (result.isConfirmed) {
      form.submit(); // Proceed with the form submission
      const button = document.getElementById("listingButton");
      button.classList.add("buttonload");
      button.innerHTML = `<i class="fa fa-spinner fa-spin"></i>Loading...`;
    }
  });
  return false; // Prevent immediate form submission
}

function saveProfileSwal(event, form) {
  // Prevent form from submitting immediately to handle logic
  event.preventDefault();

  // Ask for confirmation before submitting
  Swal.fire({
    title: "Save Profile Changes?",
    text: "Do you want to update your profile with the new details?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#28a745",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, save it!",
    cancelButtonText: "No, cancel",
  }).then((result) => {
    // If confirmed, proceed with form validation and submission
    if (result.isConfirmed) {
      // Check if the form is valid
      if (form.checkValidity() === false) {
        // Display validation error swal
        Swal.fire({
          icon: "error",
          title: "Form Incomplete",
          text: "Please fill in all the required fields.",
        });
        form.classList.add("was-validated");
        return false;
      }

      // Show loading or processing message (optional)
      Swal.fire({
        title: "Submitting...",
        text: "Please wait while your profile is being updated.",
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      setTimeout(function () {
        form.submit();
      }, 2000); // Simulating a server delay of 2 seconds
    }
  });

  return false; // Prevent form submission initially
}

function ButtonLoader() {
  const button = document.getElementById("button");
  button.classList.add("buttonload");
  button.innerHTML = `<i class="fa fa-spinner fa-spin"></i> Loading`;
}
<<<<<<< HEAD

function confirmDelete(event) {
  event.preventDefault(); // Prevent the default form submission

  Swal.fire({
    title: "Are you sure?",
    text: "This action will remove your profile image permanently!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      event.target.submit();
      const button = document.getElementById("deleteButton");
      button.classList.add("buttonload");
      button.innerHTML = `<i class="fa fa-spinner fa-spin"></i> Deleting...`;
    }
  });
}
