import React, { Component } from 'react';
import { Container, Header } from 'semantic-ui-react';
import $ from 'jquery';

import './App.css';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      lyric: "",
    };
  }

  componentDidMount() {
    $.ajax({
      url: 'http://api.musixmatch.com/ws/1.1/track.lyrics.get',
      dataType: 'jsonp',
      contentType: 'application/json',
      type: 'GET',
      jsonpCallback: 'jsonp_callback',
      data: {
      track_id: '130727382',
      apikey: 'c4caa5ba22a90e53f85590fdecf2347d',
      format:"jsonp",
      callback:"jsonp_callback"
    },
    success: (res) => {
      const index = res.message.body.lyrics.lyrics_body.indexOf(".") + 3;
      const lyric = res.message.body.lyrics.lyrics_body.slice(0, index);
      this.setState({ lyric });
    },
    error: (data) => console.log(data)
    });
  }

  render() {
    return (
    <Container text className="Lyric_container" textAlign='center'>
      <Header as='h1'>Header</Header>
      <p className="Lyric_text">{ this.state.lyric }</p>
    </Container>
    );
  }
}

export default App;
