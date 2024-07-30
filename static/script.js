let currentPage = null;

document.getElementById('new-page-btn').addEventListener('click', createNewPage);
document.getElementById('save-btn').addEventListener('click', savePage);
document.getElementById('delete-btn').addEventListener('click', deletePage);

function createNewPage() {
    currentPage = { id: null, title: '', content: '' };
    document.getElementById('page-title').value = '';
    document.getElementById('page-content').value = '';
}

function savePage() {
    const title = document.getElementById('page-title').value;
    const content = document.getElementById('page-content').value;

    if (currentPage.id === null) {
        // New page
        fetch('/add_page', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content }),
        })
        .then(response => response.json())
        .then(page => {
            currentPage = page;
            addPageToList(page);
        });
    } else {
        // Update existing page (not implemented in this basic version)
    }
}

function deletePage() {
    if (currentPage && currentPage.id) {
        fetch(`/delete_page/${currentPage.id}`, { method: 'DELETE' })
        .then(() => {
            document.querySelector(`#page-list li[data-id="${currentPage.id}"]`).remove();
            createNewPage();
        });
    }
}

function addPageToList(page) {
    const li = document.createElement('li');
    li.textContent = page.title;
    li.setAttribute('data-id', page.id);
    li.addEventListener('click', () => loadPage(page));
    document.getElementById('page-list').appendChild(li);
}

function loadPage(page) {
    currentPage = page;
    document.getElementById('page-title').value = page.title;
    document.getElementById('page-content').value = page.content;
}

// Load existing pages
document.querySelectorAll('#page-list li').forEach(li => {
    li.addEventListener('click', () => {
        const pageId = li.getAttribute('data-id');
        const page = {{ pages|tojson }}
        .find(p => p.id == pageId);
        loadPage(page);
    });
});