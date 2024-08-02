/* SideBar JS */
document.addEventListener('DOMContentLoaded', function () {
  var dropdownToggle = document.getElementById('dropdownToggle');
  var dropdownMenu = document.getElementById('dropdownMenu');

  console.log(dropdownToggle); // Check if this is not null
  console.log(dropdownMenu); // Check if this is not null

  if (dropdownToggle && dropdownMenu) {
      dropdownToggle.addEventListener('click', function (event) {
          event.preventDefault(); // Prevent the default action
          dropdownMenu.classList.toggle('show');
      });

      document.addEventListener('click', function (event) {
          if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
              dropdownMenu.classList.remove('show');
          }
      });
  }
});
