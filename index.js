document.getElementById('new-party-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const location = document.getElementById('location').value;
    const description = document.getElementById('description').value;

    fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, date, time, location, description })
    }).then(response => response.json())
      .then(addPartyToList)
      .catch(console.error);
});

function addPartyToList(party) {
    const partyList = document.getElementById('party-list');
    const div = document.createElement('div');
    div.className = 'party-item';
    div.innerHTML = `
        <strong>${party.name}</strong> - ${party.date} at ${party.time}<br>
        Location: ${party.location}<br>
        ${party.description}<br>
        <button onclick="deleteParty('${party.id}', this)">Delete</button>
    `;
    partyList.appendChild(div);
}

function deleteParty(id, button) {
    fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/events/' + id, {
        method: 'DELETE'
    }).then(() => {
        button.parentNode.remove();
    }).catch(console.error);
}

function loadParties() {
    fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/events')
        .then(response => response.json())
        .then(parties => {
            parties.forEach(addPartyToList);
        })
        .catch(console.error);
}

loadParties();