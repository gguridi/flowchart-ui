import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { deleteChart } from "../actions/charts";
import Sidebar from "../components/Sidebar";

const mapStateToProps = (state) => {
    return {
        selected: state.charts.selected,
        charts: state.charts.charts,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            deleteChart,
        },
        dispatch,
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
