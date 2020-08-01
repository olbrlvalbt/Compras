import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, TextInput, Picker, View, ScrollView, Platform, StatusBar } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';


const CATALOG = [
  {
    name: 'Aceite de canola en aerosol',
    brand: 'PAM',
    category: 'Cocina',
    presentations: [
      'normal'
    ],
    store: 'W'
  },
  {
    name: 'Salsa catsup',
    brand: 'Del Monte',
    category: 'Cocina',
    presentations: [
      '300mg',
      '600mg'
    ],
    store: 'C'
  },
  {
    name: 'Queso crema',
    brand: 'Philadelphia',
    category: 'Lacteos',
    presentations: [
      'normal',
      'light'
    ],
    store: 'W'
  }
];


const RenderRow = (product) => {
  return (
    <View style={styles.row}>
      <View style={styles.productCol}> 
        <Text>{product.name}</Text>
      </View>
      <View style={styles.productCol}> 
        <Text>{product.brand}</Text>
      </View>
      <View style={styles.quantityCol}>
        <Picker
          selectedValue={'a'}
          style={{ height: 50, width: 90 }}
          //onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="a" value="a" />
          <Picker.Item label="b" value="b" />
        </Picker>
      </View>
      <View style={styles.quantityCol}>
        <TextInput 
          style={{ height: 30, borderColor: 'gray', borderWidth: 1 }}
          keyboardType = 'numeric'
          //onChangeText = {(text)=> onChangeText(text)}
          value = {'0'}//this.state.myNumber}
        />
      </View>
    </View>
  );
}

const Table = (category) => {
      return (
          <View style={{ flexDirection: 'column' }}>
          {
            CATALOG.filter(product => product.category == category).map((product) => {
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
      style={[styles.header]}
      transition="backgroundColor"
    >
      <Text style={styles.headerText}>{section + ' ' + (isActive ? '^' : 'v')}</Text>
      
    </Animatable.View>
  );
}

const RenderContent = (section, _, isActive) => {
  return (
    <Animatable.View
      duration={400}
      style={[styles.content]}
      transition="backgroundColor"
    >
      <Animatable.View animation={undefined /*isActive ? 'bounceIn' : undefined*/}>
        {Table(section)}
      </Animatable.View>
    </Animatable.View>
  );
}

const CategoryTable = () => {
  const [activeSections, setActiveSections] = useState([]);

  return (
    <Accordion
      sections={[...new Set(CATALOG.map((product)=>product.category))]}
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
    backgroundColor: '#e0f9ff',
    padding: 10,
    borderTopColor: 'lightgrey',
    borderTopWidth: 1,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    paddingHorizontal: 5,
    backgroundColor: '#e6faff',
  },
  row: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    borderTopWidth: 1,
    borderTopColor: 'grey'
  },
  productCol: {
    flex: 1,
    justifyContent: 'center',
    flexGrow: 1,
    backgroundColor: '#f2f8ff'
  },
  quantityCol: {
    width: 90,
    justifyContent: 'center',
    backgroundColor: '#f2f8ff'
  },
});
