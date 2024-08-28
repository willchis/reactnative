import {useEffect, useState} from 'react';
import { ActivityIndicator, Image, FlatList, StyleSheet, Text, Platform, View} from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

type Headline = {
  title: string;
  description: string;
};

export default function HomeScreen() {
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
          renderItem={({item}) => (
            <Text>
              {item.title}, {item.description}
            </Text>
          )}
        />
      )} 
      <Text>test</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
