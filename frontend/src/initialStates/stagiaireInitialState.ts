interface Stagiaire {
  id: number;
  username: string;
  email: string;
  userphone: string;
  remarques: string;
}

interface InformationUser {
  stagiaires: {
    stagiaire: Stagiaire;
    projet: string | undefined;
    date_debut: string;
    date_fin: string;
  }[];
}

export const initStateInformationUser: InformationUser = {
  stagiaires: [],
};

type Action =
  | { type: "UPDATE_FIELD"; field: string; value: string }
  | { type: "MODIFIER_IMBRIQUE"; parent: string; child: string; value: string }
  | { type: "ADD_ITEM"; section: string; value: any }
  | { type: "REMOVE_ITEM"; section: string; value: any };

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

    case "REMOVE_ITEM":
      return {
        ...state,
        [action.section]: [...state[action.section].slice(0, -1)],
      };
    default:
      return state;
  }
}
