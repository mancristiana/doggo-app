import React, { Component } from 'react';
import axios from 'axios';
import { Box, Button, Heading, Image, Mask, Masonry, Text } from 'gestalt';
import update from 'immutability-helper';
import './App.css';

const Doggo = props => {
  console.log('PROPS', props);
  const { url, width, height, breeds } = props.data;

  return (
    <Box maxWidth={236}>
      <Mask shape="rounded">
        <Image
          src={url}
          color={'#fafafa'}
          naturalHeight={height}
          naturalWidth={width}
          alt="doggo"
        />
      </Mask>
      <Text align="center">{breeds.map(breed => breed.name)}</Text>
    </Box>
  );
};

class App extends Component {
  state = { doggos: [] };

  iWantDoggo = () => {
    console.log('I WANT DOGGO');
    const config = {
      headers: {
        'x-api-key': '14446fa1-52e7-4792-a42a-396102ebce34'
      }
    };
    axios
      .get('https://api.thedogapi.com/v1/images/search', config)
      .then(response => {
        const doggo = response.data;
        const newDoggos = update(this.state.doggos, { $push: doggo });
        this.setState({
          doggos: newDoggos
        });
      })
      .catch(err => console.log('response err', err));
  };

  handleScroll() {
    const windowHeight =
      'innerHeight' in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      console.log('SCROLLLLLL');
      this.getMahDoggos();
    }
  }

  getMahDoggos() {
    for (let i = 0; i < 5; i++) this.iWantDoggo();
  }

  componentDidMount() {
    this.getMahDoggos();
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  render() {
    return (
      <div className="App">
        <div className="App-box">
          <Box maxWidth="1200">
            <Heading>Doggo App</Heading>
            <Box margin={6}>
              <Button
                text="Gimme doggo"
                onClick={this.iWantDoggo}
                size="lg"
                inline
              />
            </Box>
            <Masonry
              comp={Doggo}
              items={this.state.doggos}
              minCols={1}
              loadItems={this.iWantDoggo}
            />
          </Box>
        </div>
      </div>
    );
  }
}

export default App;
