import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

const STORAGE_KEY = '@save_hour'

const App = () => {
  const [hour, setHour] = useState('')
  
const saveData = async () => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, hour)
    alert('Data successfully saved')
  } catch (e) {
    alert('Failed to save the data to the storage')
  }
}

const outputSmileyFace = () => {
  var happyFace, mildFace, sadFace
  if (hour > 7) {
    happyFace
  }
  else if (hour < 6 && hour > 3) {
    mildFace
  }
  else if (hour < 2 && hour >= 0) {
    sadFace
  }
}

const readData = async () => {
  try {
    const userHour = await AsyncStorage.getItem(STORAGE_KEY)

    if (userHour !== null) {
      setHour(userHour)
    }
  } catch (e) {
    alert('Failed to fetch the data from storage')
  }
}

useEffect(() => {
  readData()
}, [])

const clearStorage = async () => {
  try {
    await AsyncStorage.clear()
    alert('Storage successfully cleared!')
  } catch (e) {
    alert('Failed to clear the async storage.')
  }
}

const onChangeText = userHour => setHour(userHour)

const onSubmitEditing = () => {
  if (!hour) return

  saveData(hour)
  setHour('')
}

return (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.title}>Productivity App</Text>
    </View>
    <View style={styles.panel}>
      <Text>Enter hours worked today:</Text>
      <TextInput
        style={styles.input}
        value={hour}
        placeholder="Enter Here"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
      />
      <Text style={styles.text}>Your Hours for today...  {hour}</Text>
      <TouchableOpacity onPress={clearStorage} style={styles.button}>
        <Text style={styles.buttonText}>Clear Storage</Text>
      </TouchableOpacity>
    </View>
  </View>
)
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    width: '100%',
    backgroundColor: '#dcdcdc',
    padding: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignItems: 'center'
  },
  title: {
    fontSize: 22,
    color: '#333',
    fontWeight: 'bold'
  },
  panel: {
    paddingTop: 40,
    alignItems: 'center'
  },
  text: {
    fontSize: 24,
    padding: 10,
    backgroundColor: '#dcdcdc'
  },
  input: {
    padding: 15,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    margin: 10
  },
  button: {
    margin: 10,
    padding: 10,
    backgroundColor: 'yellow'
  },
  buttonText: {
    fontSize: 18,
    color: '#444'
  }
})
