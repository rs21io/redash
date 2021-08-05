import { find, isArray, get, first, map, intersection, isEqual, isEmpty } from "lodash";
import React from "react";
import PropTypes from "prop-types";
import SelectWithVirtualScroll from "@/components/SelectWithVirtualScroll";
import { connect } from "react-redux";
import { getQueryAction } from "@/store";

class QueryBasedParameterInput extends React.Component {
  static propTypes = {
    parameter: PropTypes.any, // eslint-disable-line react/forbid-prop-types
    value: PropTypes.any, // eslint-disable-line react/forbid-prop-types
    mode: PropTypes.oneOf(["default", "multiple"]),
    queryId: PropTypes.number,
    queryresult: PropTypes.any,
    onSelect: PropTypes.func,
    className: PropTypes.string,
  };

  static defaultProps = {
    value: null,
    mode: "default",
    parameter: null,
    queryId: null,
    queryresult: null,
    onSelect: () => {},
    className: "",
  };

  constructor(props) {
    super(props);
    this.state = {
      options: [],
      value: null,
      loading: false,
    };
  }

  componentDidMount() {
    this._loadOptions(this.props.queryId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.queryId !== prevProps.queryId) {
      this._loadOptions(this.props.queryId);
    }
    if (this.props.value !== prevProps.value) {
      this.setValue(this.props.value);
    }
  }

  setValue(value) {
    const { options } = this.state;
    const { queryresult, parameter, widgets } = this.props;

    if (this.props.mode === "multiple") {
      value = isArray(value) ? value : [value];
      const arr = [];
      const widgetTypes = [];

      if (widgets) {
        widgets.forEach(widget => {
          if (isArray(widget.visualization)) {
            widget.visualization.forEach(visualization => {
              widgetTypes.push(visualization.type);
            });
          } else if (widget.visualization) {
            widgetTypes.push(widget.visualization.type);
          }
        });
      }

      if (widgetTypes.includes("SELECTION_TABLE") && !parameter.hasPendingValue) {
        queryresult.forEach(result => {
          if (!arr.includes(result[parameter.title])) {
            if (result[parameter.title]) {
              // Specifically checking the options value and queryResult of battery data because they differ i.e 100 vs 100.0
              if (result["soc_min" || "soc_max"] === 0 || 100) {
                arr.push(`${result[parameter.title]}.0`);
              }
              arr.push(`${result[parameter.title]}`);
            }
          }
        });
        value = arr.length >= 1 ? arr : value;
      }

      const optionValues = map(options, option => option.value);
      const validValues = intersection(value, optionValues);
      this.setState({ value: validValues });
      return validValues;
    }
    const found = find(options, option => option.value === this.props.value) !== undefined;
    value = found ? value : get(first(options), "value");
    this.setState({ value });
    return value;
  }

  async _loadOptions(queryId) {
    if (queryId && queryId !== this.state.queryId) {
      this.setState({ loading: true });

      const options = await this.props.parameter.loadDropdownValues();

      // stale queryId check
      if (this.props.queryId === queryId) {
        this.setState({ options, loading: false }, () => {
          const updatedValue = this.setValue(this.props.value);
          if (!isEqual(updatedValue, this.props.value)) {
            this.props.onSelect(updatedValue);
          }
        });
      }
    }
  }

  render() {
    const { className, mode, onSelect, queryId, value, ...otherProps } = this.props;
    const { loading, options } = this.state;

    return (
      <span>
        <SelectWithVirtualScroll
          className={className}
          disabled={loading}
          loading={loading}
          mode={mode}
          value={this.state.value}
          onChange={onSelect}
          options={map(options, ({ value, name }) => ({ label: String(name), value }))}
          showSearch
          showArrow
          notFoundContent={isEmpty(options) ? "No options available" : null}
          {...otherProps}
        />
      </span>
    );
  }
}

function mapStateToProps(state) {
  const { QueryData } = state;
  return { queryresult: QueryData.Data };
}

const mapDispatchToProps = () => {
  return {
    getqueryaction: getQueryAction(),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QueryBasedParameterInput);
