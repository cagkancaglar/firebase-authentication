import store from "./store"
import { closeModal } from "./store/modal"

const modalClose = () => {
    store.dispatch(closeModal())
}

export {modalClose}