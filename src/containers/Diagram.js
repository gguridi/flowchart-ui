import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { selectChart, updateChart } from "../actions/charts";
import Diagram from "../components/Diagram";

const mapStateToProps = (state, props) => {
    const id = props.match.params.id;
    return { ...state.charts.charts[id] };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            selectChart,
            updateChart,
        },
        dispatch,
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Diagram);
