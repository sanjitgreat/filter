import React from 'react'
import './Filters.css'
import classNames from 'classnames'


/*
* Receive array to construct the filter
* If Array count is less then 2 then hide filter
* Show drop down in desktop / Tablet
* Show modal in mobile
* Pass selected value to the parent container to filter the content
*/

const ListItem = ({ value, onClick}) => (
    <li onClick={() => onClick(value.type)} className='filterwrapper__itemcontainer__item'>{value.type}  <span className='count'> ({value.count})</span></li>
  )

const List = ({ items, onClick }) => (
  <ul className='filterwrapper__itemcontainer'>
    {
        items.map((item, i) => <ListItem key={i} value={item} onClick={onClick} />)
      }
  </ul>
  )

class Filters extends React.Component {
  constructor (props) {
    super(props)
    this.state={
      currFilter: 'all',
      dropdown: false
    }
  }

  trimLowerCase (value) {
    return value ? (value.replace(/ /g, '').toLowerCase() || '') : ''
  }

  onClick = (e) =>{
    let currSelected = e || this.state.currFilter
    this.setState({currFilter: currSelected})
    this.props.onFilter(currSelected.split(" ").join("_"))
  }

  genList () {
    let arr = this.props.data
    let filter = this.props.filter
    let newArr = []

    const a = arr.map((record, index) => {
      const entry = this.trimLowerCase(record[filter]).split("_").join(" ")
      if(!this.checkEntry(newArr,entry)){ 
        let count = this.getCount(arr, record[filter])
        newArr.push({type:entry, count: count}) 
      }
    })
    if (newArr.length === 0 || newArr.length === 1) {
      return []
    } else {
      newArr.unshift({type:'All', count:arr.length})
    }
    return newArr
  }

  checkEntry (arr, str){
    return arr.some(function (el) {
      return el.type === str
    })
  }

  getCount = (arr, str)=>{
    let filter = this.props.filter
    let count = arr.reduce(function (n, record) {
      return n + (record[filter] === str)
    }, 0)
    return count
  }

  renderList () {
    let arr = this.genList()
    if (arr.length === 0) {
      return null
    }
    return (<List items={arr} onClick={this.onClick} />)
  }

  showDropdown =()=> {
    this.setState(prevState => ({
      dropdown: true
    }))
  }

  hideDropDown = (e) => {
    this.setState(prevState => ({
      dropdown: false
    }))
    e.stopPropagation()
  }

  toggleDropDown = (e) =>{
    this.setState({
     dropdown: !this.state.dropdown
   
   })
    e.stopPropagation() 
  }

  render () {
    var openClass = this.state.dropdown ? 'showDropdown' : ''
    const dropDownClass = classNames('filterwrapper', openClass)
    return (
      <div className={dropDownClass} onMouseOver={this.showDropdown} onMouseOut={this.hideDropDown} onClick = {this.toggleDropDown}>
        <div className='filterwrapper__bg'/>
        <div className='filterwrapper__selectedfilter'>{this.state.currFilter}<span className='filterwrapper__selectedfilter--down'/></div>
      {this.renderList()}
    </div>
    )
  }
}
export default Filters
