import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { BlurView } from '@react-native-community/blur';
import Toast from 'react-native-toast-message';
import { useCallback, useState } from 'react';

import { useStore } from '../store/context';
import SmallButton from '../components/SmallButton';
import AppBackground from '../components/AppBackground';

const { height } = Dimensions.get('window');

const SavedNotes = () => {
  const navigation = useNavigation();
  const { removeNote, fetchNotes, savedNotes, isEnableNotification } =
    useStore();
  const [isVisibleAlert, setIsVisibleAlert] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchNotes();
    }, []),
  );

  const showConfirm = selectedNote => {
    setIsVisibleAlert(true);

    Alert.alert(
      'Delete Note?',
      'Are you sure you want to delete this memory? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          onPress: () => setIsVisibleAlert(false),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            handleDeleteNote(selectedNote);
          },
        },
      ],
      { cancelable: false },
    );
  };

  const handleDeleteNote = selectedNote => {
    if (isEnableNotification) {
      Toast.show({
        text1: 'Note deleted successfully!',
      });
    }
    removeNote(selectedNote), setIsVisibleAlert(false);
  };

  return (
    <AppBackground>
      {isVisibleAlert && (
        <BlurView style={styles.blurBg} blurType="light" blurAmount={5} />
      )}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.headerWrap}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <Image source={require('../assets/icons/back.png')} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Your Location Notes</Text>
          </View>

          {savedNotes.length === 0 && (
            <View style={styles.emptyScreenContainer}>
              <Text style={styles.emptyScreenTitle}>📝 No Notes Yet</Text>
              <Text style={styles.emptyScreenText}>
                You haven’t added any memories about your visited bridges
              </Text>
              <SmallButton
                title={'+ Add New Note'}
                onPress={() => navigation.navigate('AddNote')}
              />
            </View>
          )}

          {savedNotes.map(note => (
            <TouchableOpacity
              key={note.id}
              activeOpacity={0.7}
              style={styles.noteContainer}
              onLongPress={() => showConfirm(note)}
              onPress={() => navigation.navigate('NoteDetails', note)}
            >
              <View>
                <Text style={styles.title}>{note.title}</Text>
                <Text numberOfLines={2} style={styles.subtitle}>
                  {note.description}
                </Text>
                <Text style={styles.date}>{note.date}</Text>
              </View>

              <TouchableOpacity
                style={styles.mapBtn}
                onPress={() =>
                  navigation.navigate('Map', {
                    latitude: note.latitude,
                    longitude: note.longitude,
                  })
                }
              >
                <Image source={require('../assets/icons/map2.png')} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: height * 0.075, padding: 24 },
  noteContainer: {
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#CBEABA',
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  emptyScreenContainer: {
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#F6AE29',
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    marginTop: height * 0.22,
  },
  emptyScreenTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    marginBottom: 12,
    color: '#fff',
    textAlign: 'center',
  },
  emptyScreenText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    marginBottom: 12,
    color: '#fff',
    textAlign: 'center',
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    marginBottom: 10,
    color: '#1C5839',
  },
  subtitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#AF1E23',
    marginBottom: 10,
  },
  date: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#F6AE29',
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: '#fff',
  },
  backBtn: {
    width: 56,
    height: 56,
    borderRadius: 100,
    backgroundColor: '#AF1E23',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
  },
  headerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 37,
  },
  image: {
    width: '100%',
    height: 170,
    borderRadius: 12,
    marginBottom: 8,
  },
  notificationText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    width: 200,
    position: 'absolute',
    lineHeight: 15,
  },
  infoContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 53,
    top: -17,
    zIndex: 20,
  },
  mapBtn: {
    width: 56,
    height: 56,
    borderRadius: 100,
    backgroundColor: '#1C5839',
    alignItems: 'center',
    justifyContent: 'center',
  },
  blurBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 10,
  },
});

export default SavedNotes;
