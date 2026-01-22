document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(form);

        fetch(form.action, {
            method: form.method,
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                formMessage.innerHTML = `<div class="alert alert-success">Message sent successfully!</div>`;
                form.reset();
                setTimeout(() => formMessage.innerHTML = '', 5000); // hide message after 5s
            } else {
                formMessage.innerHTML = `<div class="alert alert-danger">Oops! Something went wrong.</div>`;
            }
        })
        .catch(() => {
            formMessage.innerHTML = `<div class="alert alert-danger">Oops! Something went wrong.</div>`;
        });
    });
});
