import {useEffect, useState} from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Headline = {
  title: string;
  description: string;
  urlToImage: string;
  url: string;
};

export default function Index() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Headline[]>([]);

  // TODO: memoize these
  const dimensions = Dimensions.get('window');
  const imageHeight = Math.round(dimensions.width * 9 / 16);
  const imageWidth = dimensions.width;

  const getHeadlines = async () => {
    try {
      console.log('network');
      const response = await fetch('https://feathernews.org/api');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('hi');
    getHeadlines();
  }, []);

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => item.title }
          renderItem={({item}) => {
            console.log(item.urlToImage);
            const imageElement = item.urlToImage ?
            <Image source={{uri: item.urlToImage}} style={{width: imageWidth, height: imageHeight}}/>
            :
            undefined;
            
            return (
              <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
                <View style={{marginBottom: 10}}>
                {imageElement}
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                </View>
              </TouchableOpacity>ç
            )
        }}
        />
      )} 
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontWeight: 'bold',
    marginTop: 5,

  },
  description: {
    color: 'white',
    marginTop: 5,
  }
});
