import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

// components
import SearchBar from './components/search_bar.js';
import VideoList from './components/video_list.js';
import VideoDetail from './components/video_detail.js';

// constants
const YOUTUBE_KEY = 'AIzaSyDYlS_HllXYcXEoRyBAp30USALsPxG98xY';

// Create a new component that produce HTML
class App extends Component {

	constructor(props) {
	  super(props);

	  this.state = { 
	  	videos: [],
	  	selectedVideo: null
	  };

	  this.videoSearch('Anime');
	}

	videoSearch(term) {
		// ES6 can do this.videos = videos as long as key and params are the same
	  YTSearch({key: YOUTUBE_KEY, term: term}, (videos) => { 
	  	this.setState({ 
	  		videos: videos,
	  		selectedVideo: videos[0]
	  	});
	  });
	}

	render() {
		const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);
		return (
			<div>
				<SearchBar onSearch={videoSearch} />
				<VideoDetail video={this.state.selectedVideo} />
				<VideoList videos={this.state.videos} onVideoSelect={ selectedVideo => this.setState({selectedVideo}) } />
			</div>
		);	
	}
};


// Add the generated HTML from the Component and add it to a page
ReactDOM.render(<App />, document.querySelector('.container'));
