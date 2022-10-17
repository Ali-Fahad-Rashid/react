const initState = {}

const projectReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_PROJECT_SUCCESS':
      console.log('create project success');
      return state;
    case 'CREATE_PROJECT_ERROR':
      console.log('create project error');
      return state;

      case 'UPDATE':
        console.log('UPDATE');
        return state;

        case 'ERROR':
          console.log('ERROR');
          return state;

    default:
      return state;
  }
};

export default projectReducer;