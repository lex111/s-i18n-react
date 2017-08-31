import React, { Component } from 'react';
import { View, Button, Text, Picker } from 'react-native';
import Greeting from './greeting';

const t = require('./locale.js');

console.log(t);

export default class BetterTranslator extends Component {
  constructor(props) {
    super(props);
    this.state = {text: '',language: 'fr'};
  }

  componentDidMount() {
    this.changeLanguage('fr');
  }

  changeLanguage(lang) {
    t.setLanguage(lang);
    this.setState({language: lang});
  }

  render() {
    return (
      <View style={{paddingTop: 40}}>
        <Picker
            selectedValue={this.state.language}
            onValueChange={(itemValue, itemIndex) => this.changeLanguage(itemValue)}>
            <Picker.Item label="Français" value="fr" />
            <Picker.Item label="English" value="en" />
            <Picker.Item label="Espanol" value="es" />
        </Picker>
        <View style={{ padding: 20}}>

          { t.t("I think that {user} made {repository} public", {
            user: "Houssein",
            //repository: "gitpoint/git-point"
            repository: (<Button title="gitpoint/gitpoint" onPress={()=>console.log("you clicked")}>gitpoint/git-point</Button>)
          }) }

          { t.t("This string is not translated and will automatically fallback to {language}", {
            language: "English"
          }) }

          { t.t("This string should not trigger placeholders processing") }

          { t.t("This string uses {nested}", {
            nested: t.t("nested translating!")
          })}

           <Text>I forgot to run this sentence through t.t() 😮</Text>

           { t.t("Oops, I forgot to pass my {placeholder}", {})}

           { t.t("A simple sentence without placeholders") }

           { t.t("Two {consecutive} {placeholders}", { consecutive: t.t("consecutive"), placeholders: t.t("placeholders")})}

           { t.t("A sentence {0} using {1} numerical {0} placeholders", ["-foo-", "-bar-"]) }

           { t.t("A simple sentence with only one placeholder passed as a {0} without wrapping it in an array", "string")}

           { t.t("There {n,plural,=0{are no cats} =1{is one cat} =*{are # cats}}!", {
             n: 0
           })}

           { t.t("There {n,plural,=0{are no cats} =1{is one cat} =*{are # cats}}!", {
             n: 1
           })}

           { t.t("There {n,plural,=0{are no cats} =1{is one cat} =*{are # cats}}!", {
             n: 42
           })}

           <Greeting name="Mehdi" />
        </View>
      </View>
    );
  }
}
