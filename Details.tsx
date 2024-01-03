import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Button, SafeAreaView, StyleSheet, Text, StatusBar, Pressable, View } from 'react-native';

const Details = ({ navigation }) => {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('white');


  const fetchPokemons = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${page * 20}&limit=20`);
      const data = await response.json();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const generateRandomColor = () => {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
  };

  const onLongPressHandler = () => {
    const randomColor = generateRandomColor();
    setBackgroundColor(randomColor);
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <Button
        title="Go to Details, again ..."
      />
      <View style={styles.container}>
        <FlatList
          data={pokemons}
          keyExtractor={(item, index) => `${item.name}${index}`}
          renderItem={({ item }) => (
            <Pressable style={[styles.button, { backgroundColor }]}>
              <Text style={styles.buttonLabel}>{item.name}</Text>
            </Pressable>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  button: {
    borderRadius: 10,
    height: 40,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'blue',
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 18,
  },
});
