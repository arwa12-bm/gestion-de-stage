export const initialState = {
  id: "",
  name: "",
  email: "",
  phone: "",
  formations: [],
  experiences: [],
  projets: [],
  skill: "",
  file: "",
  status: "Demande en cours",
  role: "",
  isAdmin: false,
  password: "",
};

type Action =
  | { type: "UPDATE_FIELD"; field: string; value: string }
  | { type: "MODIFIER_IMBRIQUE"; parent: string; child: string; value: string }
  | { type: "ADD_ITEM"; section: string; value: any };

export default function userDataReducer(state: any, action: Action) {
  console.log(action);

  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "MODIFIER_IMBRIQUE":
      return {
        ...state,
        [action.parent]: {
          ...state[action.parent],
          [action.child]: action.value,
        },
      };
    case "ADD_ITEM":
      console.log([action.section]);
      return {
        ...state,
        [action.section]: [...state[action.section], action.value],
      };

    default:
      return state;
  }
}
