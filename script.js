let ticketTemplate = true;
let teamReminderTemplate = false;
let attEscTemplate = false;
let sdChatTemplate = false;

let timerId = null; // Tracks the active timer

let copyButton;

function generateTemplate() {

    if (ticketTemplate) {
        document.querySelector('#template-type').textContent = 'Ticket Template';
        document.querySelector('#template-form').innerHTML = `
            <div class="container">
                <label for="poc">Point of contact (First and Last name):</label>
                <input type="text" id="poc" autocomplete="off">
            </div>

            <div class="container">
                <label for="contact-phone">Site/Contact phone #:</label>
                <input type="text" id="contact-phone" autocomplete="off">
            </div>

            <div class="container">
                <label for="contact-email">Contact Email:</label>
                <input type="text" id="contact-email" autocomplete="off">
            </div>

            <div class="container">
                <label for="site-name">Site name:</label>
                <input type="text" id="site-name" autocomplete="off">
            </div>

            <div class="container">
                <label for="cmc-id">CMC ID:</label>
                <input type="text" id="cmc-id" autocomplete="off">
            </div>

            <div class="container">
                <label for="description-of-issue">Description of the issue:</label>
                <input type="text" id="description-of-issue" autocomplete="off">
            </div>

            <div class="steps">
                <label for="steps">TS Steps performed:</label>
                <textarea name="steps" id="steps" autocomplete="off"></textarea>
            </div>

            <div class="buttons">
                <button id="copy-content-btn" type="submit"> Copy content</button>

                <div class="corrective-btns">
                    <button id="clear-btn">Clear</button>
                    <button id="undo-btn">Undo Clear</button>
                </div>
            </div>`;
    } else if (teamReminderTemplate) {
        document.querySelector('#template-type').textContent = 'Team Reminder Template';
        document.querySelector('#template-form').innerHTML = `
                <div class="container">
                    <label for="tr-site-name">Site name:</label>
                    <input type="text" id="tr-site-name" autocomplete="off">
                </div>

                <div class="container">
                    <label for="tr-case-num">Case number:</label>
                    <input type="text" id="tr-case-num" autocomplete="off">
                </div>

                <div class="container">
                    <label for="tr-cmc">CMC ID:</label>
                    <input type="text" id="tr-cmc" autocomplete="off">
                </div>

                <div class="container">
                    <label for="tr-closing-time">Closing time:</label>
                    <input type="text" id="tr-closing-time" autocomplete="off">
                </div>

                <div class="container">
                    <label for="tr-eod-time">EOD time:</label>
                    <input type="text" id="tr-eod-time" autocomplete="off">
                </div>

                <div class="steps">
                    <label for="steps">Next steps:</label>
                    <textarea name="steps" id="steps" autocomplete="off"></textarea>
                </div>

                <div class="buttons">

                    <button id="copy-content-btn" type="submit">Copy content</button>

                    <div class="corrective-btns">
                        <button id="clear-btn">Clear</button>
                        <button id="undo-btn">Undo Clear</button>
                    </div>
                </div>
        `;
    } else if (attEscTemplate) {
        document.querySelector('#template-type').textContent = 'ATTESC Template';
        document.querySelector('#template-form').innerHTML = `
                <div class="container">
                    <label for="attesc-site-name">Site name:</label>
                    <input type="text" id="attesc-site-name" autocomplete="off">
                </div>

                <div class="container">
                    <label for="attesc-case-num">Case number:</label>
                    <input type="text" id="attesc-case-num" autocomplete="off">
                </div>

                <div class="container">
                    <label for="attesc-cmc">CMC ID:</label>
                    <input type="text" id="attesc-cmc" autocomplete="off">
                </div>

                <div class="container">
                    <label for="attesc-eod-time">EOD time:</label>
                    <input type="text" id="attesc-eod-time" autocomplete="off">
                </div>

                <div class="steps">
                    <label for="attesc-steps">Issue details and TS steps performed:</label>
                    <textarea name="attesc-steps" id="attesc-steps" autocomplete="off"></textarea>
                </div>

                <div class="buttons">

                    <button id="copy-content-btn" type="submit">Copy content</button>

                    <div class="corrective-btns">
                        <button id="clear-btn">Clear</button>
                        <button id="undo-btn">Undo Clear</button>
                    </div>
                </div>
        `;
    } else if (sdChatTemplate) {
        document.querySelector('#template-type').textContent = 'SD Chat Template';
        document.querySelector('#template-form').innerHTML = `
                <div class="container">
                    <label for="sd-site-name">Oracle Site name and/or Site number:</label>
                    <input type="text" id="sd-site-name" autocomplete="off">
                </div>

                <div class="container">
                    <label for="sd-poc-name">Point of contact name:</label>
                    <input type="text" id="sd-poc-name" autocomplete="off">
                </div>

                <div class="container">
                    <label for="sd-poc-num">Point of contact phone number:</label>
                    <input type="text" id="sd-poc-num" autocomplete="off">
                </div>

                <div class="steps">
                    <label for="steps">Issue details:</label>
                    <textarea name="steps" id="steps" autocomplete="off"></textarea>
                </div>

                <div class="buttons">

                    <button id="copy-content-btn" type="submit">Copy content</button>

                    <div class="corrective-btns">
                        <button id="clear-btn">Clear</button>
                        <button id="undo-btn">Undo Clear</button>
                    </div>
                </div>
        `
    }
}

