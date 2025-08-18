function toggleDark(){
    const body = document.body;
    const toggleBtn = document.getElementById('toggleBtn');
    
    body.classList.toggle('light-mode');
    
    toggleBtn.classList.toggle('btn-light');
    toggleBtn.classList.toggle('btn-dark');
    
    if (body.classList.contains('light-mode')) {
        toggleBtn.textContent = 'Switch to Dark';
        localStorage.setItem('theme', 'light');
    } else {
        toggleBtn.textContent = 'Switch to Light';
        localStorage.setItem('theme', 'dark');
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const toggleBtn = document.getElementById('toggleBtn');
    
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        toggleBtn.classList.remove('btn-dark');
        toggleBtn.classList.add('btn-light');
        toggleBtn.textContent = 'Switch to Dark Mode';
    } else {
        toggleBtn.textContent = 'Switch to Light Mode';
    }
});


