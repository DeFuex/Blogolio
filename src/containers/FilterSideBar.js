import { connect } from 'react-redux'
import { setSideBarVisibility } from '../actions'
import PartOne from '../components/Blogs/BlogReactTutorial/PartOne'
import Home from '../components/Home'

const mapStatToProps = (state, ownProps) => {
    return {
        active: ownProps.filter === state.showSideBar
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onBlogClick: () => {
            dispatch(setSideBarVisibility(ownProps.filter))
        }
    }
}

const FilterSideBar = connect (
  mapStatToProps,
  mapDispatchToProps
)(Home)

export default FilterSideBar
