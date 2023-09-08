import React, {useLayoutEffect} from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableHighlight,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import {recipes} from '../../data/dataArrays';
import MenuImage from '../../components/MenuImage/MenuImage';
import {getCategoryName} from '../../data/MockDataAPI';

export default function HomeScreen(props) {
  const {navigation} = props;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerRight: () => <View />,
    });
  }, []);

  const onPressRecipe = item => {
    navigation.navigate('Recipe', {item});
  };

  const renderRecipes = ({item}) => (
    <TouchableOpacity activeOpacity={0.5} onPress={() => onPressRecipe(item)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{uri: item.photo_url}} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={recipes}
        renderItem={renderRecipes}
        keyExtractor={item => `${item.recipeId}`}
      />
    </View>
  );
}
