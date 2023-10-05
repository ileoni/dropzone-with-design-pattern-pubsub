import { hash } from "./global.js";
import { pubsub } from "./PubSub.js"

export const dropzone = {
    list: [],
    render(root) {
        root.insertAdjacentHTML('afterbegin', `
            <div class="container">
                <div 
                    class="wrapper__dropzone wrapper__dropzone--empty" 
                    data-dropzone
                >
            </div>
        `);

        pubsub.subscribe('imagesAdded', dropzone.imageAdded)
        pubsub.subscribe('imageDeleted', dropzone.imageDeleted)
    },
    promiseHandler: async (records) => {
        let data = [];
        for (const record of records) {
            data.push( await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(record);
                reader.onload = () => resolve({
                    id: hash(8),
                    mime: reader.result
                });
            }));
        }
        return data;
    },
    imageAdded: async (files) => {
        const records = await dropzone.promiseHandler(files);
        dropzone.list.push(...records);
        pubsub.publish('imagesUpdated', dropzone.list);
    },
    imageDeleted: (id) => {
        dropzone.list = dropzone.list.filter((record) => record.id !== id);
        pubsub.publish('imagesUpdated', dropzone.list);
    }
}