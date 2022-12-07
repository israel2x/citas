import { createStore, action } from "easy-peasy";

export const store = createStore({
  activeCitas: [],
  activePatient: null,
  openModalCitas: false,
  changeActiveCitas: action((state: any, payload) => {
    state.activeCitas = payload;
  }),
  changeActivePatient: action((state: any, payload) => {
    state.activePatient = payload;
  }),
  changeOpenModalCitas: action((state: any, payload) => {
    state.openModalCitas = payload;
    console.log("true modal open", payload);
  }),
});
