import React,{Fragment} from 'react'
import ReactDOM from 'react-dom'
import Autosuggest from 'react-autosuggest'
import axios from 'axios'
//import { debounce } from 'throttle-debounce'
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import NavigationRefresh from '@material-ui/icons/Refresh';
import LoadingSpinner from '../details/LoadingSpinner'
import PartsDisplay from '../details/PartsDisplay'
import '../../assets/css/es_autocomplete.css'
import classnames from 'classnames';
import Search from '@material-ui/icons/Search';
import red from '@material-ui/core/colors/red';
import Icon from '@material-ui/core/Icon';
import Pageview from '@material-ui/icons/Pageview';
import parts_search_store from '../../Store/parts_search_store';
import { showNotification } from 'react-admin';
//  const styles = createStyles({
//     iconStyle: {
//         marginRight: '0.1em',
//         // justifyContent: 'center',
//     },
// });
const styles = theme => ({
  progress: {
    // borderTop: '2em',
  },
  icon: {
    fontSize: '54px',
    display: "inline-block",
    position:"relative",
    right:'5px',
    bottom:'1px',
  },
  iconHover: {
    //margin: theme.spacing.unit,
    // '&:hover': {
    //   color: red[800],
    // },
  },
});
class ElasticSearchAutocomplete extends React.Component {
  state = {
    value: '',
    suggestions: [],
    search_api_call:false,
    loading:false,
    selected_value: false,
  }
  static defaultProps = {
        icon: <NavigationRefresh />,
    };
  componentDidMount() {
    const search_string = parts_search_store.getSearchString();
    if(search_string != undefined){
      this.setState({ selected_value: search_string })
      this.setState({ value: search_string })
      this.setState({ search_api_call: true })
    }
  }
  componentWillReceiveProps(nextProps) {
    const search_string = parts_search_store.getSearchString();
    if(search_string === undefined && this.state.value !== ''){
      this.setState({ value: '' })
      this.setState({ search_api_call: false })
    }
  }
  onKeyDown = e => {
     if (e.key === 'Enter' || e.keyCode == 13) {
      this.handleSearch()
    }
  }
  handleSearch = e => {
    if (this.state.value != ''){
      parts_search_store.saveSearchString(this.state.value);
      this.setState({ selected_value: this.state.value })
      this.setState({ search_api_call: true })
    }
  }
getSuggestionValue = (suggestion) => {
    this.setState({ search_api_call: true })
    this.setState({ selected_value: suggestion.name })
    return (suggestion.name)
}
//const getSuggestionValue = suggestion => suggestion.name;
renderSuggestion = (suggestion,{})=> {
    return (
      <Fragment>
           <div className="result">
            <div>{suggestion.name}</div>
            <div className="shortCode">{suggestion.type}</div>
          </div> 
      </Fragment>
    )
  }
  onChange = (event, { newValue }) => {
    if (event.keyCode == 40 || event.keyCode == 38) {
      this.setState({ search_api_call: false })
    }
      this.setState({ value: newValue })
    }
  onSuggestionsFetchRequested = ({value}) => {
    const {showNotification} = this.props;
    this.setState({ search_api_call: false })
    let autocomplete_url = 'http://101.53.142.21:3000/api/autocomplete';
    if (window.location.host == "api.b2b.carcrew.in"){
        autocomplete_url = 'http://101.53.142.21:3000/api/autocomplete';
    } 
    this.setState({ loading: true })
    axios.get(autocomplete_url,{
          params: {
            queryStr: value
          },
          timeout: 15000,
      })
      .then(res => {
        const search_resp =  JSON.parse(res.data);
        const results = search_resp.map(h => h._source)
        this.setState({ suggestions: results })
        this.setState({ loading: false })
      }).catch(error => {
        this.setState({ loading: false })
           showNotification("Oops Something went wrong!! Please Search Again","warning") 
        // this.setState({ search_api_call: false })
      })
  }
  onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] })
    //this.setState({ search_api_call: false })
  }
  onSearchCall = (loading)=>{
    //console.log("loading")
    //console.log(loading)
    this.setState({ loading: loading })
  }
  render() {
    const { classes } = this.props;
    const { value, suggestions,selected_value,search_api_call } = this.state
    // console.log(value)
    // console.log(selected_value)
    //console.log(search_api_call)
    const inputProps = {
      placeholder: 'search part name here....',
      value,
      onChange: this.onChange,
      onKeyDown: this.onKeyDown
    }
    return (
       <Fragment>
        <div className="App">
          <div className="searchbar">
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={(value)=>this.onSuggestionsFetchRequested(value)}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps}
          />
          <Pageview color="primary" className={classes.icon } onClick={this.handleSearch}/>
          </div>
          {this.state.loading  ?  <CircularProgress size={35} thickness={5} />: null} 
        </div>
        <br/>
        <br/>
        { search_api_call ? <PartsDisplay value={selected_value} onSearchCall={()=>this.onSearchCall} /> : null }
      </Fragment>
    ) 
  }
} 
const enhance = compose(
    withStyles(styles),
    connect(
        undefined,
        { showNotification }
    ),
);
export default enhance(ElasticSearchAutocomplete);