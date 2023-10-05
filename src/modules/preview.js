import { pubsub } from "./PubSub.js"

export const preview = {
    render: root => {
        const dropzone = root.querySelector('.wrapper__dropzone');
        dropzone.insertAdjacentHTML('afterbegin', `
            <div class="wrapper__preview">
                <div class="preview"></div>
            </div>
        `);

        root.addEventListener('click', preview.imageDeleted)
        
        pubsub.subscribe('imagesUpdated', preview.imagesUpdated)
    },
    imageDeleted: ({target}) => {
        if(target.hasAttribute('destroy')) {
            const {id} = target.parentElement;
            pubsub.publish('imageDeleted', id)
        }
    },
    imagesUpdated: records => {
        const selectors = ['.wrapper__preview', '.preview'];
        let [parent, child] = selectors.map(selector => document.querySelector(selector));
        const childClone = child.cloneNode();

        const toggle = !records.length ? true: false;
        parent.classList.toggle('wrapper__dropzone--empty', toggle)

        if(child.hasChildNodes()) {
            parent.removeChild(child);
            child = parent.appendChild(childClone);
        }

        for(const record of records) {
            child.insertAdjacentHTML('afterbegin', `
                <div class="wrapper__image" id="${record.id}">
                    <span class="fa-solid fa-xmark" destroy></span>
                    <img src="${record.mime}" class="image"/>
                </div>
            `);
        }
    }
}