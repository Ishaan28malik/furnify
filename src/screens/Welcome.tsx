import React, {useEffect} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import 'react-native-devsettings';
import {COLORS} from '../theme/colors';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '../hooks/useAppSelector';
import {useAppDispatch} from '../hooks/useAppDispatch';
import {setCurrentUser} from '../store/chatSlice';

function Welcome() {
  const navigation = useNavigation();
  const [userName, setUserName] = React.useState<string>('');
  const [error, setError] = React.useState<null | string>(null);

  const {users} = useAppSelector(state => state.chat);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert(error);
      setUserName('');
    }
  }, [error]);

  const handleUserInput = () => {
    setError(null);
    if (userName === '') {
      return;
    }

    const userFound = users.find(u => u.username === userName);

    if (!userFound) {
      setError('User Not Found!');
      return;
    }

    dispatch(
      setCurrentUser({
        ...userFound,
      }),
    );

    navigation.navigate('Chats' as never);
  };

  return (
    <SafeAreaView style={styles.appContainer}>
      <StatusBar backgroundColor={COLORS.blue[600]} />
      <Memojis />
      <IllustratedBg />
      <View style={styles.textContainer}>
        <Text style={styles.headline}>Welcome to OnlyChats</Text>
        <Text style={styles.description}>
          Experience AI chat like never before with OnlyChats, your AI-powered
          besties on the move!
        </Text>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={100}
          style={{width: '100%'}}>
          <TextInput
            style={styles.textInput}
            value={userName}
            onChangeText={val => setUserName(val)}
            placeholder="Enter Username"
            onEndEditing={handleUserInput}
          />
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

const IllustratedBg = () => {
  return (
    <View style={styles.illusContainer}>
      <View style={styles.innerCircle1}>
        <View style={styles.innerCircle2}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
          />
        </View>
      </View>
    </View>
  );
};

const Memojis = () => {
  return (
    <>
      <Image
        source={require('../../assets/images/memoji-male-1.png')}
        style={[
          styles.memoji,
          {
            top: 10,
            left: 20,
            transform: [{rotate: '15deg'}],
          },
        ]}
      />
      <Image
        source={require('../../assets/images/memoji-male-2.png')}
        style={[
          styles.memoji,
          {
            top: '25%',
            left: '5%',
          },
        ]}
      />
      <Image
        source={require('../../assets/images/memoji-male-3.png')}
        style={[
          styles.memoji,
          {
            top: '45%',
            left: '10%',
            transform: [{rotate: '-15deg'}],
          },
        ]}
      />
      <Image
        source={require('../../assets/images/memoji-female-1.png')}
        style={[
          styles.memoji,
          {
            top: 13,
            right: '20%',
            transform: [{rotate: '-15deg'}],
          },
        ]}
      />
      <Image
        source={require('../../assets/images/memoji-female-2.png')}
        style={[
          styles.memoji,
          {
            top: '20%',
            right: -30,
          },
        ]}
      />
      <Image
        source={require('../../assets/images/memoji-female-3.png')}
        style={[
          styles.memoji,
          {
            top: '40%',
            right: '14%',
            transform: [{rotate: '12deg'}],
          },
        ]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  memoji: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    position: 'absolute',
    zIndex: 1,
  },
  appContainer: {
    position: 'relative',
    backgroundColor: COLORS.blue[600],
    height: Dimensions.get('window').height,
  },
  illusContainer: {
    backgroundColor: '#64BDFF',
    width: '110%',
    borderRadius: 999,
    aspectRatio: 1,
    marginLeft: '-5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle1: {
    width: '70%',
    borderRadius: 999,
    aspectRatio: 1,
    backgroundColor: COLORS.blue[400],
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 20,
    shadowColor: COLORS.blue[600],
  },
  innerCircle2: {
    width: '50%',
    borderRadius: 999,
    aspectRatio: 1,
    backgroundColor: COLORS.blue[200],
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '50%',
    resizeMode: 'contain',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 50,
    marginTop: 40,
  },
  headline: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    marginBottom: 10,
  },
  description: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  textInput: {
    backgroundColor: 'white',
    width: '100%',
    marginTop: 20,
    borderRadius: 15,
    paddingHorizontal: 15,
    textAlign: 'center',
    fontFamily: 'Inter-Bold',
  },
});

export default Welcome;
