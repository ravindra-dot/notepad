const editor = document.getElementById("textarea1");

// --- Formatting Functions ---
const f1 = () => editor.style.fontWeight = "bold";
const f2 = () => editor.style.fontStyle = "italic";
const f3 = () => editor.style.textAlign = "left";
const f4 = () => editor.style.textAlign = "center";
const f5 = () => editor.style.textAlign = "right";
const f6 = () => editor.style.textTransform = "uppercase";
const f7 = () => editor.style.textTransform = "lowercase";
const f8 = () => editor.style.textTransform = "capitalize";

// function f9 renamed to match your HTML call
function f9() {
    editor.style.fontWeight = "normal";
    editor.style.textAlign = "left";
    editor.style.fontStyle = "normal";
    editor.style.textTransform = "none";
    editor.style.color = "#000000";
    editor.value = "";
}

function changeColor() {
    const selectedColor = document.getElementById("colorPicker").value;
    editor.style.color = selectedColor;
}

// --- File Management ---

function saveTextAsFile() {
    const textContent = editor.value;
    const userFilename = document.getElementById("filename").value || "notepad-export";

    const blob = new Blob([textContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);

    const downloadLink = document.getElementById("download-link");
    downloadLink.href = url;
    downloadLink.download = `${userFilename}.txt`;
    downloadLink.click();
    
    window.URL.revokeObjectURL(url);
}

document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files; 
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            editor.value = e.target.result;
        };
        reader.readAsText(file);
    }
});

const themeToggle = document.getElementById('darkModeToggle');
const themeIcon = document.getElementById('themeIcon');
const bodyElement = document.documentElement;

function initializeTheme() {
    const currentTheme = bodyElement.getAttribute('data-bs-theme') || 'light';
    
    if (currentTheme === 'dark') {
        bodyElement.setAttribute('data-bs-theme', 'light');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        themeToggle.classList.replace('btn-outline-warning', 'btn-outline-secondary');
    } else {
        bodyElement.setAttribute('data-bs-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        
        if (themeToggle.classList.contains('btn-outline-secondary')) {
            themeToggle.classList.replace('btn-outline-secondary', 'btn-outline-warning');
        } else {
            themeToggle.classList.add('btn-outline-warning');
        }
    }
}


themeToggle.addEventListener('click', initializeTheme);
document.getElementById("save-button").addEventListener("click", saveTextAsFile);