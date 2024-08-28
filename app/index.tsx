import {useEffect, useState} from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native';

type Headline = {
  title: string;
  description: string;
  urlToImage: string;
};

export default function Index() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Headline[]>([]);

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
            const imageElement = item.urlToImage ?
            <Image src={item.urlToImage}/>
            :
            undefined;
            
            return (
              <>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
              {imageElement}
              </>
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

  },
  description: {
    color: 'white',
  }
});
