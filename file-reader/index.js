const dropZone = document.getElementById("drop-zone");
const fileInput = document.getElementById("fileinput");
let file;

function appendFile(file) {
	const reader = new FileReader();
	reader.addEventListener("load", () => {
		dropZone.style.backgroundImage = `url(${reader.result})`;
		dropZone.innerText = "";
	});

	// Reads the contents of the blob/file
	reader.readAsDataURL(file);
}

fileInput.addEventListener("change", (event) =>
	appendFile(event.target.files[0])
);

// Handle Drop Event
dropZone.addEventListener("drop", (event) => {
	event.preventDefault();
	dropZone.classList.remove("dragging");

	appendFile(event.dataTransfer.files[0]);
	file = event.dataTransfer.files[0];
});

// Handle Dragover Event
dropZone.addEventListener("dragover", (event) => {
	event.preventDefault(); // prevent file from opening
	if (!file) {
		dropZone.classList.add("dragging");
	}
});

dropZone.addEventListener(
	"click",
	() => fileInput.click() // Programatically clicks our hidden input element
);

// Handle Dragleave event for styling
dropZone.addEventListener("dragleave", () =>
	dropZone.classList.remove("dragging")
);
