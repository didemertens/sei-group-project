// import React from 'react'

// class SearchBar extends React.Component {

//   // state = {
//   //   query: '',
//   //   data: [],
//   //   searchString: []
//   // }

//   // handleInputChange = (e) => {
//   //   this.setState({
//   //     query: event.target.value
//   //   }, () => {
//   //     this.filterArray()
//   //   })

//   // }

//   // getData = () => {
//   //   fetch('/api/events')
//   //     .then(res => res.json())
//   //     .then(res.data => {
        
//   //       this.setState({
//   //         data: responseData,
//   //         searchString: res.data
//   //       })
//   //     })
//   // }

//   // filterArray = () => {
//   //   let searchString = this.state.query;
//   //   let responseData = this.state.data;



//   //   if (searchString.length > 0) {
//   //     // console.log(responseData[i].name);
//   //     responseData = responseData.filter(searchString);
//   //     this.setState({
//   //       responseData
//   //     })
//   //   }

//   // }

//   // componentWillMount() {
//   //   this.getData();
//   }
//   render() {
//     return (
//       <div className="searchForm">
//         <form>
//           <input type="text" id="filter" placeholder="Search for..." onChange={this.handleInputChange} />
//         </form>
//         <div>
//           {
//             this.state.responseData.map((i) =>
//               <p>{i.name}</p>
//             )
//           }
//         </div>
//       </div>
//     )
//   }
// }


// export default SearchBar