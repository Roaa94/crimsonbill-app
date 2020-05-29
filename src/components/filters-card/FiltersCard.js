import React from 'react';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {FiltersCardContent, FiltersExpansionPanel, FiltersExpansionPanelSummary} from "./FiltersCard.styles";
import DateTimePicker from "../ui/inputs/date-time-pickers/DateTimePicker";
import {connect} from "react-redux";
import {selectFiltersCardExpanded, selectFilters} from "../../redux/filters/filters.selectors";
import Button from "../ui/buttons/Button";
import {colors} from "../../styles/global";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import Grid from "@material-ui/core/Grid";
import ResponsiveArrow from "../ui/ResponsiveArrow";
import {createStructuredSelector} from "reselect";
import {setFilters, toggleAccountsPageFiltersCard} from "../../redux/filters/filters.actions";
import {fetchTransactionsStartAsync} from "../../redux/transactions/transactions.actions";
import {selectUserId} from "../../redux/user/user.selectors";

class FiltersCard extends React.Component {
    state = {
        startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        endDate: new Date(),
    };

    componentDidMount() {
        const {filters} = this.props;
        const {startDate, endDate} = filters;
        this.setState({
            startDate,
            endDate
        });
    }

    setDefaultValues = () => {
        this.setState({
            startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
            endDate: new Date(),
        });
    }

    handleFieldChange = (name, value) => {
        this.setState({[name]: value});
    };

    handleFormSubmit = event => {
        event.preventDefault();
        const {setFilters, fetchTransactionsStartAsync, userId} = this.props;
        const filtersData = this.state;
        setFilters(filtersData);
        fetchTransactionsStartAsync(userId, filtersData);
    }

    render() {
        const {startDate, endDate} = this.state;
        const {toggleFiltersCard, filtersCardExpanded} = this.props;

        return (
            <FiltersExpansionPanel
                onChange={() => toggleFiltersCard(!filtersCardExpanded)}
                expanded={filtersCardExpanded}
            >
                <FiltersExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <h3>Filters</h3>
                </FiltersExpansionPanelSummary>
                <FiltersCardContent>
                    <form onSubmit={this.handleFormSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} lg={5}>
                                <DateTimePicker
                                    selectedDate={startDate}
                                    dateFieldLabel='Start Date'
                                    timeFieldLabel='Start Time'
                                    onChange={(pickedDate) => this.handleFieldChange('startDate', pickedDate)}
                                />
                            </Grid>
                            <Grid item container alignItems='center' justify='center' xs={12} lg={2}>
                                <Grid item>
                                    <ResponsiveArrow/>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} lg={5}>
                                <DateTimePicker
                                    selectedDate={endDate}
                                    dateFieldLabel='End Date'
                                    timeFieldLabel='End Time'
                                    onChange={(pickedDate) => this.handleFieldChange('endDate', pickedDate)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    fullWidth={false}
                                    type='submit'
                                    bgColor={colors.secondary}
                                    prefixIcon={<CheckRoundedIcon/>}
                                    margin='0 20px 0 0'
                                >
                                    Apply
                                </Button>
                                <Button
                                    bgColor={colors.primary}
                                    fullWidth={false}
                                    onClick={this.setDefaultValues}
                                    prefixIcon={<ClearRoundedIcon/>}
                                >
                                    Reset
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </FiltersCardContent>
            </FiltersExpansionPanel>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    userId: selectUserId,
    filters: selectFilters,
    filtersCardExpanded: selectFiltersCardExpanded,
});

const mapDispatchToProps = dispatch => ({
    toggleFiltersCard: value => dispatch(toggleAccountsPageFiltersCard(value)),
    setFilters: filtersData => dispatch(setFilters(filtersData)),
    fetchTransactionsStartAsync: (userId, filters) => dispatch(fetchTransactionsStartAsync(userId, filters)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltersCard);
