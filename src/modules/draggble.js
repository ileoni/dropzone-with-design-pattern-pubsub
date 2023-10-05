import { pubsub } from "./PubSub.js";

export const draggable = {
    render: root => {
        const parent = root.querySelector('.wrapper__dropzone');
        draggable.preventDefaultHandler(parent);
        draggable.dragEnterAndLeaveHandler(parent);
        parent.addEventListener('drop', draggable.dropHandler)
    },
    preventDefaultHandler: (root) => {
        const events = ['dragenter', 'dragleave', 'dragover', 'drop'];
        events.map(event => {
            root.addEventListener(event, e => e.preventDefault());
        })
    },
    dragEnterAndLeaveHandler: (root) => {
        const events = ['dragenter', 'dragleave', 'drop'];
        events.map(event => {
            root.addEventListener(event, ({target, type}) => {
                if(target.classList.contains('preview')) {
                    switch (type) {
                        case 'dragenter':
                                root.classList.add('wrapper__dropzone--activated')
                            break;
                        case 'drop':
                            console.log(root);
                                root.classList.remove('wrapper__dropzone--empty')
                                root.classList.remove('wrapper__dropzone--activated')
                            break;
                        default:
                            root.classList.remove('wrapper__dropzone--activated')
                            break;
                    }
                }
            })
        })
    },
    dropHandler: (e) => {
        e.preventDefault();
        const {dataTransfer} = e;
        pubsub.publish('imagesAdded', dataTransfer.files);   
    }
}