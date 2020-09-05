import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createChart } from "../actions/charts";
import NewChart from "../components/NewChart";

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            createChart,
        },
        dispatch,
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(NewChart);
