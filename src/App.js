import React, { Component } from 'react';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      myurl: '',
      searchdata: ''
    };
  }

  // api_fetch = async (e) => {
  //   e.preventDefault()
  //    await this.setState({
  //     myurl: 
  //   })
  //   this.fetchapi1()
  // }


  fetchapi1 = (e) => {
    e.preventDefault();
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${this.state.searchdata}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.setState({
          items: json,
        });
      }).catch(error => {
        alert(error);
      })
  }

  renderMeaning(meaning) {
    return (
      <ol>
        <li className="Speech">
          {/* <span>{i+1}</span> */}
          <i>{meaning.partOfSpeech}</i>
          <li>
            {
              this.renderDefinations(meaning.definitions)
            }
          </li>
        </li>
      </ol>
    )
  }

  renderDefinations(definations) {
    return (
      definations.map((meaning, i) => {
        // console.log(i);

        return (
          <div>
            <ol>
              <li key={i}>
                <span className="Digits">{i + 1} </span>
                {meaning.definition}

              </li>
              <li key={i * 100}>
                <p>
                  {/* <h4>Example </h4> */}
                  {typeof (meaning.example) !== 'undefined' && <> <strong className="Example__Text">"{meaning.example}"</strong></>}
                  {/* {console.log(meaning.example)} */}

                </p>
              </li>
            </ol>


            <p>
              {meaning.synonyms.length !== 0 && <span className="Text">Similar: </span>}
              {/* <span className="Text">Similar:</span> */}

              {this.rendersynonyms(meaning.synonyms)}
            </p>

          </div>
        )
      })
    )
  }

  rendersynonyms = (synonyms) => {
    return (
      synonyms.map((synonym) => {
        return (
          <li className="synonymss">
            <ul>
              <li >
                {synonym}
              </li>
            </ul>
          </li>
        )
      })
    )
  }


  render() {
    console.log(this.state)
    return (
      <div className="Search__Bar">
        <h1>Dictionary</h1>
        <form onSubmit={this.fetchapi1}>
          <div className="Input__Field"><input type="text" placeholder="Search for a word" onChange={(e) => {
            e.preventDefault();
            var a = e.target.value;
            this.setState({
              searchdata: a,
            })
            console.log(this.state.searchdata);
          }}></input>
          </div>
          <button type="submit">
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5z" b /></svg>
          </button>
        </form>
        <div>
          {this.state.items.map((item, i) => {
            let { word } = item
            return (
              <ul style={{
                listStyle: "none"
              }}>
                <li key={i}><img src="volume3-2.svg" width="1.5%" onClick={() => { new Audio(item.phonetics[0].audio).play() }} alt="" /><span>{word}</span></li>
                <li className="phonetics" key={i}>/{item.phonetic}/</li><br></br>
                {/* <li key={i}><button onClick={() => { new Audio(item.phonetics[0].audio).play() }}>Audio</button></li> */}
                <li key={i}>
                  <ul>
                    {
                      item.meanings.map((meaning) => {
                        return this.renderMeaning(meaning)
                        // console.log(i);
                      })
                    }
                  </ul>
                </li>
              </ul>
            )
          })}
        </div>
      </div>
    );
  }
}

export default App;
