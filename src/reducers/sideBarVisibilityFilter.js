const sideBarVisibilityFilter = (state = 'SHOW_SIDEBAR', action) => {
    switch (action.type) {
        case 'HIDE_SIDEBAR':
          return action.filter
        default:
          return state
    }
}

export default sideBarVisibilityFilter
