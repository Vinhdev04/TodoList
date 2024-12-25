// Lấy các phần tử DOM cần thiết
const btn = document.querySelector(".btn"); // Nút thêm công việc
console.log(btn);
const input = document.querySelector("#input-value"); // Ô nhập giá trị
console.log(input);
const listTodo = document.querySelector("#list"); // Danh sách công việc
console.log(listTodo);

// # Xử lý sự kiện click vào nút "Thêm công việc" và gọi hàm addTask
btn.addEventListener("click", function () {
  addTask(); // Gọi hàm addTask khi click vào nút
});

// # Xử lý sự kiện nhấn phím "Enter" và gọi hàm addTask
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    // Kiểm tra nếu phím nhấn là "Enter"
    e.preventDefault(); // Ngăn chặn hành động mặc định (gửi form)
    addTask(); // Gọi hàm addTask khi nhấn Enter
  }
});

// # Xử lý sự kiện click vào phần tử li hoặc span trong danh sách
listTodo.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      // Nếu click vào một công việc
      e.target.classList.toggle("checked");
      saveData(); // Lưu lại trạng thái mới vào localStorage
    } else if (e.target.tagName === "SPAN") {
      // Nếu click vào nút "×" (xóa công việc)
      e.target.parentElement.remove(); // Xóa công việc khỏi danh sách
      saveData(); // Lưu lại danh sách sau khi xóa
    }
  },
  false
);

// # Hàm thêm công việc vào danh sách
function addTask() {
  if (input.value.trim() === "") {
    // Kiểm tra nếu ô nhập không có dữ liệu
    alert("Please enter a task!"); // Hiển thị thông báo nếu không có công việc
    return; // Dừng lại nếu không có công việc
  } else {
    const items = document.createElement("li"); // Tạo phần tử li mới
    items.innerHTML = input.value; // Đặt nội dung cho công việc là giá trị nhập vào
    listTodo.appendChild(items); // Thêm công việc vào danh sách

    const span = document.createElement("span"); // Tạo nút "×" để xóa công việc
    span.innerHTML = "\u00d7"; // Nội dung nút là ký tự "×"
    items.appendChild(span); // Thêm nút "×" vào công việc
  }
  input.value = ""; // Xóa ô nhập sau khi thêm công việc
  saveData(); // Lưu lại danh sách công việc vào localStorage
}

// Hàm lưu danh sách công việc vào localStorage
function saveData() {
  const tasks = [];
  const taskItems = listTodo.querySelectorAll("li"); // Lấy tất cả các phần tử li trong danh sách

  taskItems.forEach((task) => {
    // Lấy văn bản công việc và loại bỏ ký tự "×"
    const taskText = task.textContent.replace("×", "").trim();
    // Kiểm tra công việc có được đánh dấu là đã hoàn thành không
    const isChecked = task.classList.contains("checked");
    tasks.push({ taskText, isChecked }); // Thêm công việc vào mảng tasks
  });

  // Lưu mảng tasks vào localStorage dưới dạng chuỗi JSON
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Hàm hiển thị danh sách công việc đã lưu từ localStorage
function showData() {
  // Lấy danh sách công việc từ localStorage
  const tasks = JSON.parse(localStorage.getItem("tasks"));

  if (tasks) {
    tasks.forEach((task) => {
      const li = document.createElement("li"); // Tạo phần tử li mới cho công việc
      li.textContent = task.taskText; // Đặt văn bản cho công việc

      if (task.isChecked) {
        // Đánh dấu công việc là đã hoàn thành nếu có trong dữ liệu
        li.classList.add("checked");
      }

      const span = document.createElement("span"); // Tạo nút "×" để xóa công việc
      span.textContent = "×"; // Nội dung nút là ký tự "×"
      span.classList.add("delete"); // Thêm class "delete" cho nút để dễ dàng xử lý sau này

      span.addEventListener("click", () => {
        li.remove(); // Xóa công việc khi nhấn vào nút "×"
        saveData(); // Lưu lại danh sách sau khi xóa công việc
      });

      li.appendChild(span); // Thêm nút "×" vào công việc
      listTodo.appendChild(li); // Thêm công việc vào danh sách
    });
  }
}

// Gọi hàm showData khi trang đã tải xong để hiển thị công việc đã lưu
document.addEventListener("DOMContentLoaded", showData);
