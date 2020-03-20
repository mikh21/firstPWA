const food = document.querySelector('.food');

db.enablePersistence().catch(err => {
    if (err.code == 'failed-precondition') {
        console.log('persistance failed');
    } else if (err.code == 'unimplemented') {
        console.log('persistence is not available');
    }
});

let query = firebase.firestore()
    .collection('menu');

// Start listening to the query.
db.collection('menu').onSnapshot((snapshot) => {
    // console.log(snapshot.docChanges());
    snapshot.docChanges().forEach(function (change) {
        // console.log(change.doc.data());
        if (change.type === 'added') {
            renderMenu(change.doc.data(), change.doc.id);
        } else {
            // deleteMessage(change.doc.id);
        }
    });
});

const renderMenu = (data, id) => {
    const html = `
        <div class="card" data-id="${id}">
            <div class="thumb">
                <img src="/assets/img/${data.gambar}">
            </div>
            <div class="content">
                <h1>${data.nama}</h1>
                <p>${data.deskripsi}</p>
                <p class="harga">Rp. ${data.harga},-</p>
            </div>
        </div>
    `;

    food.innerHTML += html;
}