generateTemplate();

const form = document.querySelector('#template-form');

form.addEventListener('click', (e) => {

    // Check if the Copy button was clicked
    if (e.target.id === 'copy-content-btn') {
        e.preventDefault();
        const button = document.getElementById('copy-content-btn');
        let note = '';

        // Select containers ONLY inside the current form
        const elements = form.querySelectorAll('.container');

        elements.forEach((element) => {

            let label = element.querySelector('label').innerText;
            let inputVal = element.querySelector('input').value;

            note += `${label} ${inputVal}\n`;
        });

        //adding the content from Textareas
        const details = form.querySelector('.steps');
        const stepsLabel = details.querySelector('label').innerText;
        const stepsContent = details.querySelector('textarea').value;


        note += `\n${stepsLabel}\n\n${stepsContent}`

        navigator.clipboard.writeText(note);
        console.log(note);

        // This will handle the Copied! notification on button
        if (timerId) {
            clearTimeout(timerId);
        } else {
            // Save the original text only if a timer isn't already running
            button.dataset.originalText = button.textContent;
        }

        // Change to the temporary text immediately
        button.textContent = 'Copied!';

        // Set a timer to restore the text after 3000 milliseconds (3 seconds)
        timerId = setTimeout(() => {
            button.textContent = button.dataset.originalText;
            timerId = null; // Reset the tracker
        }, 3000);
    }
});


clearButton.addEventListener('click', (e) => {
    e.preventDefault()

    let siteName = document.getElementById('site-name').value;
    localStorage.setItem('siteName', siteName);

    let pointOfContact = document.getElementById('poc').value;
    localStorage.setItem('pointOfContact', pointOfContact);

    let contactPhone = document.getElementById('contact-phone').value;
    localStorage.setItem('contactPhone', contactPhone);

    let contactEmail = document.getElementById('contact-email').value;
    localStorage.setItem('contactEmail', contactEmail);

    let cmcId = document.getElementById('cmc-id').value;
    localStorage.setItem('cmcId', cmcId);

    let issueDescription = document.getElementById('description-of-issue').value;
    localStorage.setItem('issueDescription', issueDescription);

    let performedSteps = document.getElementById('ts-performed').value;
    localStorage.setItem('performedSteps', performedSteps);

    document.getElementById('site-name').value = '';
    document.getElementById('poc').value = '';
    document.getElementById('contact-phone').value = '';
    document.getElementById('contact-email').value = '';
    document.getElementById('cmc-id').value = '';
    document.getElementById('description-of-issue').value = '';
    document.getElementById('ts-performed').value = '';
})

// event listener for undo-clear btn

undoButton.addEventListener('click', (e) => {

    e.preventDefault()

    if (localStorage.length > 0) {
        document.getElementById('site-name').value = localStorage.getItem('siteName');
        document.getElementById('poc').value = localStorage.getItem('pointOfContact');
        document.getElementById('contact-phone').value = localStorage.getItem('contactPhone');
        document.getElementById('contact-email').value = localStorage.getItem('contactEmail');
        document.getElementById('cmc-id').value = localStorage.getItem('cmcId');
        document.getElementById('description-of-issue').value = localStorage.getItem('issueDescription');
        document.getElementById('ts-performed').value = localStorage.getItem('performedSteps');
        localStorage.clear()
    }
})



document.getElementById('ticket-template').addEventListener('click', () => {

    ticketTemplate = true;
    teamReminderTemplate = false;
    attEscTemplate = false;
    sdChatTemplate = false;

    generateTemplate();
});

document.getElementById('tr-template').addEventListener('click', () => {

    ticketTemplate = false;
    teamReminderTemplate = true;
    attEscTemplate = false;
    sdChatTemplate = false;

    generateTemplate();
});

document.getElementById('attesc-template').addEventListener('click', () => {

    ticketTemplate = false;
    teamReminderTemplate = false;
    attEscTemplate = true;
    sdChatTemplate = false;

    generateTemplate();
});

document.getElementById('sd-template').addEventListener('click', () => {

    ticketTemplate = false;
    teamReminderTemplate = false;
    attEscTemplate = false;
    sdChatTemplate = true;

    generateTemplate();
});


// to do: event.currentTarget
// handling template 