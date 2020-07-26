import React, {Component, useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Platform, StatusBar } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';


const CATEGORIES = [
  {
    name: 'Cocina',
    products: [
      {
        name: 'Aceite de canola',
        model: 'PAM',
        presentations: [
          'normal'
        ],
        store: 'W'
      },
      {
        name: 'Salsa catsup',
        model: 'Del Monte',
        presentations: [
          '300mg',
          '600mg'
        ],
        store: 'C'
      }
    ]
  },
  {
    name: 'Lacteos',
    products: [
      {
        name: 'Queso crema',
        model: 'Philadelphia',
        presentations: [
          'normal',
          'light'
        ],
        store: 'W'
      }
    ]
  }
];

const RenderRow = (product) => {
  return (
    <View style={{ height: 50, flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
      <View style={{width: 200, backgroundColor: 'lightgrey'}}> 
        <Text>{product.name}</Text>
      </View>
      <View style={{ flex: 1, alignSelf: 'stretch' , backgroundColor: 'red'}} />
    </View>
  );
    
}

const Table = (category) => {
      return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          {
              category.products.map((product) => {
                  return RenderRow(product);
              })
          }
          </View>
  );
}

const RenderHeader = (section, _, isActive) => {
  return (
    <Animatable.View
      duration={400}
      style={[styles.header, isActive ? styles.active : styles.inactive]}
      transition="backgroundColor">
      <Text style={styles.headerText}>{section.name + ' ' + (isActive ? '^' : 'v')}</Text>
      <View style={{ backgroundColor: '#000', height: 1, marginTop: 10, opacity : (isActive ? 0 : 1)}} />
    </Animatable.View>
  );
}

const RenderContent = (section, _, isActive) => {
  return (
    <Animatable.View
      duration={400}
      style={[styles.content, isActive ? styles.active : styles.inactive]}
      transition="backgroundColor">
      <Animatable.View animation={isActive ? 'bounceIn' : undefined}>
        {Table(section)}
      </Animatable.View>
    </Animatable.View>
  );
}

const CategoryTable = () => {
  const [activeSections, setActiveSections] = useState([]);

  return (
    <Accordion
      sections={CATEGORIES}
      activeSections={activeSections}
      touchableComponent={TouchableOpacity}
      expandMultiple={true}
      renderHeader={RenderHeader}
      renderContent={RenderContent}
      duration={400}
      onChange={(sections) => setActiveSections(sections.includes(undefined) ? [] : sections)}
    />
  );
}

const Compras = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingTop: 10 }}>
        <CategoryTable/>
      </ScrollView>
    </View>
  );
}

export default Compras;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fcff',
    //alignItems: 'center',
    //justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 20,
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  }, 
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  active: {
    backgroundColor: '#e6faff',
  },
  inactive: {
    backgroundColor: '#e0f9ff',
  },
});
