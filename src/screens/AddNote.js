import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import { BlurView } from '@react-native-community/blur';
import Toast from 'react-native-toast-message';

import Header from '../components/Header';
import { bridges } from '../data/bridges';
import { CATEGORIES } from '../data/categories';
import LargeButton from '../components/LargeButton';
import { useStore } from '../store/context';
import AppBackground from '../components/AppBackground';

const { height } = Dimensions.get('window');

const AddNote = () => {
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState(CATEGORIES);
  const [category, setCategory] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const { saveNote, fetchNotes, isEnableNotification } = useStore();
  const [isVisibleAlert, setIsVisibleAlert] = useState(false);

  let options = {
    storageOptions: {
      path: 'image',
      maxHeight: 700,
      maxWidth: 700,
    },
  };

  useFocusEffect(
    useCallback(() => {
      fetchNotes();
    }, []),
  );

  const imagePicker = () => {
    launchImageLibrary(options, response => {
      if (response.didCancel) return;

      const newImage = { image: response.assets[0].uri, id: Date.now() };

      if (images.length >= 2) return;
      setImages([...images, newImage]);
    });
  };

  const handleRemoveImage = selectedImage => {
    const filtered = images.filter(img => img.id !== selectedImage.id);

    setImages(filtered);
  };

  const getFormattedDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const coordinates = bridges.find(bridge => bridge.name === category);

  const handleSaveNote = () => {
    if (isEnableNotification) {
      Toast.show({
        text1: 'Note added successfully!',
      });
    }

    const newNote = {
      id: Date.now(),
      title,
      description,
      images,
      category,
      date: getFormattedDate(),
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    };

    saveNote(newNote);

    setTimeout(() => {
      navigation.goBack();
    }, 300);
  };

  const isDisabled = !title || !description || !category;

  const isUnsavedData = title || description || category;

  return (
    <AppBackground>
      {isVisibleAlert && (
        <BlurView style={styles.blurBg} blurType="light" blurAmount={5} />
      )}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Header
            title={'Add Note'}
            onPress={imagePicker}
            type={'Note'}
            isUnsavedData={isUnsavedData}
            setIsVisibleAlert={setIsVisibleAlert}
          />

          <Text style={styles.sectionTitle}>Bridge</Text>
          <DropDownPicker
            open={open}
            value={category}
            items={categories}
            setOpen={setOpen}
            listMode="SCROLLVIEW"
            setValue={setCategory}
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            listItemLabelStyle={styles.listItemLabel}
            selectedItemLabelStyle={styles.selectedItemLabel}
            placeholder="Bridge"
            showTickIcon={false}
            textStyle={styles.pickerTextStyle}
          />
          <Text style={styles.sectionTitle}>Title of your note</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.sectionTitle}>Description</Text>
          <TextInput
            style={[styles.input, { minHeight: 140 }]}
            multiline
            verticalAlign="top"
            value={description}
            onChangeText={setDescription}
          />

          <View style={styles.imagesWrap}>
            {images.map(item => (
              <View style={styles.wrap} key={item.id}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.imagePicker}
                />

                <TouchableOpacity
                  style={styles.removeIcon}
                  activeOpacity={0.7}
                  onPress={() => handleRemoveImage(item)}
                >
                  <Image source={require('../assets/icons/remove.png')} />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <LargeButton
            title={'Save'}
            style={isDisabled && { backgroundColor: '#D9D9D9' }}
            isDisabled={isDisabled}
            onPress={handleSaveNote}
          />
        </View>
      </ScrollView>
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: height * 0.075, padding: 24, paddingBottom: 110 },
  bridgeContainer: {
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#CBEABA',
    borderRadius: 12,
    marginTop: 16,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    marginBottom: 8,
    color: '#1C5839',
  },
  subtitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#1C5839',
    marginBottom: 12,
  },

  dropdown: {
    backgroundColor: '#CBEABA',
    borderColor: '#CBEABA',
    borderWidth: 0.5,
    borderRadius: 12,
    borderColor: '#D7D7D7',
    height: 56,
  },
  dropdownContainer: {
    backgroundColor: '#CBEABA',
    borderColor: '#CBEABA',
    borderWidth: 2,
    borderRadius: 12,
  },
  listItemLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: '#1C5839',
  },
  selectedItemLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: '#1C5839',
    padding: 6,
  },
  pickerTextStyle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#1C5839',
  },
  sectionTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#fff',
    marginBottom: 7,
    marginTop: 16,
  },
  input: {
    width: '100%',
    height: 51,
    backgroundColor: '#CBEABA',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,

    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#1C5839',
  },
  imagePicker: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  imagesWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 80,
  },
  removeIcon: { position: 'absolute', right: 16, top: 16 },
  wrap: {
    width: '48%',
    height: 167,
  },
  blurBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 20,
  },
});

export default AddNote;
