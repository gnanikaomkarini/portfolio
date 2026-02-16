document.addEventListener('DOMContentLoaded', () => {
    const fileList = document.getElementById('file-list');
    const tabsContainer = document.getElementById('tabs');
    const editor = document.getElementById('editor');
    const terminalContent = document.getElementById('terminal-content');

    let openFiles = {};
    let activeFile = null;

    const files = {
        'home.md': (data) => `
<div class="home-container">
    <div class="home-intro">
        <h1>${data.name}</h1>
        <p>Welcome to my interactive portfolio. Click on the files to the left to learn more about me.</p>
    </div>
    <div class="home-photo">
        <img src="${data.photo}" alt="Gnanika Makkena" width="150" style="border-radius: 50%;">
    </div>
</div>
`,
        'skills.css': (data) => `
.skills {
    technical: [${data.skills.technical.map(skill => `'${skill}'`).join(', ')}];
    soft: [${data.skills.soft.map(skill => `'${skill}'`).join(', ')}];
}`,
        'projects.json': (data) => JSON.stringify(data.projects.map(p => ({...p, link: p.link || '#'})), null, 2),
        'achievements.js': (data) => `
${data.achievements.map(a => `
// ${a.organization} (${a.period})
function ${a.title.replace(/ /g, '_')}() {
    return "${a.description}";
}
`).join('\n')}
`,
        'education.html': (data) => `
<div class="institution">${data.education.institution}</div>
<div class="degree">${data.education.degree}</div>
<div class="details">
    <p>CGPA: ${data.education.cgpa}</p>
    <p>Period: ${data.education.period}</p>
</div>
`,
        'contact.sh': (data) => `
echo "Email: ${data.contact.email}"
echo "LinkedIn: ${data.contact.linkedin}"
echo "GitHub: ${data.contact.github}"
`,
    };

    const renderFileList = () => {
        fileList.innerHTML = '';
        for (const fileName in files) {
            const li = document.createElement('li');
            li.textContent = fileName;
            li.dataset.file = fileName;
            fileList.appendChild(li);
        }
    };

    const renderTabs = () => {
        tabsContainer.innerHTML = '';
        for (const fileName in openFiles) {
            const tab = document.createElement('div');
            tab.className = `tab ${fileName === activeFile ? 'active' : ''}`;
            tab.textContent = fileName;
            tab.dataset.file = fileName;
            tabsContainer.appendChild(tab);
        }
    };

    const renderEditor = () => {
        if (activeFile) {
            if (activeFile === 'home.md') {
                editor.innerHTML = files[activeFile](window.portfolioData);
                return;
            }
            const lang = activeFile.split('.').pop();
            const code = document.createElement('code');
            code.className = `language-${lang}`;
            code.textContent = openFiles[activeFile];
            
            const pre = document.createElement('pre');
            pre.appendChild(code);
            
            editor.innerHTML = '';
            editor.appendChild(pre);
            hljs.highlightElement(code);
        } else {
            editor.innerHTML = '';
        }
    };
    
    const openFile = (fileName, data) => {
        if (!openFiles[fileName]) {
            openFiles[fileName] = files[fileName](data);
        }
        activeFile = fileName;
        renderTabs();
        renderEditor();
        
        document.querySelectorAll('#file-list li').forEach(li => {
            li.classList.toggle('active', li.dataset.file === activeFile);
        });
    };

    fileList.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            openFile(e.target.dataset.file, window.portfolioData);
        }
    });

    tabsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('tab')) {
            activeFile = e.target.dataset.file;
            renderTabs();
            renderEditor();
        }
    });
    
    const init = (data) => {
        window.portfolioData = data;
        renderFileList();
        openFile('home.md', data);
        terminalContent.innerHTML = `Welcome to the terminal. You can explore the files on the left.<br>Last login: ${new Date().toString()}<br><br><b>Reminder:</b> Please add your photo to the 'assets/images/Gnanika_Makkena_Formal.jpeg' path.`;
    };

    fetch('assets/data/data.json')
        .then(response => response.json())
        .then(data => init(data))
        .catch(error => {
            terminalContent.innerHTML = `Error loading portfolio data: ${error}`;
        });
});
