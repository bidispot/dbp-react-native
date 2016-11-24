import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Bar } from 'react-native-pathjs-charts';
import numeral from 'numeral';
import moment from 'moment';
import { queryChartBalances } from '../actions';
import {
  getFavoriteAccount,
  getChartBalancesQueryResults,
  getChartBalancesQueryParameters
} from '../selectors';
import { Button } from '../framework/components/Button';

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.onQuerySubmit = this.onQuerySubmit.bind(this);
    this.renderChart = this.renderChart.bind(this);
    this.getData = this.getData.bind(this);
    this.getOptions = this.getOptions.bind(this);
  }

  componentWillMount() {
    this.onQuerySubmit();
  }

  onQuerySubmit() {
    const favAcct = this.props.favoriteAccount;
    if (favAcct != null) {
      this.props.queryBalances(({ account: favAcct.account }));
    }
  }

  getData() {
    const result = this.props.results.map((balance) => {
      return [{
        name: this.dateFormatter(balance.date),
        amount: balance.amount
      }];
    }).toJS();
    return result;
  }

  getOptions() {
    return (
      {
        width: 300,
        height: 300,
        margin: {
          top: 20,
          left: 20,
          bottom: 50,
          right: 20
        },
        color: '#2980B9',
        gutter: 20,
        animate: {
          type: 'oneByOne',
          duration: 200,
          fillTransition: 3
        },
        axisX: {
          showAxis: true,
          showLines: true,
          showLabels: true,
          showTicks: true,
          zeroAxis: false,
          orient: 'bottom',
          label: {
            fontFamily: 'Arial',
            fontSize: 10,
            fontWeight: true,
            fill: '#34495E'
          }
        },
        axisY: {
          showAxis: true,
          showLines: true,
          showLabels: true,
          showTicks: true,
          zeroAxis: false,
          orient: 'left',
          label: {
            fontFamily: 'Arial',
            fontSize: 10,
            fontWeight: true,
            fill: '#34495E'
          }
        }
      }
    );
  }

  amountFormatter(row) {
    const format = '0,0[.]00';
    const currencies = {
      EUR: '€',
      USD: '$',
      GBP: '£',
      JPY: '¥'
    };

    let symbol = currencies[row.currency];
    if (symbol === undefined) {
      symbol = row.currency;
    }

    return `${numeral(row.amount).format(format)} ${symbol}`;
  }

  dateFormatter(epoch) {
    return moment.unix(epoch / 1000).format('DD/MM/YYYY');
  }

  renderChart() {
    const favAcct = this.props.favoriteAccount;
    const results = this.props.results;

    if (favAcct == null) {
      return (
        <Text style={styles.favoriteAccount}>
          Please select your favorite account.
        </Text>
      );
    }

    const favAccountArea = (
      <View style={styles.refresh}>
        <Text style={styles.favoriteAccount}>
          Favorite account: {favAcct.name}
        </Text>
        <Button style={styles.refresh} onPress={this.onQuerySubmit}>Refresh</Button>
      </View>
    );

    if (!results || results.size === 0) {
      return favAccountArea;
    }

    return (
      <View>
        {favAccountArea}
        <View style={styles.chart}>
          <Bar
            data={this.getData()}
            options={this.getOptions()}
            accessorKey='amount'
          />
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.mainView}>
        <Text style={styles.title}>Today</Text>
        <Text style={styles.title}>My indicators</Text>
        <Text style={styles.title}>My monitor</Text>
        <View>
          {this.renderChart()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 8
  },
  favoriteAccount: {
    margin: 8
  },
  chart: {
    margin: 8
  },
  refresh: {
    flexDirection: 'row',
    margin: 4
  }
});

const mapStateToProps = (state) => {
  return {
    results: getChartBalancesQueryResults(state),
    queryParameters: getChartBalancesQueryParameters(state),
    favoriteAccount: getFavoriteAccount(state)
  };
};

export default connect(mapStateToProps, { queryBalances: queryChartBalances })(Dashboard);
